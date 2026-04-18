'use client';

import { useState } from 'react';
import { interviewQuestions, dsaPatterns, COMPANIES } from '@/data/patterns';

export default function InterviewPage() {
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const topic = interviewQuestions[selectedTopic];

  // Filter questions by selected company
  const getFilteredQuestions = () => {
    if (!selectedCompany) {
      return interviewQuestions.flatMap(t => t.questions);
    }
    return interviewQuestions.flatMap(t =>
      t.questions.filter(q => q.companies.includes(selectedCompany))
    );
  };

  const allQuestions = getFilteredQuestions();
  const topicQuestions = selectedCompany
    ? topic.questions.filter(q => q.companies.includes(selectedCompany))
    : topic.questions;

  const quizQuestion = allQuestions[currentQuestion];

  return (
    <main className="container" style={{ padding: '2rem 1.5rem' }}>
      <h1 className="section-title">🎤 Interview Mode</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Practice with real interview questions and test your understanding.
      </p>

      {/* Company Filter */}
      <div className="solution-box" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          🏢 Filter by Company
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button
            className={`tab ${!selectedCompany ? 'active' : ''}`}
            onClick={() => setSelectedCompany(null)}
            style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
          >
            All Companies
          </button>
          {COMPANIES.map(company => (
            <button
              key={company}
              className={`tab ${selectedCompany === company ? 'active' : ''}`}
              onClick={() => setSelectedCompany(company)}
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              {company}
            </button>
          ))}
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${!quizMode ? 'active' : ''}`} onClick={() => setQuizMode(false)}>
          📚 Study Mode
        </button>
        <button className={`tab ${quizMode ? 'active' : ''}`} onClick={() => setQuizMode(true)}>
          🎯 Quiz Mode
        </button>
      </div>

      {!quizMode ? (
        <>
          <div className="tabs" style={{ marginTop: '1rem' }}>
            {interviewQuestions.map((t, i) => (
              <button
                key={i}
                className={`tab ${selectedTopic === i ? 'active' : ''}`}
                onClick={() => setSelectedTopic(i)}
              >
                {t.topic}
              </button>
            ))}
          </div>

          <div className="solution-box" style={{ marginTop: '1.5rem' }}>
            <h3 className="section-title" style={{ marginTop: 0 }}>
              {topic.topic} Questions {selectedCompany && `(${selectedCompany})`}
            </h3>
            {topicQuestions.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
                No questions available for {selectedCompany} in {topic.topic}
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
                      borderLeft: `4px solid ${
                        q.difficulty === 'Easy' ? '#4ade80' :
                        q.difficulty === 'Medium' ? '#facc15' : '#ef4444'
                      }`
                    }}
                    onClick={() => setShowAnswer(showAnswer === i ? null : i)}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', justifyContent: 'space-between' }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Q{i + 1}.</span>
                        <span style={{ marginLeft: '0.5rem' }}>{q.text}</span>
                      </div>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                        {showAnswer === i ? '▲' : '▼'}
                      </span>
                    </div>

                    {/* Question metadata */}
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem' }}>
                      <span style={{
                        color: q.difficulty === 'Easy' ? '#4ade80' :
                               q.difficulty === 'Medium' ? '#facc15' : '#ef4444'
                      }}>
                        {q.difficulty}
                      </span>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        {q.companies.slice(0, 2).join(', ')}{q.companies.length > 2 ? ` +${q.companies.length - 2}` : ''}
                      </div>
                    </div>

                    {showAnswer === i && (
                      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', color: 'var(--accent-purple)' }}>
                        <strong>Key Points:</strong>
                        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                          <li>Think out loud as you explain</li>
                          <li>Provide time/space complexity</li>
                          <li>Mention edge cases</li>
                          <li>Discuss alternative approaches</li>
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="solution-box">
            <h3 className="section-title" style={{ marginTop: 0 }}>📖 Topic Overview</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Key concepts for {topic.topic}:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {dsaPatterns
                .filter(p => {
                  const topicLower = topic.topic.toLowerCase();
                  if (topicLower.includes('array') || topicLower.includes('string')) {
                    return ['hashing', 'two-pointers', 'sliding-window', 'binary-search'].includes(p.id);
                  }
                  if (topicLower.includes('linked')) return p.id === 'linked-list';
                  if (topicLower.includes('tree')) return ['dfs-bfs', 'heap'].includes(p.id);
                  if (topicLower.includes('dynamic')) return p.id === 'dp';
                  return true;
                })
                .map(p => (
                  <span key={p.id} className="tag" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
                    {p.icon} {p.name}
                  </span>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="solution-box" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
          {allQuestions.length === 0 ? (
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                No questions available for {selectedCompany} to practice with.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setSelectedCompany(null)}
              >
                View All Companies
              </button>
            </div>
          ) : (
            <>
              <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
                {allQuestions[currentQuestion]?.text}
              </h2>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                <span style={{
                  color: allQuestions[currentQuestion]?.difficulty === 'Easy' ? '#4ade80' :
                         allQuestions[currentQuestion]?.difficulty === 'Medium' ? '#facc15' : '#ef4444'
                }}>
                  {allQuestions[currentQuestion]?.difficulty}
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {allQuestions[currentQuestion]?.companies.join(', ')}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Question {currentQuestion + 1} of {allQuestions.length}
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  ← Previous
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setCurrentQuestion(Math.min(allQuestions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === allQuestions.length - 1}
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
    </main>
  );
}
