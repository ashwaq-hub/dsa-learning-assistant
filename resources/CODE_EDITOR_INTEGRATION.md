# 🔧 Code Editor Integration Guide

## Overview

The code compiler from `code-compiler` project has been successfully integrated into your DSA Learning Assistant app. Users can now write, test, and execute code directly within the interview practice interface.

---

## 📦 What Was Integrated

### 1. **Backend API Route**
- **File:** `src/app/api/execute/route.ts`
- **Endpoint:** `POST /api/execute`
- **Purpose:** Handles code execution requests using Judge0 API
- **Supported Languages:** JavaScript, Python, Java, Go, C, C++, C#

### 2. **CodeEditor Component**
- **File:** `src/components/CodeEditor.tsx`
- **Features:**
  - Multi-language support (7 languages)
  - Real-time code execution
  - Output display (success/error)
  - Language switching with example templates
  - Tab support for indentation
  - Copy & Reset buttons
  - Responsive design

### 3. **Integration Points**
- **Company Interview Page:** `/company` - Added code editor to Quiz Mode
- **Admin Dashboard:** Can be added to question creation form

---

## 🚀 Features

### Code Editor Component
```typescript
<CodeEditor
  questionText={question.text}
  language="javascript"
  showExecute={true}
  initialCode=""
  onCodeChange={(code) => console.log(code)}
/>
```

#### Props:
- `questionText` (optional): Display the problem statement
- `language` (default: 'javascript'): Initial programming language
- `showExecute` (default: true): Show run button and output
- `initialCode` (default: ''): Pre-fill editor with code
- `onCodeChange` (optional): Callback when code changes

### Supported Languages
| Language | Local | Cloud |
|----------|-------|-------|
| JavaScript | ✓ | ✓ |
| Python | ✓ | ✓ |
| Java | ✓ | ✓ |
| Go | ✓ | ✓ |
| C | - | ✓ |
| C++ | - | ✓ |
| C# | - | ✓ |

---

## 🔌 API Endpoint

### Request
```json
POST /api/execute
Content-Type: application/json

{
  "language": "javascript",
  "code": "console.log('Hello, World!');"
}
```

### Response (Success)
```json
{
  "success": true,
  "language": "javascript",
  "output": "Hello, World!\n",
  "error": "",
  "exitCode": 0,
  "status": "Accepted"
}
```

### Response (Error)
```json
{
  "success": false,
  "error": "ReferenceError: x is not defined",
  "language": "javascript",
  "output": "",
  "exitCode": 1
}
```

---

## 💡 Usage Examples

### Example 1: Basic Integration in Interview Page
```typescript
import CodeEditor from '@/components/CodeEditor';

export default function InterviewPage() {
  return (
    <div>
      <h2>Coding Challenge</h2>
      <CodeEditor
        questionText="Write a function to reverse a string"
        language="javascript"
        showExecute={true}
      />
    </div>
  );
}
```

### Example 2: With Code Change Tracking
```typescript
const [userCode, setUserCode] = useState('');

<CodeEditor
  language="python"
  onCodeChange={setUserCode}
  initialCode="def solution():\n    pass"
/>
```

### Example 3: Multiple Language Support
```typescript
const [selectedLang, setSelectedLang] = useState('javascript');

<CodeEditor
  key={selectedLang}  // Reset on language change
  language={selectedLang}
  questionText="Implement binary search"
/>
```

---

## 🎨 Styling

The CodeEditor component includes built-in styling with:
- Dark theme support
- Responsive design
- Mobile-friendly layout
- Syntax highlighting (basic textarea)
- Output panel with color-coded results

You can customize colors by modifying CSS variables in the component.

---

## 🔄 Workflow

### User Practice Flow
1. **Select Company** → `/company`
2. **Choose Topic & Question**
3. **Enter Quiz Mode**
4. **See Code Editor** ↓
5. **Write Solution** ↓
6. **Click "Run Code"** ↓
7. **View Output/Errors** ↓
8. **Iterate & Learn**

---

## ⚙️ Configuration

### Judge0 API
The app uses the free Judge0 API endpoint:
```
https://ce.judge0.com
```

**Features:**
- No authentication required
- Rate limited (fair use)
- Supports 60+ languages
- ~10 second execution timeout

### To Use Premium Judge0:
1. Sign up at https://judge0.com
2. Get API key
3. Update `src/app/api/execute/route.ts`:
```typescript
const JUDGE0_API = 'https://api.judge0.com'; // Premium endpoint
// Add header: 'Authorization': `Bearer ${API_KEY}`
```

---

## 📊 Integration Checklist

- [x] API endpoint created
- [x] CodeEditor component built
- [x] Company page integration
- [ ] Admin page integration
- [ ] Add code templates for each language
- [ ] Add syntax highlighting (Monaco Editor optional)
- [ ] Add performance metrics tracking
- [ ] Add solution comparison feature

---

## 🚨 Known Limitations

1. **Execution Timeout:** 10 seconds per submission
2. **No Local Execution:** Uses cloud API (Judge0)
3. **No File I/O:** Cannot read/write files
4. **Basic Output:** Simple stdout/stderr capture
5. **No Debugging:** No step-by-step debugger

---

## 🔮 Future Enhancements

### Phase 1 (Quick Wins)
- [ ] Add syntax highlighting with Monaco Editor
- [ ] Add code templates for each language
- [ ] Add test cases feature
- [ ] Save solutions to localStorage

### Phase 2 (Advanced)
- [ ] AI-powered hints using Claude API
- [ ] Solution comparison with optimal solutions
- [ ] Performance analytics (execution time, memory)
- [ ] Code review suggestions

### Phase 3 (Pro)
- [ ] Custom test case input
- [ ] Collaborative coding (live share)
- [ ] Video solution walkthrough
- [ ] Interview simulation with AI

---

## 🛠️ Troubleshooting

### "Code execution failed"
- Check network connection
- Verify language is supported
- Ensure code has no infinite loops (10s timeout)

### "Language not supported"
- Make sure language name is lowercase
- Use: javascript, python, java, go, c, cpp, csharp

### Slow execution
- Judge0 free tier has rate limiting
- Consider upgrading to premium
- Or implement local execution for JavaScript/Node

---

## 📞 Support

For issues or questions:
1. Check Judge0 API docs: https://judge0.com/api
2. Review code examples above
3. Check component props documentation

---

## 🔗 Related Files

- `src/app/api/execute/route.ts` - Execution API
- `src/components/CodeEditor.tsx` - Editor component
- `src/app/company/page.tsx` - Integration example
- `code-compiler/` - Original project reference

---

## 📝 Version History

**v1.0 (April 17, 2026)**
- Initial integration of code editor
- Judge0 API integration
- Company page support
- Multi-language support (7 languages)

---

Happy coding! 🚀
