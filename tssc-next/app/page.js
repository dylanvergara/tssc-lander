import { siteData } from '../data/content.js';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import Mission from '../components/Mission';
import About from '../components/About';
import WhoItsFor from '../components/WhoItsFor';
import Process from '../components/Process';
import Results from '../components/Results';
import TestimonialVideos from '../components/TestimonialVideos';
import ProofWall from '../components/ProofWall';
import Team from '../components/Team';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Nav data={siteData} />
      <main>
        <Hero data={siteData} />
        <StatsBar data={siteData} />
        <Mission data={siteData} />
        <About data={siteData} />
        <WhoItsFor data={siteData} />
        <Process data={siteData} />
        <Results data={siteData} />
        <TestimonialVideos data={siteData} />
        <ProofWall data={siteData} />
        <Team data={siteData} />
        <FAQ data={siteData} />
        <FinalCTA data={siteData} />
      </main>
      <Footer data={siteData} />
    </>
  );
}
