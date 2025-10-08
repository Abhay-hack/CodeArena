const axios = require('axios');
require('dotenv').config();

const headers = {
  'Content-Type': 'application/json',
  'x-rapidapi-host': process.env.RAPIDAPI_HOST,
  'x-rapidapi-key': process.env.RAPIDAPI_KEY
};

async function submitCode(code, language_id, stdin) {
  const submission = {
    source_code: code,
    language_id,
    stdin
  };

  const { data } = await axios.post(process.env.JUDGE0_API, submission, { headers });
  const token = data.token;

  // Polling until execution completes
  let result;
  while (true) {
    result = await axios.get(`${process.env.JUDGE0_API}/${token}`, { headers });
    if (result.data.status.id >= 3) break;
    await new Promise(resolve => setTimeout(resolve, 1000)); // delay to avoid rate limit
  }

  return result.data;
}

module.exports = { submitCode };
