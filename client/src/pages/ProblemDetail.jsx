import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import api, { runCode as runCodeAPI, getProblemById } from '../utils/api';

const languageOptions = {
  cpp: {
    label: 'C++',
    extension: cpp,
    file: 'cpp.cpp',
  },
  python: {
    label: 'Python',
    extension: python,
    file: 'python.py',
  },
  java: {
    label: 'Java',
    extension: java,
    file: 'java.java',
  },
  javascript: {
    label: 'JavaScript',
    extension: javascript,
    file: 'javascript.js',
  },
};

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('cpp');

  const fetchCode = async (langKey) => {
    const lang = languageOptions[langKey];
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/Abhay-hack/codearena-code-templates/main/problem-${id}/${lang.file}`
      );
      const text = await response.text();
      setCode(text);
    } catch (err) {
      setCode('// Code template not available');
    }
  };

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await getProblemById(id);
        setProblem(res.data);
      } catch (err) {
        console.error('Failed to fetch problem:', err);
      }
    };

    fetchProblem();
  }, [id]);

  useEffect(() => {
    if (id && language) fetchCode(language);
  }, [id, language]);

  // ✅ FIXED: This must be inside the component
  const handleRunCode = async () => {
    setLoading(true);
    try {
      const res = await runCodeAPI({ code, input, language });
      setOutput(res.output || res.error || 'No output');
    } catch (err) {
      setOutput('Execution failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!problem) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{problem.title}</h1>
      <p className="mt-4">{problem.description}</p>

      <div className="mt-4 bg-gray-800 p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Sample Input</h3>
        <pre className="bg-gray-400 p-2 rounded text-sm border">{problem.sampleInput || 'N/A'}</pre>

        <h3 className="text-lg font-semibold mt-4 mb-2">Sample Output</h3>
        <pre className="bg-gray-400 p-2 rounded text-sm border">{problem.sampleOutput || 'N/A'}</pre>
      </div>

      {/* Language Switcher */}
      <div className="mt-6 mb-2">
        <label className="block font-semibold mb-1">Choose Language:</label>
        <select
          className="bg-gray-800 text-white p-2 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {Object.entries(languageOptions).map(([key, lang]) => (
            <option key={key} value={key}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <CodeMirror
        value={code}
        height="300px"
        extensions={[languageOptions[language].extension()]}
        onChange={(value) => setCode(value)}
      />

      <div className="mt-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter custom input"
          className="w-full p-2 border rounded"
        />

        <button onClick={handleRunCode} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Running...' : 'Run Code'}
        </button>

        <div className="mt-4">
          <h3 className="font-bold">Output:</h3>
          <pre className="bg-gray-400 p-2 border rounded whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
