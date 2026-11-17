// Shared SROTD settings. A new role does not need an edit here.

/** Beehiiv publication for Dylan's Newsletter. The role page uses the embed, not the API. */
export const srotdBeehiiv = {
  publicationId: 'pub_46fb910f-0d7f-4fd2-9867-b8a3dd5c9ff3',
  publicationName: "Dylan's Newsletter",
  formId: '6b38291b-5067-4614-89f1-320b7c504d8b',
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
