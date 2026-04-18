export interface DSAPattern {
  id: string;
  name: string;
  icon: string;
  triggers: string[];
  template: string;
  timeComplexity: string;
  spaceComplexity: string;
  asciiDiagram: string;
  exampleProblems: {
    name: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    solution: string;
  }[];
  codeTemplate: string;
  flowchart: string[];
}

export const dsaPatterns: DSAPattern[] = [
  {
    id: 'hashing',
    name: 'Hashing',
    icon: '🔐',
    triggers: [
      'Lookup/duplicates',
      'Frequency counting',
      'Caching needed',
      'O(1) lookup required'
    ],
    template: 'HashMap/HashSet operations',
    timeComplexity: 'O(1) average',
    spaceComplexity: 'O(n)',
    asciiDiagram: `
    ┌─────────┐     ┌─────────────────┐
    │  Key    │────▶│     Value       │
    ├─────────┤     ├─────────────────┤
    │  "a"    │────▶│       1         │
    │  "b"    │────▶│       2         │
    │  "c"    │────▶│       3         │
    └─────────┘     └─────────────────┘
    `,
    exampleProblems: [
      { name: 'Contains Duplicate', difficulty: 'Easy', solution: 'HashSet.add() → check contains' },
      { name: 'Two Sum', difficulty: 'Easy', solution: 'complement = target - num' },
      { name: 'Valid Anagram', difficulty: 'Easy', solution: 'char frequency match' }
    ],
    codeTemplate: `// HashMap approach
Map<Type, Type> map = new HashMap<>();
for (item : collection) {
    map.put(key, map.getOrDefault(key, 0) + 1);
}`,
    flowchart: [
      '1. Create HashMap/HashSet',
      '2. Iterate through array',
      '3. For each element, check/insert',
      '4. Return based on condition'
    ]
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    icon: '👆👇',
    triggers: [
      'Sorted array',
      'Pairs/Sum problems',
      'Palindrome check',
      'Partition array'
    ],
    template: 'left++, right-- OR left++, right++',
    timeComplexity: 'O(n) or O(n²)',
    spaceComplexity: 'O(1)',
    asciiDiagram: `
    Array: [1, 2, 3, 4, 5]
            ↑           ↑
          left        right
    
    Movement:
    [1, 2, 3, 4, 5]  →  shrink
    [1, 2, 3, 4, 5]  ←  expand
    `,
    exampleProblems: [
      { name: 'Valid Palindrome', difficulty: 'Easy', solution: 'two pointers from ends' },
      { name: '3Sum', difficulty: 'Medium', solution: 'sort + two pointers' },
      { name: 'Container With Most Water', difficulty: 'Medium', solution: 'two pointers from edges' }
    ],
    codeTemplate: `// Two pointers on sorted array
int left = 0, right = arr.length - 1;
while (left < right) {
    int sum = arr[left] + arr[right];
    // process sum
    if (sum < target) left++;
    else right--;
}`,
    flowchart: [
      '1. Initialize left=0, right=n-1',
      '2. While left < right',
      '3. Calculate result',
      '4. Adjust pointers based on condition'
    ]
  },
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    icon: '🪟',
    triggers: [
      'Substring/Subarray problems',
      'Max/Min of subarray',
      'Longest/Shortest sequence',
      'Fixed size window'
    ],
    template: 'expand window → shrink window',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) or O(k)',
    asciiDiagram: `
    String: "abcde"
            ┌─────┐
    Window:  "abc"  (size=3)
            ↓↓↓↓↓↓
    [a][b][c][d][e]
      ↑       ↑
     left   right
    `,
    exampleProblems: [
      { name: 'Maximum Average Subarray', difficulty: 'Easy', solution: 'fixed window size k' },
      { name: 'Longest Substring Without Repeating', difficulty: 'Medium', solution: 'dynamic window' },
      { name: 'Minimum Window Substring', difficulty: 'Hard', solution: 'expand + shrink' }
    ],
    codeTemplate: `// Sliding window pattern
int left = 0, result = 0;
Map<Character, Integer> count = new HashMap<>();

for (int right = 0; right < s.length(); right++) {
    // expand window
    char c = s.charAt(right);
    count.put(c, count.getOrDefault(c, 0) + 1);
    
    // shrink window
    while (condition violated) {
        char leftChar = s.charAt(left++);
        count.put(leftChar, count.get(leftChar) - 1);
    }
    
    result = Math.max(result, right - left + 1);
}`,
    flowchart: [
      '1. Initialize left=0',
      '2. Expand right pointer',
      '3. Add element to window',
      '4. While window invalid → shrink',
      '5. Update answer'
    ]
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    icon: '🔍',
    triggers: [
      'Sorted array',
      'Find target',
      'Search space',
      'Min/Max with condition'
    ],
    template: 'mid = (lo + hi) / 2',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    asciiDiagram: `
        Search Space
    ┌───────────────────┐
    │ 1  2  3  4  5  6  7  │
    └───────────────────┘
            ▲
          mid
        /     \\
    ┌─────┐   ┌─────┐
    │ lo  │   │ hi  │
    │mid+1│   │mid-1│
    └─────┘   └─────┘
    `,
    exampleProblems: [
      { name: 'Binary Search', difficulty: 'Easy', solution: 'standard binary search' },
      { name: 'Search in Rotated Array', difficulty: 'Medium', solution: 'modified binary search' },
      { name: 'Median of Two Sorted Arrays', difficulty: 'Hard', solution: 'partition-based' }
    ],
    codeTemplate: `// Binary search template
int lo = 0, hi = arr.length - 1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
}
return -1;`,
    flowchart: [
      '1. Set lo=0, hi=n-1',
      '2. While lo <= hi',
      '3. Calculate mid',
      '4. Compare arr[mid] with target',
      '5. Adjust lo or hi'
    ]
  },
  {
    id: 'stack',
    name: 'Stack / Monotonic Stack',
    icon: '📚',
    triggers: [
      'Matching parentheses',
      'Next greater/smaller element',
      'Monotonic sequence',
      'LIFO processing'
    ],
    template: 'push → process → pop',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    asciiDiagram: `
    Stack Operations:
    
    push(3)     pop()     
    ┌───┐      ┌───┐
    │ 3 │  ←   │   │  → 3
    ├───┤      ├───┤
    │ 2 │      │ 2 │
    ├───┤      ├───┤
    │ 1 │      │ 1 │
    └───┘      └───┘
    
    Monotonic Decreasing Stack:
    [5, 3, 1, 4, 2]
     ↓ ↓ ↓ ↓ ↓
     3 1 1 2 2  (indices)
    `,
    exampleProblems: [
      { name: 'Valid Parentheses', difficulty: 'Easy', solution: 'stack matching' },
      { name: 'Next Greater Element', difficulty: 'Medium', solution: 'monotonic stack' },
      { name: 'Largest Rectangle in Histogram', difficulty: 'Hard', solution: 'monotonic stack' }
    ],
    codeTemplate: `// Monotonic Stack (Next Greater)
Stack<Integer> stack = new Stack<>();
int[] result = new int[arr.length];

for (int i = 0; i < arr.length; i++) {
    while (!stack.isEmpty() && arr[stack.peek()] < arr[i]) {
        result[stack.pop()] = arr[i];
    }
    stack.push(i);
}
while (!stack.isEmpty()) {
    result[stack.pop()] = -1;
}`,
    flowchart: [
      '1. Initialize empty stack',
      '2. Iterate through elements',
      '3. While stack not empty AND current > stack top',
      '4. Process and pop stack',
      '5. Push current index'
    ]
  },
  {
    id: 'linked-list',
    name: 'Linked List',
    icon: '🔗',
    triggers: [
      'Sequential traversal',
      'Add/Remove nodes',
      'Cycle detection',
      'Reversal needed'
    ],
    template: 'slow.next, fast.next.next',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    asciiDiagram: `
    Linked List Structure:
    
    ┌───┐    ┌───┐    ┌───┐    ┌───┐
    │ 1 │ ──▶│ 2 │ ──▶│ 3 │ ──▶│ 4 │ ──▶ null
    └───┘    └───┘    └───┘    └───┘
      ↑
    head
    
    Slow & Fast Pointers:
    slow: moves 1 step
    fast: moves 2 steps
    
    ┌───┐         ┌───┐
    │ S │    ┌───┐│ F │
    └───┘───▶│   │└───┘
             └───┘
    `,
    exampleProblems: [
      { name: 'Reverse Linked List', difficulty: 'Easy', solution: 'prev, curr, next pointers' },
      { name: 'Merge Two Sorted Lists', difficulty: 'Easy', solution: 'dummy head + merge' },
      { name: 'Linked List Cycle II', difficulty: 'Medium', solution: 'Floyd cycle detection' }
    ],
    codeTemplate: `// Reverse Linked List
ListNode prev = null, curr = head;
while (curr != null) {
    ListNode next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
}
return prev; // new head`,
    flowchart: [
      '1. Initialize prev=null, curr=head',
      '2. While curr != null',
      '3. Save curr.next',
      '4. Reverse pointer',
      '5. Move prev and curr forward'
    ]
  },
  {
    id: 'dfs-bfs',
    name: 'DFS / BFS',
    icon: '🌲',
    triggers: [
      'Tree/Graph traversal',
      'Level order',
      'Path finding',
      'Connected components'
    ],
    template: 'DFS: stack/recursion | BFS: queue',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    asciiDiagram: `
    Tree Structure:
            1
           / \\
          2   3
         / \\   \\
        4   5   6
    
    DFS (Preorder): 1 → 2 → 4 → 5 → 3 → 6
    BFS (Level):    1 → 2 → 3 → 4 → 5 → 6
    
    DFS:  Stack: [1]
          Pop 1, Push children: [3, 2]
          Pop 2, Push children: [3, 5, 4]
    
    BFS:  Queue: [1]
          Dequeue 1, Enqueue children: [2, 3]
          Dequeue 2, Enqueue children: [3, 4, 5]
    `,
    exampleProblems: [
      { name: 'Maximum Depth of Binary Tree', difficulty: 'Easy', solution: 'DFS recursion or BFS' },
      { name: 'Number of Islands', difficulty: 'Medium', solution: 'DFS/BFS on grid' },
      { name: 'Word Ladder', difficulty: 'Hard', solution: 'BFS shortest path' }
    ],
    codeTemplate: `// DFS
void dfs(Node node, Set<Node> visited) {
    if (node == null || visited.contains(node)) return;
    visited.add(node);
    process(node);
    for (Node neighbor : node.neighbors) {
        dfs(neighbor, visited);
    }
}

// BFS
void bfs(Node start) {
    Queue<Node> q = new LinkedList<>();
    Set<Node> visited = new HashSet<>();
    q.offer(start);
    visited.add(start);
    
    while (!q.isEmpty()) {
        Node node = q.poll();
        process(node);
        for (Node neighbor : node.neighbors) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                q.offer(neighbor);
            }
        }
    }
}`,
    flowchart: [
      '1. Initialize visited set',
      '2. For DFS: use stack or recursion',
      '3. For BFS: use queue',
      '4. Process current node',
      '5. Explore unvisited neighbors'
    ]
  },
  {
    id: 'heap',
    name: 'Heap / Priority Queue',
    icon: '🏔️',
    triggers: [
      'Kth largest/smallest',
      'Top K elements',
      'Median finder',
      'Merging sorted lists'
    ],
    template: 'PriorityQueue with comparator',
    timeComplexity: 'O(log n) per operation',
    spaceComplexity: 'O(k)',
    asciiDiagram: `
    Max Heap Structure:
    
           9
         /   \\
        7     8
       / \\   / \\
      3   6 5   7
    
    Array: [9, 7, 8, 3, 6, 5, 7]
    
    Parent at i:
      children at 2i+1, 2i+2
    
    Heapify Up/Down:
    
         5              9
        / \\    →      / \\
       9   3         5   3
    `,
    exampleProblems: [
      { name: 'Kth Largest Element', difficulty: 'Medium', solution: 'min-heap of size k' },
      { name: 'Top K Frequent Elements', difficulty: 'Medium', solution: 'freq map + heap' },
      { name: 'Find Median from Data Stream', difficulty: 'Hard', solution: 'two heaps' }
    ],
    codeTemplate: `// Kth largest using min-heap
PriorityQueue<Integer> minHeap = 
    new PriorityQueue<>(k);
    
for (int num : nums) {
    minHeap.offer(num);
    if (minHeap.size() > k) {
        minHeap.poll();
    }
}
return minHeap.peek();

// Median finder with two heaps
PriorityQueue<Integer> maxHeap = 
    new PriorityQueue<>(Collections.reverseOrder());
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

public void addNum(int num) {
    maxHeap.offer(num);
    minHeap.offer(maxHeap.poll());
    if (maxHeap.size() < minHeap.size()) {
        maxHeap.offer(minHeap.poll());
    }
}`,
    flowchart: [
      '1. Create min-heap of size k',
      '2. For each element',
      '3. Add to heap',
      '4. If size > k, remove smallest',
      '5. Return heap root'
    ]
  },
  {
    id: 'backtracking',
    name: 'Backtracking',
    icon: '↩️',
    triggers: [
      'Generate all possibilities',
      'Subset/Permutation problems',
      'N-Queens, Sudoku',
      'Path with constraints'
    ],
    template: 'choose → explore → unchoose',
    timeComplexity: 'O(n!) worst case',
    spaceComplexity: 'O(n)',
    asciiDiagram: `
    Backtracking Tree:
    
           []
         /  |  \\
        [1] [2] [3]
       / \\   |
      [1,2][1,3][2,3]
       |
     [1,2,3]
    
    At each node:
    - Choose an option
    - Recurse deeper
    - Undo choice (backtrack)
    `,
    exampleProblems: [
      { name: 'Subsets', difficulty: 'Medium', solution: 'recursion with decision tree' },
      { name: 'Permutations', difficulty: 'Medium', solution: 'swap-based backtrack' },
      { name: 'N-Queens', difficulty: 'Hard', solution: 'placement validation' }
    ],
    codeTemplate: `// Subsets (Backtracking)
void backtrack(int[] nums, int start, List<Integer> current) {
    result.add(new ArrayList<>(current));
    
    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);        // choose
        backtrack(nums, i + 1, current);  // explore
        current.remove(current.size() - 1); // unchoose
    }
}

// Permutations
void permute(int[] nums, int start) {
    if (start == nums.length) {
        result.add(Arrays.copyOf(nums, nums.length));
        return;
    }
    for (int i = start; i < nums.length; i++) {
        swap(nums, start, i);
        permute(nums, start + 1);
        swap(nums, start, i); // backtrack
    }
}`,
    flowchart: [
      '1. At each step, choose an option',
      '2. Recurse to explore',
      '3. If solution complete, record',
      '4. Undo choice (backtrack)',
      '5. Try next option'
    ]
  },
  {
    id: 'dp',
    name: 'Dynamic Programming',
    icon: '📊',
    triggers: [
      'Optimal substructure',
      'Overlapping subproblems',
      'Min/Max cost path',
      'Count ways to achieve'
    ],
    template: 'DP[i] = f(DP[j]) + cost',
    timeComplexity: 'O(n) to O(n²)',
    spaceComplexity: 'O(n) to O(n²)',
    asciiDiagram: `
    DP State Transitions:
    
    DP[i][j] ─────────────────▶ DP[i+1][j]
        │                           │
        ▼                           ▼
    DP[i][j+1] ─────────────────▶ DP[i+1][j+1]
    
    Fibonacci Example:
    
    dp[0]=0, dp[1]=1
    dp[2]=dp[1]+dp[0]=1
    dp[3]=dp[2]+dp[1]=2
    dp[4]=dp[3]+dp[2]=3
    
    0 → 1 → 1 → 2 → 3 → 5 ...
    `,
    exampleProblems: [
      { name: 'Climbing Stairs', difficulty: 'Easy', solution: 'fibonacci dp' },
      { name: 'Coin Change', difficulty: 'Medium', solution: '1D/2D DP' },
      { name: 'Longest Common Subsequence', difficulty: 'Medium', solution: '2D DP' }
    ],
    codeTemplate: `// 1D DP - Climbing Stairs
int[] dp = new int[n + 1];
dp[0] = 1; dp[1] = 1;
for (int i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
}
return dp[n];

// 2D DP - Coin Change
int[][] dp = new int[n+1][amount+1];
for (int i = 0; i <= n; i++) {
    for (int j = 0; j <= amount; j++) {
        if (j == 0) dp[i][j] = 0;
        else if (i == 0) dp[i][j] = amount + 1;
        else if (coins[i-1] > j) 
            dp[i][j] = dp[i-1][j];
        else 
            dp[i][j] = Math.min(dp[i-1][j], 
                dp[i][j-coins[i-1]] + 1);
    }
}`,
    flowchart: [
      '1. Define state (what does dp[i] mean?)',
      '2. Identify base cases',
      '3. Write recurrence relation',
      '4. Choose iteration order',
      '5. Optimize space if possible'
    ]
  },
  {
    id: 'greedy',
    name: 'Greedy',
    icon: '🎯',
    triggers: [
      'Local optimal = Global optimal',
      'Scheduling problems',
      'Interval problems',
      'No need to reconsider'
    ],
    template: 'Sort → Pick locally optimal',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    asciiDiagram: `
    Greedy vs Optimal:
    
    Greedy Choice (at each step):
    ┌────────────────────────┐
    │  Pick locally best     │
    │       option           │
    └────────────────────────┘
            │
            ▼
    ┌────────────────────────┐
    │  Commit to choice      │
    │  (no backtracking)      │
    └────────────────────────┘
            │
            ▼
        Solution
    
    Example: Activity Selection
    [────][──────][──][──────][──]
         ↑pick     ↑pick        ↑pick
    `,
    exampleProblems: [
      { name: 'Assign Cookies', difficulty: 'Easy', solution: 'sort + greedy match' },
      { name: 'Non-overlapping Intervals', difficulty: 'Medium', solution: 'sort by end time' },
      { name: 'Minimum Number of Arrows', difficulty: 'Medium', solution: 'overlap counting' }
    ],
    codeTemplate: `// Activity Selection (Greedy)
Arrays.sort(intervals, (a, b) -> a[1] - b[1]);
int count = 0;
int endTime = -1;

for (int[] interval : intervals) {
    if (interval[0] >= endTime) {
        count++;
        endTime = interval[1];
    }
}
return count;

// Fractional Knapsack
Arrays.sort(items, (a, b) -> 
    Double.compare(b.value/b.weight, a.value/a.weight));
    
double totalValue = 0;
for (Item item : items) {
    if (capacity >= item.weight) {
        totalValue += item.value;
        capacity -= item.weight;
    } else {
        totalValue += (double)capacity / item.weight * item.value;
        break;
    }
}`,
    flowchart: [
      '1. Sort by some criteria',
      '2. Iterate through sorted items',
      '3. At each step, pick locally optimal',
      '4. No need to look back',
      '5. Return accumulated result'
    ]
  },
  {
    id: 'union-find',
    name: 'Union-Find',
    icon: '🔗',
    triggers: [
      'Connected components',
      'Detecting cycles',
      'Grouping elements',
      'Dynamic connectivity'
    ],
    template: 'union(a,b) → find(x)',
    timeComplexity: 'O(α(n)) ≈ O(1)',
    spaceComplexity: 'O(n)',
    asciiDiagram: `
    Union-Find Structure:
    
    Parent Array: [0, 1, 2, 3, 4]
                  [0, 0, 2, 2, 4]
                  
    After union(0,1) and union(2,3):
    
        0 ── 1        2 ── 3
        ↑              ↑
      root           root
    
    Find with Path Compression:
    
    find(3) → 2 → 0  (before)
    find(3) → 0      (after compression)
    `,
    exampleProblems: [
      { name: 'Number of Provinces', difficulty: 'Medium', solution: 'connected components' },
      { name: 'Graph Valid Tree', difficulty: 'Medium', solution: 'n-1 edges + no cycles' },
      { name: 'Accounts Merge', difficulty: 'Medium', solution: 'email grouping' }
    ],
    codeTemplate: `// Union-Find with Path Compression
class UnionFind {
    int[] parent, rank;
    
    UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    
    int find(int x) {
        if (parent[x] != x) 
            parent[x] = find(parent[x]); // compress
        return parent[x];
    }
    
    void union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return;
        if (rank[px] < rank[py]) parent[px] = py;
        else if (rank[px] > rank[py]) parent[py] = px;
        else { parent[py] = px; rank[px]++; }
    }
}`,
    flowchart: [
      '1. Initialize parent[i] = i',
      '2. To union(a, b): find roots',
      '3. If same root, already connected',
      '4. Else: attach smaller rank to larger',
      '5. To find(x): follow parent pointers'
    ]
  },
  {
    id: 'trie',
    name: 'Trie',
    icon: '🌳',
    triggers: [
      'Prefix problems',
      'String search',
      'Auto-complete',
      'Word games'
    ],
    template: 'insert → search → startsWith',
    timeComplexity: 'O(m) per operation',
    spaceComplexity: 'O(m * n)',
    asciiDiagram: `
    Trie Structure for ["app", "apps", "bat", "ball"]:
    
    root
     │
     ├── 'a'
     │    └── 'p'
     │         └── 'p' ─→ isEnd
     │              └── 's' ─→ isEnd
     │
     └── 'b'
          └── 'a'
               └── 't' ─→ isEnd
               └── 'l'
                    └── 'l' ─→ isEnd
    
    Each node: Map<Char, TrieNode>
    `,
    exampleProblems: [
      { name: 'Implement Trie', difficulty: 'Medium', solution: 'basic trie operations' },
      { name: 'Longest Common Prefix', difficulty: 'Easy', solution: 'trie traversal' },
      { name: 'Word Search II', difficulty: 'Hard', solution: 'trie + backtracking' }
    ],
    codeTemplate: `// Trie Implementation
class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEnd = false;
}

class Trie {
    TrieNode root;
    
    Trie() { root = new TrieNode(); }
    
    void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
        }
        node.isEnd = true;
    }
    
    boolean search(String word) {
        TrieNode node = findNode(word);
        return node != null && node.isEnd;
    }
    
    boolean startsWith(String prefix) {
        return findNode(prefix) != null;
    }
    
    TrieNode findNode(String s) {
        TrieNode node = root;
        for (char c : s.toCharArray()) {
            if (!node.children.containsKey(c)) 
                return null;
            node = node.children.get(c);
        }
        return node;
    }
}`,
    flowchart: [
      '1. Start at root',
      '2. For each character',
      '3. If edge exists, follow it',
      '4. Else, create new node',
      '5. Mark end of word'
    ]
  },
  {
    id: 'bitwise',
    name: 'Bit Manipulation',
    icon: '⚡',
    triggers: [
      'Power of 2',
      'Bit counting',
      'XOR tricks',
      'Single number problems'
    ],
    template: 'AND, OR, XOR, SHIFT operations',
    timeComplexity: 'O(1) per operation',
    spaceComplexity: 'O(1)',
    asciiDiagram: `
    Bitwise Operations:
    
    AND (&):    1011 (11)
               &1001 (9)
               -----
                1001 (9)
    
    OR (|):     1011 (11)
               |1001 (9)
               -----
                1011 (11)
    
    XOR (^):    1011 (11)
               ^1001 (9)
               -----
                0110 (6)
    
    XOR Swap:   a ^= b; b ^= a; a ^= b;
    
    Single Number:
    [2,3,2,4,3] → XOR all = 4
    `,
    exampleProblems: [
      { name: 'Single Number', difficulty: 'Easy', solution: 'XOR all elements' },
      { name: 'Counting Bits', difficulty: 'Easy', solution: 'DP with bit shifting' },
      { name: 'Maximum XOR of Two Numbers', difficulty: 'Medium', solution: 'bit trie' }
    ],
    codeTemplate: `// Single Number (XOR trick)
int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;
    }
    return result;
}

// Count Bits (DP)
int[] countBits(int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = dp[i >> 1] + (i & 1);
    }
    return dp;
}

// Power of 2 check
boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}

// Get Bit
int getBit(int num, int i) {
    return (num >> i) & 1;
}

// Set Bit
int setBit(int num, int i) {
    return num | (1 << i);
}`,
    flowchart: [
      '1. Identify if XOR can simplify',
      '2. Use bit masking for operations',
      '3. Check power of 2: n & (n-1) == 0',
      '4. Count bits: dp[i] = dp[i>>1] + (i&1)',
      '5. Consider bit trie for XOR max'
    ]
  }
];

