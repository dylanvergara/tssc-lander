import Image from 'next/image';
import { headlineJobsTotal } from '../../data/hiringJobs';
import Countdown from './Countdown';
import SaveSeatButton from './SaveSeatButton';
import WebinarJamScript from './WebinarJamScript';

function Check() {
  return (
    <span className="wb-check" aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none">
        <path d="M3.2 8.2 6.4 11.4 12.8 4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function RegisterPage({ webinar, interviewCount, hoursLabel, tenkCount }) {
  const jobsLabel = headlineJobsTotal.toLocaleString('en-US');
  const { quote, name, detail, interviewUrl, interviewLabel } = webinar.testimonial;

  return (
    <>
      <main id="wb-main">
        <section className="wb-hero" aria-labelledby="wb-title">
          <div className="wb-wrap">
            <div className="wb-kicker">
              <p className="wb-eyebrow">
                <span className="wb-eyebrow__live">{webinar.eyebrowLive}</span>
                <span className="wb-eyebrow__night">{webinar.eyebrowNight}</span>
                <span className="wb-eyebrow__when">{webinar.eyebrowWhen}</span>
              </p>
              <Countdown startIso={webinar.startIso} />
            </div>

            <h1 id="wb-title" className="wb-h1">
              <span className="wb-h1__bf">{webinar.h1Kicker}</span>
              <span className="wb-h1__main">{webinar.h1Main}</span>
            </h1>
            <p className="wb-lede">{webinar.lede}</p>

            <ul className="wb-points">
              {webinar.points.map((point) => (
                <li key={point}>
                  <Check />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <p className="wb-urgency">{webinar.urgency}</p>
            <SaveSeatButton hash={webinar.hash} />
            <p className="wb-reassure">{webinar.reassure}</p>
          </div>
        </section>

        <section className="wb-section" aria-labelledby="wb-learn-title">
          <div className="wb-wrap">
            <div className="wb-rule" aria-hidden="true" />
            <h2 id="wb-learn-title" className="wb-h2">{webinar.learnTitle}</h2>
            <ol className="wb-learn">
              {webinar.learn.map((item, index) => (
                <li key={item.title} className="wb-card">
                  <span className="wb-card__num">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="wb-card__title">{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="wb-section" aria-labelledby="wb-proof-title">
          <div className="wb-wrap">
            <div className="wb-rule" aria-hidden="true" />
            <h2 id="wb-proof-title" className="wb-h2">{webinar.proofTitle}</h2>
            <dl className="wb-stats">
              <div className="wb-stat">
                <dd>500+</dd>
                <dt>Reps worked with 1-on-1 or in small groups</dt>
              </div>
              <div className="wb-stat">
                <dd>{tenkCount}</dd>
                <dt>Members on camera who hit $10k+/mo</dt>
              </div>
              <div className="wb-stat">
                <dd>{jobsLabel}</dd>
                <dt>1099 WFH sales gigs sourced over the last 12 months</dt>
              </div>
            </dl>

            <figure className="wb-quote">
              <blockquote>
                <p>&ldquo;{quote}&rdquo;</p>
              </blockquote>
              <figcaption>
                <p className="wb-quote__who">{name}, {detail}</p>
                <a className="wb-quote__link" href={interviewUrl} target="_blank" rel="noopener noreferrer">
                  {interviewLabel}
                  <span className="wb-sr"> (opens in a new tab)</span>
                </a>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="wb-section" aria-labelledby="wb-host-title">
          <div className="wb-wrap">
            <div className="wb-rule" aria-hidden="true" />
            <h2 id="wb-host-title" className="wb-h2">{webinar.hostTitle}</h2>
            <div className="wb-host">
              <div className="wb-host__photo">
                <Image
                  src="/images/dylan-headshot.jpg"
                  alt="Dylan Vergara, founder of The Serial Sales Community"
                  width={256}
                  height={256}
                  sizes="180px"
                  quality={75}
                />
              </div>
              <div className="wb-host__copy">
                <p>
                  I quit a high-paying roofing sales job right out of school to go remote. I rebuilt a six-figure income within 6 months on a part-time schedule. In 2024, not even 2 years into this industry, I made $400k as a sales manager.
                </p>
                <p>
                  I have worked with 500+ reps, 1-on-1 or in small groups. I have hosted 4x sold-out in-person events in Austin. My hiring channel sourced {jobsLabel} 1099 WFH sales gigs over the last 12 months. I have recorded {interviewCount} full-length member interviews, {hoursLabel} hours, including {tenkCount} members on camera who hit $10k+/mo.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="wb-section" aria-labelledby="wb-faq-title">
          <div className="wb-wrap">
            <div className="wb-rule" aria-hidden="true" />
            <h2 id="wb-faq-title" className="wb-h2">{webinar.faqTitle}</h2>
            <div className="wb-faq">
              {webinar.faqs.map((item) => (
                <details key={item.q} className="wb-faq__item">
                  <summary>
                    <span>{item.q}</span>
                    <span className="wb-faq__icon" aria-hidden="true" />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="wb-section wb-final" aria-labelledby="wb-final-title">
          <div className="wb-wrap">
            <div className="wb-rule" aria-hidden="true" />
            <h2 id="wb-final-title" className="wb-h2">{webinar.finalTitle}</h2>
            <p className="wb-final__sub">{webinar.finalSub}</p>
            <SaveSeatButton hash={webinar.hash} />
          </div>
        </section>
      </main>
      <WebinarJamScript hash={webinar.hash} src={webinar.embedSrc} barSrc={webinar.embedBarSrc} />
    </>
  );
}
