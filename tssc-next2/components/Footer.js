export default function Footer({ data }) {
  const { ctaUrl, ctaText } = data;
  return (
    <footer className="footer">
      <img src="/images/logo-white-bg.png" alt="The Serial Sales Community" className="footer__logo" />
      <p className="footer__copy">© {new Date().getFullYear()} The Serial Sales Community. All rights reserved.</p>
      <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="footer__cta">
        {ctaText}
      </a>
    </footer>
  );
}
