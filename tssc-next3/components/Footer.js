export default function Footer({ data }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="col">
        <img src="/images/logo-white-bg.png" alt="The Serial Sales Community" className="footer__logo" />
        <p className="footer__tagline">The Serial Sales Community &copy; {year}. All rights reserved.</p>

        {/* Fix 11: Privacy & Terms links */}
        <div className="footer__links">
          <a href="/privacy-policy" className="footer__link">Privacy Policy</a>
          <span className="footer__sep">·</span>
          <a href="/terms" className="footer__link">Terms &amp; Conditions</a>
        </div>

        {/* Fix 11: FTC earnings disclaimer */}
        <p className="footer__disclaimer">
          <strong>Earnings Disclaimer:</strong> Results mentioned on this page are not typical and are not a guarantee of future performance. Individual results will vary based on experience, effort, and market conditions. The income claims shared by members of The Serial Sales Community represent exceptional results and should not be interpreted as average or expected outcomes. This is not a get-rich-quick program. Success in 1099 remote sales roles requires consistent effort, skill development, and personal accountability. All testimonials and case studies are real and shared with permission. Nothing on this page constitutes financial, legal, or employment advice. By engaging with this website you acknowledge that The Serial Sales Community is not responsible for your individual results.
        </p>
        <p className="footer__disclaimer" style={{ marginTop: '8px' }}>
          The Serial Sales Community is not a job placement agency. We provide education, community, job board access, and coaching resources. Any income references are illustrative of what members have achieved and not a representation of what any individual will earn.
        </p>
      </div>
    </footer>
  );
}
