# 📝 Question Management Guide

## Overview

Your DSA app now has a complete question management system with **three methods** to add and manage interview questions:

1. **Admin Dashboard** - Web form to add questions
2. **CSV Import/Export** - Use Excel/Sheets for bulk editing
3. **JSON File Editing** - Direct file editing for developers

---

## 🎯 Method 1: Admin Dashboard (Easiest)

### Access
Navigate to `/admin` in your app

### Features
- ✅ Add questions one at a time
- ✅ Select topic, difficulty, companies
- ✅ View all current questions
- ✅ Export to CSV or JSON
- ✅ Import from files

### How to Use

1. **Go to Admin Panel**
   ```
   Your App → /admin
   ```

2. **Fill the Form**
   - Question Text: Enter your question
   - Topic: Select from dropdown (Arrays, Strings, Trees, etc.)
   - Difficulty: Choose Easy/Medium/Hard
   - Companies: Check boxes for relevant companies

3. **Click "Add Question"**
   - Question is saved to browser storage
   - You'll see success message
   - JSON output appears in browser console

4. **Copy JSON to Data File**
   ```
   Open browser DevTools (F12)
   Console tab shows: "JSON to add to companyQuestions.ts:"
   Copy the JSON object
   Paste into src/data/companyQuestions.ts
   ```

### Example Form Input
```
Question: "How do you reverse a linked list iteratively?"
Topic: "Linked Lists"
Difficulty: "Medium"
Companies: ✓Google ✓Meta ✓Amazon
```

### Browser Console Output
```javascript
{
  "text": "How do you reverse a linked list iteratively?",
  "topic": "Linked Lists",
  "difficulty": "Medium",
  "companies": ["Google", "Meta", "Amazon"]
}
```

---

## 📊 Method 2: CSV Export/Import

### Use Cases
- Bulk add many questions at once
- Edit questions in Excel/Google Sheets
- Share question list with team members
- Create backups

### Export to CSV

1. Go to `/admin`
2. Click **Export** tab
3. Click **Download CSV**
4. Opens file: `company-questions-2026-04-15.csv`

### CSV File Format

```csv
Question,Topic,Difficulty,Companies
"What is the time complexity of accessing an array element?",Arrays,Easy,"Google, Meta, Amazon"
"How do you detect a cycle in a linked list?",Linked Lists,Medium,"Google, Meta, Amazon, Apple"
"Design a URL shortener",System Design,Hard,"Google, Meta"
```

### Edit in Excel

1. Download CSV from `/admin`
2. Open in Excel or Google Sheets
3. Add new rows following the format:
   ```
   Your question text | Topic | Difficulty | Company1, Company2
   ```
4. Important: Use proper quoting for questions with commas
5. Save as CSV

### Excel Example

| Question | Topic | Difficulty | Companies |
|----------|-------|-----------|-----------|
| How do you reverse a string? | Strings | Easy | Google, Meta |
| Implement LRU cache | Design | Hard | Google, Amazon |

### Import CSV Back

1. Save your edited CSV
2. Go to `/admin` → **Import** tab
3. Click file upload
4. Select your CSV file
5. Questions appear in browser console
6. Copy JSON and add to data file

### Pro Tips
- Always keep a backup of original CSV
- Use descriptive question text
- Ensure company names match exactly (Google, Meta, Amazon, etc.)
- Test import with small file first

---

## 💾 Method 3: Direct JSON File Editing

### File Location
```
src/data/companyQuestions.ts
```

### JSON Structure

```typescript
{
  topic: 'Arrays',
  questions: [
    {
      text: 'Your question here',
      companies: ['Google', 'Meta'],
      difficulty: 'Medium',
      topic: 'Arrays'
    }
  ]
}
```

### How to Add Questions Directly

1. **Open File**
   ```
   src/data/companyQuestions.ts
   ```

2. **Find Your Topic**
   ```typescript
   {
     topic: 'Arrays',
     questions: [
       // All array questions go here
     ]
   }
   ```

3. **Add New Question**
   ```typescript
   {
     text: 'How do you rotate an array by k positions?',
     companies: ['Google', 'Amazon', 'Apple'],
     difficulty: 'Medium',
     topic: 'Arrays'
   }
   ```

4. **Don't Forget the Comma!**
   ```typescript
   questions: [
     { existing question },
     { new question },  ← Add comma here!
     { another question }
   ]
   ```

5. **Save and Test**
   - Save the file
   - Run your app in dev mode
   - Navigate to `/company`
   - Should see your new question

### Complete Example

```typescript
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
        text: 'How do you rotate an array by k positions?',  // NEW
        companies: ['Google', 'Amazon', 'Apple'],             // NEW
        difficulty: 'Medium',                                  // NEW
        topic: 'Arrays'                                        // NEW
      }
      // More questions...
    ]
  },
  // More topics...
]
```

### Common Mistakes to Avoid

❌ **Missing Commas**
```typescript
{
  text: 'Question 1'
}
{
  text: 'Question 2'  // ❌ Error: missing comma above
}
```

