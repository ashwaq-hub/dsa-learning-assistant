'use client';

import { useState } from 'react';
import CodeEditor from '@/components/CodeEditor';

export default function CodeEditorPage() {
  return (
    <div className="container code-editor-page">
      <div className="page-header">
        <h1>Code Compiler</h1>
        <p className="subtitle">Write, test, and execute code in multiple programming languages</p>
      </div>

      <div className="editor-section">
        <CodeEditor />
      </div>

      <div className="info-section">
        <h2>Supported Languages</h2>
        <div className="language-grid">
          <div className="language-item">
            <span className="lang-icon">🟨</span>
            <span>JavaScript</span>
          </div>
          <div className="language-item">
            <span className="lang-icon">🐍</span>
            <span>Python</span>
          </div>
          <div className="language-item">
            <span className="lang-icon">☕</span>
            <span>Java</span>
          </div>
          <div className="language-item">
            <span className="lang-icon">🐹</span>
            <span>Go</span>
          </div>
          <div className="language-item">
            <span className="lang-icon">⚙️</span>
            <span>C</span>
          </div>
          <div className="language-item">
            <span className="lang-icon">➕</span>
            <span>C++</span>
          </div>
          <div className="language-item">
            <span className="lang-icon">🔷</span>
            <span>C#</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .code-editor-page {
          padding: 2rem 0;
          min-height: calc(100vh - 200px);
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-header h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .editor-section {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 3rem;
          box-shadow: 0 4px 6px var(--color-shadow);
        }

        .info-section {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 2rem;
        }

        .info-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .language-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
        }

        .language-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          text-align: center;
          transition: all 0.2s;
          cursor: default;
        }

        .language-item:hover {
          border-color: var(--accent-blue);
          transform: translateY(-2px);
        }

        .lang-icon {
          font-size: 2rem;
          display: inline-block;
        }

        .language-item span:last-child {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .code-editor-page {
            padding: 1rem 0;
          }

          .page-header h1 {
            font-size: 1.875rem;
          }

          .editor-section {
            padding: 1.5rem;
            margin-bottom: 2rem;
          }

          .info-section {
            padding: 1.5rem;
          }

          .info-section h2 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
          }

          .language-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 0.75rem;
          }

          .language-item {
            padding: 1rem 0.75rem;
          }

          .lang-icon {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
