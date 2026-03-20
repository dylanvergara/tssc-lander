import { siteData } from '../data/content.js';
import ShortHero from '../components/ShortHero';
import ShortMain from '../components/ShortMain';
import Footer    from '../components/Footer';

export default function Home() {
  const d = siteData;
  return (
    <>
      <main>
        <ShortHero data={d} />
        <ShortMain data={d} />
      </main>
      <Footer data={d} />
    </>
  );
}
