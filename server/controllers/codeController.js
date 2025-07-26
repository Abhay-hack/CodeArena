const axios = require('axios');

exports.executeCode = async (req, res) => {
  const { code, input, language } = req.body;

  const langMap = {
    cpp: 54,       // C++ (GCC 9.2.0)
    python: 71,    // Python (3.8.1)
    java: 62       // Java (OpenJDK 13.0.1)
  };

  try {
    const response = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
      source_code: code,
      stdin: input,
      language_id: langMap[language],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
    });

    const token = response.data.token;

    // Wait & fetch result
    const result = await axios.get(
      `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
      }
    );

    res.json({ output: result.data.stdout || result.data.stderr || 'No output' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error executing code' });
  }
};
