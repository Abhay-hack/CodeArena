import axios from 'axios';

// Base URL from .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const languageMap = {
  cpp: 54,
  python: 71,
  java: 62,
  javascript: 63,
};

export const runCode = async ({ code, input, language }) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/judge`, {
      code,
      language_id: languageMap[language],
      stdin: input,
    });
    return { output: response.data.stdout || response.data.stderr || response.data.compile_output };
  } catch (error) {
    console.error('API Error:', error);
    return { error: 'Failed to execute code' };
  }
};

export const getProblemById = async (id) => {
  return axios.get(`${BASE_URL}/api/problem/${id}`);
};

export default { runCode, getProblemById };
