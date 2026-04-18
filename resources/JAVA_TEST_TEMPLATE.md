# ☕ Java Test Template for Two Sum

## Problem Statement
Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.

## Output Format
**Important**: Your output must match exactly: `index1,index2` (comma-separated, no brackets, no spaces)

### ✅ Correct Output Format
```
0,1
1,2
4,5
```

### ❌ Wrong Output Formats
```
[0,1]          ← Don't include brackets
0, 1           ← Don't include spaces
[0, 1]         ← Don't include brackets or spaces
0 1            ← Don't use spaces instead of commas
```

## Complete Java Solution Template

```java
import java.util.*;

public class Main {
  public static void main(String[] args) {
    // Test Case 1: Basic case
    int[] result1 = twoSum(new int[]{2,7,11,15}, 9);
    System.out.println(formatOutput(result1));  // Output: 0,1
    
    // Test Case 2: Different order
    int[] result2 = twoSum(new int[]{3,2,4}, 6);
    System.out.println(formatOutput(result2));  // Output: 1,2
    
    // Test Case 3: Duplicates
    int[] result3 = twoSum(new int[]{3,3}, 6);
    System.out.println(formatOutput(result3));  // Output: 0,1
    
    // Test Case 4: Larger array
    int[] result4 = twoSum(new int[]{1,2,3,4,5,6}, 11);
    System.out.println(formatOutput(result4));  // Output: 4,5
    
    // Test Case 5: Negative numbers
    int[] result5 = twoSum(new int[]{-1,0,1,2,-1,-4}, 0);
    System.out.println(formatOutput(result5));  // Output: 1,2
  }
  
  /**
   * Main solution method
   * Returns an array of two indices where nums[i] + nums[j] = target
   */
  static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
      int complement = target - nums[i];
      
      if (seen.containsKey(complement)) {
        // Found the pair!
        return new int[]{seen.get(complement), i};
      }
      
      // Store current number and its index
      seen.put(nums[i], i);
    }
    
    // No solution found
    return new int[]{-1, -1};
  }
  
  /**
   * Helper method to format output
   * Converts array to "index1,index2" format
   */
  static String formatOutput(int[] result) {
    if (result == null || result.length < 2) {
      return "-1,-1";
    }
    return result[0] + "," + result[1];
  }
}
```

## Expected Output
```
0,1
1,2
0,1
4,5
1,2
```

## Step-by-Step Explanation

### Step 1: Create Hash Map
```java
Map<Integer, Integer> seen = new HashMap<>();
```
Stores: number → index

### Step 2: Loop Through Array
```java
for (int i = 0; i < nums.length; i++)
```

### Step 3: Check for Complement
```java
int complement = target - nums[i];
if (seen.containsKey(complement)) {
  return new int[]{seen.get(complement), i};
}
```

### Step 4: Store and Continue
```java
seen.put(nums[i], i);
```

## Common Mistakes to Avoid

### ❌ Printing Array Directly
```java
System.out.println(Arrays.toString(result));  // Prints [0, 1]
```
**Problem**: This includes brackets and spaces

### ✅ Use Formatter Method
```java
System.out.println(formatOutput(result));  // Prints 0,1
```

### ❌ Multiple Print Statements
```java
System.out.println(result[0]);  // Prints first index
System.out.println(result[1]);  // Prints second index on new line
```
**Problem**: Output is on separate lines

### ✅ Single Output Line
```java
System.out.println(result[0] + "," + result[1]);  // Prints 0,1
```

## Test Case Input Format

When running tests in Interview Studio, inputs use this format:
```
Input: "2,7,11,15|9"
Meaning: nums = [2, 7, 11, 15], target = 9
Expected Output: "0,1"
```

## Algorithm Explanation

### Time Complexity: O(n)
- Single pass through the array
- HashMap operations: O(1)

### Space Complexity: O(n)
- HashMap stores up to n elements

### Why Hash Map?
1. **Fast Lookup**: O(1) to check if complement exists
2. **Store Seen**: Remember indices as we go
3. **One Pass**: Find solution in single loop

## Variations

### Return Values Instead of Indices
```java
static int[] twoSum(int[] nums, int target) {
  Map<Integer, Integer> seen = new HashMap<>();
  
  for (int i = 0; i < nums.length; i++) {
    int complement = target - nums[i];
    if (seen.containsKey(complement)) {
      return new int[]{complement, nums[i]};  // Return values
    }
    seen.put(nums[i], i);
  }
  return new int[]{-1, -1};
}
```

### Return Sorted Indices
```java
static int[] twoSum(int[] nums, int target) {
  // ... find indices ...
  int[] result = new int[]{index1, index2};
  Arrays.sort(result);  // Sort in ascending order
  return result;
}
```

## Running on Judge0

When you submit, the system will:
1. Extract your `twoSum` method
2. Run it with each test case
3. Capture output
4. Compare with expected output
5. Show pass/fail

## Interview Tips

1. **Start Simple**: Write the brute force first
2. **Optimize**: Move to hash map approach
3. **Test Thoroughly**: Run all test cases
4. **Clean Code**: Remove debug statements
5. **Explain Out Loud**: Talk through your approach

---

**Remember**: Clean output format is crucial for tests to pass!
