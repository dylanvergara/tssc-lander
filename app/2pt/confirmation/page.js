import BeehiivForm from '../../../components/BeehiivForm';

export const metadata = {
  title: "You're subscribed | Two-Piece Tuesday",
  description: 'You are now subscribed to Two-Piece Tuesday.',
  robots: { index: false, follow: false },
};

export default function TwoPTConfirmationPage() {
  return (
    <div className="lm15 lm15--confirm">
      <div className="lm15__inner">
        <header className="lm15__head">
          <div className="lm15__check" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <span className="lm15__eyebrow">You&apos;re In</span>
          <h1 className="lm15__headline">You&apos;re now subscribed to Two-Piece Tuesday</h1>
          <p className="lm15__sub">
            I just sent you an email confirming your subscription. Be sure to move this into your primary
            inbox if it didn&apos;t land there so that all future sales roles/breakdowns I send you land there!
          </p>
          <p className="lm15__sub lm15__sub--note">
            Included in that email is a little bonus for ya, check it out if you&apos;re actively in the market
            and performing DD on roles like this 👍
          </p>
        </header>

        <div className="lm15__media">
          <div className="vsl-glow lm15__media-frame">
            <img src="/images/TWO-PIECE-TUESDAY.png" alt="Two-Piece Tuesday" className="lm15__img" />
          </div>
        </div>

        <BeehiivForm formId="eadf2cfa-487e-4dc2-b023-07a7eecb02b3" className="lm15__form" />

        <p className="lm15__ps">
          <em>PS: if you&apos;d just like to work with me 1-1 and make it easy, check out <a href="http://serialsalescommunity.co?utm_source=lead_mag&utm_medium=organic&utm_campaign=2pt&utm_content=2pt_confirmation_page">TSSC</a>.</em>
        </p>
      </div>
    </div>
  );
}
