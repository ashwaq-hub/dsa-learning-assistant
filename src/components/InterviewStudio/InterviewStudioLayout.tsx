'use client';

import { useState, useEffect } from 'react';
import ProblemPanel from './ProblemPanel';
import CodeEditorPanel from './CodeEditorPanel';
import InterviewTimer from './InterviewTimer';
import { problems as defaultProblems } from '@/data/interviewProblems';

export default function InterviewStudioLayout() {
  const [problems, setProblems] = useState(defaultProblems);
  const [currentProblemIdx, setCurrentProblemIdx] = useState(0);
  const [isInterviewMode, setIsInterviewMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Load custom problems from localStorage
  useEffect(() => {
    try {
      const customProblems = localStorage.getItem('interviewProblems');
      if (customProblems) {
        const parsed = JSON.parse(customProblems);
        // Combine default and custom problems
        setProblems([...defaultProblems, ...parsed]);
      }
    } catch (error) {
      console.error('Failed to load custom problems:', error);
    }
  }, []);

  const currentProblem = problems[currentProblemIdx] || problems[0];

  const handleStartInterview = (difficulty: 'easy' | 'medium' | 'hard') => {
    const timeMap = { easy: 20 * 60, medium: 45 * 60, hard: 60 * 60 };
    setTimeLeft(timeMap[difficulty]);
    setIsInterviewMode(true);
    setCode(currentProblem.starterCode || '');
  };

  const handleEndInterview = () => {
    setIsInterviewMode(false);
    setTimeLeft(0);
  };

  const handleNextProblem = () => {
    if (currentProblemIdx < problems.length - 1) {
      setCurrentProblemIdx(currentProblemIdx + 1);
      setCode('');
      setOutput('');
    }
  };

  const handlePrevProblem = () => {
    if (currentProblemIdx > 0) {
      setCurrentProblemIdx(currentProblemIdx - 1);
      setCode('');
      setOutput('');
    }
  };

  return (
    <div className="interview-studio">
      {isInterviewMode ? (
        <>
          <div className="studio-header">
            <div className="studio-title">
              <h1>Live Interview: {currentProblem.title}</h1>
            </div>
            <InterviewTimer
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              onTimeEnd={handleEndInterview}
            />
            <button
              className="btn-end-interview"
              onClick={handleEndInterview}
            >
              End Interview
            </button>
          </div>

          <div className="studio-container">
            <div className="studio-pane problem-pane">
              <ProblemPanel
                problem={currentProblem}
                isInterviewMode={true}
              />
            </div>

            <div className="studio-divider"></div>

            <div className="studio-pane code-pane">
              <CodeEditorPanel
                problem={currentProblem}
                code={code}
                setCode={setCode}
                output={output}
                setOutput={setOutput}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="studio-welcome">
          <div className="container">
            <div className="welcome-header">
              <h1>🎯 Interview Studio</h1>
              <p className="subtitle">Live coding interviews with real-time feedback</p>
            </div>

            <div className="problem-selector">
              <h2>Select a Problem</h2>
              <div className="problems-grid">
                {problems.map((problem, idx) => (
                  <div
                    key={idx}
                    className={`problem-card ${idx === currentProblemIdx ? 'active' : ''}`}
                    onClick={() => setCurrentProblemIdx(idx)}
                  >
                    <div className="problem-header">
                      <h3>{problem.title}</h3>
                      <span className={`difficulty difficulty-${problem.difficulty}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <p className="problem-description">{problem.shortDescription}</p>
                    <div className="problem-meta">
                      <span className="meta-item">⏱ {problem.estimatedTime}min</span>
                      <span className="meta-item">📊 {problem.topics.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="difficulty-selector">
              <h2>Start Interview</h2>
              <p>Choose your difficulty level:</p>
              <div className="difficulty-buttons">
                <button
                  className="btn btn-difficulty-easy"
                  onClick={() => handleStartInterview('easy')}
                >
                  <span className="time-badge">20 min</span>
                  Easy
                </button>
                <button
                  className="btn btn-difficulty-medium"
                  onClick={() => handleStartInterview('medium')}
                >
                  <span className="time-badge">45 min</span>
                  Medium
                </button>
                <button
                  className="btn btn-difficulty-hard"
                  onClick={() => handleStartInterview('hard')}
                >
                  <span className="time-badge">60 min</span>
                  Hard
                </button>
              </div>
            </div>

            <div className="tips-section">
              <h3>💡 Interview Tips</h3>
              <ul className="tips-list">
                <li>Start by understanding the problem - ask clarifying questions mentally</li>
                <li>Discuss your approach before coding</li>
                <li>Write clean, readable code</li>
                <li>Test your code with edge cases</li>
                <li>Explain time and space complexity</li>
                <li>Optimize if you have time remaining</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .interview-studio {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: var(--bg-primary);
        }

        .studio-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          gap: 2rem;
          flex-wrap: wrap;
        }

        .studio-title h1 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--text-primary);
        }

        .btn-end-interview {
          padding: 0.75rem 1.5rem;
          background: var(--accent-red);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-end-interview:hover {
          background: #ff5252;
          transform: scale(1.02);
        }

        .studio-container {
          display: flex;
          flex: 1;
          overflow: hidden;
          gap: 0;
        }

        .studio-pane {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
        }

        .problem-pane {
          background: var(--bg-primary);
          border-right: 1px solid var(--border-color);
        }

        .code-pane {
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
        }

        .studio-divider {
          width: 1px;
          background: var(--border-color);
        }

        /* Welcome Screen */
        .studio-welcome {
          padding: 3rem 0;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
          min-height: 100vh;
        }

        .welcome-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .welcome-header h1 {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
        }

        .problem-selector {
          margin-bottom: 4rem;
        }

        .problem-selector h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .problems-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .problem-card {
          background: var(--bg-card);
          border: 2px solid var(--border-color);
          border-radius: 1rem;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .problem-card:hover {
          border-color: var(--accent-blue);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(30, 144, 255, 0.2);
        }

        .problem-card.active {
          border-color: var(--accent-blue);
          background: rgba(30, 144, 255, 0.1);
        }

        .problem-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .problem-header h3 {
          margin: 0;
          font-size: 1.125rem;
          color: var(--text-primary);
        }

        .difficulty {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
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

        .problem-description {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin: 0 0 1rem 0;
          line-height: 1.5;
        }

        .problem-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .difficulty-selector {
          text-align: center;
          margin-bottom: 4rem;
        }

        .difficulty-selector h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .difficulty-selector > p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .difficulty-buttons {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .btn-difficulty-easy,
        .btn-difficulty-medium,
        .btn-difficulty-hard {
          position: relative;
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          border: 2px solid;
          border-radius: 0.75rem;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          min-width: 140px;
        }

        .btn-difficulty-easy {
          background: rgba(34, 197, 94, 0.1);
          border-color: var(--accent-green);
          color: var(--accent-green);
        }

        .btn-difficulty-easy:hover {
          background: rgba(34, 197, 94, 0.2);
          transform: scale(1.05);
        }

        .btn-difficulty-medium {
          background: rgba(234, 179, 8, 0.1);
          border-color: var(--accent-yellow);
          color: var(--accent-yellow);
        }

        .btn-difficulty-medium:hover {
          background: rgba(234, 179, 8, 0.2);
          transform: scale(1.05);
        }

        .btn-difficulty-hard {
          background: rgba(239, 68, 68, 0.1);
          border-color: var(--accent-red);
          color: var(--accent-red);
        }

        .btn-difficulty-hard:hover {
          background: rgba(239, 68, 68, 0.2);
          transform: scale(1.05);
        }

        .time-badge {
          font-size: 0.75rem;
          opacity: 0.8;
          font-weight: 500;
        }

        .tips-section {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .tips-section h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--accent-yellow);
        }

        .tips-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tips-list li {
          padding: 0.75rem 0;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .tips-list li:last-child {
          border-bottom: none;
        }

        @media (max-width: 1024px) {
          .studio-container {
            flex-direction: column;
          }

          .studio-pane {
            flex: 1;
            min-height: 50vh;
            max-height: 50vh;
            padding: 1.5rem;
          }

          .problem-pane {
            border-right: none;
            border-bottom: 1px solid var(--border-color);
          }

          .studio-divider {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .studio-header {
            flex-direction: column;
            padding: 1rem;
            gap: 1rem;
          }

          .studio-title h1 {
            font-size: 1.25rem;
          }

          .welcome-header h1 {
            font-size: 2rem;
          }

          .problems-grid {
            grid-template-columns: 1fr;
          }

          .difficulty-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .studio-pane {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
