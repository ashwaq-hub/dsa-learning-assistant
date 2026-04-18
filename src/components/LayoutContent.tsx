'use client';

import { ReactNode, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import ThemeSwitcher from './ThemeSwitcher';

export default function LayoutContent({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="nav">
        <div className="container nav-content">
          <div className="nav-brand">
            <span>🧠</span>
            <span className="brand-text">DSA Learning Assistant</span>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links-desktop">
            <a href="/" className="nav-link">🏠 Home</a>
            <a href="/patterns" className="nav-link">📚 Patterns</a>
            <a href="/solver" className="nav-link">🔧 Solver</a>
            <a href="/flashcards" className="nav-link">🎴 Cards</a>
            <a href="/interview" className="nav-link">💼 Interview</a>
            <a href="/interview-studio" className="nav-link nav-link-studio">🎤 Studio</a>
            <a href="/visual" className="nav-link">📊 Visualize</a>
            <a href="/code-editor" className="nav-link">💻 Compiler</a>
            <a href="/company" className="nav-link">🏢 Companies</a>
            <a href="/admin" className="nav-link nav-link-admin">⚙️ Admin</a>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            className="hamburger"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={mobileMenuOpen ? 'open' : ''}></span>
            <span className={mobileMenuOpen ? 'open' : ''}></span>
            <span className={mobileMenuOpen ? 'open' : ''}></span>
          </button>

          {/* Theme Switcher + User */}
          <div className="nav-actions">
            <ThemeSwitcher />
            {session?.user && (
              <>
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={32}
                    height={32}
                    className="user-avatar"
                  />
                )}
                <button
                  className="btn-signout"
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  title={`Sign out (${session.user.email})`}
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="nav-links-mobile">
            <a href="/" className="nav-link-mobile" onClick={closeMobileMenu}>🏠 Home</a>
            <a href="/patterns" className="nav-link-mobile" onClick={closeMobileMenu}>📚 Patterns</a>
            <a href="/solver" className="nav-link-mobile" onClick={closeMobileMenu}>🔧 Solver</a>
            <a href="/flashcards" className="nav-link-mobile" onClick={closeMobileMenu}>🎴 Flashcards</a>
            <a href="/interview" className="nav-link-mobile" onClick={closeMobileMenu}>💼 Interview</a>
            <a href="/interview-studio" className="nav-link-mobile nav-link-studio-mobile" onClick={closeMobileMenu}>🎤 Interview Studio</a>
            <a href="/visual" className="nav-link-mobile" onClick={closeMobileMenu}>📊 Visualize</a>
            <a href="/code-editor" className="nav-link-mobile" onClick={closeMobileMenu}>💻 Code Compiler</a>
            <a href="/company" className="nav-link-mobile" onClick={closeMobileMenu}>🏢 Companies</a>
            <a href="/admin" className="nav-link-mobile nav-link-admin-mobile" onClick={closeMobileMenu}>⚙️ Admin</a>
          </div>
        )}
      </nav>
      {children}
      <footer className="footer">
        <p>DSA Learning Assistant — Pattern-driven • Interview-focused • Beginner-friendly</p>
      </footer>
      <style jsx>{`
        .nav-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--accent-blue);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .brand-text {
          display: inline;
        }

        .nav-links-desktop {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          flex: 1;
        }

        .nav-link {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .nav-link:hover {
          background: var(--bg-card);
          color: var(--text-primary);
        }

        .nav-link-admin {
          color: var(--accent-purple);
          font-weight: 600;
        }

        .nav-link-admin:hover {
          background: rgba(218, 112, 214, 0.1);
          color: var(--accent-purple);
        }

        .nav-link-studio {
          color: #ff6b6b;
          font-weight: 600;
        }

        .nav-link-studio:hover {
          background: rgba(255, 107, 107, 0.1);
          color: #ff6b6b;
        }

        /* Hamburger Menu - Hidden on Desktop */
        .hamburger {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          gap: 0.35rem;
          z-index: 101;
        }

        .hamburger span {
          width: 24px;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger span.open:nth-child(1) {
          transform: rotate(45deg) translate(8px, 8px);
        }

        .hamburger span.open:nth-child(2) {
          opacity: 0;
        }

        .hamburger span.open:nth-child(3) {
          transform: rotate(-45deg) translate(8px, -8px);
        }

        /* Mobile Navigation - Hidden on Desktop */
        .nav-links-mobile {
          display: none;
          flex-direction: column;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          padding: 1rem 0;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 100;
        }

        .nav-link-mobile {
          padding: 0.75rem 1.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
          display: block;
        }

        .nav-link-mobile:hover {
          background: var(--bg-card);
          color: var(--text-primary);
          padding-left: 2rem;
        }

        .nav-link-admin-mobile {
          color: var(--accent-purple);
          font-weight: 600;
          border-top: 1px solid var(--border-color);
          margin-top: 0.5rem;
          padding-top: 0.75rem;
        }

        .nav-link-admin-mobile:hover {
          background: rgba(218, 112, 214, 0.1);
          color: var(--accent-purple);
        }

        .nav-link-studio-mobile {
          color: #ff6b6b;
          font-weight: 600;
        }

        .nav-link-studio-mobile:hover {
          background: rgba(255, 107, 107, 0.1);
          color: #ff6b6b;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        :global(.user-avatar) {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--border-color);
          object-fit: cover;
          flex-shrink: 0;
        }

        .btn-signout {
          padding: 0.375rem 0.75rem;
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          font-family: inherit;
        }

        .btn-signout:hover {
          border-color: var(--accent-red);
          color: var(--accent-red);
          background: rgba(239, 68, 68, 0.05);
        }

        /* Tablet (768px and below) */
        @media (max-width: 768px) {
          .brand-text {
            display: none;
          }

          .nav-brand {
            font-size: 1.5rem;
          }

          .nav-links-desktop {
            display: none;
          }

          .hamburger {
            display: flex;
          }

          .nav-links-mobile {
            display: flex;
          }

          .nav-actions {
            gap: 0.5rem;
          }
        }

        /* Mobile (480px and below) */
        @media (max-width: 480px) {
          .nav-content {
            gap: 1rem;
          }

          .nav-actions {
            gap: 0.25rem;
          }
        }
      `}</style>
    </>
  );
}
