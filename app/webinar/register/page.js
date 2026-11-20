import { redirect } from 'next/navigation';
import { registerPath } from '../../../lib/webinar';

export default function RegisterIndexPage() {
  redirect(registerPath());
}
