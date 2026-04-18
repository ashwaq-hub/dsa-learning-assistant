'use client';

import { useState } from 'react';
import { dsaPatterns } from '@/data/patterns';

export default function VisualPage() {
  const [selectedPattern, setSelectedPattern] = useState(0);

  const pattern = dsaPatterns[selectedPattern];

  return (
    <main className="container" style={{ padding: '2rem 1.5rem' }}>
      <h1 className="section-title">📊 Visual Learning</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Visualize how each algorithm works with animated ASCII diagrams.
      </p>

      <div className="tabs" style={{ flexWrap: 'wrap' }}>
        {dsaPatterns.map((p, i) => (
          <button
            key={p.id}
            className={`tab ${selectedPattern === i ? 'active' : ''}`}
            onClick={() => setSelectedPattern(i)}
          >
            {p.icon} {p.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
        <div className="solution-box">
          <h3 className="section-title" style={{ marginTop: 0 }}>{pattern.icon} {pattern.name}</h3>
          <div className="diagram" style={{ minHeight: '300px' }}>
            {pattern.asciiDiagram}
          </div>
        </div>

        <div className="solution-box">
          <h3 className="section-title" style={{ marginTop: 0 }}>🔄 Flowchart</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {pattern.flowchart.map((step, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  background: 'var(--bg-primary)',
                  borderRadius: '0.5rem',
                  borderLeft: `3px solid ${i === 0 ? 'var(--accent-green)' : i === pattern.flowchart.length - 1 ? 'var(--accent-red)' : 'var(--accent-blue)'}`
                }}
              >
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--bg-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{step}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: '0.5rem' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>📈 Complexity</h4>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <span style={{ color: 'var(--accent-green)' }}>Time:</span> {pattern.timeComplexity}
              </div>
              <div>
                <span style={{ color: 'var(--accent-cyan)' }}>Space:</span> {pattern.spaceComplexity}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="solution-box" style={{ marginTop: '2rem' }}>
        <h3 className="section-title" style={{ marginTop: 0 }}>💻 Code Template</h3>
        <pre>{pattern.codeTemplate}</pre>
      </div>

      <div className="solution-box">
        <h3 className="section-title" style={{ marginTop: 0 }}>🎯 Triggers</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {pattern.triggers.map((trigger, i) => (
            <span
              key={i}
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--bg-primary)',
                borderRadius: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              {trigger}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
