import { siteData } from '../data/content.js';
import ShortHero from '../components/ShortHero';
import Footer    from '../components/Footer';

export default function Home() {
  const d = siteData;
  return (
    <>
      <main>
        <ShortHero data={d} />
      </main>
      <Footer data={d} />
    </>
  );
}
