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
];
