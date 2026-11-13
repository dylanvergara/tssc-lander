const NAME = /^[\p{L}][\p{L}\p{M}'’.\- ]{0,59}$/u;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SROTD_COPY = {
  notReady: "This role isn't ready to send yet. Please try again soon.",
  unavailable: "Signup isn't available right now. Please try again in a little while.",
  retry: "We couldn't send that just yet. Please try again in a moment.",
  firstName: 'Enter your first name.',
  lastName: 'Enter your last name.',
  phone: 'Enter a valid phone number.',
  email: 'Enter a valid email.',
  role: "That role isn't available.",
};

function cleanName(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

export function phoneDigits(value) {
  return String(value || '').replace(/\D/g, '').slice(0, 15);
}

export function validateSrotdSignup(input) {
  const firstName = cleanName(input?.firstName);
  const lastName = cleanName(input?.lastName);
  const digits = phoneDigits(input?.phone);
  const email = String(input?.email || '').trim().toLowerCase();

  if (!NAME.test(firstName)) return { ok: false, message: SROTD_COPY.firstName };
  if (!NAME.test(lastName)) return { ok: false, message: SROTD_COPY.lastName };
  if (digits.length < 10) return { ok: false, message: SROTD_COPY.phone };
  if (email.length > 254 || !EMAIL.test(email)) return { ok: false, message: SROTD_COPY.email };

  return { ok: true, firstName, lastName, phone: digits, email };
}
