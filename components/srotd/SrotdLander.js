import Image from 'next/image';
import SrotdSignup from './SrotdSignup';

const HEADING = 'Get the full breakdown + how to apply.';
const NOTE = 'As shared with me, perform your own due diligence upon inquiry.';

export default function SrotdLander({ role }) {
  return (
    <main className="srotd">
      <div className="srotd__column">
        <Image
          className="srotd__hero"
          src={role.heroImage}
          alt="Sales role of the day"
          width={1080}
          height={1080}
          priority
          quality={90}
          sizes="(max-width: 900px) calc(100vw - 32px), 440px"
        />
        <div className="srotd__copy">
          <h1 className="srotd__headline">{HEADING}</h1>
          <p className="srotd__note">{NOTE}</p>
        </div>
        <SrotdSignup />
      </div>
    </main>
  );
}
