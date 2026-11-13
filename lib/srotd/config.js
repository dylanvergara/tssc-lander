// Shared SROTD settings. A new role does not need an edit here.

/** Beehiiv publication for the SROTD subscribe form. The embed is not built yet. */
export const srotdBeehiiv = {
  publicationId: 'pub_46fb910f-0d7f-4fd2-9867-b8a3dd5c9ff3',
  publicationName: "Dylan's Newsletter",
};

/** Highlights past this count stay in the JSON and are not rendered. */
export const SROTD_MAX_HIGHLIGHTS = 3;

export const SROTD_UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

/** Used when a role file omits a key. utm_content falls back to the keyword. */
export const SROTD_DEFAULT_UTM = {
  utm_source: 'instagram',
  utm_medium: 'manychat_dm',
  utm_campaign: 'srotd',
};
