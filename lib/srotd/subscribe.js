import { srotdBeehiiv, srotdBeehiivFields } from './config';
import { getSrotdRole, resolveSrotdUtm } from './roles';
import { SROTD_COPY, validateSrotdSignup } from './signup-fields';

const API_ROOT = 'https://api.beehiiv.com/v2';

function customFields({ firstName, lastName, phone, roleName, docUrl }) {
  return [
    { name: srotdBeehiivFields.firstName.name, value: firstName },
    { name: srotdBeehiivFields.lastName.name, value: lastName },
    { name: srotdBeehiivFields.phone.name, value: phone },
    { name: srotdBeehiivFields.role.name, value: roleName },
    { name: srotdBeehiivFields.doc.name, value: docUrl },
  ];
}

function errorCode(json) {
  const code = json?.errors?.[0]?.code;
  return typeof code === 'string' ? code.slice(0, 80) : '';
}

async function beehiiv(fetchImpl, apiKey, path, { method = 'GET', body } = {}) {
  let response;
  try {
    response = await fetchImpl(`${API_ROOT}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(12000),
    });
  } catch {
    return { ok: false, status: 0, json: null, retry: true };
  }

  let json = null;
  try {
    json = await response.json();
  } catch {
    json = null;
  }
  const retry = response.status === 429 || response.status >= 500 || response.status === 0;
  return { ok: response.ok, status: response.status, json, retry, code: errorCode(json) };
}

function logStep(step, result) {
  console.error('srotd opt-in failed', { step, status: result.status || 0, code: result.code || '' });
}

/**
 * Create or update a subscriber, tag them, then enroll once.
 * Never sends automation_ids on create.
 * Role name and doc URL come from the JSON file, not the caller.
 */
export async function enrollSrotd(input, deps = {}) {
  const fields = validateSrotdSignup(input);
  if (!fields.ok) return fields;

  const role = getSrotdRole(input?.keyword);
  if (!role) return { ok: false, message: SROTD_COPY.role };
  if (!role.docUrl) return { ok: false, message: SROTD_COPY.notReady };

  const apiKey = process.env.BEEHIIV_API_KEY;
  const automationId = typeof process.env.BEEHIIV_SROTD_AUTOMATION_ID === 'string'
    ? process.env.BEEHIIV_SROTD_AUTOMATION_ID.trim()
    : '';
  if (!apiKey || !automationId) return { ok: false, message: SROTD_COPY.unavailable };

  const fetchImpl = deps.fetchImpl || fetch;
  const nowSec = deps.nowSec || Math.floor(Date.now() / 1000);
  const utm = resolveSrotdUtm(role, input?.utm || {});
  const roleName = role.roleName || role.role;
  const values = customFields({ ...fields, roleName, docUrl: role.docUrl });
  const pub = srotdBeehiiv.publicationId;

  const created = await beehiiv(fetchImpl, apiKey, `/publications/${pub}/subscriptions`, {
    method: 'POST',
    body: {
      email: fields.email,
      reactivate_existing: false,
      send_welcome_email: false,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      utm_content: utm.utm_content,
      custom_fields: values,
    },
  });

  let subscription = created.json?.data;
  let existed = false;

  if (!created.ok) {
    if (created.retry) {
      logStep('create', created);
      return { ok: false, message: SROTD_COPY.retry };
    }
    const lookup = await beehiiv(
      fetchImpl,
      apiKey,
      `/publications/${pub}/subscriptions/by_email/${encodeURIComponent(fields.email)}`,
    );
    if (!lookup.ok || !lookup.json?.data?.id) {
      logStep(lookup.ok ? 'create' : 'lookup', lookup.ok ? created : lookup);
      return { ok: false, message: SROTD_COPY.retry };
    }
    subscription = lookup.json.data;
    existed = true;
  } else if (created.json?.warnings?.length) {
    logStep('create-fields', created);
    return { ok: false, message: SROTD_COPY.retry };
  } else if (typeof subscription?.created === 'number' && subscription.created < nowSec - 20) {
    existed = true;
  }

  const subscriptionId = subscription?.id;
  if (!subscriptionId) {
    logStep('create', created);
    return { ok: false, message: SROTD_COPY.retry };
  }

  const tagged = await beehiiv(fetchImpl, apiKey, `/publications/${pub}/subscriptions/${subscriptionId}/tags`, {
    method: 'POST',
    body: { tags: ['srotd', `srotd_${role.keyword}`] },
  });
  if (!tagged.ok) {
    logStep('tags', tagged);
    return { ok: false, message: SROTD_COPY.retry };
  }

  if (existed) {
    const updated = await beehiiv(fetchImpl, apiKey, `/publications/${pub}/subscriptions/${subscriptionId}`, {
      method: 'PUT',
      body: { custom_fields: values },
    });
    if (!updated.ok || updated.json?.warnings?.length) {
      logStep('update', updated);
      return { ok: false, message: SROTD_COPY.retry };
    }
  }

  const journey = await beehiiv(
    fetchImpl,
    apiKey,
    `/publications/${pub}/automations/${encodeURIComponent(automationId)}/journeys`,
    { method: 'POST', body: { email: fields.email } },
  );
  if (!journey.ok) {
    logStep('journey', journey);
    return { ok: false, message: SROTD_COPY.retry };
  }

  return { ok: true };
}
