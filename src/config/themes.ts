// Theme Configuration with Beautiful Color Schemes
// Includes: Apple, Microsoft, Dark, Light, Ocean, Forest, Sunset themes

export interface ThemeColors {
  name: string;
  id: string;
  description: string;
  icon: string;
  colors: {
    // Primary colors
    primary: string;
    primaryLight: string;
    primaryDark: string;

    // Secondary colors
    secondary: string;
    secondaryLight: string;

    // Backgrounds
    background: string;
    backgroundAlt: string;
    cardBackground: string;

    // Text
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;

    // Accents
    accentBlue: string;
    accentPurple: string;
    accentYellow: string;
    accentGreen: string;
    accentRed: string;

    // Borders
    borderColor: string;
    borderColorLight: string;

    // Status colors
    success: string;
    warning: string;
    error: string;
    info: string;

    // Additional
    shadow: string;
    shadowDark: string;
  };
}

// Apple Theme - Minimalist, Clean, Professional
export const appleTheme: ThemeColors = {
  name: 'Apple',
  id: 'apple',
  description: 'Minimalist and elegant, inspired by Apple design',
  icon: '🍎',
  colors: {
    primary: '#000000',
    primaryLight: '#1a1a1a',
    primaryDark: '#000000',
    secondary: '#f5f5f7',
    secondaryLight: '#ffffff',
    background: '#ffffff',
    backgroundAlt: '#f5f5f7',
    cardBackground: '#ffffff',
    textPrimary: '#1d1d1f',
    textSecondary: '#424245',
    textTertiary: '#86868b',
    accentBlue: '#0071e3',
    accentPurple: '#a16fdc',
    accentYellow: '#f9a825',
    accentGreen: '#34c759',
    accentRed: '#ff3b30',
    borderColor: '#d2d2d7',
    borderColorLight: '#e8e8ed',
    success: '#34c759',
    warning: '#f9a825',
    error: '#ff3b30',
    info: '#0071e3',
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowDark: 'rgba(0, 0, 0, 0.2)',
  },
};

// Microsoft Theme - Bold, Modern, Professional
export const microsoftTheme: ThemeColors = {
  name: 'Microsoft',
  id: 'microsoft',
  description: 'Bold and modern, inspired by Microsoft Fluent Design',
  icon: '⬜',
  colors: {
    primary: '#0078d4',
    primaryLight: '#106ebe',
    primaryDark: '#005a9e',
    secondary: '#e7e5e4',
    secondaryLight: '#faf9f8',
    background: '#ffffff',
    backgroundAlt: '#f3f2f1',
    cardBackground: '#ffffff',
    textPrimary: '#323130',
    textSecondary: '#605e5c',
    textTertiary: '#8a8886',
    accentBlue: '#0078d4',
    accentPurple: '#9d2b7b',
    accentYellow: '#ffb900',
    accentGreen: '#107c10',
    accentRed: '#d13438',
    borderColor: '#d0d0d0',
    borderColorLight: '#f0f0f0',
    success: '#107c10',
    warning: '#ffb900',
    error: '#d13438',
    info: '#0078d4',
    shadow: 'rgba(0, 0, 0, 0.12)',
    shadowDark: 'rgba(0, 0, 0, 0.2)',
  },
};

// Dark Mode - Modern Dark Theme
export const darkTheme: ThemeColors = {
  name: 'Dark',
  id: 'dark',
  description: 'Modern dark theme for reduced eye strain',
  icon: '🌙',
  colors: {
    primary: '#1e90ff',
    primaryLight: '#4da3ff',
    primaryDark: '#0078d4',
    secondary: '#2a2a2a',
    secondaryLight: '#3a3a3a',
    background: '#0d0d0d',
    backgroundAlt: '#1a1a1a',
    cardBackground: '#1e1e1e',
    textPrimary: '#ffffff',
    textSecondary: '#b0b0b0',
    textTertiary: '#808080',
    accentBlue: '#1e90ff',
    accentPurple: '#da70d6',
    accentYellow: '#ffd700',
    accentGreen: '#00ff00',
    accentRed: '#ff6b6b',
    borderColor: '#404040',
    borderColorLight: '#2a2a2a',
    success: '#00ff00',
    warning: '#ffd700',
    error: '#ff6b6b',
    info: '#1e90ff',
    shadow: 'rgba(0, 0, 0, 0.5)',
    shadowDark: 'rgba(0, 0, 0, 0.8)',
  },
};

