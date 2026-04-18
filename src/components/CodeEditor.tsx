'use client';

import { useState, useCallback } from 'react';
import { highlightCode, colorThemes } from '@/utils/syntaxHighlighter';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  showExecute?: boolean;
  questionText?: string;
}

const codeExamples: Record<string, string> = {
  javascript: `// Write your solution here
function solution() {
  console.log("Hello, World!");
}

solution();`,
  python: `# Write your solution here
def solution():
    print("Hello, World!")

solution()`,
  java: `public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
};

export default function CodeEditor({
  initialCode = '',
  language = 'javascript',
  onCodeChange,
  showExecute = true,
  questionText,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode || codeExamples[language] || codeExamples['java'] || '');
  const [selectedLanguage, setSelectedLanguage] = useState(language || 'java');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    setCode(codeExamples[newLanguage] || '');
    setOutput('');
    setError('');
  };

  const handleExecute = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code first');
      setShowOutput(true);
      return;
    }

    setLoading(true);
    setError('');
    setOutput('Executing...');
    setShowOutput(true);

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguage,
          code: code.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || result.message || 'Execution failed');
        setOutput('');
        return;
      }

      // Handle the response
      if (result.error || result.statusId > 3) {
        // There's a compile or runtime error
        const errorMsg = result.error || result.message || `Execution error: ${result.status}`;
        setError(errorMsg);
        setOutput(result.output || '');
      } else {
        // Successful execution
        setOutput(result.output ? result.output.trim() : '(No output)');
        setError('');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(`Error: ${errorMsg}`);
      setOutput('');
    } finally {
      setLoading(false);
    }
  }, [code, selectedLanguage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '\t' + code.substring(end);
      setCode(newCode);

      // Move cursor after the tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const resetCode = () => {
    setCode(codeExamples[selectedLanguage] || '');
    setOutput('');
    setError('');
    setShowOutput(false);
  };

  return (
    <div className="code-editor-container">
      {questionText && (
        <div className="question-display">
          <h3>Problem Statement:</h3>
          <p>{questionText}</p>
        </div>
      )}

      <div className="editor-toolbar">
        <div className="language-selector">
          <label htmlFor="language-select">Language:</label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="language-dropdown"
          >
            {Object.keys(codeExamples).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {showExecute && (
          <div className="action-buttons">
            <button
              className="btn btn-primary"
              onClick={handleExecute}
              disabled={loading}
            >
              {loading ? 'Running...' : 'Run Code'}
            </button>
            <button className="btn btn-secondary" onClick={copyCode}>
              Copy
            </button>
            <button className="btn btn-secondary" onClick={resetCode}>
              Reset
            </button>
          </div>
        )}
      </div>

      <div className="editor-content">
        <div className="code-editor-wrapper">
          <pre className="code-highlight">
            {highlightCode(code, selectedLanguage).map((token, idx) => (
              <span
                key={idx}
                style={{ color: colorThemes[selectedLanguage][token.type] || colorThemes[selectedLanguage].default }}
              >
                {token.value}
              </span>
            ))}
          </pre>
          <textarea
            className="code-textarea"
            value={code}
            onChange={handleCodeChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter your code here..."
            spellCheck="false"
          />
        </div>
      </div>

      {showExecute && showOutput && (
        <div className="output-section">
          <div className="output-header">
            <h4>Output:</h4>
            <button
              className="close-btn"
              onClick={() => setShowOutput(false)}
            >
              ✕
            </button>
          </div>
          {error ? (
            <div className="output-error">
              <pre>{error}</pre>
            </div>
          ) : (
            <div className="output-success">
              <pre>{output}</pre>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .code-editor-container {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: #f9f9f9;
          margin: 20px 0;
        }

        .question-display {
          background: #f0f7ff;
          border-bottom: 1px solid #ddd;
          padding: 15px;
          font-size: 14px;
          line-height: 1.6;
        }

        .question-display h3 {
          margin: 0 0 10px 0;
          color: #0066cc;
        }

        .question-display p {
          margin: 0;
          color: #333;
        }

        .editor-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          background: #f0f0f0;
          border-bottom: 1px solid #ddd;
          flex-wrap: wrap;
          gap: 10px;
        }

        .language-selector {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .language-selector label {
          font-weight: 600;
          color: #333;
        }

        .language-dropdown {
          padding: 6px 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          background: white;
          cursor: pointer;
          min-width: 120px;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          font-size: 13px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #0066cc;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background: #0052a3;
        }

        .btn-primary:disabled {
          background: #999;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #e8e8e8;
          color: #333;
        }

        .btn-secondary:hover {
          background: #d0d0d0;
        }

        .editor-content {
          position: relative;
          min-height: 300px;
        }

        .code-editor-wrapper {
          position: relative;
          display: flex;
          width: 100%;
          height: 300px;
          overflow: hidden;
          border: none;
          background: white;
        }

        .code-highlight {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0;
          padding: 12px;
          background: white;
          color: #333;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
          word-wrap: break-word;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .code-textarea {
          flex: 1;
          position: relative;
          width: 100%;
          height: 100%;
          padding: 12px;
          border: none;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.5;
          resize: vertical;
          background: transparent;
          color: transparent;
          caret-color: #0066cc;
          z-index: 2;
          outline: none;
        }

        .code-textarea:focus {
          outline: 2px solid #0066cc;
          outline-offset: -2px;
        }

        .output-section {
          border-top: 1px solid #ddd;
          background: #f5f5f5;
          max-height: 300px;
          overflow-y: auto;
        }

        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 15px;
          background: #e8e8e8;
          border-bottom: 1px solid #ddd;
        }

        .output-header h4 {
          margin: 0;
          font-size: 14px;
          color: #333;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #666;
          padding: 0;
        }

        .close-btn:hover {
          color: #000;
        }

        .output-error,
        .output-success {
          padding: 12px 15px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;
          font-size: 13px;
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .output-error {
          background: #ffe6e6;
          color: #c00;
        }

        .output-error pre {
          margin: 0;
          color: #c00;
        }

        .output-success {
          background: white;
          color: #333;
        }

        .output-success pre {
          margin: 0;
          color: #333;
        }

        @media (max-width: 768px) {
          .editor-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .language-selector {
            width: 100%;
          }

          .action-buttons {
            width: 100%;
          }

          .action-buttons .btn {
            flex: 1;
          }

          .code-textarea {
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
}
