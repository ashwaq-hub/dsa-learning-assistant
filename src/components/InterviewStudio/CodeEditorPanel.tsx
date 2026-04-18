'use client';

import { useState } from 'react';

interface Problem {
  title: string;
  description: string;
  examples: Array<{ input: string; output: string }>;
  constraints: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
  topics: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

interface CodeEditorPanelProps {
  problem: Problem;
  code: string;
  setCode: (code: string) => void;
  output: string;
  setOutput: (output: string) => void;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
}

const LANGUAGE_MAP: Record<string, string> = {
  'javascript': '63',
  'python': '71',
  'java': '62',
  'cpp': '54',
  'c': '50',
  'go': '60',
  'csharp': '51',
};

export default function CodeEditorPanel({
  problem,
  code,
  setCode,
  output,
  setOutput,
  isRunning,
  setIsRunning,
}: CodeEditorPanelProps) {
  const [language, setLanguage] = useState('javascript');
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; message: string }>>([]);

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language: LANGUAGE_MAP[language] || '63',
        }),
      });

      const data = await response.json();
      setOutput(data.stdout || data.stderr || 'No output');
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunTestCases = async () => {
    setIsRunning(true);
    setTestResults([]);
    try {
      const results = [];
      for (const example of problem.examples) {
        const testCode = code.includes('function')
          ? code + `\nconsole.log(${example.input});`
          : code + `\nprint(${example.input})`;

        const response = await fetch('/api/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: testCode,
            language: LANGUAGE_MAP[language] || '63',
          }),
        });

        const data = await response.json();
        const result = data.stdout?.trim() || '';
        const expected = example.output;
        const passed = result === expected;

        results.push({
          passed,
          message: `Test: ${example.input} → Expected: ${expected}, Got: ${result}`,
        });
      }
      setTestResults(results);
      const passedCount = results.filter(r => r.passed).length;
      setOutput(`Test Results: ${passedCount}/${results.length} passed`);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode('');
    setOutput('');
    setTestResults([]);
  };

  return (
    <div className="code-editor-panel">
      <div className="editor-header">
        <div className="language-selector">
          <label>Language:</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="go">Go</option>
            <option value="csharp">C#</option>
          </select>
        </div>

        <div className="editor-actions">
          <button
            className="btn btn-run"
            onClick={handleRunCode}
            disabled={isRunning}
          >
            {isRunning ? '⏳ Running...' : '▶️ Run Code'}
          </button>
          <button
            className="btn btn-test"
            onClick={handleRunTestCases}
            disabled={isRunning}
          >
            {isRunning ? '⏳ Testing...' : '✅ Run Tests'}
          </button>
          <button className="btn btn-reset" onClick={handleReset}>
            🔄 Reset
          </button>
        </div>
      </div>

      <textarea
        className="code-textarea"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your code here..."
        spellCheck="false"
      />

      <div className="output-section">
        <div className="output-header">
          <h3>Output</h3>
          {testResults.length > 0 && (
            <span className="test-summary">
              {testResults.filter(r => r.passed).length}/{testResults.length} passed
            </span>
          )}
        </div>
        <pre className="output-content">
          {output || 'Run your code to see output...'}
        </pre>

        {testResults.length > 0 && (
          <div className="test-results">
            <h4>Test Case Results:</h4>
            <div className="results-list">
              {testResults.map((result, idx) => (
                <div
                  key={idx}
                  className={`test-result ${result.passed ? 'passed' : 'failed'}`}
                >
                  <span className="test-icon">
                    {result.passed ? '✅' : '❌'}
                  </span>
                  <span className="test-message">{result.message}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .code-editor-panel {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 1rem;
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .language-selector {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .language-selector label {
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .language-selector select {
          padding: 0.5rem 0.75rem;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          border-radius: 0.375rem;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .editor-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .btn-run {
          background: var(--accent-green);
          color: white;
        }

        .btn-run:hover:not(:disabled) {
          background: #22c55e;
          transform: scale(1.02);
        }

        .btn-test {
          background: var(--accent-blue);
          color: white;
        }

        .btn-test:hover:not(:disabled) {
          background: #2563eb;
          transform: scale(1.02);
        }

        .btn-reset {
          background: var(--bg-card);
          color: var(--text-secondary);
        }

        .btn-reset:hover {
          background: var(--border-color);
          color: var(--text-primary);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .code-textarea {
          flex: 1;
          padding: 1rem;
          background: var(--bg-primary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9rem;
          resize: none;
          line-height: 1.6;
          tab-size: 2;
        }

        .code-textarea::placeholder {
          color: var(--text-tertiary);
        }

        .code-textarea:focus {
          outline: none;
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px rgba(30, 144, 255, 0.1);
        }

        .output-section {
          display: flex;
          flex-direction: column;
          max-height: 250px;
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .output-header h3 {
          margin: 0;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .test-summary {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          background: rgba(34, 197, 94, 0.2);
          color: var(--accent-green);
          border-radius: 9999px;
          font-weight: 600;
        }

        .output-content {
          flex: 1;
          margin: 0;
          padding: 1rem;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.85rem;
          overflow-y: auto;
          white-space: pre-wrap;
          word-wrap: break-word;
          line-height: 1.5;
        }

        .test-results {
          background: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          padding: 0.75rem 1rem;
          max-height: 150px;
          overflow-y: auto;
        }

        .test-results h4 {
          margin: 0 0 0.75rem 0;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .test-result {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: 0.375rem;
          font-size: 0.8rem;
        }

        .test-result.passed {
          background: rgba(34, 197, 94, 0.1);
          color: var(--accent-green);
        }

        .test-result.failed {
          background: rgba(239, 68, 68, 0.1);
          color: var(--accent-red);
        }

        .test-icon {
          flex-shrink: 0;
          font-size: 0.9rem;
        }

        .test-message {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.2;
        }

        @media (max-width: 768px) {
          .editor-header {
            flex-direction: column;
            align-items: stretch;
          }

          .language-selector {
            width: 100%;
          }

          .editor-actions {
            width: 100%;
          }

          .btn {
            flex: 1;
            min-width: 0;
          }

          .output-section {
            max-height: 200px;
          }

          .code-textarea {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
