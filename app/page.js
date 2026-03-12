import { siteData } from '../data/content.js';
import Header           from '../components/Header';
import Hero             from '../components/Hero';
import Disclaimer       from '../components/Disclaimer';
import StatBar          from '../components/StatBar';
import VideoCarousel    from '../components/VideoCarousel';
import About            from '../components/About';
import Process          from '../components/Process';
import Differentiator   from '../components/Differentiator';
import Mission          from '../components/Mission';
import ProofWall        from '../components/ProofWall';
import Wins             from '../components/Wins';
import Events           from '../components/Events';
import OurTeam          from '../components/OurTeam';
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
        <div id="hero">        <Hero            data={d} /></div>
        <StatBar />
        <div>                  <Disclaimer      data={d} /></div>
        <div id="carousel-1">  <VideoCarousel   data={d} carouselIndex={0} /></div>
        <div id="about">       <About           data={d} /></div>
        <div id="process">     <Process         data={d} /></div>
        <div id="carousel-2">  <VideoCarousel   data={d} carouselIndex={1} /></div>
        <div id="differentiator"><Differentiator data={d} /></div>
        <div id="proof">       <ProofWall       data={d} /></div>
        <div id="mission">     <Mission         data={d} /></div>
        <div id="carousel-3">  <VideoCarousel   data={d} carouselIndex={2} /></div>
        <div id="wins">        <Wins            data={d} /></div>
        <div id="events">      <Events          data={d} /></div>
        <div id="team">        <OurTeam /></div>
        <div id="longevity">   <Longevity       data={d} /></div>
        <div id="carousel-4">  <VideoCarousel   data={d} carouselIndex={3} /></div>
        <div id="faq">         <FAQ             data={d} /></div>
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
