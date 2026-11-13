// Shared SROTD settings. A new role does not need an edit here.

/** Beehiiv publication for the SROTD subscribe form. The embed is not built yet. */
export const srotdBeehiiv = {
  publicationId: 'pub_46fb910f-0d7f-4fd2-9867-b8a3dd5c9ff3',
  publicationName: "Dylan's Newsletter",
};

/**
 * Draft automation (Added by API, unlimited re-entry) until Dylan publishes it.
 * Not a secret. BEEHIIV_SROTD_AUTOMATION_ID overrides this.
 *
 * The subscribe route is not built yet. When it is:
 * custom_fields[].name must be the display names below, not slugs.
 * Phone Number is an integer field, so send digits only.
 * Do not pass automation_ids on create. Write the fields first, then call
 * POST /automations/{id}/journeys once for both new and existing subscribers.
 * Never do both for the same person.
 */
export const SROTD_AUTOMATION_ID_DEFAULT = 'aut_0d72d501-7852-42cb-a6f6-a980caf18ff3';

export function getSrotdAutomationId() {
  const fromEnv = process.env.BEEHIIV_SROTD_AUTOMATION_ID;
  if (typeof fromEnv === 'string' && fromEnv.trim()) return fromEnv.trim();
  return SROTD_AUTOMATION_ID_DEFAULT;
}

/** Display names for Beehiiv custom_fields[].name. Ids are for later updates. */
export const srotdBeehiivFields = {
  role: { name: 'SROTD Role', id: '77f17d00-2f46-4348-9390-9f0e77f93984' },
  doc: { name: 'SROTD Doc', id: 'e998fb8d-b213-4b14-ab54-ca8530799c59' },
  firstName: { name: 'First Name' },
  lastName: { name: 'Last Name' },
  phone: { name: 'Phone Number', type: 'integer' },
};

/** Highlights past this count stay in the JSON and are not rendered. */
export const SROTD_MAX_HIGHLIGHTS = 3;

/** These slugs belong to real routes under /srotd and cannot be role files. */
export const SROTD_RESERVED_KEYWORDS = ['confirmation'];

export const SROTD_UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

/** Used when a role file omits a key. utm_content falls back to the keyword. */
export const SROTD_DEFAULT_UTM = {
  utm_source: 'instagram',
  utm_medium: 'manychat_dm',
  utm_campaign: 'srotd',
};
