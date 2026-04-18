# 🐛 Test Case Debugging Guide

## Common Test Case Failures & Fixes

### ❌ Failure 1: Output Format Mismatch

**Error Message:**
```
Test 1: FAIL
Expected: 0,1
Got: [0,1]
```

**Root Cause**: Array brackets included in output

**Your Code:**
```java
System.out.println(Arrays.toString(result));  // ❌ Outputs [0,1]
```

**Fix:**
```java
System.out.println(result[0] + "," + result[1]);  // ✅ Outputs 0,1
```

---

### ❌ Failure 2: Extra Spaces in Output

**Error Message:**
```
Test 1: FAIL
Expected: 0,1
Got: 0, 1
```

**Root Cause**: Space after comma

**Your Code:**
```java
System.out.println(result[0] + ", " + result[1]);  // ❌ Space after comma
```

**Fix:**
```java
System.out.println(result[0] + "," + result[1]);  // ✅ No spaces
```

---

### ❌ Failure 3: Wrong Indices Order

**Error Message:**
```
Test 2: FAIL
Expected: 1,2
Got: 2,1
```

**Root Cause**: Returning indices in wrong order

**Your Code:**
```java
return new int[]{j, i};  // ❌ Wrong order
```

**Fix:**
```java
return new int[]{i, j};  // ✅ Correct order
```

---

### ❌ Failure 4: Debug Print Statements

**Error Message:**
```
Test 1: FAIL
Expected: 0,1
Got: target:9
TwoSum Indices are [-1,0]
0,1
```

**Root Cause**: Debug print statements contaminating output

**Your Code:**
```java
System.out.println("target:" + target);  // ❌ Debug output
System.out.println("TwoSum Indices are ...");  // ❌ Debug output
System.out.println(result[0] + "," + result[1]);  // ✅ Actual output
```

**Fix:**
```java
// Remove or comment out all debug statements
// System.out.println("target:" + target);
// System.out.println("TwoSum Indices are ...");
System.out.println(result[0] + "," + result[1]);  // ✅ Only actual output
```

---

### ❌ Failure 5: Wrong Logic (Algorithm Issue)

**Error Message:**
```
Test 3: FAIL
Expected: 0,1
Got: -1,-1
```

**Root Cause**: Algorithm doesn't find the solution

**Check:**
- Is your complement calculation correct? `complement = target - nums[i]`
- Are you checking `seen` map before adding current number?
- Are you returning the correct indices?

**Debug Steps:**
```java
static int[] twoSum(int[] nums, int target) {
  Map<Integer, Integer> seen = new HashMap<>();
  
  for (int i = 0; i < nums.length; i++) {
    int complement = target - nums[i];
    
    // Debug: Print what we're looking for
    // System.out.println("Looking for " + complement + " at index " + i);
    
    if (seen.containsKey(complement)) {
      // Found it!
      // System.out.println("Found! " + seen.get(complement) + "," + i);
      return new int[]{seen.get(complement), i};
    }
    
    seen.put(nums[i], i);
  }
  
  return new int[]{-1, -1};
}
```

---

### ❌ Failure 6: Multiple Output Lines

**Error Message:**
```
Test 1: FAIL
Expected: 0,1
Got: 0
     1
```

**Root Cause**: Output on multiple lines

**Your Code:**
```java
System.out.println(result[0]);  // ❌ Separate line
System.out.println(result[1]);  // ❌ Separate line
```

**Fix:**
```java
System.out.println(result[0] + "," + result[1]);  // ✅ Single line
```

---

### ❌ Failure 7: Incorrect Input Parsing

**Error Message:**
```
Test 1: FAIL
Expected: 0,1
Got: -1,-1
```

**Root Cause**: Not parsing input correctly from test case

**Test Input Format:**
```
"2,7,11,15|9"
```

**Your Code Should Handle:**
- Split by `|` to get array and target
- Parse array part `2,7,11,15` to `[2, 7, 11, 15]`
- Parse target `9` to integer `9`

**Example:**
```java
public static void main(String[] args) {
  // Input: "2,7,11,15|9"
  String input = "2,7,11,15|9";
  String[] parts = input.split("\\|");
  
  String[] numsStr = parts[0].split(",");
  int[] nums = new int[numsStr.length];
  for (int i = 0; i < numsStr.length; i++) {
    nums[i] = Integer.parseInt(numsStr[i]);
  }
  
  int target = Integer.parseInt(parts[1]);
  
  int[] result = twoSum(nums, target);
  System.out.println(result[0] + "," + result[1]);
}
```

