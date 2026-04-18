export interface InterviewProblem {
  title: string;
  shortDescription: string;
  description: string;
  examples: Array<{ input: string; output: string; explanation?: string }>;
  constraints: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
  topics: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  starterCode?: string;
}

export const problems: InterviewProblem[] = [
  {
    title: 'Two Sum',
    shortDescription: 'Find two numbers that add up to target',
    description: `Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.

You may assume that each input has exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'nums[1] + nums[2] == 6, we return [1, 2].',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    topics: ['Hash Table', 'Array'],
    difficulty: 'easy',
    estimatedTime: 15,
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  return [];
}`,
  },
  {
    title: 'Reverse String',
    shortDescription: 'Reverse a string in-place',
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
      },
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      's[i] is a printable ascii character.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    topics: ['String', 'Two Pointers'],
    difficulty: 'easy',
    estimatedTime: 10,
    starterCode: `function reverseString(s) {
  // Write your solution here
}`,
  },
  {
    title: 'Valid Parentheses',
    shortDescription: 'Check if parentheses are balanced',
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
      },
      {
        input: 's = "([)]"',
        output: 'false',
      },
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    topics: ['Stack', 'String'],
    difficulty: 'easy',
    estimatedTime: 15,
    starterCode: `function isValid(s) {
  // Write your solution here
  return false;
}`,
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    shortDescription: 'Find the longest substring without repeating chars',
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.',
      },
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m, n)) where m is charset size',
    topics: ['Hash Table', 'String', 'Sliding Window'],
    difficulty: 'medium',
    estimatedTime: 20,
    starterCode: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  return 0;
}`,
  },
  {
    title: 'Binary Tree Level Order Traversal',
    shortDescription: 'Traverse tree level by level',
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).`,
    examples: [
      {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]',
      },
      {
        input: 'root = [1]',
        output: '[[1]]',
      },
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-1000 <= Node.val <= 1000',
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(w) where w is max width of tree',
    topics: ['Tree', 'Breadth-First Search', 'Queue'],
    difficulty: 'medium',
    estimatedTime: 25,
    starterCode: `function levelOrder(root) {
  // Write your solution here
  return [];
}`,
  },
  {
    title: 'Word Ladder',
    shortDescription: 'Find shortest transformation sequence',
    description: `Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.

You must follow the rules:
- Each transformed word must exist in the wordList.
- Only one letter can be changed at a time.`,
    examples: [
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: '5',
        explanation: 'One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.',
      },
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
        output: '0',
        explanation: 'The endWord "cog" is not in wordList, therefore no valid transformation sequence exists.',
      },
    ],
    constraints: [
      '1 <= beginWord.length <= 10',
      'endWord.length == beginWord.length',
      '1 <= wordList.length <= 5000',
      'wordList[i].length == beginWord.length',
      'beginWord, endWord, and wordList[i] consist of lowercase English letters',
      'beginWord != endWord',
      'All the words in wordList are unique',
    ],
    timeComplexity: 'O(N * L^2 * 26) where N is number of words, L is length',
    spaceComplexity: 'O(N * L)',
    topics: ['Breadth-First Search', 'Graph', 'String'],
    difficulty: 'hard',
    estimatedTime: 45,
    starterCode: `function ladderLength(beginWord, endWord, wordList) {
  // Write your solution here
  return 0;
}`,
  },
  {
    title: 'Parking Lot System',
    shortDescription: 'Design a multi-level parking lot management system',
    description: `Design a parking lot system that supports multiple parking levels. Each level has multiple rows and each row has multiple spots.

The system should:
1. Support adding a vehicle (car, truck, motorcycle) to a spot
2. Track available spots by type
3. Remove a vehicle from a spot
4. Get available spot count for each vehicle type
5. Handle overflow to next available level
6. Calculate parking fee based on duration

Classes/Interfaces needed:
- ParkingLot
- Level
- Row
- Spot
- Vehicle (Car, Truck, Motorcycle)
- ParkingTicket

Requirements:
- A motorcycle needs 1 spot
- A car needs 1 spot
- A truck needs 2 spots
- Ensure proper encapsulation and single responsibility
- Use design patterns (Singleton for ParkingLot, Strategy for Vehicle)`,
    examples: [
      {
        input: 'Create lot with 4 levels, 10 rows/level, 15 spots/row. Park 1 truck, 2 cars, 1 motorcycle. Check availability.',
        output: 'Truck parked at Level 0, Row 0, Car parked at Level 0, Row 0, available spots updated correctly',
      },
    ],
    constraints: [
      'Support SOLID principles',
      'Implement proper error handling',
      'Support extensible vehicle types',
      'Time complexity for operations: O(1) for parking, O(1) for unparking',
    ],
    timeComplexity: 'O(1) for all operations',
    spaceComplexity: 'O(L * R * S) where L=levels, R=rows, S=spots',
    topics: ['Object-Oriented Design', 'SOLID Principles', 'Design Patterns'],
    difficulty: 'hard',
    estimatedTime: 60,
    starterCode: `class ParkingLot {
  constructor(levels, rowsPerLevel, spotsPerRow) {
    // Initialize parking lot structure
  }

  addLevel(level) {
    // Add a new level
  }

  parkVehicle(vehicle) {
    // Park a vehicle - return ticket or null if failed
  }

  unparkVehicle(ticket) {
    // Unpark a vehicle - return availability update
  }

  getAvailableSpots(vehicleType) {
    // Get available spots for vehicle type
  }
}`,
  },
  {
    title: 'Club Membership System',
    shortDescription: 'Design a club membership and booking system',
    description: `Design a system for a club that manages members, resources (courts, tables, rooms), and bookings.

Requirements:
1. Member management (add, remove, update)
2. Resource management (courts, tables, rooms)
3. Booking system with time slots
4. Cancellation support
5. Member benefits and tiers (basic, premium, VIP)
6. Payment processing
7. Availability checking

Classes needed:
- Club
- Member
- Resource
- Booking
- TimeSlot
- PaymentProcessor

Constraints:
- A member cannot book overlapping time slots
- Premium members get priority booking
- VIP members get discounts
- Resources have different pricing based on member tier`,
    examples: [
      {
        input: 'Club with 5 courts. Create basic member. Try to book court for 2 hours at 10 AM.',
        output: 'Booking created with ticket. Available slots updated.',
      },
    ],
    constraints: [
      'Use composition over inheritance',
      'Implement proper validation',
      'Support different payment methods',
      'Handle concurrent bookings safely',
    ],
    timeComplexity: 'O(n) for availability checking where n is number of bookings',
    spaceComplexity: 'O(m * s) where m=members, s=slots',
    topics: ['Object-Oriented Design', 'SOLID Principles', 'Business Logic'],
    difficulty: 'hard',
    estimatedTime: 60,
    starterCode: `class Club {
  constructor(name) {
    this.name = name;
    this.members = new Map();
    this.resources = new Map();
    this.bookings = [];
  }

  addMember(member) {
    // Add member to club
  }

  addResource(resource) {
    // Add resource (court, table, room)
  }

  createBooking(member, resource, timeSlot) {
    // Create booking - validate and return confirmation
  }

  cancelBooking(bookingId) {
    // Cancel booking
  }

  getAvailableSlots(resource) {
    // Get available time slots for resource
  }
}`,
  },
  {
    title: 'Speed Ticket Management System',
    shortDescription: 'Design a traffic enforcement and ticket management system',
    description: `Design a speed ticket management system for traffic enforcement agencies.

Requirements:
1. Record speed violations
2. Generate tickets with fines
3. Track payment status
4. Support appeals
5. Generate reports
6. Calculate fines based on speed, location, vehicle type
7. Handle discounts for early payment
8. Track officer performance

Classes needed:
- TrafficOfficer
- Violation
- Ticket
- Vehicle
- Payment
- Appeal
- Location

Business Rules:
- Fine = Base fine + (Speed over limit) * Rate
- 10% discount if paid within 7 days
- Drivers can appeal within 30 days
- Different rates for different locations
- Commercial vehicles pay more`,
    examples: [
      {
        input: 'Speed limit 55 mph, car going 75 mph, location factor 1.0',
        output: 'Ticket generated with fine calculated',
      },
    ],
    constraints: [
      'Calculate fines accurately',
      'Audit trail for all transactions',
      'Support dispute resolution',
      'Generate statistical reports',
    ],
    timeComplexity: 'O(1) for ticket creation, O(n) for reporting',
    spaceComplexity: 'O(t) where t is number of tickets',
    topics: ['Object-Oriented Design', 'Business Logic', 'Reporting'],
    difficulty: 'hard',
    estimatedTime: 45,
    starterCode: `class TrafficEnforcementSystem {
  constructor() {
    this.tickets = new Map();
    this.appeals = new Map();
    this.locations = new Map();
  }

  recordViolation(officer, vehicle, speed, speedLimit, location) {
    // Record violation and create ticket
  }

  processPayment(ticketId, amount) {
    // Process payment for ticket
  }

  fileAppeal(ticketId, reason) {
    // File appeal against ticket
  }

  calculateFine(speed, speedLimit, location, vehicleType) {
    // Calculate fine based on parameters
  }

  getReport(startDate, endDate) {
    // Generate report for period
  }
}`,
  },
  {
    title: 'Matrix Game - Snake',
    shortDescription: 'Implement Snake game with object-oriented design',
    description: `Implement a Snake game on an NxN matrix with proper OOP design.

Requirements:
1. Initialize game board with snake starting at center
2. Generate food randomly
3. Handle snake movement (up, down, left, right)
4. Detect collisions (wall, self)
5. Handle food consumption (grow snake)
6. Track score
7. Game over detection
8. Display game state

Classes needed:
- Game
- Snake (head and body segments)
- Food
- Board
- Direction
- GameState

Game Rules:
- Snake starts with length 3
- Snake moves in current direction each tick
- Eating food increases length and score
- Cannot reverse into self
- Game ends on wall collision or self collision`,
    examples: [
      {
        input: 'Initialize 10x10 board with snake starting at (5,5)',
        output: 'Board created, snake positioned, food placed',
      },
      {
        input: 'Move snake: RIGHT, RIGHT, DOWN, food at (7,6)',
        output: 'Snake eats food, length=4, score=10',
      },
    ],
    constraints: [
      'Efficient collision detection O(1)',
      'Proper encapsulation of game state',
      'Support save/load game state',
      'Rendering-agnostic design',
    ],
    timeComplexity: 'O(1) per move',
    spaceComplexity: 'O(n) where n is snake length',
    topics: ['Object-Oriented Design', 'Game Logic', 'State Management'],
    difficulty: 'medium',
    estimatedTime: 40,
    starterCode: `class SnakeGame {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.snake = [];
    this.food = null;
    this.score = 0;
    this.direction = 'RIGHT';
    this.gameOver = false;
    this.initializeGame();
  }

  initializeGame() {
    // Initialize snake in center, place first food
  }

  move() {
    // Move snake in current direction
  }

  setDirection(newDirection) {
    // Set snake direction (validate no reversal)
  }

  checkCollision() {
    // Check wall and self collision
  }

  checkFoodCollision() {
    // Check if snake ate food
  }

  getGameState() {
    // Return current game state for rendering
  }
}`,
  },
  {
    title: 'LRU Cache Implementation',
    shortDescription: 'Implement an efficient Least Recently Used cache',
    description: `Design and implement an LRU (Least Recently Used) Cache that supports:
1. get(key) - Return value if key exists, else -1
2. put(key, value) - Update value or insert if not present

When cache reaches capacity, evict least recently used item.

Requirements:
- Both get and put operations should run in O(1) time
- Track usage order efficiently
- Handle edge cases (duplicate keys, capacity of 1)

Data Structure Hint:
- Use HashMap for O(1) key lookup
- Use Doubly Linked List to maintain LRU order
- Combine both for optimal performance

Example:
- Cache capacity = 2
- put(1, 1) → Cache: {1:1}
- put(2, 2) → Cache: {1:1, 2:2}
- get(1) → Returns 1, 1 becomes most recent
- put(3, 3) → Evicts 2, Cache: {1:1, 3:3}
- get(2) → Returns -1`,
    examples: [
      {
        input: 'LRUCache(2), put(1,1), put(2,2), get(1) -> 1, put(3,3), get(2)',
        output: '1 (get result), -1 (2 was evicted)',
      },
    ],
    constraints: [
      'Capacity >= 1',
      '1 <= key, value <= 10^5',
      'Maximum 10^5 calls',
      'O(1) time complexity for all operations',
    ],
    timeComplexity: 'O(1) for get and put',
    spaceComplexity: 'O(capacity)',
    topics: ['Hash Map', 'Linked List', 'Cache Design', 'Data Structure Design'],
    difficulty: 'hard',
    estimatedTime: 45,
    starterCode: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    // Use Map for insertion order
    this.cache = new Map();
  }

  get(key) {
    // Return value and update order
    return -1;
  }

  put(key, value) {
    // Insert or update, maintain LRU order
    // Evict if capacity exceeded
  }
}`,
  },
  {
    title: 'Rate Limiter (Token Bucket)',
    shortDescription: 'Implement a rate limiter using token bucket algorithm',
    description: `Implement a rate limiter using the Token Bucket algorithm that allows:
