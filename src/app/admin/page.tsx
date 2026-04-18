'use client';

import { useState, useEffect } from 'react';
import { companyInterviewQuestions, COMPANIES, CompanyQuestion } from '@/data/companyQuestions';

interface FormData {
  text: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  selectedCompanies: string[];
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'add' | 'view' | 'export' | 'import'>('add');
  const [formData, setFormData] = useState<FormData>({
    text: '',
    topic: '',
    difficulty: 'Medium',
    selectedCompanies: []
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [isClient, setIsClient] = useState(false);

  // Only run on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const topics = companyInterviewQuestions.map(t => t.topic);
  const allQuestions = companyInterviewQuestions.flatMap(t => t.questions);

  const showMessage = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 4000);
  };

  const handleAddQuestion = () => {
    // Validation
    if (!formData.text.trim()) {
      showMessage('Question text is required', 'error');
      return;
    }
    if (!formData.topic) {
      showMessage('Please select a topic', 'error');
      return;
    }
    if (formData.selectedCompanies.length === 0) {
      showMessage('Please select at least one company', 'error');
      return;
    }

    // Create new question
    const newQuestion: CompanyQuestion = {
      text: formData.text,
      topic: formData.topic,
      difficulty: formData.difficulty,
      companies: formData.selectedCompanies
    };

    // Log the question (in production, this would save to backend/file)
    console.log('New Question:', newQuestion);

    // Save to localStorage as backup (only if client)
    let savedCount = 0;
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedQuestions = JSON.parse(localStorage.getItem('customQuestions') || '[]');
      savedQuestions.push(newQuestion);
      localStorage.setItem('customQuestions', JSON.stringify(savedQuestions));
      savedCount = savedQuestions.length;
    }

    showMessage(
      `✅ Question added! Total custom questions: ${savedCount}.
      Copy the JSON below to add to your data file.`,
      'success'
    );

    // Reset form
    setFormData({ text: '', topic: '', difficulty: 'Medium', selectedCompanies: [] });

