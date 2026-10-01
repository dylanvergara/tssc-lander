import { siteData } from '../data/content.js';
import ShortHero from '../components/ShortHero';
import Footer    from '../components/Footer';
import { fetchPlaylistStats, tenkCountOf, withTenkInterviewCopy } from '../lib/playlist-stats';

export const revalidate = 600;

export default async function Home() {
  const stats = await fetchPlaylistStats({ revalidate: 600 });
  const tenkCount = tenkCountOf(stats);
  const d = withTenkInterviewCopy(siteData, tenkCount);
  return (
    <>
      <main>
        <ShortHero data={d} tenkCount={tenkCount} />
      </main>
      <Footer data={d} />
    </>
  );
}