export const flashcards: { question: string; answer: string; pattern: string }[] = [
  { question: 'Sorted array + pair/sum?', answer: 'Two Pointers', pattern: 'two-pointers' },
  { question: 'Substring max/min subarray?', answer: 'Sliding Window', pattern: 'sliding-window' },
  { question: 'Lookup/duplicates/frequency?', answer: 'HashMap/HashSet', pattern: 'hashing' },
  { question: 'Sorted array + find target?', answer: 'Binary Search', pattern: 'binary-search' },
  { question: 'Matching/matching/next greater?', answer: 'Stack', pattern: 'stack' },
  { question: 'Cycle detection?', answer: 'Slow & Fast Pointers', pattern: 'linked-list' },
  { question: 'Level order traversal?', answer: 'BFS with Queue', pattern: 'dfs-bfs' },
  { question: 'Kth largest/smallest?', answer: 'Heap/Priority Queue', pattern: 'heap' },
  { question: 'Generate all possibilities?', answer: 'Backtracking', pattern: 'backtracking' },
  { question: 'Optimal substructure + overlap?', answer: 'Dynamic Programming', pattern: 'dp' },
  { question: 'Local optimal = Global optimal?', answer: 'Greedy', pattern: 'greedy' },
  { question: 'Connected components?', answer: 'Union-Find', pattern: 'union-find' },
  { question: 'Prefix/autocomplete?', answer: 'Trie', pattern: 'trie' },
  { question: 'Single number in pairs?', answer: 'XOR Bit Manipulation', pattern: 'bitwise' },
  { question: 'Tree/graph traversal?', answer: 'DFS or BFS', pattern: 'dfs-bfs' },
  { question: 'Next smaller element?', answer: 'Monotonic Stack', pattern: 'stack' },
  { question: 'Activity scheduling?', answer: 'Greedy (sort by end time)', pattern: 'greedy' },
  { question: 'Climbing stairs count?', answer: 'DP (Fibonacci)', pattern: 'dp' },
  { question: 'Reverse linked list?', answer: 'Iterate with prev pointer', pattern: 'linked-list' },
  { question: 'Anagram detection?', answer: 'HashMap frequency count', pattern: 'hashing' },
];

