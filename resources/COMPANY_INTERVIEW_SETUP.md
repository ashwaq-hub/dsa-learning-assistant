# Company-Wise Interview Questions Feature

## Overview
A new dedicated feature has been added to your DSA app that allows users to practice interview questions filtered by specific tech companies. This feature is completely separate and doesn't modify any existing code.

## What's New

### 📁 Files Created

1. **`src/data/companyQuestions.ts`** - Data file with:
   - 8 tech companies (Google, Meta, Amazon, Apple, Microsoft, Twitter, LinkedIn, Uber)
   - 8 topic categories (Arrays, Strings, Linked Lists, Trees, DP, Graphs, Hash Tables, Heaps)
   - 100+ interview questions with metadata
   - Question properties: text, companies array, difficulty level, topic

2. **`src/app/company/page.tsx`** - New interview page with:
   - Company selection grid
   - Topic-based filtering
   - Study Mode & Quiz Mode
   - Difficulty badges (Easy/Medium/Hard)
   - Progress tracking in quiz mode

## How to Use

### For Users:
1. Navigate to `/company` route in your app
2. Select a company from the grid
3. Choose Study Mode or Quiz Mode:
   - **Study Mode**: Browse questions by topic, expand to see answer hints
   - **Quiz Mode**: Practice questions one by one with progress tracking
4. Filter by topic to focus on specific areas

### For Developers:

#### Adding More Companies:
```typescript
// In src/data/companyQuestions.ts
export const COMPANIES = [
  'Google', 'Meta', 'Amazon', 'Apple', 'Microsoft',
  'Twitter', 'LinkedIn', 'Uber',
  'Netflix',      // Add new company here
  'Stripe'        // Add new company here
];
```

#### Adding More Questions:
```typescript
export const companyInterviewQuestions: CompanyTopic[] = [
  // ... existing topics ...
  {
    topic: 'System Design',
    questions: [
      {
        text: 'Design a URL shortener service.',
        companies: ['Google', 'Meta', 'Amazon'],
        difficulty: 'Hard',
        topic: 'System Design'
      }
    ]
  }
];
```

#### Data Structure Reference:
```typescript
interface CompanyQuestion {
  text: string;
  companies: string[];        // Array of company names
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;              // Topic name
}

interface CompanyTopic {
  topic: string;
  questions: CompanyQuestion[];
}
```

## Features

### 🎯 Study Mode
- Browse all questions for a selected company
- Filter by topic (Arrays, Strings, etc.)
- Click questions to expand answer hints
- Difficulty badge colors:
  - 🟢 Easy (green)
  - 🟡 Medium (yellow)
  - 🔴 Hard (red)

### 🧠 Quiz Mode
- Practice questions one at a time
- Visual progress bar showing completion
- Navigate between questions easily
- See difficulty and topic for each question
- Countdown shows remaining questions

### 🏢 Company Grid
Shows all available companies with:
- Company name
- Count of available questions
- Hover effects for better UX

## Customization Options

### Change Company List:
```typescript
export const COMPANIES = ['Your', 'Custom', 'Companies'];
```

### Add New Topics:
Simply add a new object to `companyInterviewQuestions` array with a `topic` name and `questions` array.

### Modify Styling:
The component uses CSS variables from your existing app:
- `--bg-primary`, `--bg-card`
- `--text-primary`, `--text-secondary`
- `--accent-blue`, `--accent-purple`
- `--border-color`

Update these in your global styles to customize the look.

## Integration with Navigation

To add a link to this feature in your main navigation:

```typescript
// In your navigation/header component
<a href="/company">🏢 Company Questions</a>

// Or as a button
<Link href="/company">🏢 Company Questions</Link>
```

Suggested placement in nav:
```
Home → Patterns → Interview → 🆕 Company → Solver → Flashcards
```

## Statistics

Current data includes:
- **8 Companies**: Google, Meta, Amazon, Apple, Microsoft, Twitter, LinkedIn, Uber
- **8 Topics**: Arrays, Strings, Linked Lists, Trees, DP, Graphs, Hash Tables, Heaps
- **100+ Questions**: Carefully curated interview questions from each company
- **Difficulty Levels**: Easy, Medium, Hard (realistic distribution)

## No Breaking Changes ✅

This feature is completely isolated:
- ✅ No modifications to existing pages
- ✅ No changes to existing data structures
- ✅ No impact on current routes
- ✅ Backward compatible with all existing code
- ✅ Can be deployed immediately

## Next Steps

1. **Access the feature**: Navigate to `https://your-app.com/company`
2. **Test it out**: Try selecting different companies and topics
3. **Customize**: Add more companies/questions as needed
4. **Share**: Add to your navigation menu for easy discovery

## File Locations

```
src/
├── app/
│   └── company/
│       └── page.tsx           ← New interview page
└── data/
    └── companyQuestions.ts    ← Question data
```

## Questions or Issues?

The implementation is self-contained. If you need to:
- Add more companies: Edit `COMPANIES` array
- Add more questions: Add to `companyInterviewQuestions` array
- Change styling: Update CSS variables in the component
- Modify features: Edit `src/app/company/page.tsx`

---

**Created**: April 15, 2026  
**Feature Status**: Ready for Production ✅