- N requests per second from each user
- Smooth burst traffic handling

Requirements:
1. isAllowed(userId, requestTime) - Checks if request should be allowed
2. Refill tokens at a constant rate
3. Each request consumes 1 token
4. Bucket capacity = N (refill rate)

Algorithm:
- Maintain token count per user
- At each request, refill tokens since last request
- Allow request if tokens >= 1
- Decrement token count

Example (rate = 2 tokens/sec):
- t=0s: 0 requests → allow (tokens: 1, used: 1)
- t=0.1s: allow (tokens: 1.2 → 0.2 after use)
- t=0.5s: allow (tokens: 1.8 → 0.8 after use)
- t=0.6s: deny (tokens: 1.0 → not enough for 2nd request)
- t=1.0s: allow (tokens: 1.8 → 0.8 after use)`,
    examples: [
      {
        input: 'capacity=2, refillRate=2/sec, requests at t=0, 0.1, 0.5, 0.6',
        output: 'allow, allow, allow, deny',
      },
    ],
    constraints: [
      'Accurate timestamp handling',
      'Thread-safe if concurrent calls',
      'Handle multiple users independently',
      'Precision: milliseconds',
    ],
    timeComplexity: 'O(1) per request',
    spaceComplexity: 'O(users) for tracking user buckets',
    topics: ['Algorithm', 'Rate Limiting', 'System Design'],
    difficulty: 'hard',
    estimatedTime: 40,
    starterCode: `class RateLimiter {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.refillRate = refillRate; // tokens per second
    this.userBuckets = new Map();
  }

  isAllowed(userId, currentTime) {
    // Check if request is allowed
    // Refill tokens since last request
    // Return true/false
    return false;
  }

  refillTokens(lastTime, currentTime) {
    // Calculate tokens to add
    return 0;
  }
}`,
  },
  {
    title: 'Web Crawler with Thread Pool',
    shortDescription: 'Design a multi-threaded web crawler system',
    description: `Design a web crawler that can crawl websites efficiently using a thread pool.

