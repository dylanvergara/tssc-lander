'use client';
import { useState } from 'react';

export default function FAQ({ data }) {
  const { faq } = data;
  const [open, setOpen] = useState(null);
  return (
    <section className="section">
      <div className="col">
        <span className="eyebrow eyebrow--light reveal">FAQ</span>
        <h2 className="headline headline--white reveal">Common Questions</h2>
        <div className="faq-list">
          {faq.map(item => (
            <div key={item.id} className={`faq-item reveal${open === item.id ? ' is-open' : ''}`}>
              <button
                className="faq-question"
                aria-expanded={open === item.id}
                onClick={() => setOpen(open === item.id ? null : item.id)}
              >
                <span>{item.q}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer"><p>{item.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
