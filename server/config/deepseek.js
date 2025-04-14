const OpenAI = require('openai')
require('dotenv').config()

module.exports = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY
});