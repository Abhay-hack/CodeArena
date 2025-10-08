import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';

// For LaTeX rendering
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import parse from 'html-react-parser'; // For parsing HTML strings into React elements

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const runCodeAPI = async ({ code, input, language }) => {
  const response = await fetch(`${API_BASE_URL}/api/judge/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code, input, language }),
  });
  return response.json();
};

const fetchCodeforcesProblem = async (contestId, index) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/codeforces/${contestId}/${index}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Codeforces fetch failed:", err);
    return { error: `Failed to fetch problem details: ${err.message}` };
  }
};

const languageOptions = {
  cpp: {
    label: 'C++',
    extension: cpp(),   // ✅ call once here
    file: 'cpp.cpp',
  },
  python: {
    label: 'Python',
    extension: python(),
    file: 'python.py',
  },
  java: {
    label: 'Java',
    extension: java(),
    file: 'java.java',
  },
  javascript: {
    label: 'JavaScript',
    extension: javascript(),
    file: 'javascript.js',
  },
};


const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState(localStorage.getItem(`problem_input_${id}`) || '');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('cpp');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const fetchCode = useCallback(async (langKey) => {
    const lang = languageOptions[langKey];
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/Abhay-hack/codearena-code-templates/main/${lang.file}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      setCode(text);
      localStorage.setItem(`problem_code_${id}_${langKey}`, text);
    } catch (err) {
      console.error("Failed to load code template:", err);
      setCode('// Code template not available or failed to load. Please write your code here.');
    }
  }, [id]);
  
  useEffect(() => {
    const fetchProblem = async () => {
      const [contestIdStr, index] = id.split("-");
      const contestId = parseInt(contestIdStr, 10);
      if (isNaN(contestId)) {
        console.error("Invalid contestId:", contestIdStr);
        setProblem({ title: "Problem Not Found", description: "Invalid problem ID format." });
        return;
      }
      const problemData = await fetchCodeforcesProblem(contestId, index);
      if (problemData && !problemData.error) {
        // --- START: MODIFIED cleanSample logic ---
        const cleanAndFormatSample = (text) => {
  if (!text) return '';
  return text
    .replace(/\r\n/g, '\n')
    .replace(/([0-9]+ [0-9]+)(?=\d)/g, '$1\n') // inject newline after test case headers
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim();
};

        problemData.sampleInput = cleanAndFormatSample(problemData.sampleInput);
        problemData.sampleOutput = cleanAndFormatSample(problemData.sampleOutput);
        // --- END: MODIFIED cleanSample logic ---
        setProblem(problemData);
      }
      else {
        setProblem({ title: "Error Loading Problem", description: problemData.error || "Could not fetch problem details." });
      }
    };
    fetchProblem();
  }, [id]);

  useEffect(() => {
    const savedCode = localStorage.getItem(`problem_code_${id}_${language}`);
    if (savedCode) {
      setCode(savedCode);
    } else {
      fetchCode(language);
    }
  }, [language, id, fetchCode]);

  useEffect(() => {
    localStorage.setItem(`problem_code_${id}_${language}`, code);
  }, [code, id, language]);

  useEffect(() => {
    localStorage.setItem(`problem_input_${id}`, input);
  }, [input, id]);


  const handleRunCode = async () => {
    setLoading(true);
    setOutput('');
    setSubmissionStatus(null);
    try {
      const res = await runCodeAPI({ code, input, language });
      if (res?.output) {
        setOutput(res.output);
      } else if (res?.error) {
        setOutput(`Error:\n${res.error}`);
      } else {
        setOutput('⚠️ No output received. Check your code or try again.');
      }
    } catch (err) {
      console.error('Code execution error:', err);
      setOutput('❌ Execution failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmissionStatus(null);
    setOutput('');
    try {
      const res = await runCodeAPI({ code, input: problem.sampleInput || '', language });
      if (res?.output && res.output.trim() === (problem.sampleOutput || '').trim()) {
        setSubmissionStatus('Accepted!');
        setOutput(`Sample Test Passed:\n${res.output}`);
      } else if (res?.output) {
        setSubmissionStatus('Wrong Answer on Sample Test');
        setOutput(`Your Output:\n${res.output}\n\nExpected Output:\n${problem.sampleOutput || 'N/A'}`);
      } else if (res?.error) {
        setSubmissionStatus('Compilation/Runtime Error');
        setOutput(`Error:\n${res.error}`);
      } else {
        setSubmissionStatus('Submission Failed');
        setOutput('Could not get submission result.');
      }
    } catch (err) {
      console.error('Code submission error:', err);
      setSubmissionStatus('Submission Failed');
      setOutput('❌ Submission failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!problem) {
    return (
      <div className="p-6 bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading problem details...</p>
      </div>
    );
  }

  const renderRichText = (htmlString) => {
    return parse(htmlString, {
      replace: (domNode) => {
        if (domNode.type === 'text') {
          let text = domNode.data;
          const elements = [];
          let lastIndex = 0;

          // Regex to find inline math: $$$...$$$
          // Inline: $...$ , Block: $$...$$
          const inlineMathRegex = /\$(.+?)\$/g;
          let match;

          while ((match = inlineMathRegex.exec(text)) !== null) {
            if (match.index > lastIndex) {
              elements.push(text.substring(lastIndex, match.index));
            }
            try {
              elements.push(<InlineMath key={match.index} math={match[2].trim()} />);
            } catch (error) {
              console.error("KaTeX inline rendering error:", error);
              elements.push(<span key={match.index} className="text-red-400">[Math Error: {match[2].trim()}]</span>);
            }
            lastIndex = inlineMathRegex.lastIndex;
          }

          if (lastIndex < text.length) {
            elements.push(text.substring(lastIndex));
          }
          return <>{elements}</>;
        }
        return domNode;
      },
    });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen font-inter">
      <h1 className="text-4xl font-extrabold mb-4 text-blue-400">{problem.title}</h1>

      {/* Problem Description */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200 border-b border-gray-700 pb-2">Problem Description</h2>
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg">
          {problem.description ? (
          <div className="space-y-6">
            {/* Extract and render structured sections */}
            {(() => {
              const $ = document.createElement('div');
              $.innerHTML = problem.description;
            
              const sections = [];
              let currentSection = { title: 'Description', content: '' };
            
              for (const node of $.childNodes) {
                const tag = node.nodeName.toLowerCase();
              
                if (tag === 'div' && node.className?.includes('input-specification')) {
                  sections.push(currentSection);
                  currentSection = { title: 'Input', content: node.innerHTML };
                } else if (tag === 'div' && node.className?.includes('output-specification')) {
                  sections.push(currentSection);
                  currentSection = { title: 'Output', content: node.innerHTML };
                } else if (tag === 'div' && node.className?.includes('note')) {
                  sections.push(currentSection);
                  currentSection = { title: 'Note', content: node.innerHTML };
                } else {
                  currentSection.content += node.outerHTML || '';
                }
              }
              sections.push(currentSection);
            
              return sections.map((sec, idx) => (
                <div key={idx}>
                  <h3 className="text-xl font-bold mb-2 text-blue-400">{sec.title}</h3>
                  <div className="prose prose-invert text-gray-300">
                    {renderRichText(sec.content)}
                  </div>
                </div>
              ));
            })()}
          </div>
          ) : (
          <p className="text-gray-400 italic">No description provided.</p>
          )}
        </div>
      </div>

      {/* Sample Input/Output */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-200 border-b border-gray-700 pb-2">Sample Tests</h3>
        <div className="mb-4">
          <h4 className="text-xl font-medium mb-2 text-gray-300">Sample Input</h4>
          <pre className="bg-gray-700 p-4 rounded-md text-sm text-gray-100 border border-gray-600 overflow-auto whitespace-pre-wrap">
            {problem.sampleInput || 'No sample input provided.'}
          </pre>
        </div>
        <div>
          <h4 className="text-xl font-medium mb-2 text-gray-300">Sample Output</h4>
          <pre className="bg-gray-700 p-4 rounded-md text-sm text-gray-100 border border-gray-600 overflow-auto whitespace-pre-wrap">
            {problem.sampleOutput || 'No sample output provided.'}
          </pre>
        </div>
      </div>

      {/* Language Selector */}
      <div className="mt-6 mb-4 flex items-center">
        <label htmlFor="language-select" className="block font-semibold mr-3 text-lg text-gray-200">Choose Language:</label>
        <select
          id="language-select"
          className="bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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

      {/* Code Editor */}
      <div className="mb-6 border border-gray-700 rounded-lg overflow-hidden shadow-lg">
        <CodeMirror
          value={code}
          height="400px"
          extensions={[languageOptions[language].extension]}   // ✅ Correct
          onChange={(value) => setCode(value)}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
            foldGutter: true,
            syntaxHighlighting: true,
          }}
          theme="dark"
          style={{
            fontSize: '15px',
            fontFamily: 'monospace',
          }}
        />
      </div>

      {/* Custom Input, Run, and Submit Buttons */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 text-gray-200 border-b border-gray-700 pb-2">Code Execution</h3>
        <div className="mb-4">
          <h4 className="text-xl font-medium mb-2 text-gray-300">Custom Input (Optional)</h4>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter custom input here to test your code locally"
            rows="6"
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y font-mono"
          />
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={handleRunCode}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Running...
              </>
            ) : 'Run Code'}
          </button>

          <button
            onClick={handleSubmitCode}
            className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Submitting...
              </>
            ) : 'Submit Code'}
          </button>
        </div>

        {/* Output Area */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-3 text-gray-200">Output:</h4>
          {submissionStatus && (
            <p className={`text-lg font-bold mb-2 ${submissionStatus.includes('Accepted') ? 'text-green-400' : 'text-red-400'}`}>
              Status: {submissionStatus}
            </p>
          )}
          <pre className="bg-gray-700 p-4 rounded-md border border-gray-600 text-gray-100 whitespace-pre-wrap break-words overflow-auto min-h-[120px] font-mono">
            {output || (loading ? 'Awaiting output...' : 'Output will appear here.')}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;