---

## Test Case Checker

### Run This to Verify Your Output

```java
import java.util.*;

public class Main {
  public static void main(String[] args) {
    // Test Case 1
    runTest("2,7,11,15|9", "0,1");
    // Test Case 2
    runTest("3,2,4|6", "1,2");
    // Test Case 3
    runTest("3,3|6", "0,1");
    // Test Case 4
    runTest("1,2,3,4,5,6|11", "4,5");
    // Test Case 5
    runTest("-1,0,1,2,-1,-4|0", "1,2");
  }
  
  static void runTest(String input, String expected) {
    // Parse input
    String[] parts = input.split("\\|");
    String[] numsStr = parts[0].split(",");
    int[] nums = new int[numsStr.length];
    for (int i = 0; i < numsStr.length; i++) {
      nums[i] = Integer.parseInt(numsStr[i]);
    }
    int target = Integer.parseInt(parts[1]);
    
    // Run solution
    int[] result = twoSum(nums, target);
    String actual = result[0] + "," + result[1];
    
    // Check result
    boolean passed = actual.equals(expected);
    String status = passed ? "✅ PASS" : "❌ FAIL";
    
    System.out.println(status + " | Input: " + input + 
                       " | Expected: " + expected + 
                       " | Got: " + actual);
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

**Expected Output:**
```
✅ PASS | Input: 2,7,11,15|9 | Expected: 0,1 | Got: 0,1
✅ PASS | Input: 3,2,4|6 | Expected: 1,2 | Got: 1,2
✅ PASS | Input: 3,3|6 | Expected: 0,1 | Got: 0,1
✅ PASS | Input: 1,2,3,4,5,6|11 | Expected: 4,5 | Got: 4,5
✅ PASS | Input: -1,0,1,2,-1,-4|0 | Expected: 1,2 | Got: 1,2
```

---

## Quick Checklist Before Submission

- [ ] ✅ No debug print statements in code
- [ ] ✅ Output format matches exactly (no brackets, no spaces)
- [ ] ✅ Single output line per test case
- [ ] ✅ Correct algorithm logic
- [ ] ✅ All 5 test cases pass locally
- [ ] ✅ Code compiles without errors
- [ ] ✅ Input parsing is correct
- [ ] ✅ Edge cases handled (duplicates, negatives)

---

## Debugging Workflow

1. **Read Error Message**: What exactly failed?
2. **Identify Issue Type**: Format, logic, or something else?
3. **Create Minimal Test**: Isolate the problem
4. **Add Debug Output**: Print intermediate values
5. **Verify Fix**: Run all test cases again
6. **Clean Code**: Remove debug statements
7. **Final Check**: Ensure output format is clean

---

## Common Patterns

### Pattern 1: HashMap + Loop (Two Sum)
```java
Map<Integer, Integer> seen = new HashMap<>();
for (int i = 0; i < nums.length; i++) {
  int complement = target - nums[i];
  if (seen.containsKey(complement)) {
    return new int[]{seen.get(complement), i};
  }
  seen.put(nums[i], i);
}
return new int[]{-1, -1};
```

### Pattern 2: String Output
```java
// ✅ Correct
System.out.println(result);

// ❌ Wrong
System.out.println(Arrays.toString(result));
System.out.println("[" + result[0] + "," + result[1] + "]");
```

### Pattern 3: Test Multiple Cases
```java
// Run all test cases in main
int[] test1 = twoSum(new int[]{2,7,11,15}, 9);
System.out.println(format(test1));

int[] test2 = twoSum(new int[]{3,2,4}, 6);
System.out.println(format(test2));

// ... more tests
```

---

## Tips for Success

1. **Test Locally First**: Run locally before submitting
2. **Follow Format**: Match expected output exactly
3. **Think About Edge Cases**: Empty, single element, duplicates
4. **Clean Before Submit**: No debug statements or extra output
5. **Verify Algorithm**: Make sure logic is correct
6. **Read Test Descriptions**: They hint at what's being tested

---

**Remember**: Most test failures are due to output format mismatches, not incorrect logic!
