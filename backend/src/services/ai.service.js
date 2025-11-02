const axios = require('axios');

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const AI_MODEL = process.env.AI_MODEL || 'gpt-4o-mini';
const AI_MAX_TOKENS = parseInt(process.env.AI_MAX_TOKENS || '512', 10);

if (!OPENAI_KEY) {
  console.warn('OPENAI_API_KEY not set. AI endpoints will fail until set.');
}

async function generateAssistantReply(prompt, opts = {}) {
  if (!OPENAI_KEY) throw new Error('Missing OPENAI_API_KEY');

  // Simple safety: limit prompt length
  if (typeof prompt !== 'string' || prompt.trim().length === 0) {
    throw new Error('Empty prompt');
  }

  // Use chat completions style if you prefer; this example uses "completions" for simplicity.
  const body = {
    model: AI_MODEL,
    prompt: prompt,
    max_tokens: opts.maxTokens || AI_MAX_TOKENS,
    temperature: typeof opts.temperature === 'number' ? opts.temperature : 0.2,
    n: 1,
    // you can add stop sequences or other params here
  };

  const res = await axios.post('https://api.openai.com/v1/completions', body, {
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json'
    },
    timeout: 30_000
  });

  if (!res.data || !res.data.choices || !res.data.choices[0]) {
    throw new Error('Invalid AI response');
  }

  // trim and return text
  return String(res.data.choices[0].text || '').trim();
}

// If later you want streaming, implement streaming endpoints or SSE here.

module.exports = { generateAssistantReply };
