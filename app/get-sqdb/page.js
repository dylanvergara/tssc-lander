import GetSqdbPage from './GetSqdbPage';
import { fetchPlaylistStats, tenkCountOf } from '../../lib/playlist-stats';

export default async function Page() {
  const stats = await fetchPlaylistStats();
  return <GetSqdbPage tenkCount={tenkCountOf(stats)} />;
}
