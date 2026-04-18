'use client';

import { useState } from 'react';
import { flashcards, dsaPatterns } from '@/data/patterns';

export default function FlashcardsPage() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [selectedPattern, setSelectedPattern] = useState<string>('all');

  const toggleCard = (index: number) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(index)) {
      newFlipped.delete(index);
    } else {
      newFlipped.add(index);
    }
    setFlippedCards(newFlipped);
  };

  const filteredCards = selectedPattern === 'all'
    ? flashcards
    : flashcards.filter(f => f.pattern === selectedPattern);

  const handleFlipAll = () => {
    if (flippedCards.size === filteredCards.length) {
      setFlippedCards(new Set());
    } else {
      setFlippedCards(new Set(filteredCards.map((_, i) => i)));
    }
  };

  return (
    <main className="container" style={{ padding: '2rem 1.5rem' }}>
      <h1 className="section-title">🎴 Flashcards</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Test your pattern recognition skills. Click cards to reveal answers.
      </p>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <select
          className="problem-input"
          style={{ maxWidth: '300px', margin: 0 }}
          value={selectedPattern}
          onChange={(e) => setSelectedPattern(e.target.value)}
        >
          <option value="all">All Patterns</option>
          {dsaPatterns.map(p => (
            <option key={p.id} value={p.id}>{p.icon} {p.name}</option>
          ))}
        </select>
        <button className="btn btn-secondary" onClick={handleFlipAll}>
          {flippedCards.size === filteredCards.length ? '🙈 Hide All' : '👁️ Reveal All'}
        </button>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          {filteredCards.length} cards
        </span>
      </div>

      <div className="flashcard-grid">
        {filteredCards.map((card, index) => (
          <div
            key={index}
            className="flashcard"
            onClick={() => toggleCard(index)}
            style={{
              cursor: 'pointer',
              background: flippedCards.has(index) ? 'var(--bg-card)' : 'var(--bg-secondary)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>#{index + 1}</span>
              <span className="tag" style={{ fontSize: '0.65rem', background: 'var(--bg-primary)' }}>
                {dsaPatterns.find(p => p.id === card.pattern)?.icon} {card.pattern}
              </span>
            </div>
            <div className="flashcard-front" style={{ marginTop: '0.5rem' }}>
              {card.question}
            </div>
            {flippedCards.has(index) && (
              <div className="flashcard-back">{card.answer}</div>
            )}
          </div>
        ))}
      </div>

      <div className="solution-box" style={{ marginTop: '2rem' }}>
        <h3 className="section-title" style={{ marginTop: 0 }}>📚 Quick Reference Sheet</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {dsaPatterns.map(pattern => (
            <div key={pattern.id} style={{ padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span>{pattern.icon}</span>
                <strong style={{ fontSize: '0.875rem' }}>{pattern.name}</strong>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {pattern.triggers[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