export interface InterviewQuestion {
  text: string;
  companies: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
}

export interface InterviewTopic {
  topic: string;
  questions: InterviewQuestion[];
}

export const COMPANIES = ['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft', 'Twitter', 'LinkedIn', 'Uber'];

export const interviewQuestions: InterviewTopic[] = [
  {
    topic: 'Arrays',
    questions: [
      {
        text: 'What is the time complexity of accessing an element by index?',
        companies: ['Google', 'Meta', 'Amazon'],
        difficulty: 'Easy',
        topic: 'Arrays'
      },
      {
        text: 'How would you find the second largest element?',
        companies: ['Google', 'Microsoft', 'Apple'],
        difficulty: 'Medium',
        topic: 'Arrays'
      },
      {
        text: 'Explain the difference between array and array list.',
        companies: ['Meta', 'Amazon', 'LinkedIn'],
        difficulty: 'Easy',
        topic: 'Arrays'
      },
      {
        text: 'How do you handle integer overflow in array operations?',
        companies: ['Google', 'Microsoft'],
        difficulty: 'Hard',
        topic: 'Arrays'
      }
    ]
  },
  {
    topic: 'Strings',
    questions: [
      {
        text: 'How would you check if two strings are anagrams?',
        companies: ['Google', 'Meta', 'Amazon', 'Apple'],
        difficulty: 'Easy',
        topic: 'Strings'
      },
      {
        text: 'What is the difference between String, StringBuilder, and StringBuffer?',
        companies: ['Meta', 'Twitter', 'LinkedIn'],
        difficulty: 'Medium',
        topic: 'Strings'
      },
      {
        text: 'How do you find the first non-repeating character?',
        companies: ['Google', 'Amazon', 'Microsoft'],
        difficulty: 'Medium',
        topic: 'Strings'
      }
    ]
  },
  {
    topic: 'Linked Lists',
    questions: [
      {
        text: 'How do you detect a cycle in a linked list?',
        companies: ['Google', 'Meta', 'Amazon', 'Apple'],
        difficulty: 'Medium',
        topic: 'Linked Lists'
      },
      {
        text: 'What are the pros and cons of arrays vs linked lists?',
        companies: ['Amazon', 'Microsoft', 'LinkedIn'],
        difficulty: 'Easy',
        topic: 'Linked Lists'
      },
      {
        text: 'How would you find the middle element in one pass?',
        companies: ['Google', 'Meta', 'Uber'],
        difficulty: 'Medium',
        topic: 'Linked Lists'
      }
    ]
  },
  {
    topic: 'Trees',
    questions: [
      {
        text: 'Explain the difference between BFS and DFS.',
        companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
        difficulty: 'Medium',
        topic: 'Trees'
      },
      {
        text: 'How do you validate a binary search tree?',
        companies: ['Google', 'Meta', 'Apple'],
        difficulty: 'Medium',
        topic: 'Trees'
      },
      {
        text: 'What is the time complexity of tree traversal?',
        companies: ['Amazon', 'Microsoft'],
        difficulty: 'Easy',
        topic: 'Trees'
      }
    ]
  },
  {
    topic: 'Dynamic Programming',
    questions: [
      {
        text: 'What are the two main properties for DP?',
        companies: ['Google', 'Amazon', 'Microsoft'],
        difficulty: 'Medium',
        topic: 'Dynamic Programming'
      },
      {
        text: 'Explain memoization vs tabulation.',
        companies: ['Google', 'Meta', 'Apple'],
        difficulty: 'Medium',
        topic: 'Dynamic Programming'
      },
      {
        text: 'How do you identify a DP problem?',
        companies: ['Google', 'Amazon', 'LinkedIn'],
        difficulty: 'Hard',
        topic: 'Dynamic Programming'
      }
    ]
  }
];
