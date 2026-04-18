import Link from 'next/link';
import { dsaPatterns } from '@/data/patterns';

export default function Home() {
  const featuredPatterns = dsaPatterns.slice(0, 6);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Master DSA Patterns</h1>
          <p>
            Learn, practice, and ace your coding interviews with pattern-driven explanations,
            visual flowcharts, and real problem solutions.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/solver" className="btn btn-primary">
              🚀 Solve a Problem
            </Link>
            <Link href="/patterns" className="btn btn-secondary">
              📚 Browse Patterns
            </Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '2rem 1.5rem' }}>
        <h2 className="section-title">🧩 Core Patterns</h2>
        <div className="grid">
          {featuredPatterns.map((pattern) => (
            <Link href={`/patterns/${pattern.id}`} key={pattern.id} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card-header">
                <span className="card-icon">{pattern.icon}</span>
                <span className="card-title">{pattern.name}</span>
              </div>
              <div className="card-content">
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Time:</strong> {pattern.timeComplexity}
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Triggers:</strong> {pattern.triggers.slice(0, 2).join(', ')}
                </p>
                <div>
                  {pattern.exampleProblems.slice(0, 2).map((prob, i) => (
                    <span key={i} className={`tag tag-${prob.difficulty.toLowerCase()}`}>
                      {prob.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="section-title">🎯 Quick Reference</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📝</div>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Pattern Classification</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Identify the right approach
            </div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔄</div>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Flowchart Logic</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Step-by-step reasoning
            </div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💻</div>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Code Templates</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Ready-to-use Java code
            </div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚡</div>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Complexity Analysis</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Time & Space O-notation
            </div>
          </div>
        </div>

        <h2 className="section-title">🎴 Flashcard Preview</h2>
        <div className="flashcard-grid">
          <div className="flashcard">
            <div className="flashcard-front">Q: Sorted array + pair/sum?</div>
            <div className="flashcard-back">A: Two Pointers</div>
          </div>
          <div className="flashcard">
            <div className="flashcard-front">Q: Substring max/min?</div>
            <div className="flashcard-back">A: Sliding Window</div>
          </div>
          <div className="flashcard">
            <div className="flashcard-front">Q: Lookup/duplicates?</div>
            <div className="flashcard-back">A: HashMap/HashSet</div>
          </div>
          <div className="flashcard">
            <div className="flashcard-front">Q: Kth largest/smallest?</div>
            <div className="flashcard-back">A: Heap/Priority Queue</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link href="/flashcards" className="btn btn-secondary">
            View All Flashcards →
          </Link>
        </div>
      </section>
    </main>
  );
}