Requirements:
1. Crawl pages starting from a root URL
2. Extract links from pages
3. Visit each link only once
4. Use thread pool for parallel crawling
5. Respect rate limiting (don't overload servers)
6. Handle errors gracefully
7. Extract metadata (title, links, content)

Key Considerations:
- Thread safety for shared data structures
- Synchronization for concurrent access
- Preventing duplicate URL visits
- Handling circular links
- Respecting robots.txt
- URL normalization (www.x.com vs x.com)

Classes Needed:
- WebCrawler
- CrawlTask
- CrawledPage
- ThreadPool
- URLQueue
- URLCache

Edge Cases:
- Circular references (A → B → A)
- Dead links
- Redirects (301, 302, 303)
- Same content at different URLs
- Maximum crawl depth`,
    examples: [
      {
        input: 'Crawl google.com with max depth 2, thread pool size 4',
        output: 'Crawled N pages, M unique links found',
      },
    ],
    constraints: [
      'Thread pool size configurable',
      'Maximum crawl depth limit',
      'Connection timeout handling',
      'DNS resolution caching',
      'Rate limiting per domain',
    ],
    timeComplexity: 'O(pages + links) distributed across threads',
    spaceComplexity: 'O(pages + urls) for caching',
    topics: ['Concurrency', 'System Design', 'Web Crawling', 'Thread Pool'],
    difficulty: 'hard',
    estimatedTime: 60,
    starterCode: `class WebCrawler {
  constructor(threadPoolSize, maxDepth) {
    this.threadPoolSize = threadPoolSize;
    this.maxDepth = maxDepth;
    this.visitedUrls = new Set();
    this.queue = [];
  }

  crawl(startUrl) {
    // Initialize with start URL
    // Process queue with thread pool
    // Return crawl results
    return [];
  }

  fetchPage(url) {
    // Fetch page and extract links
    // Handle errors
    return null;
  }

  extractLinks(htmlContent, baseUrl) {
    // Parse HTML and extract links
    // Normalize URLs
    return [];
  }

  normalizeUrl(url) {
    // Normalize URL for comparison
    return url;
  }
}`,
  },
  {
    title: 'Distributed Cache with Consistency',
    shortDescription: 'Design a distributed cache with cache invalidation',
    description: `Design a distributed cache system with cache invalidation and consistency protocols.

Requirements:
1. Multiple cache nodes
2. Cache invalidation strategies
3. Data consistency across nodes
4. Replication strategy
5. Fault tolerance
6. Cache eviction policies

Consistency Strategies:
- Write-Through: Write to cache and DB
- Write-Behind: Write to cache, async to DB
- Write-Around: Bypass cache on write

Invalidation Strategies:
- Time-based (TTL)
- Event-based (subscribers)
- LRU/LFU eviction
- Explicit invalidation

Replication:
- Master-Slave
- Peer-to-Peer
- Quorum-based

Classes Needed:
- DistributedCache
- CacheNode
- ConsistencyProtocol
- ReplicationManager
- InvalidationStrategy`,
    examples: [
      {
        input: 'Create cache with 3 nodes, write-through consistency, TTL=5min',
        output: 'Distributed cache initialized with replication',
      },
    ],
    constraints: [
      'Handle node failures',
      'Eventual consistency acceptable',
      'Network partition tolerance',
      'Configurable replication factor',
      'Monitor hit/miss ratios',
    ],
    timeComplexity: 'O(1) reads/writes (with network latency)',
    spaceComplexity: 'O(n) across all cache nodes',
    topics: ['Distributed Systems', 'Caching', 'Consistency Models', 'Replication'],
    difficulty: 'hard',
    estimatedTime: 60,
    starterCode: `class DistributedCache {
  constructor(nodes, consistencyType, replicationFactor) {
    this.nodes = nodes;
    this.consistencyType = consistencyType;
    this.replicationFactor = replicationFactor;
  }

  get(key) {
    // Retrieve from cache
    // Handle missing data
    return null;
  }

  put(key, value) {
    // Write to cache
    // Apply consistency strategy
    // Replicate across nodes
  }

  invalidate(key) {
    // Invalidate across all nodes
  }

  handleNodeFailure(nodeId) {
    // Rebalance data
    // Ensure consistency
  }
}`,
  },
];
