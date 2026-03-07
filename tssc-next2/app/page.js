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
        {/* First carousel after disclaimer */}
        <VideoCarousel   data={d} carouselIndex={0} />
        <About           data={d} />
        <Process         data={d} />
        {/* Second carousel mid-page */}
        <VideoCarousel   data={d} carouselIndex={1} />
        <Differentiator  data={d} />
        <Mission         data={d} />
        <ProofWall       data={d} />
        {/* Third carousel near proof */}
        <VideoCarousel   data={d} carouselIndex={2} />
        <Wins            data={d} />
        <Events          data={d} />
        <Longevity       data={d} />
        <FAQ             data={d} />
        <FinalCTA        data={d} />
      </main>
      <Footer data={d} />
    </>
  );
}
