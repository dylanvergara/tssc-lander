import { srotdBeehiiv } from '../../lib/srotd/config';

/**
 * SINGLE INTEGRATION POINT for the SROTD Beehiiv subscribe form.
 *
 * Status: PLACEHOLDER. Do not mount a second form on this page.
 * Publication: Dylan's Newsletter
 *   srotdBeehiiv.publicationId = pub_46fb910f-0d7f-4fd2-9867-b8a3dd5c9ff3
 *
 * TODO: replace the disabled name/email fields with the Beehiiv embed.
 * Keep the hidden `utm` inputs (or pass the same `utm` prop into the embed).
 * URL params already override the per-role defaults before they get here.
 */
export const SROTD_SIGNUP_INTEGRATION = 'placeholder';

export default function SrotdSignup({ utm }) {
  const entries = Object.entries(utm || {});

  return (
    <form
      className="srotd__form"
      data-srotd-signup={SROTD_SIGNUP_INTEGRATION}
      data-todo="beehiiv-embed"
      data-beehiiv-publication={srotdBeehiiv.publicationId}
      data-beehiiv-publication-name={srotdBeehiiv.publicationName}
      aria-disabled="true"
      aria-describedby="srotd-signup-note"
      noValidate
    >
      <p className="srotd__sr" id="srotd-signup-note">
        Placeholder only. The Beehiiv signup for {srotdBeehiiv.publicationName} is not connected yet.
      </p>
      {entries.map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <fieldset className="srotd__fields" disabled>
        <legend className="srotd__sr">Get the full breakdown</legend>
        <label className="srotd__label">
          <span className="srotd__sr">First name</span>
          <input
            className="srotd__input"
            type="text"
            name="name"
            placeholder="First name"
            autoComplete="given-name"
            aria-label="First name"
          />
        </label>
        <label className="srotd__label">
          <span className="srotd__sr">Email</span>
          <input
            className="srotd__input"
            type="email"
            name="email"
            inputMode="email"
            placeholder="Email"
            autoComplete="email"
            aria-label="Email"
          />
        </label>
        <button className="srotd__submit" type="submit">
          Get the breakdown
        </button>
      </fieldset>
    </form>
  );
}
