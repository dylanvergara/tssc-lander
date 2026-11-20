import './webinar.css';
import Footer from '../../components/Footer';
import { siteData } from '../../data/content';

export const metadata = {
  metadataBase: new URL('https://www.serialsalescommunity.co'),
};

export default function WebinarLayout({ children }) {
  return (
    <div className="wb">
      <a className="wb-skip" href="#wb-main">Skip to content</a>
      <header className="wb-nav">
        <img
          src="/images/logo-white-bg.png"
          alt="The Serial Sales Community"
          width="48"
          height="48"
          className="wb-nav__logo"
        />
      </header>
      {children}
      <Footer data={siteData} />
    </div>
  );
}