✅ **Correct**
```typescript
{
  text: 'Question 1'
},
{
  text: 'Question 2'  // ✅ Comma above
}
```

---

## 📋 Comparison: Which Method to Use?

| Task | Method | Difficulty | Time |
|------|--------|-----------|------|
| Add 1 question | Admin Dashboard | Easy | 2 min |
| Add 5 questions | Admin Dashboard | Easy | 10 min |
| Add 50 questions | CSV Import | Medium | 30 min |
| Quick edit | JSON File | Medium | 5 min |
| Team collaboration | CSV Export | Medium | Variable |
| Backup data | CSV/JSON Export | Easy | 1 min |

---

## 🔄 Workflow Examples

### Scenario 1: Adding One Question (Daily Use)

```
1. Go to /admin
2. Fill form with question details
3. Click "Add Question"
4. See success message
5. Open DevTools → Console
6. Copy the JSON
7. Go to companyQuestions.ts
8. Paste into relevant topic array
9. Save file
10. Done! New question available at /company
```

### Scenario 2: Bulk Adding 10 Questions (Weekly)

```
1. Create questions in Google Sheet
2. Export as CSV
3. Go to /admin → Export
4. Download current CSV
5. Merge with your new questions
6. Go to /admin → Import
7. Upload merged CSV
8. Copy all JSON from console
9. Add to companyQuestions.ts
10. Deploy!
```

### Scenario 3: Team Collaboration

```
1. Person A exports questions → CSV
2. Shares CSV with team
3. Team edits in Google Sheets
4. Person B downloads updated CSV
5. Person B goes to /admin → Import
6. Person B copies JSON output
7. Person B commits to git
8. Questions synced across team!
```

---

## 💡 Best Practices

### 1. Always Backup
```bash
# Before major edits, backup your data
cp src/data/companyQuestions.ts src/data/companyQuestions.backup.ts
```

### 2. Version Control
```bash
git add src/data/companyQuestions.ts
git commit -m "Add 5 new questions for Arrays topic"
```

### 3. Validate Company Names
Always use exact names:
- ✅ Google, Meta, Amazon, Apple, Microsoft, Twitter, LinkedIn, Uber
- ❌ google, GOOGLE, Goog, etc.

### 4. Use Consistent Difficulty
- Easy: ~30% of questions
- Medium: ~50% of questions
- Hard: ~20% of questions

### 5. Organize by Topic
Keep related questions in same topic section for easier browsing.

### 6. Test After Adding
```
1. Add questions
2. Go to /company
3. Search for your company
4. Verify new questions appear
```

---

## 🐛 Troubleshooting

### Problem: "Unexpected token" Error
**Cause**: JSON syntax error (missing comma, quote, bracket)
**Solution**: Check JSON carefully, use validator at jsonlint.com

### Problem: New Questions Don't Appear
**Cause**: Not saved, typo in company name, syntax error
**Solution**: 
1. Verify file is saved
2. Check console for errors
3. Restart dev server
4. Check company name spelling

### Problem: CSV Import Shows Garbled Text
**Cause**: Encoding issue
**Solution**: Save CSV as UTF-8, not UTF-16

### Problem: Can't Access Admin Panel
**Cause**: `/admin` route might not be deployed
**Solution**: Verify `src/app/admin/page.tsx` exists and is deployed

---

## 📂 File Reference

| File | Purpose | Edit? |
|------|---------|-------|
| `src/data/companyQuestions.ts` | Main question data | ✅ Yes |
| `src/data/customQuestions.json` | Template for custom questions | ✅ Yes |
| `src/app/admin/page.tsx` | Admin dashboard | ⚠️ Only for features |
| `src/app/company/page.tsx` | Interview feature | ✅ Read-only |

---

## 🚀 Advanced: Programmatic Access

### In Your Component

```typescript
import { companyInterviewQuestions, COMPANIES } from '@/data/companyQuestions';

// Get all questions
const allQuestions = companyInterviewQuestions.flatMap(t => t.questions);

// Get Google questions
const googleQuestions = allQuestions.filter(q => 
  q.companies.includes('Google')
);

// Get Medium difficulty
const mediumQuestions = allQuestions.filter(q => 
  q.difficulty === 'Medium'
);

// Get Trees topic
const treeQuestions = companyInterviewQuestions
  .find(t => t.topic === 'Trees')
  ?.questions || [];
```

---

## 📞 Need Help?

- **Adding one question?** → Use Admin Dashboard method
- **Bulk add?** → Use CSV import
- **Want to code?** → Edit JSON directly
- **Team collaboration?** → Use CSV export/import

---

## ✅ Checklist: First Time Setup

- [ ] Navigate to `/admin` and verify page loads
- [ ] Add a test question through the form
- [ ] Check browser console for JSON output
- [ ] Copy JSON and add to `companyQuestions.ts`
- [ ] Verify new question appears at `/company`
- [ ] Export to CSV and open in Excel
- [ ] Try importing CSV back
- [ ] Read this guide once more
- [ ] You're ready to manage questions!

---

**Last Updated**: April 15, 2026  
**Version**: 1.0
