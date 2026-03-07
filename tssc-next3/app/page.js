import { siteData } from '../data/content.js';
import Header           from '../components/Header';
import Hero             from '../components/Hero';
import Disclaimer       from '../components/Disclaimer';
import VideoCarousel    from '../components/VideoCarousel';
import About            from '../components/About';
import Process          from '../components/Process';
import Differentiator   from '../components/Differentiator';
import Mission          from '../components/Mission';
import ProofWall        from '../components/ProofWall';
import Wins             from '../components/Wins';
import Events           from '../components/Events';
import Longevity        from '../components/Longevity';
import FAQ              from '../components/FAQ';
import Chatbot          from '../components/Chatbot';
import FinalCTA         from '../components/FinalCTA';
import Footer           from '../components/Footer';

export default function Home() {
  const d = siteData;
  return (
    <>
      <Header data={d} />
      <main>
        <Hero            data={d} />
        <Disclaimer      data={d} />
        <VideoCarousel   data={d} carouselIndex={0} />
        <About           data={d} />
        <Process         data={d} />
        <VideoCarousel   data={d} carouselIndex={1} />
        <Differentiator  data={d} />
        <Mission         data={d} />
        <ProofWall       data={d} />
        <VideoCarousel   data={d} carouselIndex={2} />
        <Wins            data={d} />
        <Events          data={d} />
        <Longevity       data={d} />
        <FAQ             data={d} />
        {/* Fix 15: Chatbot below FAQ */}
        <section className="section">
          <div className="col">
            <Chatbot ctaUrl={d.ctaUrl} />
          </div>
        </section>
        <FinalCTA        data={d} />
      </main>
      <Footer data={d} />
    </>
  );
}
