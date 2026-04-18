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
];
