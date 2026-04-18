export interface CompanyQuestion {
  text: string;
  companies: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
}

export interface CompanyTopic {
  topic: string;
  questions: CompanyQuestion[];
}

export const COMPANIES = ['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft', 'Twitter', 'LinkedIn', 'Uber'];

export const companyInterviewQuestions: CompanyTopic[] = [
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
      },
      {
        text: 'Implement a function to rotate an array by k positions.',
        companies: ['Amazon', 'Apple', 'Uber'],
        difficulty: 'Medium',
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
      },
      {
        text: 'Implement a function to compress a string (e.g., "aaabbb" → "a3b3").',
        companies: ['Google', 'Meta', 'Apple'],
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
      },
      {
        text: 'Reverse a linked list iteratively and recursively.',
        companies: ['Google', 'Meta', 'Amazon'],
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
      },
      {
        text: 'Find the lowest common ancestor (LCA) in a binary tree.',
        companies: ['Google', 'Meta', 'Amazon'],
        difficulty: 'Hard',
        topic: 'Trees'
      },
      {
        text: 'Serialize and deserialize a binary tree.',
        companies: ['Google', 'Meta', 'Apple'],
        difficulty: 'Hard',
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
      },
      {
        text: 'Solve the longest increasing subsequence problem.',
        companies: ['Google', 'Meta', 'Microsoft'],
        difficulty: 'Hard',
        topic: 'Dynamic Programming'
      }
    ]
  },
  {
    topic: 'Graphs',
    questions: [
      {
        text: 'What is the difference between adjacency list and adjacency matrix?',
        companies: ['Google', 'Meta', 'Amazon'],
        difficulty: 'Medium',
        topic: 'Graphs'
      },
      {
        text: 'How do you detect a cycle in an undirected graph?',
        companies: ['Google', 'Meta', 'Amazon'],
        difficulty: 'Medium',
        topic: 'Graphs'
      },
      {
        text: 'Implement Dijkstra\'s algorithm.',
        companies: ['Google', 'Amazon', 'Microsoft'],
        difficulty: 'Hard',
        topic: 'Graphs'
      },
      {
        text: 'Find all paths between two nodes in a directed graph.',
        companies: ['Meta', 'Amazon'],
        difficulty: 'Hard',
        topic: 'Graphs'
      }
    ]
  },
  {
    topic: 'Hash Tables',
    questions: [
      {
        text: 'How do hash tables handle collisions?',
        companies: ['Google', 'Meta', 'Amazon'],
        difficulty: 'Medium',
        topic: 'Hash Tables'
      },
      {
        text: 'What is the load factor and when does a hash table resize?',
        companies: ['Google', 'Microsoft', 'Apple'],
        difficulty: 'Medium',
        topic: 'Hash Tables'
      },
      {
        text: 'Implement a basic hash table from scratch.',
        companies: ['Google', 'Meta', 'Amazon'],
        difficulty: 'Hard',
        topic: 'Hash Tables'
      }
    ]
  },
  {
    topic: 'Heaps & Priority Queues',
    questions: [
      {
        text: 'What is the difference between min heap and max heap?',
        companies: ['Google', 'Meta', 'Amazon'],
        difficulty: 'Easy',
        topic: 'Heaps & Priority Queues'
      },
      {
        text: 'Find the k largest elements in an array.',
        companies: ['Google', 'Meta', 'Amazon', 'Apple'],
        difficulty: 'Medium',
        topic: 'Heaps & Priority Queues'
      },
      {
        text: 'Implement a priority queue using a heap.',
        companies: ['Google', 'Microsoft'],
        difficulty: 'Hard',
        topic: 'Heaps & Priority Queues'
      }
    ]
  },
  {
    topic: 'SOLID Principles',
    questions: [
      {
        text: 'Explain the Single Responsibility Principle (SRP).',
        companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
        difficulty: 'Medium',
        topic: 'SOLID Principles'
      },
      {
        text: 'What is the Open/Closed Principle and why is it important?',
        companies: ['Google', 'Meta', 'Apple'],
        difficulty: 'Medium',
        topic: 'SOLID Principles'
      },
      {
        text: 'Explain Liskov Substitution Principle with an example.',
        companies: ['Amazon', 'Microsoft'],
        difficulty: 'Medium',
        topic: 'SOLID Principles'
      },
      {
        text: 'What is Interface Segregation Principle?',
        companies: ['Google', 'Meta', 'Amazon'],
        difficulty: 'Easy',
        topic: 'SOLID Principles'
      },
      {
        text: 'Explain Dependency Inversion Principle.',
        companies: ['Google', 'Amazon', 'Microsoft'],
        difficulty: 'Hard',
        topic: 'SOLID Principles'
      }
    ]
  },
  {
    topic: 'OOP (Object-Oriented Programming)',
    questions: [
      {
        text: 'What are the four pillars of OOP?',
        companies: ['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft'],
        difficulty: 'Easy',
        topic: 'OOP (Object-Oriented Programming)'
      },
      {
        text: 'Explain encapsulation and its benefits.',
        companies: ['Google', 'Meta', 'Amazon'],
        difficulty: 'Easy',
        topic: 'OOP (Object-Oriented Programming)'
      },
      {
        text: 'What is the difference between inheritance and composition?',
        companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
        difficulty: 'Medium',
        topic: 'OOP (Object-Oriented Programming)'
      },
      {
        text: 'Explain polymorphism and its types.',
        companies: ['Google', 'Amazon', 'Apple'],
        difficulty: 'Medium',
        topic: 'OOP (Object-Oriented Programming)'
      },
      {
        text: 'What is an abstract class vs interface?',
        companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
        difficulty: 'Medium',
        topic: 'OOP (Object-Oriented Programming)'
      },
      {
        text: 'Design a parking lot system using OOP principles.',
        companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
        difficulty: 'Hard',
        topic: 'OOP (Object-Oriented Programming)'
      }
    ]
  },
  {
    topic: 'Object-Oriented Design (OOD)',
    questions: [
      {
        text: 'What is the difference between OOP and OOD?',
        companies: ['Google', 'Meta', 'Amazon'],
        difficulty: 'Medium',
        topic: 'Object-Oriented Design (OOD)'
      },
      {
        text: 'Explain the MVC (Model-View-Controller) pattern.',
        companies: ['Google', 'Meta', 'Amazon', 'Apple'],
        difficulty: 'Medium',
        topic: 'Object-Oriented Design (OOD)'
      },
      {
        text: 'What is the Singleton design pattern?',
        companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
        difficulty: 'Medium',
        topic: 'Object-Oriented Design (OOD)'
      },
      {
        text: 'Design an elevator system.',
        companies: ['Google', 'Meta', 'Amazon', 'Microsoft'],
        difficulty: 'Hard',
        topic: 'Object-Oriented Design (OOD)'
      },
      {
        text: 'Design a chess game using OOP principles.',
        companies: ['Google', 'Meta', 'Amazon'],
        difficulty: 'Hard',
        topic: 'Object-Oriented Design (OOD)'
      },
      {
        text: 'What are design patterns and why are they important?',
        companies: ['Google', 'Amazon', 'Microsoft'],
        difficulty: 'Easy',
        topic: 'Object-Oriented Design (OOD)'
      }
    ]
  }
];
