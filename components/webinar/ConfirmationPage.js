import Image from 'next/image';
import {
  LIVE_ROOM_CAP,
  PRIMER_VIDEO_LABEL,
  PRIMER_VIDEO_URL,
  getCurrentWebinar,
  googleCalendarUrl,
  linkedInShareUrl,
  outlookCalendarUrl,
  registerUrl,
  senderEmailIsPlaceholder,
  senderEmailLabel,
  xShareUrl,
} from '../../lib/webinar';
import CompleteRegistration from './CompleteRegistration';
import CopyLinkButton from './CopyLinkButton';

export default function ConfirmationPage() {
  const webinar = getCurrentWebinar();
  const email = senderEmailLabel();
  const emailIsPlaceholder = senderEmailIsPlaceholder();
  const shareUrl = registerUrl(webinar.slug);

  return (
    <>
      <CompleteRegistration />
      <main id="wb-main">
        <section className="wb-hero wb-hero--confirm" aria-labelledby="wb-confirm-title">
          <div className="wb-wrap">
            <div className="wb-checkring" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <p className="wb-eyebrow">
              <span className="wb-eyebrow__live">{webinar.confirmEyebrow}</span>
              <span className="wb-eyebrow__when">{webinar.eyebrowWhen}</span>
            </p>
            <h1 id="wb-confirm-title" className="wb-h1">{webinar.confirmH1}</h1>
            <p className="wb-lede">{webinar.confirmLede}</p>

            <div className="wb-cal" role="group" aria-label="Add to Calendar">
              <a className="wb-btn" href={googleCalendarUrl(webinar)} target="_blank" rel="noopener noreferrer">
                Add to Calendar
                <span className="wb-sr"> with Google Calendar</span>
              </a>
              <div className="wb-cal__pair">
                <a className="wb-btn wb-btn--ghost" href={outlookCalendarUrl(webinar)} target="_blank" rel="noopener noreferrer">
                  Outlook
                </a>
                <a className="wb-btn wb-btn--ghost" href="/webinar/calendar.ics">
                  Download .ics
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="wb-section wb-section--video" aria-label="Thank-you video">
          <div className="wb-wrap">
            <div id="ty-video" className="wb-video">
              {/* PASTE THANK-YOU VIDEO EMBED HERE */}
              <div className="wb-video__frame" role="note">
                <Image
                  src="/images/dylan-headshot.jpg"
                  alt=""
                  width={256}
                  height={256}
                  sizes="(max-width: 800px) 100vw, 720px"
                  quality={60}
                  loading="lazy"
                  aria-hidden="true"
                />
                <div className="wb-video__shade">
                  <span className="wb-chip">Placeholder</span>
                  <span className="wb-video__play" aria-hidden="true" />
                  <p>Paste the thank&#8209;you video embed here</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="wb-section" aria-labelledby="wb-steps-title">
          <div className="wb-wrap">
            <div className="wb-rule" aria-hidden="true" />
            <h2 id="wb-steps-title" className="wb-h2">{webinar.stepsTitle}</h2>
            <ol className="wb-steps">
              {webinar.steps.map((step, index) => (
                <li key={step.title} className="wb-card">
                  <span className="wb-card__num">{index + 1}</span>
                  <h3 className="wb-card__title">{step.title}</h3>
                  {index === 0 ? (
                    <p>
                      Your join link and reminders come from{' '}
                      <strong className={emailIsPlaceholder ? 'wb-email wb-email--ph' : 'wb-email'}>{email}</strong>
                      {emailIsPlaceholder ? <span className="wb-chip wb-chip--inline">Placeholder</span> : null}
                      . Add it to your contacts or drag our first email to Primary so nothing lands in spam at 7:58 PM.
                    </p>
                  ) : (
                    <p>{step.body}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="wb-section" aria-labelledby="wb-primer-title">
          <div className="wb-wrap">
            <div className="wb-rule" aria-hidden="true" />
            <h2 id="wb-primer-title" className="wb-h2">{webinar.primerTitle}</h2>
            <p className="wb-lede wb-lede--left">{webinar.primerBody}</p>
            <a className="wb-btn wb-btn--ghost" href={PRIMER_VIDEO_URL} target="_blank" rel="noopener noreferrer">
              {PRIMER_VIDEO_LABEL}
              <span className="wb-sr"> (opens in a new tab)</span>
            </a>
          </div>
        </section>

        <section className="wb-section" aria-labelledby="wb-share-title">
          <div className="wb-wrap">
            <div className="wb-rule" aria-hidden="true" />
            <h2 id="wb-share-title" className="wb-h2">{webinar.shareTitle}</h2>
            <p className="wb-lede">
              {webinar.shareLead}{LIVE_ROOM_CAP ? ` ${LIVE_ROOM_CAP}` : ''}
            </p>
            <div className="wb-share">
              <a className="wb-share__btn" href={xShareUrl(webinar)} target="_blank" rel="noopener noreferrer">
                X<span className="wb-sr"> (opens in a new tab)</span>
              </a>
              <a className="wb-share__btn" href={linkedInShareUrl(webinar)} target="_blank" rel="noopener noreferrer">
                LinkedIn<span className="wb-sr"> (opens in a new tab)</span>
              </a>
              <CopyLinkButton url={shareUrl} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