    // Show JSON output
    console.log('JSON to add to companyQuestions.ts:');
    console.log(JSON.stringify(newQuestion, null, 2));
  };

  const handleCompanyToggle = (company: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCompanies: prev.selectedCompanies.includes(company)
        ? prev.selectedCompanies.filter(c => c !== company)
        : [...prev.selectedCompanies, company]
    }));
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Question', 'Topic', 'Difficulty', 'Companies'];
    const rows = allQuestions.map(q => [
      `"${q.text.replace(/"/g, '""')}"`,
      q.topic,
      q.difficulty,
      `"${q.companies.join(', ')}"`
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `company-questions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    showMessage('✅ CSV downloaded successfully!', 'success');
  };

  // Export to JSON
  const exportToJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      totalQuestions: allQuestions.length,
      companies: COMPANIES,
      questions: allQuestions
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `company-questions-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    showMessage('✅ JSON downloaded successfully!', 'success');
  };

  // Get custom questions from localStorage (only on client)
  const customQuestions = isClient && typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('customQuestions') || '[]')
    : [];

  // Prevent hydration mismatch by showing loader during client hydration
  if (!isClient) {
    return (
      <main className="container" style={{ padding: '2rem 1.5rem' }}>
        <h1 className="section-title">⚙️ Admin - Question Management</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: '2rem 1.5rem' }}>
      <h1 className="section-title">⚙️ Admin - Question Management</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Manage interview questions: Add, view, export, and import questions.
      </p>

      {/* Message Display */}
      {message && (
        <div
          style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: '0.5rem',
            background: messageType === 'success' ? '#dbeafe' :
                       messageType === 'error' ? '#fee2e2' : '#fef3c7',
            color: messageType === 'success' ? '#0369a1' :
                   messageType === 'error' ? '#dc2626' : '#92400e',
            borderLeft: `4px solid ${
              messageType === 'success' ? '#06b6d4' :
              messageType === 'error' ? '#ef4444' : '#f59e0b'
            }`
          }}
        >
          {message}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        <button
          className={`tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          ➕ Add Question
        </button>
        <button
          className={`tab ${activeTab === 'view' ? 'active' : ''}`}
          onClick={() => setActiveTab('view')}
        >
          👁️ View All ({allQuestions.length})
        </button>
        <button
          className={`tab ${activeTab === 'export' ? 'active' : ''}`}
          onClick={() => setActiveTab('export')}
        >
          📥 Export
        </button>
        <button
          className={`tab ${activeTab === 'import' ? 'active' : ''}`}
          onClick={() => setActiveTab('import')}
        >
          📤 Import
        </button>
      </div>

      {/* ADD QUESTION TAB */}
      {activeTab === 'add' && (
        <div className="solution-box">
          <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>Add New Question</h2>

          {/* Question Text */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              Question Text *
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Enter the interview question..."
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                minHeight: '100px',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Topic Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              Topic *
            </label>
            <select
              value={formData.topic}
              onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit'
              }}
            >
              <option value="">Select a topic...</option>
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>
              Difficulty *
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {(['Easy', 'Medium', 'Hard'] as const).map(level => (
                <label key={level} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    checked={formData.difficulty === level}
                    onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value as any }))}
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{
                    color: level === 'Easy' ? '#4ade80' :
                           level === 'Medium' ? '#facc15' : '#ef4444'
                  }}>
                    {level}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Company Selection */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>
              Companies * (select at least one)
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem' }}>
              {COMPANIES.map(company => (
                <label
                  key={company}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    background: formData.selectedCompanies.includes(company) ? 'var(--accent-blue)' : 'var(--bg-primary)',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    color: formData.selectedCompanies.includes(company) ? 'white' : 'var(--text-primary)',
                    transition: 'all 0.2s'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedCompanies.includes(company)}
                    onChange={() => handleCompanyToggle(company)}
                    style={{ cursor: 'pointer' }}
                  />
                  {company}
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAddQuestion}
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1rem', fontWeight: 600 }}
          >
            ➕ Add Question
          </button>

          {/* Custom Questions Info */}
          {customQuestions.length > 0 && (
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <h3 style={{ marginTop: 0, color: 'var(--accent-purple)' }}>
                📝 Custom Questions Added: {customQuestions.length}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                These are stored in your browser. To persist them, copy the JSON from browser console and add to your data file.
              </p>
            </div>
          )}
        </div>
      )}

      {/* VIEW ALL TAB */}
      {activeTab === 'view' && (
        <div className="solution-box">
          <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>All Questions ({allQuestions.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {allQuestions.map((q, i) => (
              <div
                key={i}
                style={{
                  padding: '1rem',
                  background: 'var(--bg-primary)',
                  borderRadius: '0.5rem',
                  borderLeft: `4px solid ${
                    q.difficulty === 'Easy' ? '#4ade80' :
                    q.difficulty === 'Medium' ? '#facc15' : '#ef4444'
                  }`
                }}
              >
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>{q.text}</strong>
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                  <span style={{
                    color: q.difficulty === 'Easy' ? '#4ade80' :
                           q.difficulty === 'Medium' ? '#facc15' : '#ef4444'
                  }}>
                    {q.difficulty}
                  </span>
                  <span>📌 {q.topic}</span>
                  <span>🏢 {q.companies.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXPORT TAB */}
      {activeTab === 'export' && (
        <div className="solution-box">
          <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>Export Questions</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Download your questions in different formats to backup or edit externally.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {/* CSV Export */}
            <div
              style={{
                padding: '1.5rem',
                background: 'var(--bg-primary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>CSV Format</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Edit in Excel or Google Sheets
              </p>
              <button
                onClick={exportToCSV}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Download CSV
              </button>
            </div>

            {/* JSON Export */}
            <div
              style={{
                padding: '1.5rem',
                background: 'var(--bg-primary)',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💾</div>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>JSON Format</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                For direct data file updates
              </p>
              <button
                onClick={exportToJSON}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Download JSON
              </button>
            </div>
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: '0.5rem' }}>
            <h3 style={{ marginTop: 0, color: 'var(--accent-yellow)' }}>💡 How to Use</h3>
            <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem' }}>
              <li><strong>CSV:</strong> Download, edit in Excel, add new rows</li>
              <li><strong>JSON:</strong> Download, then copy data into your <code>companyQuestions.ts</code></li>
              <li>Keep backups of your data regularly</li>
            </ul>
          </div>
        </div>
      )}

      {/* IMPORT TAB */}
      {activeTab === 'import' && (
        <div className="solution-box">
          <h2 style={{ marginTop: 0, fontSize: '1.1rem' }}>Import Questions</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Import questions from CSV or JSON files to bulk add questions.
          </p>

          <div style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '0.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📤</div>
            <h3 style={{ marginTop: 0 }}>Upload CSV or JSON File</h3>
            <input
              type="file"
              accept=".csv,.json"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (event) => {
                  try {
                    const content = event.target?.result as string;
                    if (file.name.endsWith('.json')) {
                      const data = JSON.parse(content);
                      showMessage('✅ JSON loaded! Check console for parsed questions', 'success');
                      console.log('Imported questions:', data);
                    } else if (file.name.endsWith('.csv')) {
                      showMessage('✅ CSV loaded! Processing... (check console)', 'success');
                      console.log('CSV content:', content);
                    }
                  } catch (err) {
                    showMessage('❌ Error parsing file. Check console for details.', 'error');
                    console.error(err);
                  }
                };
                reader.readAsText(file);
              }}
              style={{
                display: 'block',
                margin: '1rem auto',
                padding: '1rem',
                cursor: 'pointer'
              }}
            />
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              CSV or JSON files only
            </p>
          </div>

          <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderRadius: '0.5rem' }}>
            <h3 style={{ marginTop: 0, color: 'var(--accent-yellow)' }}>📝 Steps to Import</h3>
            <ol style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem' }}>
              <li>Export questions from this admin panel</li>
              <li>Edit the CSV in Excel or JSON in any text editor</li>
              <li>Upload the file here to import</li>
              <li>Questions will be logged to console for manual addition</li>
              <li>Add imported questions to your data file</li>
            </ol>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div style={{ marginTop: '3rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: '0.5rem', borderLeft: '4px solid var(--accent-blue)' }}>
        <h3 style={{ marginTop: 0, color: 'var(--accent-blue)' }}>📌 Admin Notes</h3>
        <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', margin: 0 }}>
          <li>This is a development admin panel - not for production users</li>
          <li>Custom questions are stored in browser localStorage (temporary)</li>
          <li>To persist questions permanently, add them to <code>src/data/companyQuestions.ts</code></li>
          <li>Always backup your questions before making bulk edits</li>
          <li>Check browser console for JSON output of questions</li>
        </ul>
      </div>
    </main>
  );
}
