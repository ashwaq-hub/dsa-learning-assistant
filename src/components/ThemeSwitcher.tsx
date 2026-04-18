'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { allThemes, getAllThemeNames } from '@/config/themes';

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, isClient } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isClient) return null;

  const themes = getAllThemeNames();

  return (
    <div className="theme-switcher">
      {/* Compact Theme Switcher in Header */}
      <div className="theme-switcher-compact">
        <button
          className="theme-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          title="Change Theme"
          aria-label="Theme switcher"
        >
          <span className="theme-icon">{currentTheme.icon}</span>
          <span className="theme-name">{currentTheme.name}</span>
          <span className="dropdown-arrow">▼</span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="theme-dropdown">
            <div className="theme-dropdown-header">
              <h4>Choose Theme</h4>
              <button
                className="close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close theme menu"
              >
                ✕
              </button>
            </div>

            <div className="theme-grid">
              {themes.map(theme => {
                const themeData = allThemes.find(t => t.id === theme.id);
                const isActive = currentTheme.id === theme.id;

                return (
                  <button
                    key={theme.id}
                    className={`theme-option ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setTheme(theme.id);
                      setIsOpen(false);
                    }}
                    title={themeData?.description}
                  >
                    <div className="theme-preview">
                      {/* Color preview squares */}
                      <div
                        className="color-swatch primary"
                        style={{ backgroundColor: themeData?.colors.primary }}
                      />
                      <div
                        className="color-swatch secondary"
                        style={{ backgroundColor: themeData?.colors.accentBlue }}
                      />
                      <div
                        className="color-swatch accent"
                        style={{ backgroundColor: themeData?.colors.accentPurple }}
                      />
                    </div>
                    <div className="theme-info">
                      <span className="theme-emoji">{theme.icon}</span>
                      <span className="theme-label">{theme.name}</span>
                      {isActive && <span className="active-badge">✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="theme-description">
              {allThemes.find(t => t.id === currentTheme.id)?.description}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .theme-switcher {
          position: relative;
        }

        .theme-switcher-compact {
          position: relative;
        }

        .theme-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--color-card-background);
          border: 1px solid var(--color-border-light);
          border-radius: 0.375rem;
          color: var(--color-text-primary);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .theme-toggle-btn:hover {
          border-color: var(--color-accent-blue);
          background: var(--color-background-alt);
          box-shadow: 0 2px 8px var(--color-shadow);
        }

        .theme-icon {
          font-size: 1.2rem;
        }

        .theme-name {
          display: none;
        }

        .dropdown-arrow {
          font-size: 0.75rem;
          transition: transform 0.2s ease;
        }

        .theme-toggle-btn:hover .dropdown-arrow {
          transform: translateY(2px);
        }

        .theme-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: var(--color-card-background);
          border: 1px solid var(--color-border);
          border-radius: 0.5rem;
          box-shadow: 0 10px 25px var(--color-shadow-dark);
          z-index: 1000;
          min-width: 320px;
          max-width: 420px;
          overflow: hidden;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .theme-dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid var(--color-border-light);
          background: var(--color-background-alt);
        }

        .theme-dropdown-header h4 {
          margin: 0;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          transition: color 0.2s ease;
        }

        .close-btn:hover {
          color: var(--color-text-primary);
        }

        .theme-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          padding: 1rem;
          max-height: 320px;
          overflow-y: auto;
        }

        .theme-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: var(--color-background-alt);
          border: 2px solid var(--color-border-light);
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .theme-option:hover {
          border-color: var(--color-accent-blue);
          background: var(--color-card-background);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px var(--color-shadow);
        }

        .theme-option.active {
          border-color: var(--color-accent-blue);
          background: var(--color-card-background);
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
        }

        .theme-preview {
          display: flex;
          gap: 0.4rem;
          width: 100%;
          height: 32px;
        }

        .color-swatch {
          flex: 1;
          border-radius: 0.25rem;
          border: 1px solid var(--color-border-light);
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .color-swatch:hover {
          transform: scale(1.05);
        }

        .theme-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          width: 100%;
        }

        .theme-emoji {
          font-size: 1.5rem;
        }

        .theme-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text-primary);
          text-align: center;
        }

        .active-badge {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          width: 20px;
          height: 20px;
          background: var(--color-accent-blue);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .theme-description {
          padding: 0.75rem 1rem;
          background: var(--color-background-alt);
          border-top: 1px solid var(--color-border-light);
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          text-align: center;
          font-style: italic;
        }

        /* Scrollbar styling */
        .theme-grid::-webkit-scrollbar {
          width: 6px;
        }

        .theme-grid::-webkit-scrollbar-track {
          background: var(--color-background-alt);
        }

        .theme-grid::-webkit-scrollbar-thumb {
          background: var(--color-border);
          border-radius: 3px;
        }

        .theme-grid::-webkit-scrollbar-thumb:hover {
          background: var(--color-border-light);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .theme-name {
            display: inline;
          }

          .theme-toggle-btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.75rem;
          }

          .theme-dropdown {
            min-width: 280px;
            max-width: 100vw;
            right: -50px;
          }

          .theme-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .theme-dropdown {
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
            top: auto;
            border-radius: 0.75rem 0.75rem 0 0;
            max-width: 100vw;
            margin: 0;
            max-height: 70vh;
          }

          .theme-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
