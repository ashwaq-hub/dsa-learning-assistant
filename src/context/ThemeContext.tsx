'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeColors, themeMap, darkTheme } from '@/config/themes';

interface ThemeContextType {
  currentTheme: ThemeColors;
  setTheme: (themeId: string) => void;
  isClient: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeColors>(darkTheme);
  const [isClient, setIsClient] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setIsClient(true);

    // Get saved theme from localStorage
    const savedThemeId = localStorage.getItem('theme-preference') || 'dark';
    const theme = themeMap[savedThemeId] || darkTheme;
    setCurrentTheme(theme);
    applyTheme(theme);
  }, []);

  const setTheme = (themeId: string) => {
    const theme = themeMap[themeId] || darkTheme;
    setCurrentTheme(theme);
    localStorage.setItem('theme-preference', themeId);
    applyTheme(theme);
  };

  const applyTheme = (theme: ThemeColors) => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const colors = theme.colors;

    // Set CSS variables
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-light', colors.primaryLight);
    root.style.setProperty('--color-primary-dark', colors.primaryDark);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-secondary-light', colors.secondaryLight);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-background-alt', colors.backgroundAlt);
    root.style.setProperty('--color-card-background', colors.cardBackground);
    root.style.setProperty('--color-text-primary', colors.textPrimary);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
    root.style.setProperty('--color-text-tertiary', colors.textTertiary);
    root.style.setProperty('--color-accent-blue', colors.accentBlue);
    root.style.setProperty('--color-accent-purple', colors.accentPurple);
    root.style.setProperty('--color-accent-yellow', colors.accentYellow);
    root.style.setProperty('--color-accent-green', colors.accentGreen);
    root.style.setProperty('--color-accent-red', colors.accentRed);
    root.style.setProperty('--color-border', colors.borderColor);
    root.style.setProperty('--color-border-light', colors.borderColorLight);
    root.style.setProperty('--color-success', colors.success);
    root.style.setProperty('--color-warning', colors.warning);
    root.style.setProperty('--color-error', colors.error);
    root.style.setProperty('--color-info', colors.info);
    root.style.setProperty('--color-shadow', colors.shadow);
    root.style.setProperty('--color-shadow-dark', colors.shadowDark);

    // Update document background
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.textPrimary;
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, isClient }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