// Light Mode - Classic Light Theme
export const lightTheme: ThemeColors = {
  name: 'Light',
  id: 'light',
  description: 'Clean and bright light theme',
  icon: '☀️',
  colors: {
    primary: '#0066cc',
    primaryLight: '#3399ff',
    primaryDark: '#0052a3',
    secondary: '#f0f0f0',
    secondaryLight: '#ffffff',
    background: '#ffffff',
    backgroundAlt: '#f5f5f5',
    cardBackground: '#ffffff',
    textPrimary: '#000000',
    textSecondary: '#666666',
    textTertiary: '#999999',
    accentBlue: '#0066cc',
    accentPurple: '#9966ff',
    accentYellow: '#ffcc00',
    accentGreen: '#00cc66',
    accentRed: '#ff3333',
    borderColor: '#dddddd',
    borderColorLight: '#eeeeee',
    success: '#00cc66',
    warning: '#ffcc00',
    error: '#ff3333',
    info: '#0066cc',
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowDark: 'rgba(0, 0, 0, 0.15)',
  },
};

// Ocean Theme - Calming Blues and Greens
export const oceanTheme: ThemeColors = {
  name: 'Ocean',
  id: 'ocean',
  description: 'Calming ocean-inspired theme with blues and teals',
  icon: '🌊',
  colors: {
    primary: '#0ea5e9',
    primaryLight: '#38bdf8',
    primaryDark: '#0284c7',
    secondary: '#ecf0f1',
    secondaryLight: '#ffffff',
    background: '#f0f9ff',
    backgroundAlt: '#e0f2fe',
    cardBackground: '#ffffff',
    textPrimary: '#0c2340',
    textSecondary: '#164e63',
    textTertiary: '#94a3b8',
    accentBlue: '#0ea5e9',
    accentPurple: '#7c3aed',
    accentYellow: '#eab308',
    accentGreen: '#10b981',
    accentRed: '#ef4444',
    borderColor: '#bae6fd',
    borderColorLight: '#cffafe',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#0ea5e9',
    shadow: 'rgba(15, 98, 168, 0.1)',
    shadowDark: 'rgba(15, 98, 168, 0.2)',
  },
};

// Forest Theme - Natural Greens and Browns
export const forestTheme: ThemeColors = {
  name: 'Forest',
  id: 'forest',
  description: 'Natural forest-inspired theme with greens and earth tones',
  icon: '🌲',
  colors: {
    primary: '#059669',
    primaryLight: '#10b981',
    primaryDark: '#047857',
    secondary: '#ecfdf5',
    secondaryLight: '#f0fdf4',
    background: '#f0fdf4',
    backgroundAlt: '#dcfce7',
    cardBackground: '#ffffff',
    textPrimary: '#064e3b',
    textSecondary: '#166534',
    textTertiary: '#4b5563',
    accentBlue: '#0891b2',
    accentPurple: '#8b5cf6',
    accentYellow: '#d97706',
    accentGreen: '#059669',
    accentRed: '#dc2626',
    borderColor: '#a7f3d0',
    borderColorLight: '#bbf7d0',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#0891b2',
    shadow: 'rgba(5, 150, 105, 0.1)',
    shadowDark: 'rgba(5, 150, 105, 0.2)',
  },
};

