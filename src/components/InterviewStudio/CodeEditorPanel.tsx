'use client';

import { useState, useCallback } from 'react';

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

const codeTemplates: Record<string, string> = {
  javascript: `// Write your solution here
function solve() {
  console.log("Hello");
}

solve();`,
  python: `# Write your solution here
def solve():
    print("Hello")

solve()`,
  java: `public class Solution {
  public static void main(String[] args) {
    System.out.println("Hello");
  }
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello" << endl;
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello\\n");
    return 0;
}`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello")
}`,
  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello");
    }
}`,
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
  const [error, setError] = useState('');
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; message: string }>>([]);

  const handleRunCode = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code first');
      setOutput('');
      return;
    }

    setIsRunning(true);
    setError('');
    setOutput('Executing...');

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: language,
          code: code.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Execution failed');
        setOutput('');
        return;
      }

      if (data.error) {
        setError(data.error);
        setOutput('');
      } else {
        setOutput(data.output || '(No output)');
        setError('');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(`Error: ${errorMsg}`);
      setOutput('');
    } finally {
      setIsRunning(false);
    }
  }, [code, language, setIsRunning, setOutput]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(codeTemplates[newLanguage] || '');
    setOutput('');
    setError('');
  };

  const handleRunTestCases = useCallback(async () => {
    setIsRunning(true);
    setTestResults([]);
    setError('');
    setOutput('Running test cases...');

    try {
      const results = [];
      for (let i = 0; i < problem.examples.length; i++) {
        const example = problem.examples[i];

        const response = await fetch('/api/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: language,
            code: code.trim(),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          results.push({
            passed: false,
            message: `Test ${i + 1}: Error - ${data.error || 'Execution failed'}`,
          });
          continue;
        }

        const result = (data.output || '').trim();
        const expected = example.output.trim();
        const passed = result === expected;

        results.push({
          passed,
          message: `Test ${i + 1}: Input: ${example.input} | Expected: ${expected} | Got: ${result}`,
        });
      }

      setTestResults(results);
      const passedCount = results.filter((r) => r.passed).length;
      setOutput(`✅ Test Results: ${passedCount}/${results.length} passed`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(`Error: ${errorMsg}`);
      setOutput('');
    } finally {
      setIsRunning(false);
    }
  }, [code, language, problem.examples, setIsRunning]);

  const handleReset = () => {
    setCode(codeTemplates[language] || '');
    setOutput('');
    setError('');
    setTestResults([]);
  };

  return (
    <div className="code-editor-panel">
      <div className="editor-header">
        <div className="language-selector">
          <label>Language:</label>
          <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
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
              {testResults.filter((r) => r.passed).length}/{testResults.length} passed
            </span>
          )}
        </div>
        {error ? (
          <pre className="output-content error">{error}</pre>
        ) : (
          <pre className="output-content">{output || 'Run your code to see output...'}</pre>
        )}

        {testResults.length > 0 && (
          <div className="test-results">
            <h4>Test Case Results:</h4>
            <div className="results-list">
              {testResults.map((result, idx) => (
                <div
                  key={idx}
                  className={`test-result ${result.passed ? 'passed' : 'failed'}`}
                >
                  <span className="test-icon">{result.passed ? '✅' : '❌'}</span>
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

        .language-selector select:focus {
          outline: none;
          border-color: var(--accent-blue);
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
          background: #10b981;
          color: white;
        }

        .btn-test:hover:not(:disabled) {
          background: #059669;
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
          min-height: 0;
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
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
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
          max-height: 200px;
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

        .output-content.error {
          color: var(--accent-red);
          background: rgba(255, 107, 107, 0.05);
        }

        .test-summary {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          background: rgba(34, 197, 94, 0.2);
          color: var(--accent-green);
          border-radius: 9999px;
          font-weight: 600;
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
          flex: 1;
        }

        @media (max-width: 768px) {
          .code-editor-panel {
            height: auto;
          }

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
            max-height: 150px;
          }

          .code-textarea {
            font-size: 0.85rem;
            min-height: 300px;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </div>
  );
}
