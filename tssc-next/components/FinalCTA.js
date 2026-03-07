// FinalCTA.js
export default function FinalCTA({ data }) {
  const { ctaUrl, ctaText } = data;
  return (
    <section className="final-cta section--dark">
      <div className="container">
        <div className="final-cta__inner">
          <span className="section-label reveal">Ready?</span>
          <h2 className="h-display final-cta__headline reveal">
            The Seat Is Either<br />Yours or Someone Else's.
          </h2>
          <p className="final-cta__body body-text reveal reveal--delay-1">
            Applications are reviewed on a rolling basis. Spots are genuinely limited to maintain the quality of the community.
          </p>
          <div className="final-cta__btn-wrap reveal reveal--delay-2">
            <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--xl">
              Apply Now — It Takes 5 Minutes
            </a>
          </div>
          <p className="final-cta__fine reveal reveal--delay-3">No commitment until you've spoken with our team.</p>
          <div className="final-cta__logo reveal reveal--delay-3">
            <img src="/images/logo-transparent.png" alt="The Serial Sales Community" />
          </div>
        </div>
      </div>
    </section>
  );
}
