# 🚀 Quick Start - Code Editor Feature

## What's New? 💻

Your DSA app now has **live code execution**! Users can write and test code directly while practicing interview questions.

---

## 🎯 Where to Find It

### Location
```
https://your-app.vercel.app/company
  ↓
Select Company (Google, Amazon, etc.)
  ↓
Quiz Mode 🎯
  ↓
See Code Editor Below Each Question ✨
```

---

## 📝 How to Use

### Step 1: Navigate to Interview Practice
```
1. Go to /company route
2. Select a company (Google, Meta, Amazon, etc.)
3. Click "Quiz Mode" 🎯
```

### Step 2: See the Code Editor
```
Below each question, you'll see:
┌────────────────────────────────┐
│ 💻 Practice Coding             │
├────────────────────────────────┤
│ Language: [JavaScript ▼]       │
│                                │
│ [Run Code] [Copy] [Reset]      │
│                                │
│ (Code Editor)                  │
│                                │
│ Output:                        │
│ Hello, World!                  │
└────────────────────────────────┘
```

### Step 3: Write Your Solution
```javascript
// Example: Reverse a string
function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString("hello")); // Output: olleh
```

### Step 4: Choose Language
```
Click the language dropdown to choose:
- JavaScript
- Python
- Java
- Go
- C
- C++
- C#
```

### Step 5: Run Your Code
```
1. Click "Run Code" button
2. Wait for execution (usually <1 second)
3. See output below the editor
4. Success: Green output
5. Error: Red error message
```

---

## 🌟 Features

### ✨ Automatic Code Templates
When you switch languages, it auto-fills with examples:

**JavaScript:**
```javascript
// Write your solution here
function solution() {
  console.log("Hello, World!");
}
solution();
```

**Python:**
```python
# Write your solution here
def solution():
    print("Hello, World!")

solution()
```

**Java:**
```java
public class Solution {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

### 🎮 Editor Controls
- **Tab Key:** Add 4-space indentation (works in editor)
- **Run Code:** Execute your solution
- **Copy:** Copy code to clipboard
- **Reset:** Restore template code

### 📊 Output Panel
- **Success:** Shows stdout in green
- **Errors:** Shows stderr in red
- **Exit Code:** Shows execution status
- **Timeout:** If code runs >10 seconds

---

## 💡 Example Workflows

### Workflow 1: Quick Test
```
1. Question: "Write a function to check if number is prime"
2. Write Python code
3. Click "Run Code"
4. See: True/False output
5. Next question →
```

### Workflow 2: Debug & Fix
```
1. Write initial solution
2. Run code → See error
3. Fix the error
4. Run again → Success!
5. Move to next question
```

### Workflow 3: Language Exploration
```
1. Write solution in JavaScript
2. Run it → Works!
3. Switch to Python
4. Write same logic in Python
5. Run & compare output
```

---

## 🔧 Supported Languages & Features

| Language | Runtime | Output | Input | Import |
|----------|---------|--------|-------|--------|
| JavaScript | Node.js | ✓ | ✓ | ✓ |
| Python | Python 3.10 | ✓ | ✓ | ✓ |
| Java | Java 15 | ✓ | ✓ | ✓ |
| Go | Go 1.16 | ✓ | ✓ | ✓ |
| C | GCC 10 | ✓ | ✓ | ✓ |
| C++ | G++ 10 | ✓ | ✓ | ✓ |
| C# | Mono 6.0 | ✓ | ✓ | ✓ |

---

## 📚 Example Solutions

### Problem: "Reverse a String"

**JavaScript Solution:**
```javascript
function reverseString(str) {
  return str.split('').reverse().join('');
}
console.log(reverseString("hello")); // olleh
```

**Python Solution:**
```python
def reverse_string(s):
    return s[::-1]

print(reverse_string("hello"))  # olleh
```

**Java Solution:**
```java
public class Solution {
    static String reverseString(String s) {
        return new StringBuilder(s).reverse().toString();
    }
    
    public static void main(String[] args) {
        System.out.println(reverseString("hello")); // olleh
    }
}
```

### Problem: "Find Maximum Number"

**JavaScript:**
```javascript
function findMax(arr) {
  return Math.max(...arr);
}
console.log(findMax([1, 5, 3, 9, 2])); // 9
```

**Python:**
```python
def find_max(arr):
    return max(arr)

print(find_max([1, 5, 3, 9, 2]))  # 9
```

---

## ⚡ Quick Tips

### Tip 1: Copy Working Code
```
After you get code working:
1. Click "Copy" button
2. Paste into notes/document
3. Track your solutions
```

### Tip 2: Practice Multiple Languages
```
Same problem, different languages:
1. Solve in JavaScript first
2. Then try Python version
3. Understand language differences
```

### Tip 3: Use Print Statements for Debugging
```javascript
// Good debugging practice
function solution(x) {
  console.log("Input:", x);
  let result = x * 2;
  console.log("Result:", result);
  return result;
}

console.log(solution(5));
// Output:
// Input: 5
// Result: 10
// 10
```

### Tip 4: Handle Edge Cases
```javascript
function isEven(n) {
  // Edge case: check for null/undefined
  if (n === null || n === undefined) {
    return false;
  }
  return n % 2 === 0;
}

console.log(isEven(4));   // true
console.log(isEven(null)); // false
```

---

## 🎓 Interview Prep Best Practices

### 1. **Think Before Coding**
```
1. Read question carefully
2. Ask clarifying questions
3. Write pseudocode
4. Then code the solution
```

### 2. **Test Edge Cases**
```
For array problem:
- Empty array: []
- Single element: [1]
- Duplicates: [1,1,1]
- Negative numbers: [-5, -3]
```

### 3. **Explain Your Code**
```
1. Walk through logic
2. Explain time complexity: O(n)
3. Explain space complexity: O(1)
4. Mention alternative approaches
```

### 4. **Optimize if Needed**
```
First approach: Brute force O(n²)
Second approach: Better O(n log n)
Third approach: Optimal O(n)
```

---

## 🐛 Troubleshooting

### Issue: "Code execution failed"
**Solution:**
- Check network connection
- Verify code syntax
- Reduce timeout (avoid infinite loops)

### Issue: "Language not supported"
**Solution:**
- Use language names: javascript, python, java, go, c, cpp, csharp
- Not: js, py, java2, golang, c++

### Issue: "Code timeout (>10 seconds)"
**Solution:**
- Check for infinite loops
- Optimize algorithm
- Use efficient data structures

### Issue: "Import/Module not found"
**Solution:**
- Python: Most stdlib included (no pip install)
- JavaScript: Node.js built-ins available
- Java: Can't use external libraries
- Use language's standard library

---

## 📊 What Happens Under the Hood

```
User clicks "Run Code"
        ↓
Send code to /api/execute
        ↓
API sends to Judge0 cloud service
        ↓
Compiler executes code
        ↓
Returns stdout/stderr
        ↓
Display output in editor
```

---

## 🎯 Next Steps

### For Students:
1. ✅ Go to `/company`
2. ✅ Practice with code editor
3. ✅ Try different languages
4. ✅ Build confidence before real interviews

### For Developers (to enhance):
1. Add syntax highlighting
2. Add test cases feature
3. Add performance metrics
4. Add AI hints

---

## 🚀 You're All Set!

Your DSA app now has professional-grade code execution. 

**Start practicing and building interview confidence!** 💪

---

## 📞 Need Help?

See detailed docs:
- `CODE_EDITOR_INTEGRATION.md` - Technical guide
- `CODE_COMPILER_INTEGRATION_SUMMARY.md` - What was added

---

**Happy Coding!** 🎉
