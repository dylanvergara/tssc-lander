const BOOKING_WIDGET_URL = 'https://links.serialagency.co/widget/bookings/book-application';

// Keys the LeadConnector widget actually copies into its contact form.
const PREFILL_KEYS = ['first_name', 'last_name', 'phone', 'email'];

export function bookingIframeSrc(search) {
  const url = new URL(BOOKING_WIDGET_URL);
  const params = search instanceof URLSearchParams ? search : new URLSearchParams(search || '');
  for (const key of PREFILL_KEYS) {
    const value = params.get(key);
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}
