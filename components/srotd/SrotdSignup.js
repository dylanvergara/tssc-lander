'use client';

import { useState } from 'react';
import { enrollSrotdAction } from '../../app/srotd/actions';
import { SROTD_COPY, validateSrotdSignup } from '../../lib/srotd/signup-fields';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

export default function SrotdSignup({ keyword, utm }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    if (pending) return;

    const form = new FormData(event.currentTarget);
    const input = {
      firstName: form.get('firstName'),
      lastName: form.get('lastName'),
      phone: form.get('phone'),
      email: form.get('email'),
    };
    const checked = validateSrotdSignup(input);
    if (!checked.ok) {
      setError(checked.message);
      return;
    }

    setPending(true);
    setError('');
    try {
      const result = await enrollSrotdAction({
        keyword,
        ...input,
        utm: Object.fromEntries(UTM_KEYS.map((key) => [key, form.get(key) || ''])),
      });
      if (result?.ok) {
        window.location.assign('/srotd/confirmation');
        return;
      }
      setError(result?.message || SROTD_COPY.retry);
      setPending(false);
    } catch {
      setError(SROTD_COPY.retry);
      setPending(false);
    }
  }

  return (
    <form className="srotd__form" onSubmit={onSubmit} noValidate>
      {UTM_KEYS.map((key) => (
        <input key={key} type="hidden" name={key} value={utm?.[key] || ''} />
      ))}
      <div className="srotd__fields">
        <div className="srotd__names">
          <label className="srotd__label">
            <span className="srotd__sr">First name</span>
            <input className="srotd__input" name="firstName" type="text" autoComplete="given-name" placeholder="First name" aria-label="First name" required disabled={pending} />
          </label>
          <label className="srotd__label">
            <span className="srotd__sr">Last name</span>
            <input className="srotd__input" name="lastName" type="text" autoComplete="family-name" placeholder="Last name" aria-label="Last name" required disabled={pending} />
          </label>
        </div>
        <label className="srotd__label">
          <span className="srotd__sr">Phone</span>
          <input className="srotd__input" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Phone" aria-label="Phone" required disabled={pending} />
        </label>
        <label className="srotd__label">
          <span className="srotd__sr">Email</span>
          <input className="srotd__input" name="email" type="email" inputMode="email" autoComplete="email" placeholder="Email" aria-label="Email" required disabled={pending} />
        </label>
        {error ? <p className="srotd__error" role="alert">{error}</p> : null}
        <button className="srotd__submit" type="submit" disabled={pending} aria-busy={pending}>
          {pending ? 'Getting the info together for you…' : 'Get access to this sales role now!'}
        </button>
      </div>
    </form>
  );
}
