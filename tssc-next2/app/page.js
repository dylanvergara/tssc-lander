import { siteData } from '../data/content.js';
import Header      from '../components/Header';
import Hero        from '../components/Hero';
import Disclaimer  from '../components/Disclaimer';
import VideoGrid   from '../components/VideoGrid';
import About       from '../components/About';
import Differentiator from '../components/Differentiator';
import Mission     from '../components/Mission';
import ProofWall   from '../components/ProofWall';
import Wins        from '../components/Wins';
import Longevity   from '../components/Longevity';
import FAQ         from '../components/FAQ';
import FinalCTA    from '../components/FinalCTA';
import Footer      from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header data={siteData} />
      <main>
        <Hero         data={siteData} />
        <Disclaimer   data={siteData} />
        <VideoGrid    data={siteData} />
        <About        data={siteData} />
        <Differentiator data={siteData} />
        <Mission      data={siteData} />
        <ProofWall    data={siteData} />
        <Wins         data={siteData} />
        <Longevity    data={siteData} />
        <FAQ          data={siteData} />
        <FinalCTA     data={siteData} />
      </main>
      <Footer data={siteData} />
    </>
  );
}
