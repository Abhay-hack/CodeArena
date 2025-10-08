const axios = require('axios');

exports.executeCode = async (req, res) => {
  const { code, input, language } = req.body;

  // Map internal language names to Judge0 language IDs
  const langMap = {
    cpp: 54,       // C++ (GCC 9.2.0)
    python: 71,    // Python (3.8.1)
    java: 62,      // Java (OpenJDK 13.0.1)
    javascript: 63,
    cpu_time_limit: 5, // seconds
  };

  const languageId = langMap[language];

  if (!languageId) {
    return res.status(400).json({ error: 'Unsupported language provided.' });
  }

  try {
    // Step 1: Submit code to Judge0
    const submissionResponse = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
      source_code: code,
      stdin: input,
      language_id: languageId,
      memory_limit: 262144, // KB (256MB)
      // Add other Judge0 parameters if needed, e.g., cpu_time_limit, memory_limit
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPID_API_KEY, // Ensure this env variable is set
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
      },
      params: {
        base64_encoded: 'false', // Ensure output is not base64 encoded
        wait: 'true', // Wait for the result directly
      }
    });

    // If wait=true is used, the response directly contains the result
    const resultData = submissionResponse.data;

    // Check for compilation errors (compile_output) or runtime errors (stderr)
    if (resultData.compile_output) {
      return res.json({ error: `Compilation Error:\n${resultData.compile_output}` });
    }
    if (resultData.stderr) {
      return res.json({ error: `Runtime Error:\n${resultData.stderr}` });
    }
    if (resultData.status && resultData.status.description !== 'Accepted') {
      return res.json({ error: `Execution Status: ${resultData.status.description}\n${resultData.stdout || resultData.stderr || ''}` });
    }

    // Return stdout if execution was successful
    res.json({ output: resultData.stdout || 'No output' });

  } catch (error) {
    console.error('Error communicating with Judge0 API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error executing code. Please check your RapidAPI key and network connection.' });
  }
};
