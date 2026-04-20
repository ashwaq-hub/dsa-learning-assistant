export type TopicStatus = 'not-started' | 'in-progress' | 'done';

export interface RoadmapTopic {
  id: string;
  label: string;
  link?: string;
}

export interface RoadmapSection {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  topics: RoadmapTopic[];
  appLink?: string;
  appLinkLabel?: string;
}

export const roadmapSections: RoadmapSection[] = [
  {
    id: 'language',
    title: 'Pick a Language',
    icon: '💻',
    color: '#6366f1',
    description: 'Choose a language you are comfortable with to practice DSA.',
    topics: [
      { id: 'lang-js', label: 'JavaScript' },
      { id: 'lang-py', label: 'Python' },
      { id: 'lang-java', label: 'Java' },
      { id: 'lang-go', label: 'Go' },
      { id: 'lang-cpp', label: 'C++' },
      { id: 'lang-cs', label: 'C#' },
      { id: 'lang-ruby', label: 'Ruby' },
      { id: 'lang-rust', label: 'Rust' },
    ],
    appLink: '/code-editor',
    appLinkLabel: 'Try in Compiler',
  },
  {
    id: 'fundamentals',
    title: 'Programming Fundamentals',
    icon: '📖',
    color: '#8b5cf6',
    description: 'Build a strong foundation before diving into data structures.',
    topics: [
      { id: 'fund-syntax', label: 'Language Syntax' },
      { id: 'fund-control', label: 'Control Structures' },
      { id: 'fund-pseudo', label: 'Pseudo Code' },
      { id: 'fund-functions', label: 'Functions' },
      { id: 'fund-oop', label: 'OOP Basics' },
    ],
  },
  {
    id: 'what-are-ds',
    title: 'What are Data Structures?',
    icon: '🗂️',
    color: '#0ea5e9',
    description: 'Understand what data structures are and why they matter.',
    topics: [
      { id: 'ds-definition', label: 'Definition & Purpose' },
      { id: 'ds-types', label: 'Types of Data Structures' },
      { id: 'ds-abstract', label: 'Abstract Data Types' },
    ],
  },
  {
    id: 'basic-ds',
    title: 'Basic Data Structures',
    icon: '🧱',
    color: '#10b981',
    description: 'The fundamental building blocks used in virtually every algorithm.',
    topics: [
      { id: 'ds-array', label: 'Arrays' },
      { id: 'ds-linked-list', label: 'Linked Lists' },
      { id: 'ds-stack', label: 'Stacks' },
      { id: 'ds-queue', label: 'Queues' },
      { id: 'ds-hash', label: 'Hash Tables' },
    ],
    appLink: '/patterns',
    appLinkLabel: 'See Patterns',
  },
  {
    id: 'complexity',
    title: 'Algorithmic Complexity',
    icon: '📈',
    color: '#f59e0b',
    description: 'Analyze time and space efficiency of algorithms.',
    topics: [
      { id: 'cx-time-space', label: 'Time vs Space Complexity' },
      { id: 'cx-calculate', label: 'How to Calculate Complexity' },
      { id: 'cx-constant', label: 'Constant — O(1)' },
      { id: 'cx-log', label: 'Logarithmic — O(log n)' },
      { id: 'cx-linear', label: 'Linear — O(n)' },
      { id: 'cx-polynomial', label: 'Polynomial — O(n²)' },
      { id: 'cx-exponential', label: 'Exponential — O(2ⁿ)' },
      { id: 'cx-factorial', label: 'Factorial — O(n!)' },
      { id: 'cx-bigo', label: 'Big-O Notation' },
      { id: 'cx-theta', label: 'Big-θ Notation' },
      { id: 'cx-omega', label: 'Big-Ω Notation' },
    ],
    appLink: '/visual',
    appLinkLabel: 'Visualize',
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    icon: '🔢',
    color: '#ef4444',
    description: 'Core sorting techniques every developer should know.',
    topics: [
      { id: 'sort-bubble', label: 'Bubble Sort' },
      { id: 'sort-insertion', label: 'Insertion Sort' },
      { id: 'sort-selection', label: 'Selection Sort' },
      { id: 'sort-merge', label: 'Merge Sort' },
      { id: 'sort-quick', label: 'Quick Sort' },
      { id: 'sort-heap', label: 'Heap Sort' },
    ],
    appLink: '/visual',
    appLinkLabel: 'Visualize',
  },
  {
    id: 'search',
    title: 'Search Algorithms',
    icon: '🔍',
    color: '#06b6d4',
    description: 'Efficiently find elements within data.',
    topics: [
      { id: 'search-linear', label: 'Linear Search' },
      { id: 'search-binary', label: 'Binary Search' },
    ],
    appLink: '/patterns',
    appLinkLabel: 'Binary Search Pattern',
  },
  {
    id: 'trees',
    title: 'Tree Data Structures',
    icon: '🌳',
    color: '#22c55e',
    description: 'Hierarchical structures essential for fast lookups and traversals.',
    topics: [
      { id: 'tree-binary', label: 'Binary Trees' },
      { id: 'tree-bst', label: 'Binary Search Trees' },
      { id: 'tree-avl', label: 'AVL Trees' },
      { id: 'tree-b', label: 'B-Trees' },
      { id: 'tree-inorder', label: 'In-Order Traversal' },
      { id: 'tree-preorder', label: 'Pre-Order Traversal' },
      { id: 'tree-postorder', label: 'Post-Order Traversal' },
      { id: 'tree-bfs', label: 'Breadth First Search (BFS)' },
      { id: 'tree-dfs', label: 'Depth First Search (DFS)' },
    ],
    appLink: '/patterns',
    appLinkLabel: 'DFS/BFS Pattern',
  },
  {
    id: 'graphs',
    title: 'Graph Data Structures',
    icon: '🕸️',
    color: '#a855f7',
    description: 'Model relationships and networks with graph algorithms.',
    topics: [
      { id: 'graph-directed', label: 'Directed Graph' },
      { id: 'graph-undirected', label: 'Undirected Graph' },
      { id: 'graph-bfs', label: 'Graph BFS' },
      { id: 'graph-dfs', label: 'Graph DFS' },
      { id: 'graph-dijkstra', label: "Dijkstra's Algorithm" },
      { id: 'graph-bellman', label: 'Bellman-Ford' },
      { id: 'graph-prim', label: "Prim's (MST)" },
      { id: 'graph-kruskal', label: "Kruskal's (MST)" },
    ],
    appLink: '/patterns',
    appLinkLabel: 'Graph Patterns',
  },
  {
    id: 'advanced-ds',
    title: 'Advanced Data Structures',
    icon: '🚀',
    color: '#f97316',
    description: 'Specialized structures for competitive programming and interviews.',
    topics: [
      { id: 'adv-trie', label: 'Trie' },
      { id: 'adv-segment', label: 'Segment Trees' },
      { id: 'adv-fenwick', label: 'Fenwick Trees (BIT)' },
      { id: 'adv-union-find', label: 'Disjoint Set / Union-Find' },
      { id: 'adv-suffix', label: 'Suffix Trees / Arrays' },
    ],
    appLink: '/patterns',
    appLinkLabel: 'Trie & Union-Find',
  },
  {
    id: 'complex-ds',
    title: 'Complex Data Structures',
    icon: '🏗️',
    color: '#64748b',
    description: 'Advanced structures used in databases and systems.',
    topics: [
      { id: 'cds-23', label: '2-3 Trees' },
      { id: 'cds-bplus', label: 'B+ Trees' },
      { id: 'cds-skip', label: 'Skip List' },
      { id: 'cds-isam', label: 'ISAM' },
    ],
  },
  {
    id: 'indexing',
    title: 'Indexing',
    icon: '📇',
    color: '#84cc16',
    description: 'Techniques to speed up data retrieval.',
    topics: [
      { id: 'idx-linear', label: 'Linear Indexing' },
      { id: 'idx-tree', label: 'Tree-Based Indexing' },
    ],
  },
  {
    id: 'techniques',
    title: 'Problem Solving Techniques',
    icon: '🧠',
    color: '#ec4899',
    description: 'Algorithmic paradigms for tackling complex problems.',
    topics: [
      { id: 'tech-brute', label: 'Brute Force' },
      { id: 'tech-backtrack', label: 'Backtracking' },
      { id: 'tech-greedy', label: 'Greedy Algorithms' },
      { id: 'tech-random', label: 'Randomised Algorithms' },
      { id: 'tech-divide', label: 'Divide and Conquer' },
      { id: 'tech-recursion', label: 'Recursion' },
      { id: 'tech-dp', label: 'Dynamic Programming' },
      { id: 'tech-two-ptr', label: 'Two Pointer Technique' },
      { id: 'tech-sliding', label: 'Sliding Window Technique' },
    ],
    appLink: '/patterns',
    appLinkLabel: 'Practice Patterns',
  },
  {
    id: 'practice',
    title: 'Practice & Interview',
    icon: '🏆',
    color: '#f59e0b',
    description: 'Apply your knowledge on real interview problems.',
    topics: [
      { id: 'prac-leetcode', label: 'LeetCode Practice' },
      { id: 'prac-interview', label: 'Mock Interviews' },
      { id: 'prac-company', label: 'Company-Specific Questions' },
      { id: 'prac-flashcards', label: 'Pattern Flashcards' },
    ],
    appLink: '/interview-studio',
    appLinkLabel: 'Interview Studio',
  },
];
