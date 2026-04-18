'use client';

import { useState } from 'react';
import { companyInterviewQuestions, COMPANIES, CompanyQuestion, CompanyTopic } from '@/data/companyQuestions';

export default function CompanyInterviewPage() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Get all questions for selected company
  const getCompanyQuestions = (): CompanyQuestion[] => {
    if (!selectedCompany) return [];
    return companyInterviewQuestions.flatMap(topic =>
      topic.questions.filter(q => q.companies.includes(selectedCompany))
    );
  };

  // Get topics with questions for selected company
  const getCompanyTopics = (): CompanyTopic[] => {
    if (!selectedCompany) return [];
    return companyInterviewQuestions
      .map(topic => ({
        ...topic,
        questions: topic.questions.filter(q => q.companies.includes(selectedCompany))
      }))
      .filter(topic => topic.questions.length > 0);
  };

  // Get questions for selected topic
  const getTopicQuestions = (): CompanyQuestion[] => {
    if (!selectedCompany || !selectedTopic) return [];
    return companyInterviewQuestions
      .find(t => t.topic === selectedTopic)
      ?.questions.filter(q => q.companies.includes(selectedCompany)) || [];
  };

  const allCompanyQuestions = getCompanyQuestions();
  const companyTopics = getCompanyTopics();
  const topicQuestions = getTopicQuestions();
  const quizQuestion = allCompanyQuestions[currentQuestion];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#4ade80';
      case 'Medium':
        return '#facc15';
      case 'Hard':
        return '#ef4444';
      default:
        return 'var(--text-secondary)';
    }
  };

  return (
    <main className="container" style={{ padding: '2rem 1.5rem' }}>
      <h1 className="section-title">🏢 Company-Wise Interview Questions</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Practice questions asked by top tech companies. Filter by company and explore commonly asked topics.
      </p>

      {/* Company Selection */}
      {!selectedCompany ? (
        <div className="solution-box" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Select a Company
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem' }}>
            {COMPANIES.map(company => {
              const questionsCount = companyInterviewQuestions.reduce(
                (acc, topic) => acc + topic.questions.filter(q => q.companies.includes(company)).length,
                0
              );
              return (
                <button
                  key={company}
                  onClick={() => {
                    setSelectedCompany(company);
                    setSelectedTopic(null);
                    setShowAnswer(null);
                    setCurrentQuestion(0);
                  }}
                  style={{
                    padding: '1rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'center',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'var(--accent-blue)';
                    (e.target as HTMLElement).style.background = 'var(--bg-primary)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'var(--border-color)';
                    (e.target as HTMLElement).style.background = 'var(--bg-card)';
                  }}
                >
                  <div>{company}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    {questionsCount} questions
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {/* Selected Company Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--accent-blue)' }}>
              {selectedCompany}
            </h2>
            <button
              onClick={() => {
                setSelectedCompany(null);
                setSelectedTopic(null);
              }}
              className="btn btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              ← Change Company
            </button>
          </div>

          {/* Mode Tabs */}
          <div className="tabs" style={{ marginBottom: '1.5rem' }}>
            <button
              className={`tab ${!quizMode ? 'active' : ''}`}
              onClick={() => {
                setQuizMode(false);
                setCurrentQuestion(0);
              }}
            >
              📚 Study Mode
            </button>
            <button
              className={`tab ${quizMode ? 'active' : ''}`}
              onClick={() => {
                setQuizMode(true);
                setCurrentQuestion(0);
              }}
            >
              🎯 Quiz Mode
            </button>
          </div>

          {!quizMode ? (
            <>
              {/* Topic Tabs */}
              {companyTopics.length > 0 && (
                <div className="tabs" style={{ marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <button
                    className={`tab ${!selectedTopic ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedTopic(null);
                      setShowAnswer(null);
                    }}
                    style={{ fontSize: '0.9rem' }}
                  >
                    All Topics ({allCompanyQuestions.length})
                  </button>
                  {companyTopics.map(topic => (
                    <button
                      key={topic.topic}
                      className={`tab ${selectedTopic === topic.topic ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedTopic(topic.topic);
                        setShowAnswer(null);
                      }}
                      style={{ fontSize: '0.9rem' }}
                    >
                      {topic.topic} ({topic.questions.length})
                    </button>
                  ))}
                </div>
              )}

              {/* Questions Display */}
              {selectedTopic ? (
                <div className="solution-box">
                  <h3 className="section-title" style={{ marginTop: 0 }}>
                    {selectedTopic} for {selectedCompany}
                  </h3>
                  {topicQuestions.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
                      No questions available
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {topicQuestions.map((q, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '1rem',
                            background: 'var(--bg-primary)',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            borderLeft: `4px solid ${getDifficultyColor(q.difficulty)}`
                          }}
                          onClick={() => setShowAnswer(showAnswer === i ? null : i)}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <div style={{ flex: 1 }}>
                              <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Q{i + 1}.</span>
                              <span style={{ marginLeft: '0.5rem' }}>{q.text}</span>
                            </div>
                            <span style={{ color: 'var(--text-secondary)' }}>
                              {showAnswer === i ? '▲' : '▼'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem' }}>
                            <span style={{ color: getDifficultyColor(q.difficulty), fontWeight: 500 }}>
                              {q.difficulty}
                            </span>
                          </div>
                          {showAnswer === i && (
                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', color: 'var(--accent-purple)' }}>
                              <strong>💡 Key Points:</strong>
                              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                <li>Think out loud as you explain</li>
                                <li>Provide time/space complexity</li>
                                <li>Mention edge cases and constraints</li>
                                <li>Discuss alternative approaches</li>
                                <li>Explain your thought process</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="solution-box">
                  <h3 className="section-title" style={{ marginTop: 0 }}>
                    All {selectedCompany} Questions ({allCompanyQuestions.length})
                  </h3>
                  {allCompanyQuestions.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
                      No questions available for {selectedCompany}
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {allCompanyQuestions.map((q, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '1rem',
                            background: 'var(--bg-primary)',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            borderLeft: `4px solid ${getDifficultyColor(q.difficulty)}`
                          }}
                          onClick={() => setShowAnswer(showAnswer === i ? null : i)}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <div style={{ flex: 1 }}>
                              <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Q{i + 1}.</span>
                              <span style={{ marginLeft: '0.5rem' }}>{q.text}</span>
                            </div>
                            <span style={{ color: 'var(--text-secondary)' }}>
                              {showAnswer === i ? '▲' : '▼'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem', flexWrap: 'wrap' }}>
                            <span style={{ color: getDifficultyColor(q.difficulty), fontWeight: 500 }}>
                              {q.difficulty}
                            </span>
                            <span style={{ color: 'var(--text-secondary)' }}>Topic: {q.topic}</span>
                          </div>
                          {showAnswer === i && (
                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', color: 'var(--accent-purple)' }}>
                              <strong>💡 Key Points:</strong>
                              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                <li>Think out loud as you explain</li>
                                <li>Provide time/space complexity</li>
                                <li>Mention edge cases and constraints</li>
                                <li>Discuss alternative approaches</li>
                                <li>Explain your thought process</li>
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Quiz Mode */
            <div className="solution-box" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
              {allCompanyQuestions.length === 0 ? (
                <div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    No questions available for {selectedCompany} to practice with.
                  </p>
                  <button className="btn btn-primary" onClick={() => setSelectedCompany(null)}>
                    Select Another Company
                  </button>
                </div>
              ) : (
                <>
                  <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.2rem' }}>
                    {quizQuestion?.text}
                  </h2>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                    <span style={{ color: getDifficultyColor(quizQuestion?.difficulty || 'Easy'), fontWeight: 500 }}>
                      {quizQuestion?.difficulty}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>Topic: {quizQuestion?.topic}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Question {currentQuestion + 1} of {allCompanyQuestions.length}
                  </p>

                  {/* Progress Bar */}
                  <div style={{
                    width: '100%',
                    height: '0.5rem',
                    background: 'var(--bg-primary)',
                    borderRadius: '0.25rem',
                    marginBottom: '1.5rem',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${((currentQuestion + 1) / allCompanyQuestions.length) * 100}%`,
                      height: '100%',
                      background: 'var(--accent-blue)',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                      disabled={currentQuestion === 0}
                    >
                      ← Previous
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => setCurrentQuestion(Math.min(allCompanyQuestions.length - 1, currentQuestion + 1))}
                      disabled={currentQuestion === allCompanyQuestions.length - 1}
                    >
                      Next →
                    </button>
                  </div>

                  <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    <p style={{ color: 'var(--accent-yellow)', fontSize: '0.875rem' }}>
                      💡 Tip: Try answering out loud as if in a real interview!
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
}
