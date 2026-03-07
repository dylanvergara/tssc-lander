'use client';
import { useState } from 'react';

export default function FAQ({ data }) {
  const { faq } = data;
  const [open, setOpen] = useState(null);

  return (
    <section className="section">
      <div className="page-col">
        <h2 className="faq__headline reveal">Common Questions</h2>
        {faq.map(item => (
          <div key={item.id} className={`faq__item reveal${open === item.id ? ' is-open' : ''}`}>
            <button
              className="faq__question"
              aria-expanded={open === item.id}
              onClick={() => setOpen(open === item.id ? null : item.id)}
            >
              <span>{item.q}</span>
              <span className="faq__icon">+</span>
            </button>
            <div className="faq__answer">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
