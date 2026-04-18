# 📋 Test Cases Management Guide

## Overview

Test cases are pre-defined input-output pairs that verify if your solution is correct. Each problem has multiple test cases with consistent input/output formats.

## Test Case Structure

### Current Format
```javascript
{
  input: "2,7,11,15|9",      // Input format: array|target
  output: "0,1",              // Expected output: indices
  description: "Example 1: nums = [2,7,11,15], target = 9"
}
```

### What Each Test Case Contains
- **input**: The test input formatted consistently
- **output**: The expected output format
- **description**: Human-readable description of the test

## Two Sum Test Cases

### Standard Format
For **Two Sum** problem, test cases follow this format:

```
Input: "2,7,11,15|9"
Meaning: array = [2,7,11,15], target = 9
Output: "0,1"
Meaning: indices [0,1] (nums[0] + nums[1] = 2 + 7 = 9)
```

### Pre-Built Test Cases for Two Sum

```javascript
const testCases = [
  {
    input: "2,7,11,15|9",
    output: "0,1",
    description: "Example 1: nums = [2,7,11,15], target = 9"
  },
  {
    input: "3,2,4|6",
    output: "1,2",
    description: "Example 2: nums = [3,2,4], target = 6"
  },
  {
    input: "3,3|6",
    output: "0,1",
    description: "Duplicate values: nums = [3,3], target = 6"
  },
  {
    input: "1,2,3,4,5,6|11",
    output: "4,5",
    description: "Larger array: nums = [1,2,3,4,5,6], target = 11"
  },
  {
    input: "-1,0,1,2,-1,-4|0",
    output: "1,2",
    description: "Negative numbers: nums = [-1,0,1,2,-1,-4], target = 0"
  }
];
```

## Problem Definition with Test Cases

### Updated Problem Structure

```javascript
{
  id: "two-sum",
  title: "Two Sum",
  description: "Given an array of integers nums and an integer target...",
  difficulty: "easy",
  topics: ["Array", "HashMap"],
  
  // Test cases for this problem
  examples: [
    {
      input: "2,7,11,15|9",
      output: "0,1",
      description: "Example 1"
    },
    {
      input: "3,2,4|6",
      output: "1,2",
      description: "Example 2"
    },
    {
      input: "3,3|6",
      output: "0,1",
      description: "Example 3"
    }
  ],
  
  // Expected output format for verification
  outputFormat: "array",      // "array", "number", "string", etc.
  
  // Instructions for solution format
  instructions: "Return an array of two indices [i, j] where nums[i] + nums[j] = target"
}
```

## Solution Code Template with Test Cases

### Java Template for Two Sum

```java
import java.util.*;

public class Main {
  public static void main(String[] args) {
    // Test Case 1
    testTwoSum(new int[]{2,7,11,15}, 9, new int[]{0,1});
    // Test Case 2
    testTwoSum(new int[]{3,2,4}, 6, new int[]{1,2});
    // Test Case 3
    testTwoSum(new int[]{3,3}, 6, new int[]{0,1});
  }
  
  static void testTwoSum(int[] nums, int target, int[] expected) {
    int[] result = twoSum(nums, target);
    boolean passed = Arrays.equals(result, expected);
    System.out.println(
      (passed ? "✅ PASS" : "❌ FAIL") + 
      " | Input: " + Arrays.toString(nums) + 
      ", Target: " + target + 
      " | Expected: " + Arrays.toString(expected) + 
      " | Got: " + Arrays.toString(result)
    );
  }
  
  static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
      int complement = target - nums[i];
      if (seen.containsKey(complement)) {
        return new int[]{seen.get(complement), i};
      }
      seen.put(nums[i], i);
    }
    
    return new int[]{-1, -1};
  }
}
```

**Output:**
```
✅ PASS | Input: [2, 7, 11, 15], Target: 9 | Expected: [0, 1] | Got: [0, 1]
✅ PASS | Input: [3, 2, 4], Target: 6 | Expected: [1, 2] | Got: [1, 2]
✅ PASS | Input: [3, 3], Target: 6 | Expected: [0, 1] | Got: [0, 1]
```

## Creating New Test Cases

### Step 1: Identify Edge Cases
- Minimum size array (2 elements)
- Duplicate values
- Negative numbers
- Zero values
- Large arrays
- Sorted vs unsorted

### Step 2: Define Input-Output Pairs
```javascript
// For Two Sum:
Input: "array|target"
Output: "index1,index2"

Examples:
"2,7,11,15|9" → "0,1"
"3,3|6" → "0,1"
"-1,0,1|0" → "1,2"
```

### Step 3: Add to Problem Definition
```javascript
{
  input: "2,7,11,15|9",
  output: "0,1",
  description: "Standard case"
},
{
  input: "3,3|6",
  output: "0,1",
  description: "Duplicate elements"
},
{
  input: "-1,0,1|-1",
  output: "0,2",
  description: "Negative numbers"
}
```

## Test Case Validation Checklist

- [ ] Test case input is in the correct format
- [ ] Expected output is in the correct format
- [ ] At least 3-5 test cases per problem
- [ ] Include edge cases (empty, single element, duplicates, negatives)
- [ ] Output matches solution's actual output
- [ ] Description is clear and helpful
- [ ] All test cases pass with a correct solution

## Running Tests Locally

### Before Submission
```bash
# Compile your solution
javac Main.java

# Run tests
java Main

# Expected: All tests should pass (✅)
```

### Using Judge0 API
The system will:
1. Parse your code
2. Extract the `twoSum` method
3. Run it against each test case
4. Compare output with expected value
5. Show pass/fail for each

## Output Format Standards

### Two Sum (Array Indices)
```
Output: "0,1"  (not "[0,1]", not "0 1")
```

### LeetCode-Style Problems
```
Output: Exact match with expected (case-sensitive)
Example: "true", "[1,2,3]", "7"
```

### Custom Problems
Defined in problem description

## Common Issues

### ❌ Test Fails: Output Format Mismatch
**Problem**: Code outputs `[0,1]` but expected `0,1`
**Solution**: Remove array brackets in output

### ❌ Test Fails: Extra Print Statements
**Problem**: Code has debug prints that contaminate output
**Solution**: Remove or comment out all debug prints

### ❌ Test Fails: Inconsistent Spacing
**Problem**: Output is `0, 1` but expected `0,1`
**Solution**: Remove spaces in output

### ❌ Test Fails: Wrong Logic
**Problem**: Output is `1,0` but expected `0,1`
**Solution**: Fix the algorithm logic

## Best Practices

1. **Clean Output**: Only output the result, no debug messages
2. **Consistent Format**: Match the expected format exactly
3. **Test All Cases**: Verify your solution against all provided test cases
4. **Use Templates**: Follow the provided code template
5. **Edge Cases**: Think about boundary conditions

## For Problem Creators

### Creating Complete Problem Set
```javascript
{
  id: "two-sum",
  title: "Two Sum",
  difficulty: "easy",
  
  // Clear, concise examples
  examples: [
    {
      input: "2,7,11,15|9",
      output: "0,1",
      description: "Basic case"
    },
    // ... more test cases
  ],
  
  // Starter code template
  starterCode: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    // Your test code here
  }
  
  static int[] twoSum(int[] nums, int target) {
    // Your solution here
    return new int[]{-1, -1};
  }
}`,
  
  // Detailed instructions
  instructions: "Find two numbers that add up to target...",
  
  // Solution verification metadata
  outputFormat: "array",
  expectedOutputType: "int[]"
}
```

---

**Note**: Proper test cases are essential for accurate solution validation. Always ensure test cases are comprehensive and cover edge cases.
