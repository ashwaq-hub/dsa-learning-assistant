# 🤖 Gemini AI Resolve Feature - Setup Guide

## Overview

The **Resolve** button uses Google's Gemini AI to help debug code issues and test failures. It's completely free and uses cached solutions to minimize API calls.

## ✨ Features

- **AI-Powered Debugging**: Get intelligent suggestions for fixing code errors
- **Smart Caching**: Solutions are cached locally in localStorage - reuse without API calls
- **Multi-Language Support**: Works with Java, Python, JavaScript, C++, C, Go, C#
- **Seamless Integration**: Button appears next to Run Code/Run Tests
- **Graceful Fallback**: Works offline with cached solutions
- **Free API**: Uses Google Gemini's free tier

## 🔧 Setup (Required for First Time)

### 1. Get Gemini API Key (Free)

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Create API Key in new project"
3. Copy the generated API key

### 2. Configure Environment Variable

#### **Development (Local)**

Create `.env.local` in project root:

```bash
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

#### **Production (Vercel)**

Add to Vercel Environment Variables:

1. Go to Vercel Project Settings → Environment Variables
2. Add variable:
   - **Name**: `GOOGLE_GEMINI_API_KEY`
   - **Value**: Your API key
   - **Environments**: Production, Preview, Development

## 📱 Usage

### In Interview Studio

```
1. Select a problem → Start Interview
2. Run code that produces errors or fails tests
3. Click "🤖 Resolve" button next to "✅ Run Tests"
4. AI analyzes your code and provides suggestions
5. Solution appears in purple section below output
6. Close with ✕ button when done
```

### In Code Editor

```
1. Write code with errors
2. Click "Run Code" to see error output
3. Click "Resolve" button
4. Get AI suggestions for fixing the issue
5. View cached solutions without API calls
```

## 🎯 How It Works

### First Request (with Errors)
1. You click "Resolve"
2. Gemini API analyzes your code + error + problem description
3. Returns helpful debugging suggestions
4. **Solution is cached locally**
5. Display in formatted section

### Subsequent Requests (Same Code)
1. You click "Resolve" again with same code
2. **Cached solution loads instantly** (no API call)
3. No rate limits or quota concerns

### Cache Key
```
Key = "resolution_" + problem/language + hash(first 100 chars of code)
```

## 📋 What Gemini Analyzes

When you click Resolve, it provides:

1. **Main Issues**: Root causes of failures
2. **Step-by-Step Explanation**: How to fix each issue
3. **Corrected Code**: Example of the fix
4. **Best Practices**: How to avoid similar issues

## 💡 Example

**Your Code** (Failed Test):
```java
public int twoSum(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == target) return i;  // Wrong logic!
    }
    return -1;
}
```

**Test Failure**:
```
Expected: [0, 1]
Got: 0
```

**Click Resolve** → Gets:
```
1. Issue: Checking only individual numbers, not pairs
2. Fix: Use nested loop or hash map to find complement
3. Corrected code...
```

## 🚨 Troubleshooting

### "Gemini API key not configured"
- ✅ Set `GOOGLE_GEMINI_API_KEY` in environment variables
- ✅ For Vercel: Add to Environment Variables in project settings
- ✅ Restart dev server after setting env variable

### "Failed to resolve code issue"
- ✅ Check API key is valid
- ✅ Verify internet connection
- ✅ Check Gemini API quota in Google AI Studio
- ✅ Try again in a few seconds (rate limit)

### Cached Solution is Outdated
- ✅ Clear browser localStorage: `localStorage.clear()`
- ✅ Or change your code slightly to get fresh analysis

## 🔐 API Key Safety

- ✅ API key only used server-side (backend route)
- ✅ Never exposed to client/browser
- ✅ Can restrict API key to specific IPs/domains in Google Cloud Console
- ✅ Free tier has rate limits (good for development)

## 📊 Rate Limits (Free Tier)

- **Requests per minute**: 60
- **Requests per day**: Unlimited
- **Cost**: $0
- **With caching**: Rarely hit limits

## 🎓 Best Practices

1. **Run Tests First**: Click "Run Tests" before "Resolve"
2. **Save Cache**: Use same code to leverage localStorage
3. **Review Suggestions**: AI helps but verify the solutions
4. **Environment**: Set up env variables before first use
5. **Offline Work**: Cached solutions work without internet

## 🔄 Caching Details

### What's Cached
- AI-generated resolution text
- Problem title + language
- Code hash (first 100 characters)

### Cache Storage
- **Location**: Browser localStorage
- **Size per solution**: ~2-5 KB
- **Total capacity**: Usually 5-10 MB per domain
- **Persistence**: Survives page refresh, browser restart

### Clear Cache
```javascript
// In browser console
localStorage.clear();  // Clears all cached solutions
```

## 📈 Cost Analysis

### Without Caching
- 100 errors = 100 API calls = Expensive

### With Caching
- 100 errors, same code = 1 API call
- **99% reduction in API usage**
- **Near-zero cost**

## 🚀 Advanced Usage

### Check Cache Manually
```javascript
// In browser console
localStorage.getItem('resolution_TwoSum_java_xyz...')
```

### Pre-Cache Solutions
Use the button once per problem to cache solutions locally.

## 📞 Support

- **Gemini API Issues**: [Google AI Studio Help](https://support.google.com/aistudio)
- **Project Issues**: Check error messages in browser console
- **Feature Requests**: Open issue in repository

---

**Enjoy debugging with AI! 🤖✨**
