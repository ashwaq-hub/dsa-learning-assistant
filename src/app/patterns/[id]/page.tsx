'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';  
import { dsaPatterns } from '@/data/patterns';

export default function PatternDetailPage() {
  const params = useParams();
  const pattern = dsaPatterns.find(p => p.id === params.id);
  const [activeTab, setActiveTab] = useState<'overview' | 'code' | 'problems'>('overview');

  if (!pattern) {
    return (
      <main className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h1>Pattern not found</h1>
        <Link href="/patterns" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          ← Back to Patterns
        </Link>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: '2rem 1.5rem' }}>
      <Link href="/patterns" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
        ← Back to Patterns
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
        <span style={{ fontSize: '3rem' }}>{pattern.icon}</span>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{pattern.name}</h1>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <span style={{ color: 'var(--accent-green)' }}>⏱ {pattern.timeComplexity}</span>
            <span style={{ color: 'var(--accent-cyan)' }}>💾 {pattern.spaceComplexity}</span>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          📖 Overview
        </button>
        <button className={`tab ${activeTab === 'code' ? 'active' : ''}`} onClick={() => setActiveTab('code')}>
          💻 Code
        </button>
        <button className={`tab ${activeTab === 'problems' ? 'active' : ''}`} onClick={() => setActiveTab('problems')}>
          📝 Problems
        </button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div className="solution-box">
            <h3 className="section-title" style={{ marginTop: 0 }}>🎯 Triggers</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {pattern.triggers.map((trigger, i) => (
                <span key={i} className="tag" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
                  {trigger}
                </span>
              ))}
            </div>
          </div>

          <div className="solution-box">
            <h3 className="section-title" style={{ marginTop: 0 }}>🔄 Flowchart Logic</h3>
            <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
              {pattern.flowchart.map((step, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="solution-box">
            <h3 className="section-title" style={{ marginTop: 0 }}>📊 Visual Diagram</h3>
            <div className="diagram">{pattern.asciiDiagram}</div>
          </div>

          <div className="solution-box">
            <h3 className="section-title" style={{ marginTop: 0 }}>📐 Template</h3>
            <p style={{ fontFamily: 'JetBrains Mono', color: 'var(--accent-blue)' }}>
              {pattern.template}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'code' && (
        <div className="solution-box">
          <h3 className="section-title" style={{ marginTop: 0 }}>💻 Java Code Template</h3>
          <pre>{pattern.codeTemplate}</pre>
        </div>
      )}

      {activeTab === 'problems' && (
        <div>
          <h3 className="section-title" style={{ marginTop: 0 }}>📝 Example Problems</h3>
          <div className="grid">
            {pattern.exampleProblems.map((problem, i) => (
              <div key={i} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="card-title">{problem.name}</span>
                  <span className={`tag tag-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                  <strong>Solution approach:</strong> {problem.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
