'use client';

import { useState, useEffect } from 'react';
import ProblemPanel from './ProblemPanel';
import CodeEditorPanel from './CodeEditorPanel';
import InterviewTimer from './InterviewTimer';
import { problems as defaultProblems } from '@/data/interviewProblems';

interface Problem {
  title: string;
  description: string;
  shortDescription: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
  topics: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  starterCode?: string;
}

export default function InterviewStudioLayout() {
  const [problems, setProblems] = useState(defaultProblems);
  const [currentProblemIdx, setCurrentProblemIdx] = useState(0);
  const [isInterviewMode, setIsInterviewMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProblem, setNewProblem] = useState<Partial<Problem>>({
    title: '',
    shortDescription: '',
    description: '',
    difficulty: 'medium',
    estimatedTime: 45,
    topics: [],
    examples: [{ input: '', output: '', explanation: '' }],
    constraints: [],
    timeComplexity: '',
    spaceComplexity: '',
    starterCode: '',
  });

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

  // Filter problems by difficulty
  const filteredProblems = filterDifficulty === 'all'
    ? problems
    : problems.filter(p => p.difficulty === filterDifficulty);

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

  const handleAddProblem = () => {
    if (!newProblem.title || !newProblem.shortDescription) {
      alert('Please fill in at least title and description');
      return;
    }

    const problemToAdd = newProblem as Problem;
    const updatedProblems = [...problems, problemToAdd];
    setProblems(updatedProblems);

    // Save to localStorage
    try {
      const customProblems = localStorage.getItem('interviewProblems') || '[]';
      const parsed = JSON.parse(customProblems);
      localStorage.setItem('interviewProblems', JSON.stringify([...parsed, problemToAdd]));
    } catch (error) {
      console.error('Failed to save problem:', error);
    }

    // Reset form
    setNewProblem({
      title: '',
      shortDescription: '',
      description: '',
      difficulty: 'medium',
      estimatedTime: 45,
      topics: [],
      examples: [{ input: '', output: '', explanation: '' }],
      constraints: [],
      timeComplexity: '',
      spaceComplexity: '',
      starterCode: '',
    });
    setShowAddModal(false);
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
              <div className="selector-header">
                <h2>Select a Problem</h2>
                <button
                  className="btn-add-problem"
                  onClick={() => setShowAddModal(true)}
                  title="Add new problem"
                >
                  <span className="plus-icon">+</span>
                </button>
              </div>

              {/* Difficulty Filter */}
              <div className="difficulty-filter">
                <button
                  className={`filter-btn ${filterDifficulty === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterDifficulty('all')}
                >
                  All
                </button>
                <button
                  className={`filter-btn filter-easy ${filterDifficulty === 'easy' ? 'active' : ''}`}
                  onClick={() => setFilterDifficulty('easy')}
                >
                  Easy
                </button>
                <button
                  className={`filter-btn filter-medium ${filterDifficulty === 'medium' ? 'active' : ''}`}
                  onClick={() => setFilterDifficulty('medium')}
                >
                  Medium
                </button>
                <button
                  className={`filter-btn filter-hard ${filterDifficulty === 'hard' ? 'active' : ''}`}
                  onClick={() => setFilterDifficulty('hard')}
                >
                  Hard
                </button>
              </div>

              {/* Compact Problem List */}
              <div className="problems-list">
                {filteredProblems.length > 0 ? (
                  filteredProblems.map((problem, idx) => {
                    const actualIdx = problems.findIndex(p => p.title === problem.title);
                    return (
                      <div
                        key={idx}
                        className={`problem-item ${actualIdx === currentProblemIdx ? 'active' : ''}`}
                        onClick={() => setCurrentProblemIdx(actualIdx)}
                      >
                        <div className="item-left">
                          <h4>{problem.title}</h4>
                          <p className="item-subtitle">
                            {problem.shortDescription.substring(0, 80)}...
                          </p>
                        </div>
                        <div className="item-right">
                          <span className={`difficulty difficulty-${problem.difficulty}`}>
                            {problem.difficulty}
                          </span>
                          <span className="item-time">⏱ {problem.estimatedTime}min</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="no-problems">No problems found</p>
                )}
              </div>
            </div>

            {/* Start Interview Section */}
            <div className="start-section">
              <h2>Start Interview</h2>
              <p>Select difficulty and time limit:</p>
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

            {/* Add Problem Modal */}
            {showAddModal && (
              <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Add New Problem</h3>
                    <button
                      className="modal-close"
                      onClick={() => setShowAddModal(false)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="form-group">
                      <label>Problem Title *</label>
                      <input
                        type="text"
                        value={newProblem.title || ''}
                        onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
                        placeholder="e.g., Two Sum"
                      />
                    </div>

                    <div className="form-group">
                      <label>Short Description *</label>
                      <input
                        type="text"
                        value={newProblem.shortDescription || ''}
                        onChange={(e) => setNewProblem({ ...newProblem, shortDescription: e.target.value })}
                        placeholder="Brief one-line description"
                      />
                    </div>

                    <div className="form-group">
                      <label>Full Description</label>
                      <textarea
                        value={newProblem.description || ''}
                        onChange={(e) => setNewProblem({ ...newProblem, description: e.target.value })}
                        placeholder="Detailed problem description"
                        rows={4}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Difficulty</label>
                        <select
                          value={newProblem.difficulty || 'medium'}
                          onChange={(e) => setNewProblem({ ...newProblem, difficulty: e.target.value as 'easy' | 'medium' | 'hard' })}
                        >
                          <option value="easy">Easy</option>
                          <option value="medium">Medium</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Estimated Time (min)</label>
                        <input
                          type="number"
                          value={newProblem.estimatedTime || 45}
                          onChange={(e) => setNewProblem({ ...newProblem, estimatedTime: parseInt(e.target.value) })}
                          min="5"
                          max="120"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Topics (comma-separated)</label>
                      <input
                        type="text"
                        value={(newProblem.topics || []).join(', ')}
                        onChange={(e) => setNewProblem({ ...newProblem, topics: e.target.value.split(',').map(t => t.trim()) })}
                        placeholder="Array, Sorting, String"
                      />
                    </div>

                    <div className="form-group">
                      <label>Starter Code</label>
                      <textarea
                        value={newProblem.starterCode || ''}
                        onChange={(e) => setNewProblem({ ...newProblem, starterCode: e.target.value })}
                        placeholder="Optional starter code template"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      className="btn-cancel"
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-create"
                      onClick={handleAddProblem}
                    >
                      Create Problem
                    </button>
                  </div>
                </div>
              </div>
            )}
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
          margin-bottom: 3rem;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 2rem;
        }

        .selector-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .problem-selector h2 {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0;
        }

        .btn-add-problem {
          background: var(--accent-blue);
          color: white;
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 1.25rem;
          font-weight: 600;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 44px;
          min-height: 44px;
        }

        .btn-add-problem:hover {
          background: #1e90ff;
          transform: scale(1.05);
        }

        .plus-icon {
          font-size: 1.5rem;
          line-height: 1;
        }

        /* Difficulty Filter */
        .difficulty-filter {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          border: 2px solid var(--border-color);
          background: transparent;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          color: var(--text-secondary);
          transition: all 0.2s;
        }

        .filter-btn:hover {
          border-color: var(--accent-blue);
          color: var(--accent-blue);
        }

        .filter-btn.active {
          border-color: var(--accent-blue);
          background: var(--accent-blue);
          color: white;
        }

        .filter-btn.filter-easy.active {
          border-color: var(--accent-green);
          background: var(--accent-green);
        }

        .filter-btn.filter-medium.active {
          border-color: var(--accent-yellow);
          background: var(--accent-yellow);
          color: #000;
        }

        .filter-btn.filter-hard.active {
          border-color: var(--accent-red);
          background: var(--accent-red);
        }

        /* Compact Problems List */
        .problems-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 400px;
          overflow-y: auto;
        }

        .problem-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .problem-item:hover {
          border-color: var(--accent-blue);
          background: rgba(30, 144, 255, 0.05);
        }

        .problem-item.active {
          border-color: var(--accent-blue);
          background: rgba(30, 144, 255, 0.1);
          box-shadow: 0 2px 8px rgba(30, 144, 255, 0.15);
        }

        .item-left {
          flex: 1;
          min-width: 0;
        }

        .item-left h4 {
          margin: 0 0 0.25rem 0;
          font-size: 0.95rem;
          color: var(--text-primary);
          font-weight: 600;
        }

        .item-subtitle {
          margin: 0;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
          margin-left: 1rem;
        }

        .item-time {
          font-size: 0.75rem;
          color: var(--text-secondary);
          white-space: nowrap;
        }

        .difficulty {
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.65rem;
          font-weight: 600;
          white-space: nowrap;
          text-transform: uppercase;
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

        .no-problems {
          text-align: center;
          color: var(--text-tertiary);
          padding: 2rem 1rem;
          font-size: 0.9rem;
        }

        /* Start Interview Section */
        .start-section {
          text-align: center;
          margin-bottom: 3rem;
        }

        .start-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .start-section > p {
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

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          max-width: 600px;
          width: 100%;
          max-height: 85vh;
          overflow-y: auto;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--text-primary);
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--text-secondary);
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .modal-close:hover {
          color: var(--text-primary);
          background: var(--bg-primary);
          border-radius: 0.25rem;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .modal-footer {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          border-top: 1px solid var(--border-color);
          justify-content: flex-end;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.9rem;
          transition: all 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px rgba(30, 144, 255, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          font-family: 'Courier New', monospace;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .btn-cancel,
        .btn-create {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }

        .btn-cancel {
          background: var(--bg-primary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .btn-cancel:hover {
          background: var(--border-color);
        }

        .btn-create {
          background: var(--accent-blue);
          color: white;
        }

        .btn-create:hover {
          background: #1e90ff;
          transform: scale(1.02);
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

          .problem-selector {
            padding: 1.5rem;
            margin-bottom: 2rem;
          }

          .selector-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .difficulty-filter {
            width: 100%;
          }

          .item-right {
            flex-direction: column;
            gap: 0.25rem;
            align-items: flex-end;
          }

          .difficulty-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .studio-pane {
            padding: 1rem;
          }

          .modal-overlay {
            padding: 0.5rem;
          }

          .modal-content {
            max-height: 90vh;
          }
        }
      `}</style>
    </div>
  );
}
