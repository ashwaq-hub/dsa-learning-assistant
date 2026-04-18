'use client';

import { useState } from 'react';
import Link from 'next/link';
import { dsaPatterns } from '@/data/patterns';

export default function PatternsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Patterns' },
    { id: 'arrays', label: 'Array-Based' },
    { id: 'linear', label: 'Linear Structures' },
    { id: 'trees', label: 'Tree/Graph' },
    { id: 'advanced', label: 'Advanced' },
  ];

  const patternCategories: Record<string, string[]> = {
    arrays: ['hashing', 'two-pointers', 'sliding-window', 'binary-search'],
    linear: ['stack', 'linked-list'],
    trees: ['dfs-bfs', 'heap', 'union-find', 'trie'],
    advanced: ['backtracking', 'dp', 'greedy', 'bitwise'],
  };

  const filteredPatterns = selectedCategory === 'all'
    ? dsaPatterns
    : dsaPatterns.filter(p => patternCategories[selectedCategory]?.includes(p.id));

  return (
    <main className="container" style={{ padding: '2rem 1.5rem' }}>
      <h1 className="section-title">🧩 DSA Patterns</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Master each pattern with triggers, templates, and example problems.
      </p>

      <div className="tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`tab ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid">
        {filteredPatterns.map((pattern) => (
          <Link 
            href={`/patterns/${pattern.id}`} 
            key={pattern.id} 
            className="card" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="card-header">
              <span className="card-icon">{pattern.icon}</span>
              <span className="card-title">{pattern.name}</span>
            </div>
            <div className="card-content">
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Triggers:</strong>
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
                  {pattern.triggers.slice(0, 3).map((trigger, i) => (
                    <li key={i} style={{ marginBottom: '0.25rem' }}>{trigger}</li>
                  ))}
                </ul>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Template:</strong>
                <code style={{ display: 'block', marginTop: '0.25rem', fontSize: '0.8rem' }}>
                  {pattern.template}
                </code>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pattern.exampleProblems.map((prob, i) => (
                  <span key={i} className={`tag tag-${prob.difficulty.toLowerCase()}`}>
                    {prob.name}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
