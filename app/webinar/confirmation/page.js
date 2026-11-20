import ConfirmationPage from '../../../components/webinar/ConfirmationPage';
import { getCurrentWebinar } from '../../../lib/webinar';

export function generateMetadata() {
  const webinar = getCurrentWebinar();
  return {
    title: webinar.confirmTitle,
    description: webinar.confirmDescription,
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <ConfirmationPage />;
}