// Sunset Theme - Warm Oranges and Purples
export const sunsetTheme: ThemeColors = {
  name: 'Sunset',
  id: 'sunset',
  description: 'Warm and inspiring sunset-inspired theme',
  icon: '🌅',
  colors: {
    primary: '#f97316',
    primaryLight: '#fb923c',
    primaryDark: '#ea580c',
    secondary: '#fed7aa',
    secondaryLight: '#ffedd5',
    background: '#fffbeb',
    backgroundAlt: '#fef3c7',
    cardBackground: '#ffffff',
    textPrimary: '#7c2d12',
    textSecondary: '#92400e',
    textTertiary: '#a16207',
    accentBlue: '#3b82f6',
    accentPurple: '#a855f7',
    accentYellow: '#fbbf24',
    accentGreen: '#10b981',
    accentRed: '#f87171',
    borderColor: '#fed7aa',
    borderColorLight: '#fef08a',
    success: '#10b981',
    warning: '#f97316',
    error: '#f87171',
    info: '#3b82f6',
    shadow: 'rgba(249, 115, 22, 0.1)',
    shadowDark: 'rgba(249, 115, 22, 0.2)',
  },
};

// Purple Dream Theme - Elegant Purples
export const purpleDreamTheme: ThemeColors = {
  name: 'Purple Dream',
  id: 'purple-dream',
  description: 'Elegant and creative purple-themed design',
  icon: '💜',
  colors: {
    primary: '#8b5cf6',
    primaryLight: '#a78bfa',
    primaryDark: '#7c3aed',
    secondary: '#f3e8ff',
    secondaryLight: '#faf5ff',
    background: '#faf5ff',
    backgroundAlt: '#f3e8ff',
    cardBackground: '#ffffff',
    textPrimary: '#4c1d95',
    textSecondary: '#6b21a8',
    textTertiary: '#a0aec0',
    accentBlue: '#6366f1',
    accentPurple: '#8b5cf6',
    accentYellow: '#eab308',
    accentGreen: '#ec4899',
    accentRed: '#f472b6',
    borderColor: '#d8b4fe',
    borderColorLight: '#e9d5ff',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#f472b6',
    info: '#8b5cf6',
    shadow: 'rgba(139, 92, 246, 0.1)',
    shadowDark: 'rgba(139, 92, 246, 0.2)',
  },
};

// Cyberpunk Theme - High Contrast, Bold Colors
export const cyberpunkTheme: ThemeColors = {
  name: 'Cyberpunk',
  id: 'cyberpunk',
  description: 'High-contrast cyberpunk-inspired theme',
  icon: '⚡',
  colors: {
    primary: '#00ffff',
    primaryLight: '#00ffff',
    primaryDark: '#00cccc',
    secondary: '#ff00ff',
    secondaryLight: '#ff33ff',
    background: '#0a0e27',
    backgroundAlt: '#1a1e3f',
    cardBackground: '#16213e',
    textPrimary: '#00ffff',
    textSecondary: '#00dddd',
    textTertiary: '#0088ff',
    accentBlue: '#0088ff',
    accentPurple: '#ff00ff',
    accentYellow: '#ffff00',
    accentGreen: '#00ff00',
    accentRed: '#ff0055',
    borderColor: '#00ffff',
    borderColorLight: '#00ffff',
    success: '#00ff00',
    warning: '#ffff00',
    error: '#ff0055',
    info: '#00ffff',
    shadow: 'rgba(0, 255, 255, 0.2)',
    shadowDark: 'rgba(0, 255, 255, 0.4)',
  },
};

// Export all themes
export const allThemes: ThemeColors[] = [
  lightTheme,
  darkTheme,
  appleTheme,
  microsoftTheme,
  oceanTheme,
  forestTheme,
  sunsetTheme,
  purpleDreamTheme,
  cyberpunkTheme,
];

// Export theme map for easy access
export const themeMap: Record<string, ThemeColors> = {
  light: lightTheme,
  dark: darkTheme,
  apple: appleTheme,
  microsoft: microsoftTheme,
  ocean: oceanTheme,
  forest: forestTheme,
  sunset: sunsetTheme,
  'purple-dream': purpleDreamTheme,
  cyberpunk: cyberpunkTheme,
};

// Get theme by ID
export function getThemeById(id: string): ThemeColors {
  return themeMap[id] || darkTheme;
}

// Get all theme names for display
export function getAllThemeNames(): Array<{ id: string; name: string; icon: string }> {
  return allThemes.map(theme => ({
    id: theme.id,
    name: theme.name,
    icon: theme.icon,
  }));
}
