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

  const handleReset = () => {
    setCode(codeTemplates[language] || '');
    setOutput('');
    setError('');
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
        </div>
        {error ? (
          <pre className="output-content error">{error}</pre>
        ) : (
          <pre className="output-content">{output || 'Run your code to see output...'}</pre>
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
            max-height: 150px;
          }

          .code-textarea {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
