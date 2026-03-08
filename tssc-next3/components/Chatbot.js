'use client';
import { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `You are a knowledgeable TSSC community guide. You answer questions about The Serial Sales Community as if you were a successful member who has been through the program.

Key facts about TSSC:
- Founded by Dylan Vergara, based in Austin TX, community started in 2022
- Focuses on 1099 remote sales roles (closing and setting) for online businesses
- 6-month program with 1-1 calls with Dylan and CSM support
- Record: 966 open roles posted in a single month
- Typical timeline to first role: 3-5 weeks
- Results range from $3k-$40k+/mo depending on experience and role
- Everything is hosted in School (one platform)
- Daily job postings from real companies
- No pyramid schemes, MLM, or licensing
- Annual in-person meetup in Austin TX
- TSSC Trophies awarded at $10k, $20k, $30k/mo milestones
- Guarantee: 60 days to have an offer extended matching or exceeding investment, if you follow the 5-step criteria
- Zero chargebacks and zero refunds from last 100 high-ticket clients
- Payment plans available, as low as $147/month

Be conversational, direct, and honest. Keep answers concise (2-4 sentences). Don't overpromise. If asked about pricing, say it's covered on the booking call. If asked something you're unsure about, suggest they book a call.`;

export default function Chatbot({ ctaUrl }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hey! I can answer questions about TSSC — results, process, what to expect. What do you want to know?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages(m => [...m, { role: 'user', text }]);
    setLoading(true);

    try {
      const history = messages
        .filter(m => m.role !== 'bot' || messages.indexOf(m) > 0)
        .map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: [...history, { role: 'user', content: text }],
        }),
      });

      const data = await res.json();
      const reply = data?.content?.[0]?.text || "I'm not sure about that one — best to book a call with the team.";
      setMessages(m => [...m, { role: 'bot', text: reply }]);
    } catch {
      setMessages(m => [...m, { role: 'bot', text: "Something went wrong on my end. Try asking again or book a call." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chatbot-wrap">
      <button
        className={`chatbot-toggle${open ? ' is-open' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <div className="chatbot-toggle__icon">💬</div>
        <div className="chatbot-toggle__text">
          <span className="chatbot-toggle__label">Talk to successful community members now</span>
          <span className="chatbot-toggle__sub">Get answers about TSSC instantly</span>
        </div>
        <span className="chatbot-toggle__arrow">⌄</span>
      </button>

      <div className={`chatbot-body${open ? ' is-open' : ''}`}>
        <div className="chatbot-inner">
          <div className="chatbot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg--${m.role === 'user' ? 'user' : 'bot'}`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="chat-msg chat-msg--bot chat-msg--typing">typing…</div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="chatbot-form">
            <input
              className="chatbot-input"
              type="text"
              placeholder="Ask anything about TSSC…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
            />
            <button className="chatbot-send" onClick={send} disabled={loading || !input.trim()} aria-label="Send">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
