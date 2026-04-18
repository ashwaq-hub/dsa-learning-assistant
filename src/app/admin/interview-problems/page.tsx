'use client';

import { useState, useEffect } from 'react';

interface Problem {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
  topics: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  starterCode?: string;
}

export default function InterviewProblemsAdmin() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Load problems from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('interviewProblems');
      if (saved) {
        setProblems(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load problems:', error);
    }
    setMounted(true);
  }, []);

  // Save problems to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('interviewProblems', JSON.stringify(problems));
      } catch (error) {
        console.error('Failed to save problems:', error);
      }
    }
  }, [problems, mounted]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Problem>>({
    title: '',
    shortDescription: '',
    description: '',
    examples: [{ input: '', output: '', explanation: '' }],
    constraints: [''],
    timeComplexity: '',
    spaceComplexity: '',
    topics: [''],
    difficulty: 'medium',
    estimatedTime: 30,
    starterCode: '',
  });

  const handleAddProblem = () => {
    setEditingId(null);
    setFormData({
      title: '',
      shortDescription: '',
      description: '',
      examples: [{ input: '', output: '', explanation: '' }],
      constraints: [''],
      timeComplexity: '',
      spaceComplexity: '',
      topics: [''],
      difficulty: 'medium',
      estimatedTime: 30,
      starterCode: '',
    });
    setShowForm(true);
  };

  const handleEditProblem = (problem: Problem) => {
    setEditingId(problem.id);
    setFormData(problem);
    setShowForm(true);
  };

  const handleSaveProblem = () => {
    if (!formData.title?.trim()) {
      alert('Title is required');
      return;
    }

    if (editingId) {
      setProblems(
        problems.map((p) => (p.id === editingId ? { ...formData as Problem, id: editingId } : p))
      );
    } else {
      const newProblem: Problem = {
        ...formData as Problem,
        id: Date.now().toString(),
      };
      setProblems([...problems, newProblem]);
    }

    setShowForm(false);
    setEditingId(null);
  };

  const handleDeleteProblem = (id: string) => {
    if (confirm('Are you sure you want to delete this problem?')) {
      setProblems(problems.filter((p) => p.id !== id));
    }
  };

  const handleAddExample = () => {
    setFormData({
      ...formData,
      examples: [
        ...(formData.examples || []),
        { input: '', output: '', explanation: '' },
      ],
    });
  };

  const handleAddConstraint = () => {
    setFormData({
      ...formData,
      constraints: [...(formData.constraints || []), ''],
    });
  };

  const handleAddTopic = () => {
    setFormData({
      ...formData,
      topics: [...(formData.topics || []), ''],
    });
  };

  const handleExportProblems = () => {
    const dataStr = JSON.stringify(problems, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'interview-problems.json';
    link.click();
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="admin-container">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>📚 Interview Studio Problems</h1>
            <p className="subtitle">Manage custom interview problems and design pattern challenges</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={handleAddProblem}>
              ➕ Add New Problem
            </button>
            {problems.length > 0 && (
              <button className="btn btn-secondary" onClick={handleExportProblems}>
                📥 Export as JSON
              </button>
            )}
          </div>
        </div>

        {showForm && (
          <div className="form-section">
            <div className="form-container">
              <h2>{editingId ? 'Edit Problem' : 'Add New Problem'}</h2>

              <div className="form-group">
                <label>Problem Title *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Parking Lot System"
                />
              </div>

              <div className="form-group">
                <label>Short Description *</label>
                <input
                  type="text"
                  value={formData.shortDescription || ''}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief one-line description"
                />
              </div>

              <div className="form-group">
                <label>Full Description *</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Complete problem description"
                  rows={6}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Difficulty *</label>
                  <select
                    value={formData.difficulty || 'medium'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        difficulty: e.target.value as 'easy' | 'medium' | 'hard',
                      })
                    }
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Estimated Time (minutes)</label>
                  <input
                    type="number"
                    value={formData.estimatedTime || 30}
                    onChange={(e) =>
                      setFormData({ ...formData, estimatedTime: parseInt(e.target.value) })
                    }
                    min="5"
                    max="180"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Topics (comma-separated or one per field)</label>
                {(formData.topics || []).map((topic, idx) => (
                  <div key={idx} className="input-array">
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => {
                        const newTopics = [...(formData.topics || [])];
                        newTopics[idx] = e.target.value;
                        setFormData({ ...formData, topics: newTopics });
                      }}
                      placeholder="e.g., Object-Oriented Design"
                    />
                    {(formData.topics || []).length > 1 && (
                      <button
                        className="btn-remove"
                        onClick={() => {
                          const newTopics = (formData.topics || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, topics: newTopics });
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button className="btn btn-small" onClick={handleAddTopic}>
                  + Add Topic
                </button>
              </div>

              <div className="form-group">
                <label>Constraints (one per field)</label>
                {(formData.constraints || []).map((constraint, idx) => (
                  <div key={idx} className="input-array">
                    <input
                      type="text"
                      value={constraint}
                      onChange={(e) => {
                        const newConstraints = [...(formData.constraints || [])];
                        newConstraints[idx] = e.target.value;
                        setFormData({ ...formData, constraints: newConstraints });
                      }}
                      placeholder="e.g., O(1) space complexity"
                    />
                    {(formData.constraints || []).length > 1 && (
                      <button
                        className="btn-remove"
                        onClick={() => {
                          const newConstraints = (formData.constraints || []).filter(
                            (_, i) => i !== idx
                          );
                          setFormData({ ...formData, constraints: newConstraints });
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button className="btn btn-small" onClick={handleAddConstraint}>
                  + Add Constraint
                </button>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Time Complexity</label>
                  <input
                    type="text"
                    value={formData.timeComplexity || ''}
                    onChange={(e) => setFormData({ ...formData, timeComplexity: e.target.value })}
                    placeholder="e.g., O(n log n)"
                  />
                </div>

                <div className="form-group">
                  <label>Space Complexity</label>
                  <input
                    type="text"
                    value={formData.spaceComplexity || ''}
                    onChange={(e) => setFormData({ ...formData, spaceComplexity: e.target.value })}
                    placeholder="e.g., O(n)"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Examples</label>
                {(formData.examples || []).map((example, idx) => (
                  <div key={idx} className="example-block">
                    <input
                      type="text"
                      value={example.input}
                      onChange={(e) => {
                        const newExamples = [...(formData.examples || [])];
                        newExamples[idx].input = e.target.value;
                        setFormData({ ...formData, examples: newExamples });
                      }}
                      placeholder="Input"
                    />
                    <input
                      type="text"
                      value={example.output}
                      onChange={(e) => {
                        const newExamples = [...(formData.examples || [])];
                        newExamples[idx].output = e.target.value;
                        setFormData({ ...formData, examples: newExamples });
                      }}
                      placeholder="Output"
                    />
                    <textarea
                      value={example.explanation || ''}
                      onChange={(e) => {
                        const newExamples = [...(formData.examples || [])];
                        newExamples[idx].explanation = e.target.value;
                        setFormData({ ...formData, examples: newExamples });
                      }}
                      placeholder="Explanation (optional)"
                      rows={2}
                    />
                  </div>
                ))}
                <button className="btn btn-small" onClick={handleAddExample}>
                  + Add Example
                </button>
              </div>

              <div className="form-group">
                <label>Starter Code (optional)</label>
                <textarea
                  value={formData.starterCode || ''}
                  onChange={(e) => setFormData({ ...formData, starterCode: e.target.value })}
                  placeholder="// Template code for candidates"
                  rows={6}
                />
              </div>

              <div className="form-actions">
                <button className="btn btn-primary" onClick={handleSaveProblem}>
                  {editingId ? '✅ Update Problem' : '✅ Create Problem'}
                </button>
                <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="problems-list">
          <h2>All Problems ({problems.length})</h2>

          {problems.length === 0 ? (
            <div className="empty-state">
              <p>No problems created yet.</p>
              <button className="btn btn-primary" onClick={handleAddProblem}>
                Create your first problem
              </button>
            </div>
          ) : (
            <div className="problems-grid">
              {problems.map((problem) => (
                <div key={problem.id} className="problem-item">
                  <div className="problem-item-header">
                    <h3>{problem.title}</h3>
                    <span className={`difficulty difficulty-${problem.difficulty}`}>
                      {problem.difficulty}
                    </span>
                  </div>

                  <p className="problem-description">{problem.shortDescription}</p>

                  <div className="problem-meta">
                    <span>⏱ {problem.estimatedTime} min</span>
                    <span>📚 {problem.topics.join(', ')}</span>
                  </div>

                  <div className="problem-actions">
                    <button
                      className="btn btn-small btn-primary"
                      onClick={() => handleEditProblem(problem)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-small btn-danger"
                      onClick={() => handleDeleteProblem(problem.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .admin-container {
          padding: 2rem 0;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
          min-height: 100vh;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 2rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .admin-header h1 {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .form-section {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 3rem;
        }

        .form-container h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: var(--text-primary);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          border-radius: 0.5rem;
          font-family: inherit;
          font-size: 0.95rem;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px rgba(30, 144, 255, 0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .input-array {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .input-array input {
          flex: 1;
        }

        .btn-remove {
          padding: 0.75rem 1rem;
          background: var(--accent-red);
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
        }

        .btn-remove:hover {
          background: #ff5252;
        }

        .example-block {
          background: var(--bg-secondary);
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          border: 1px solid var(--border-color);
        }

        .example-block input,
        .example-block textarea {
          margin-bottom: 0.75rem;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .problems-list h2 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: var(--text-primary);
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          background: var(--bg-card);
          border: 2px dashed var(--border-color);
          border-radius: 1rem;
        }

        .empty-state p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }

        .problems-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .problem-item {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 1.5rem;
          transition: all 0.3s;
        }

        .problem-item:hover {
          border-color: var(--accent-blue);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px var(--color-shadow);
        }

        .problem-item-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .problem-item h3 {
          margin: 0;
          font-size: 1.25rem;
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
          font-size: 0.9rem;
          margin: 0 0 1rem 0;
          line-height: 1.5;
        }

        .problem-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: var(--text-tertiary);
          margin-bottom: 1.5rem;
        }

        .problem-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.9rem;
        }

        .btn-primary {
          background: var(--accent-blue);
          color: white;
        }

        .btn-primary:hover {
          background: #2563eb;
          transform: scale(1.02);
        }

        .btn-secondary {
          background: var(--bg-card);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
          background: var(--border-color);
          color: var(--text-primary);
        }

        .btn-danger {
          background: var(--accent-red);
          color: white;
        }

        .btn-danger:hover {
          background: #ff5252;
        }

        .btn-small {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
        }

        @media (max-width: 768px) {
          .admin-header {
            flex-direction: column;
            align-items: stretch;
          }

          .header-actions {
            width: 100%;
          }

          .header-actions button {
            flex: 1;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .problems-grid {
            grid-template-columns: 1fr;
          }

          .admin-header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
