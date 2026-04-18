// Simple syntax highlighter for multiple languages
export interface Token {
  type: string;
  value: string;
}

const keywords: Record<string, string[]> = {
  javascript: ['function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'class', 'new', 'this', 'async', 'await', 'import', 'export', 'from', 'default', 'throw', 'try', 'catch', 'finally'],
  python: ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'lambda', 'yield', 'pass', 'break', 'continue', 'in', 'is', 'and', 'or', 'not', 'True', 'False', 'None'],
  java: ['public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends', 'implements', 'new', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'throws', 'this', 'super', 'void', 'int', 'String', 'boolean', 'double', 'float', 'long', 'byte', 'char', 'short'],
  cpp: ['include', 'using', 'namespace', 'std', 'int', 'void', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'class', 'struct', 'public', 'private', 'protected', 'virtual', 'const', 'static', 'template', 'new', 'delete', 'nullptr', 'true', 'false', 'auto'],
  c: ['include', 'int', 'void', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'struct', 'typedef', 'static', 'const', 'char', 'float', 'double', 'long', 'short', 'unsigned', 'signed', 'volatile'],
  go: ['package', 'import', 'func', 'const', 'var', 'type', 'struct', 'interface', 'if', 'else', 'for', 'range', 'switch', 'case', 'default', 'return', 'defer', 'go', 'chan', 'select', 'fallthrough', 'break', 'continue', 'goto', 'import', 'nil', 'true', 'false'],
  csharp: ['using', 'namespace', 'class', 'public', 'private', 'protected', 'static', 'void', 'return', 'if', 'else', 'for', 'foreach', 'while', 'do', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'base', 'virtual', 'override', 'abstract', 'interface', 'struct', 'enum', 'const', 'readonly', 'string', 'int', 'bool', 'double', 'float', 'decimal', 'long', 'true', 'false', 'null']
};

// Language-specific color themes
export const colorThemes: Record<string, Record<string, string>> = {
  javascript: {
    keyword: '#f59e0b',    // Amber
    string: '#10b981',     // Emerald
    number: '#06b6d4',     // Cyan
    comment: '#6b7280',    // Gray
    operator: '#ef4444',   // Red
    identifier: '#e5e7eb', // Light gray
    default: '#e5e7eb',
    whitespace: 'transparent',
  },
  python: {
    keyword: '#a78bfa',    // Purple
    string: '#34d399',     // Green
    number: '#60a5fa',     // Blue
    comment: '#9ca3af',    // Gray
    operator: '#f87171',   // Red
    identifier: '#d1d5db', // Light gray
    default: '#d1d5db',
    whitespace: 'transparent',
  },
  java: {
    keyword: '#ec4899',    // Pink
    string: '#22d3ee',     // Cyan
    number: '#fbbf24',     // Amber
    comment: '#9ca3af',    // Gray
    operator: '#fb7185',   // Rose
    identifier: '#e5e7eb', // Light gray
    default: '#e5e7eb',
    whitespace: 'transparent',
  },
  cpp: {
    keyword: '#8b5cf6',    // Violet
    string: '#4ade80',     // Green
    number: '#2dd4bf',     // Teal
    comment: '#6b7280',    // Gray
    operator: '#f472b6',   // Pink
    identifier: '#d1d5db', // Light gray
    default: '#d1d5db',
    whitespace: 'transparent',
  },
  c: {
    keyword: '#06b6d4',    // Cyan
    string: '#84cc16',     // Lime
    number: '#f43f5e',     // Rose
    comment: '#6b7280',    // Gray
    operator: '#facc15',   // Yellow
    identifier: '#e5e7eb', // Light gray
    default: '#e5e7eb',
    whitespace: 'transparent',
  },
  go: {
    keyword: '#3b82f6',    // Blue
    string: '#14b8a6',     // Teal
    number: '#f59e0b',     // Amber
    comment: '#9ca3af',    // Gray
    operator: '#f97316',   // Orange
    identifier: '#d1d5db', // Light gray
    default: '#d1d5db',
    whitespace: 'transparent',
  },
  csharp: {
    keyword: '#7c3aed',    // Violet
    string: '#06b6d4',     // Cyan
    number: '#ec4899',     // Pink
    comment: '#6b7280',    // Gray
    operator: '#f43f5e',   // Rose
    identifier: '#e5e7eb', // Light gray
    default: '#e5e7eb',
    whitespace: 'transparent',
  },
};

export function highlightCode(code: string, language: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const langKeywords = keywords[language] || keywords.javascript;

  while (i < code.length) {
    const char = code[i];

    // Comments - single line
    if ((char === '/' && code[i + 1] === '/') || (char === '#' && language === 'python')) {
      const endOfLine = code.indexOf('\n', i);
      const commentEnd = endOfLine === -1 ? code.length : endOfLine;
      tokens.push({
        type: 'comment',
        value: code.substring(i, commentEnd),
      });
      i = commentEnd;
      continue;
    }

    // Comments - multi-line
    if (char === '/' && code[i + 1] === '*') {
      const endOfComment = code.indexOf('*/', i + 2);
      const commentEnd = endOfComment === -1 ? code.length : endOfComment + 2;
      tokens.push({
        type: 'comment',
        value: code.substring(i, commentEnd),
      });
      i = commentEnd;
      continue;
    }

    // Strings with double quotes
    if (char === '"') {
      let j = i + 1;
      while (j < code.length && code[j] !== '"') {
        if (code[j] === '\\') j++;
        j++;
      }
      tokens.push({
        type: 'string',
        value: code.substring(i, j + 1),
      });
      i = j + 1;
      continue;
    }

    // Strings with single quotes
    if (char === "'" || char === '`') {
      let j = i + 1;
      while (j < code.length && code[j] !== char) {
        if (code[j] === '\\') j++;
        j++;
      }
      tokens.push({
        type: 'string',
        value: code.substring(i, j + 1),
      });
      i = j + 1;
      continue;
    }

    // Numbers
    if (/\d/.test(char) || (char === '.' && /\d/.test(code[i + 1]))) {
      let j = i;
      while (j < code.length && /[\d.]/.test(code[j])) j++;
      tokens.push({
        type: 'number',
        value: code.substring(i, j),
      });
      i = j;
      continue;
    }

    // Identifiers and keywords
    if (/[a-zA-Z_]/.test(char)) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_]/.test(code[j])) j++;
      const word = code.substring(i, j);
      const isKeyword = langKeywords.some(kw => kw === word);
      tokens.push({
        type: isKeyword ? 'keyword' : 'identifier',
        value: word,
      });
      i = j;
      continue;
    }

    // Operators and special characters
    if (/[+\-*/%=<>!&|^~?:;,.]/.test(char)) {
      let j = i;
      while (j < code.length && /[+\-*/%=<>!&|^~?:;,.]/.test(code[j]) && j - i < 3) {
        j++;
      }
      tokens.push({
        type: 'operator',
        value: code.substring(i, j),
      });
      i = j;
      continue;
    }

    // Whitespace and other characters
    if (/\s/.test(char)) {
      let j = i;
      while (j < code.length && /\s/.test(code[j])) j++;
      tokens.push({
        type: 'whitespace',
        value: code.substring(i, j),
      });
      i = j;
      continue;
    }

    // Everything else
    tokens.push({
      type: 'default',
      value: char,
    });
    i++;
  }

  return tokens;
}
