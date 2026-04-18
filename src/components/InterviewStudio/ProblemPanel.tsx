'use client';

import { useState } from 'react';

interface Problem {
  title: string;
  description: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
  topics: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ProblemPanelProps {
  problem: Problem;
  isInterviewMode: boolean;
}

export default function ProblemPanel({ problem, isInterviewMode }: ProblemPanelProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'examples' | 'complexity' | 'tips'>('description');

  return (
    <div className="problem-panel">
      <div className="panel-header">
        <h2>{problem.title}</h2>
        <span className={`difficulty difficulty-${problem.difficulty}`}>
          {problem.difficulty}
        </span>
      </div>

      <div className="panel-tabs">
        <button
          className={`tab ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          📝 Description
        </button>
        <button
          className={`tab ${activeTab === 'examples' ? 'active' : ''}`}
          onClick={() => setActiveTab('examples')}
        >
          📋 Examples
        </button>
        <button
          className={`tab ${activeTab === 'complexity' ? 'active' : ''}`}
          onClick={() => setActiveTab('complexity')}
        >
          📊 Complexity
        </button>
        <button
          className={`tab ${activeTab === 'tips' ? 'active' : ''}`}
          onClick={() => setActiveTab('tips')}
        >
          💡 Tips
        </button>
      </div>

      <div className="panel-content">
        {activeTab === 'description' && (
          <div className="tab-content">
            <h3>Problem Description</h3>
            <p className="description-text">{problem.description}</p>

            <div className="constraints-section">
              <h4>Constraints:</h4>
              <ul className="constraints-list">
                {problem.constraints.map((constraint, idx) => (
                  <li key={idx}>{constraint}</li>
                ))}
              </ul>
            </div>

            {isInterviewMode && (
              <div className="interview-prompt">
                <h4>🎤 Before you code:</h4>
                <p>Take a moment to:</p>
                <ul>
                  <li>Explain the problem in your own words</li>
                  <li>Walk through an example mentally</li>
                  <li>Discuss your approach with the interviewer</li>
                  <li>Identify potential edge cases</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="tab-content">
            <h3>Examples</h3>
            <div className="examples-container">
              {problem.examples.map((example, idx) => (
                <div key={idx} className="example">
                  <div className="example-header">
                    <h4>Example {idx + 1}</h4>
                  </div>
                  <div className="example-code">
                    <div className="code-block">
                      <span className="code-label">Input:</span>
                      <code>{example.input}</code>
                    </div>
                    <div className="code-block">
                      <span className="code-label">Output:</span>
                      <code>{example.output}</code>
                    </div>
                  </div>
                  {example.explanation && (
                    <div className="example-explanation">
                      <span className="code-label">Explanation:</span>
                      <p>{example.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'complexity' && (
          <div className="tab-content">
            <h3>Complexity Analysis</h3>

            {problem.timeComplexity && (
              <div className="complexity-item">
                <h4>⏱️ Time Complexity</h4>
                <code className="complexity-code">{problem.timeComplexity}</code>
              </div>
            )}

            {problem.spaceComplexity && (
              <div className="complexity-item">
                <h4>💾 Space Complexity</h4>
                <code className="complexity-code">{problem.spaceComplexity}</code>
              </div>
            )}

            {isInterviewMode && (
              <div className="interview-prompt">
                <h4>🎤 Discuss with your interviewer:</h4>
                <ul>
                  <li>Why does your solution have this time complexity?</li>
                  <li>Can you optimize the time complexity?</li>
                  <li>What about space complexity? Can it be improved?</li>
                  <li>Are there trade-offs between time and space?</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="tab-content">
            <h3>Interview Tips</h3>
            <div className="tips-container">
              <div className="tip-box">
                <h4>✅ Do's</h4>
                <ul>
                  <li>Think out loud - explain your reasoning</li>
                  <li>Ask clarifying questions</li>
                  <li>Start with a brute force solution</li>
                  <li>Test with edge cases (empty, single element, duplicates)</li>
                  <li>Optimize after your initial solution works</li>
                  <li>Write clean, readable code</li>
                </ul>
              </div>

              <div className="tip-box">
                <h4>❌ Don'ts</h4>
                <ul>
                  <li>Don't code in silence</li>
                  <li>Don't jump to optimization immediately</li>
                  <li>Don't ignore edge cases</li>
                  <li>Don't write overly complex code</li>
                  <li>Don't forget to test your solution</li>
                  <li>Don't rush - take your time</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .problem-panel {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid var(--border-color);
        }

        .panel-header h2 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--text-primary);
        }

        .difficulty {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .difficulty-easy {
          background: rgba(34, 197, 94, 0.2);
          color: var(--accent-green);
        }

        .difficulty-medium {
          background: rgba(234, 179, 8, 0.2);
          color: var(--accent-yellow);
        }

        .difficulty-hard {
          background: rgba(239, 68, 68, 0.2);
          color: var(--accent-red);
        }

        .panel-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          overflow-x: auto;
        }

        .tab {
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          white-space: nowrap;
          border-bottom: 2px solid transparent;
        }

        .tab:hover {
          color: var(--text-primary);
        }

        .tab.active {
          color: var(--accent-blue);
          border-bottom-color: var(--accent-blue);
        }

        .panel-content {
          flex: 1;
          overflow-y: auto;
        }

        .tab-content {
          padding: 1rem 0;
        }

        .tab-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .description-text {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .constraints-section {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .constraints-section h4 {
          margin: 0 0 0.75rem 0;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .constraints-list {
          margin: 0;
          padding-left: 1.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .constraints-list li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .interview-prompt {
          background: rgba(30, 144, 255, 0.1);
          border-left: 4px solid var(--accent-blue);
          padding: 1rem;
          border-radius: 0.5rem;
          margin-top: 1.5rem;
        }

        .interview-prompt h4 {
          margin: 0 0 0.75rem 0;
          color: var(--accent-blue);
          font-size: 0.95rem;
        }

        .interview-prompt p {
          margin: 0 0 0.75rem 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .interview-prompt ul {
          margin: 0;
          padding-left: 1.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .interview-prompt li {
          margin-bottom: 0.5rem;
        }

        .examples-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .example {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          padding: 1rem;
        }

        .example-header {
          margin-bottom: 1rem;
        }

        .example-header h4 {
          margin: 0;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .example-code {
          background: var(--bg-primary);
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }

        .code-block {
          margin-bottom: 1rem;
        }

        .code-block:last-child {
          margin-bottom: 0;
        }

        .code-label {
          display: inline-block;
          font-weight: 600;
          color: var(--accent-blue);
          margin-bottom: 0.25rem;
          font-size: 0.85rem;
        }

        code {
          font-family: 'JetBrains Mono', monospace;
          color: var(--text-primary);
          font-size: 0.85rem;
          background: transparent;
          padding: 0.25rem 0;
          word-break: break-all;
          line-height: 1.4;
          display: block;
        }

        .example-explanation {
          background: rgba(218, 112, 214, 0.1);
          padding: 0.75rem;
          border-radius: 0.5rem;
          border-left: 3px solid var(--accent-purple);
        }

        .example-explanation p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .complexity-item {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: 0.75rem;
          margin-bottom: 1rem;
        }

        .complexity-item h4 {
          margin: 0 0 0.75rem 0;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        .complexity-code {
          background: var(--bg-primary);
          padding: 0.75rem;
          border-radius: 0.5rem;
          display: block;
        }

        .tips-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .tip-box {
          background: var(--bg-secondary);
          padding: 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid var(--border-color);
        }

        .tip-box h4 {
          margin: 0 0 1rem 0;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .tip-box ul {
          margin: 0;
          padding-left: 1.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .tip-box li {
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .panel-tabs {
            gap: 0;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          .tab {
            padding: 0.5rem 0.75rem;
            font-size: 0.85rem;
          }

          .tips-container {
            grid-template-columns: 1fr;
          }

          .panel-header h2 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
