// Shared /sqdb chat size limits (used by app/api/chat/route.js and the /sqdb page).
//
// Sized so a pasted ~1 hour sales-call transcript (~40-60k characters) fits in a
// single message, while one request stays far below Vercel's 4.5 MB body limit
// and the Anthropic input cost per turn stays bounded.
export const SQDB_CHAT_LIMITS = {
  // Hard request limits: anything above these is rejected with a 400.
  maxBodyBytes: 512 * 1024,
  maxMessages: 40,
  maxCharsPerMessage: 60000,
  maxTotalChars: 150000,
  // Most of the conversation actually sent to the model (oldest turns are
  // trimmed first). ~100k characters is roughly 25k input tokens per turn.
  maxContextChars: 100000,
};

// Keep only the most recent messages that fit in maxChars / maxMessages. The
// last message is always kept. When anything had to be dropped, the window is
// made to start on a user turn so the conversation stays well-formed.
export function trimConversation(messages, { maxChars, maxMessages }) {
  if (!messages.length) return messages;
  let start = messages.length - 1;
  let total = messages[start].content.length;
  while (start > 0 && messages.length - start < maxMessages) {
    const next = total + messages[start - 1].content.length;
    if (next > maxChars) break;
    total = next;
    start -= 1;
  }
  if (start === 0) return messages;
  let window = messages.slice(start);
  while (window.length > 1 && window[0].role !== 'user') window = window.slice(1);
  return window;
}
