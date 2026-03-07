export default function Footer({ data }) {
  const { ctaUrl, ctaText } = data;
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <img src="/images/logo-white-bg.png" alt="The Serial Sales Community" className="footer__logo" />
          <p className="footer__copy">© {year} The Serial Sales Community. All rights reserved.</p>
          <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">
            {ctaText}
          </a>
        </div>
      </div>
    </footer>
  );
}
