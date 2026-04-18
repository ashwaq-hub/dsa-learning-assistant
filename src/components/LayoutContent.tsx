'use client';

import { ReactNode } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export default function LayoutContent({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className="nav">
        <div className="container nav-content">
          <div className="nav-brand">
            <span>🧠</span>
            <span>DSA Learning Assistant</span>
          </div>
          <div className="nav-links">
            <a href="/" className="nav-link">Home</a>
            <a href="/patterns" className="nav-link">Patterns</a>
            <a href="/solver" className="nav-link">Problem Solver</a>
            <a href="/flashcards" className="nav-link">Flashcards</a>
            <a href="/interview" className="nav-link">Interview</a>
            <a href="/visual" className="nav-link">Visualize</a>
            <a href="/company" className="nav-link">Companies</a>
          </div>
          <div className="nav-actions">
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
      {children}
      <footer className="footer">
        <p>DSA Learning Assistant — Pattern-driven • Interview-focused • Beginner-friendly</p>
      </footer>
      <style jsx>{`
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .nav-actions {
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}
