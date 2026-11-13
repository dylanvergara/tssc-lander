import { srotdHand, srotdSans } from '../../lib/srotd/fonts';
import SrotdSignup from './SrotdSignup';

const FACTS = [
  ['Role', 'role'],
  ['Niche', 'niche'],
  ['OTE', 'ote'],
  ['Source', 'source'],
];

export default function SrotdLander({ role, utm }) {
  const photo = role.backgroundImage;

  return (
    <main className={`srotd${photo ? ' srotd--photo' : ''} ${srotdHand.variable} ${srotdSans.variable}`}>
      <div className="srotd__bg" aria-hidden="true">
        {photo ? (
          <div className="srotd__photo" style={{ backgroundImage: `url("${photo}")` }} />
        ) : null}
        <div className="srotd__shade" />
        <div className="srotd__grain" />
      </div>

      <div className="srotd__panel">
        <p className="srotd__kicker">sales role of the day:</p>

        <dl className="srotd__facts">
          {FACTS.map(([label, key]) => (
            <div className="srotd__fact" key={key}>
              <dt className="srotd__chip">{label}</dt>
              <dd className="srotd__value">{role[key]}</dd>
            </div>
          ))}
        </dl>

        <ul className="srotd__highlights">
          {role.highlights.map((item) => (
            <li className="srotd__highlight" key={item}>{item}</li>
          ))}
        </ul>

        <div className="srotd__ask">
          <h1 className="srotd__headline">{role.headline}</h1>
          <p className="srotd__disclaimer">{role.disclaimer}</p>
          <SrotdSignup utm={utm} />
        </div>
      </div>
    </main>
  );
}
