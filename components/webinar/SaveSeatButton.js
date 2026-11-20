import { SAVE_SEAT_LABEL } from '../../lib/webinar';

// WebinarJam binds clicks on [data-webinarHash]. It only rewrites the label
// and colors when the button also has js-embed-button. That class stays off.
export default function SaveSeatButton({ hash }) {
  return (
    <button
      type="button"
      className="wb-btn wj-embed-button"
      data-testid="registration-embed-button-btn"
      data-webinarhash={hash}
      aria-label={`${SAVE_SEAT_LABEL}. Opens the registration form.`}
    >
      {SAVE_SEAT_LABEL}
    </button>
  );
}
