export const metadata = {
  title: "You're in — check your inbox | The Serial Sales Community",
  description: 'Your 15 Hour Free Training is on the way — check your inbox.',
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
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
          <h1 className="lm15__headline">The training should be in your email inbox now!</h1>
          <p className="lm15__sub">
            I just sent you an email with the 15 Hour Free Training links. Open it to get started.
            If it&apos;s not there in a minute or two, check your spam or promotions folder.
          </p>
          <p className="lm15__sub lm15__sub--note">
            If it&apos;s in spam/promo, do me a solid and move it to your main inbox so that Google knows you like my emails 👍
          </p>
        </header>

        <div className="lm15__media">
          <div className="vsl-glow lm15__media-frame">
            <img src="/images/15-hr-training-cover.jpg?v=2" alt="The 15 Hour Free Training — Parts 1 and 2 curriculum" className="lm15__img" />
          </div>
        </div>

        <p className="lm15__ps">
          <em>PS: if you&apos;d just like to work with me 1-1 and make it easy, check out <a href="http://serialsalescommunity.co?utm_source=lead_mag&utm_medium=organic&utm_campaign=15_hr_training&utm_content=training_confirmation_page">TSSC</a>.</em>
        </p>
      </div>
    </div>
  );
}
