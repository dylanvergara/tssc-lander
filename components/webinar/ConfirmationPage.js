import Image from 'next/image';
import {
  googleCalendarUrl,
  linkedInShareUrl,
  outlookCalendarUrl,
  calendarPath,
  registerUrl,
  senderEmailIsPlaceholder,
  senderEmailLabel,
  xShareUrl,
} from '../../lib/webinar';
import CompleteRegistration from './CompleteRegistration';
import CopyLinkButton from './CopyLinkButton';
import RegistrationDetails, { JoinLink } from './RegistrationDetails';
import ThankYouVideo from './ThankYouVideo';

export default function ConfirmationPage({ webinar }) {
  const email = senderEmailLabel();
  const emailIsPlaceholder = senderEmailIsPlaceholder();
  const shareUrl = registerUrl(webinar.slug);

  return (
    <>
      <CompleteRegistration />
      <main id="wb-main">
        <section className="wb-confirm" aria-labelledby="wb-watch-title">
          <div className="wb-wrap wb-watch">
            <div className="wb-confirm__check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <RegistrationDetails line={webinar.confirmLine} when={webinar.confirmWhen} />
            <h1 id="wb-watch-title" className="wb-confirm__title">{webinar.watchHeadline}</h1>
            {webinar.thankYouVideoId ? (
              <ThankYouVideo mediaId={webinar.thankYouVideoId} />
            ) : (
              <div id="ty-video" className="wb-video">
                {/* PASTE THANK-YOU VIDEO EMBED HERE */}
                <div className="wb-video__frame wb-video__frame--lead" role="note">
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
            )}
            <div className="wb-cal wb-cal--quiet" role="group" aria-label="Add to Calendar">
              <a className="wb-cal__link" href={googleCalendarUrl(webinar)} target="_blank" rel="noopener noreferrer">
                Add to Calendar
                <span className="wb-sr"> with Google Calendar</span>
              </a>
              <a className="wb-cal__link" href={outlookCalendarUrl(webinar)} target="_blank" rel="noopener noreferrer">
                Outlook
              </a>
              <a className="wb-cal__link" href={calendarPath(webinar.slug)}>
                .ics
              </a>
            </div>
            <JoinLink />
          </div>
        </section>

        <section className="wb-next" aria-labelledby="wb-next-title">
          <div className="wb-wrap">
            <h2 id="wb-next-title" className="wb-next__title">{webinar.stepsTitle}</h2>
            <ul className="wb-next__list">
              {webinar.steps.map((step) => (
                <li key={step.title}>
                  <p className="wb-next__label">{step.title}</p>
                  {step.title === 'Whitelist this email address' ? (
                    <p>
                      Add{' '}
                      {emailIsPlaceholder ? (
                        <strong className="wb-email wb-email--ph">{email}</strong>
                      ) : (
                        <a className="wb-email" href={`mailto:${email}`}>{email}</a>
                      )}
                      {' '}to your contacts so the join link stays out of spam.
                    </p>
                  ) : (
                    <p>{step.body}</p>
                  )}
                </li>
              ))}
            </ul>
            <p className="wb-shareline">
              Know someone who needs this?{' '}
              <a href={xShareUrl(webinar)} target="_blank" rel="noopener noreferrer">
                X<span className="wb-sr"> (opens in a new tab)</span>
              </a>
              <span aria-hidden="true"> · </span>
              <a href={linkedInShareUrl(webinar)} target="_blank" rel="noopener noreferrer">
                LinkedIn<span className="wb-sr"> (opens in a new tab)</span>
              </a>
              <span aria-hidden="true"> · </span>
              <CopyLinkButton url={shareUrl} className="wb-shareline__btn" />
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
