'use client';

import { useState } from 'react';
import { dsaPatterns, DSAPattern } from '@/data/patterns';

interface ProblemResult {
  pattern: DSAPattern;
  explanation: string;
}

export default function SolverPage() {
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState<ProblemResult | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const classifyProblem = (input: string): ProblemResult | null => {
    const lower = input.toLowerCase();
    
    const rules: { keywords: string[]; patternId: string; explanation: string }[] = [
      {
        keywords: ['duplicate', 'contains duplicate', 'find duplicate'],
        patternId: 'hashing',
        explanation: 'The presence of duplicates triggers HashMap/HashSet for O(1) lookup and frequency counting.'
      },
      {
        keywords: ['pair', 'sum', 'two sum', 'two number', 'sorted'],
        patternId: 'two-pointers',
        explanation: 'Sorted array + pair/sum combination is the classic two pointers trigger. Use left and right pointers moving toward each other.'
      },
      {
        keywords: ['substring', 'subarray', 'window', 'max subarray', 'min subarray', 'longest', 'shortest'],
        patternId: 'sliding-window',
        explanation: 'Substring/Subarray problems with max/min/longest/shortest requirements indicate sliding window pattern.'
      },
      {
        keywords: ['search', 'find', 'target', 'binary'],
        patternId: 'binary-search',
        explanation: 'Search problems on sorted data suggest binary search with O(log n) time complexity.'
      },
      {
        keywords: ['parentheses', 'bracket', 'matching', 'next greater', 'next smaller', 'monotonic'],
        patternId: 'stack',
        explanation: 'Matching pairs or finding next greater/smaller elements indicates stack (LIFO) or monotonic stack pattern.'
      },
      {
        keywords: ['linked', 'list', 'cycle', 'reverse', 'node'],
        patternId: 'linked-list',
        explanation: 'Linked list operations with cycle detection or reversal use slow/fast pointers.'
      },
      {
        keywords: ['tree', 'graph', 'traverse', 'level', 'connected', 'island', 'bfs', 'dfs'],
        patternId: 'dfs-bfs',
        explanation: 'Tree/Graph traversal or finding connected components suggests DFS/BFS with recursion or queue.'
      },
      {
        keywords: ['kth', 'largest', 'smallest', 'top k', 'heap', 'priority', 'median'],
        patternId: 'heap',
        explanation: 'Kth largest/smallest, top K elements, or median problems indicate heap/priority queue pattern.'
      },
      {
        keywords: ['permutation', 'subset', 'combination', 'n-queen', 'generate', 'all'],
        patternId: 'backtracking',
        explanation: 'Generating all possibilities or exploring all combinations triggers backtracking with choose-explore-unchoose pattern.'
      },
      {
        keywords: ['minimum', 'maximum', 'optimal', 'ways', 'cost', 'path', 'climbing', 'coin'],
        patternId: 'dp',
        explanation: 'Problems asking for minimum/maximum cost or counting ways often have optimal substructure → Dynamic Programming.'
      },
      {
        keywords: ['activity', 'schedule', 'interval', 'greedy', 'fractional'],
        patternId: 'greedy',
        explanation: 'Scheduling or interval problems where local optimal leads to global optimal suggest greedy approach.'
      },
      {
        keywords: ['union', 'find', 'disjoint', 'connected components'],
        patternId: 'union-find',
        explanation: 'Dynamic connectivity or grouping elements into components suggests Union-Find (Disjoint Set).'
      },
      {
        keywords: ['prefix', 'trie', 'autocomplete', 'dictionary'],
        patternId: 'trie',
        explanation: 'Prefix-based search or autocomplete problems indicate Trie (prefix tree) structure.'
      },
      {
        keywords: ['bit', 'xor', 'single number', 'power of 2', 'count bit'],
        patternId: 'bitwise',
        explanation: 'Bit manipulation problems involving XOR, bit counting, or power of 2 checks use bitwise operations.'
      }
    ];

    for (const rule of rules) {
      if (rule.keywords.some(keyword => lower.includes(keyword))) {
        const pattern = dsaPatterns.find(p => p.id === rule.patternId);
        if (pattern) {
          return { pattern, explanation: rule.explanation };
        }
      }
    }

    return null;
  };

  const handleSolve = () => {
    const res = classifyProblem(problem);
    setResult(res);
    setShowAnswer(true);
  };

  return (
    <main className="container" style={{ padding: '2rem 1.5rem' }}>
      <h1 className="section-title">🚀 Problem Solver</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Enter a problem description and get instant pattern classification with solution approach.
      </p>

      <div className="solution-box">
        <textarea
          className="problem-input"
          placeholder="Enter problem description... (e.g., 'Find all pairs that sum to target in sorted array')"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          rows={3}
        />
        <button className="btn btn-primary" onClick={handleSolve}>
          🔍 Classify Problem
        </button>
      </div>

      {showAnswer && result && (
        <div className="solution-box">
          <h3 className="section-title" style={{ marginTop: 0 }}>🧩 Pattern Identified</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>{result.pattern.icon}</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
              {result.pattern.name}
            </span>
          </div>

          <h3 className="section-title">🔍 Why This Pattern?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{result.explanation}</p>

          <h3 className="section-title">🧠 Flowchart Reasoning</h3>
          <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {result.pattern.flowchart.map((step, i) => (
              <li key={i} style={{ marginBottom: '0.5rem' }}>{step}</li>
            ))}
          </ol>

          <h3 className="section-title">📊 Visual Diagram</h3>
          <div className="diagram">{result.pattern.asciiDiagram}</div>

          <h3 className="section-title">💡 Code Template</h3>
          <pre style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto' }}>
            {result.pattern.codeTemplate}
          </pre>

          <h3 className="section-title">⏱️ Complexity</h3>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
            <div>
              <strong style={{ color: 'var(--accent-green)' }}>Time:</strong> {result.pattern.timeComplexity}
            </div>
            <div>
              <strong style={{ color: 'var(--accent-cyan)' }}>Space:</strong> {result.pattern.spaceComplexity}
            </div>
          </div>

          <h3 className="section-title">📝 Similar Problems</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {result.pattern.exampleProblems.map((prob, i) => (
              <span key={i} className={`tag tag-${prob.difficulty.toLowerCase()}`}>{prob.name}</span>
            ))}
          </div>
        </div>
      )}

      {showAnswer && !result && (
        <div className="solution-box" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤔</div>
          <h3>Could not classify this problem</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Try adding keywords like "sorted", "duplicate", "maximum", etc.
          </p>
        </div>
      )}
    </main>
  );
}
