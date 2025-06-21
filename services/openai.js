const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openaiInstance = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  },
});

const chatWithGPT = async (messages) => {
  try {
    const response = await openaiInstance.post('/chat/completions', {
      model: 'gpt-4',
      messages,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI error:', error?.response?.data || error.message);
    throw new Error('Failed to get response from OpenAI');
  }
};

module.exports = { chatWithGPT };
