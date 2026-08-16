export const metadata = {
  title: "You're in, confirm your subscription | Two-Piece Tuesday",
  description: 'Check your inbox to confirm your Two-Piece Tuesday subscription.',
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
          <h1 className="lm15__headline">Check your inbox to confirm your subscription</h1>
          <p className="lm15__sub">
            One quick step and you&apos;re set. Confirm your email, and every Tuesday I&apos;ll send you fresh
            remote sales roles straight to your inbox. If you don&apos;t see it in a minute or two, check your
            spam or promotions folder.
          </p>
          <p className="lm15__sub lm15__sub--note">
            If it&apos;s in spam/promo, do me a solid and move it to your main inbox so that Google knows you like my emails 👍
          </p>
        </header>

        <div className="lm15__media">
          <div className="vsl-glow lm15__media-frame">
            <img src="/images/TWO-PIECE-TUESDAY.png" alt="Two-Piece Tuesday" className="lm15__img" />
          </div>
        </div>

        <p className="lm15__ps">
          <em>PS: if you&apos;d just like to work with me 1-1 and make it easy, check out <a href="http://serialsalescommunity.co?utm_source=lead_mag&utm_medium=organic&utm_campaign=2pt&utm_content=2pt_confirmation_page">TSSC</a>.</em>
        </p>
      </div>
    </div>
  );
}
