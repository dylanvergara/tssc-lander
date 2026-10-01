import { siteData } from '../../data/content.js';
import Header        from '../../components/Header';
import ThankYouHero  from '../../components/ThankYouHero';
import Disclaimer    from '../../components/Disclaimer';
import StatBar       from '../../components/StatBar';
import VideoCarousel from '../../components/VideoCarousel';
import About         from '../../components/About';
import Process       from '../../components/Process';
import Differentiator from '../../components/Differentiator';
import Mission       from '../../components/Mission';
import ProofWall     from '../../components/ProofWall';
import Wins          from '../../components/Wins';
import Events        from '../../components/Events';
import OurTeam       from '../../components/OurTeam';
import Longevity     from '../../components/Longevity';
import FAQ           from '../../components/FAQ';
import SocialFooter  from '../../components/SocialFooter';
import Footer        from '../../components/Footer';
import { fetchPlaylistStats, tenkCountOf, withTenkInterviewCopy } from '../../lib/playlist-stats';

export const revalidate = 600;

export default async function ThankYou() {
  const stats = await fetchPlaylistStats({ revalidate: 600 });
  const tenkCount = tenkCountOf(stats);
  const d = withTenkInterviewCopy(siteData, tenkCount);
  // Pass hideCta=true to suppress all Apply Now buttons
  const noCtaData = { ...d, ctaUrl: null };
  return (
    <>
      <Header data={d} />
      <main className="thank-you-page">
        <div className="above-fold">
          <div id="hero">      <ThankYouHero /></div>
          <StatBar />
        </div>
        <div>                  <Disclaimer      data={d} /></div>
        <div id="carousel-1">  <VideoCarousel   data={d} carouselIndex={0} tenkCount={tenkCount} /></div>
        <div id="about">       <About           data={noCtaData} /></div>
        <div id="process">     <Process         data={d} /></div>
        <div id="carousel-2">  <VideoCarousel   data={d} carouselIndex={1} tenkCount={tenkCount} /></div>
        <div id="differentiator"><Differentiator data={noCtaData} /></div>
        <div id="proof">       <ProofWall       data={d} /></div>
        <div id="mission">     <Mission         data={noCtaData} /></div>
        <div id="carousel-3">  <VideoCarousel   data={d} carouselIndex={2} tenkCount={tenkCount} /></div>
        <div id="wins">        <Wins            data={noCtaData} /></div>
        <div id="events">      <Events          data={d} /></div>
        <div id="team">        <OurTeam /></div>
        <div id="longevity">   <Longevity       data={noCtaData} /></div>
        <div id="carousel-4">  <VideoCarousel   data={d} carouselIndex={3} tenkCount={tenkCount} /></div>
        <div id="faq">         <FAQ             data={d} /></div>
      </main>
      <SocialFooter />
      <Footer data={d} />
    </>
  );
}
