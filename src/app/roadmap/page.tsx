'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { roadmapSections, TopicStatus } from '@/data/roadmap';

const STORAGE_KEY = 'dsa-roadmap-progress';

type ProgressMap = Record<string, TopicStatus>;

const statusConfig = {
  'not-started': { label: 'Not Started', icon: '○', bg: 'transparent', border: 'var(--border-color)', text: 'var(--text-secondary)' },
  'in-progress': { label: 'In Progress', icon: '◑', bg: 'rgba(245, 158, 11, 0.15)', border: '#f59e0b', text: '#f59e0b' },
  'done': { label: 'Done', icon: '●', bg: 'rgba(16, 185, 129, 0.15)', border: '#10b981', text: '#10b981' },
};

const statusCycle: TopicStatus[] = ['not-started', 'in-progress', 'done'];

export default function RoadmapPage() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProgress(JSON.parse(saved));
    } catch {}
    const initial: Record<string, boolean> = {};
    roadmapSections.forEach(s => { initial[s.id] = true; });
    setExpandedSections(initial);
  }, []);

  const saveProgress = (next: ProgressMap) => {
    setProgress(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const cycleTopic = (topicId: string) => {
    const current = progress[topicId] || 'not-started';
    const nextStatus = statusCycle[(statusCycle.indexOf(current) + 1) % statusCycle.length];
    saveProgress({ ...progress, [topicId]: nextStatus });
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const markSectionDone = (sectionId: string) => {
    const section = roadmapSections.find(s => s.id === sectionId);
    if (!section) return;
    const updates: ProgressMap = { ...progress };
    section.topics.forEach(t => { updates[t.id] = 'done'; });
    saveProgress(updates);
  };

  const allTopics = roadmapSections.flatMap(s => s.topics);
  const doneCount = allTopics.filter(t => progress[t.id] === 'done').length;
  const inProgressCount = allTopics.filter(t => progress[t.id] === 'in-progress').length;
  const totalCount = allTopics.length;
  const progressPct = Math.round((doneCount / totalCount) * 100);

  const getSectionStats = (sectionId: string) => {
    const section = roadmapSections.find(s => s.id === sectionId);
    if (!section) return { done: 0, total: 0 };
    const done = section.topics.filter(t => progress[t.id] === 'done').length;
    return { done, total: section.topics.length };
  };

  return (
    <main className="container" style={{ padding: '2rem 1.5rem', maxWidth: '860px' }}>
      <h1 className="section-title">🗺️ DSA Roadmap</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Step-by-step learning path for Data Structures & Algorithms. Click any topic to track your progress.
      </p>

      {/* Progress Bar */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Overall Progress</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {doneCount} done · {inProgressCount} in progress · {totalCount - doneCount - inProgressCount} remaining
          </span>
        </div>
        <div style={{ background: 'var(--bg-secondary)', borderRadius: '999px', height: '10px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${progressPct}%`,
            background: 'linear-gradient(90deg, #10b981, #6366f1)',
            borderRadius: '999px',
            transition: 'width 0.4s ease',
          }} />
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <span key={key} style={{ fontSize: '0.8rem', color: cfg.text, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>{cfg.icon}</span> {cfg.label}
            </span>
          ))}
          <span style={{ marginLeft: 'auto', fontWeight: 700, color: progressPct === 100 ? '#10b981' : 'var(--text-primary)', fontSize: '0.875rem' }}>
            {progressPct}% complete
          </span>
        </div>
      </div>

      {/* Roadmap Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {roadmapSections.map((section, idx) => {
          const stats = getSectionStats(section.id);
          const isExpanded = expandedSections[section.id] ?? true;
          const allDone = stats.done === stats.total;

          return (
            <div key={section.id} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              {/* Timeline line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.2rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: allDone ? section.color : 'var(--bg-secondary)',
                  border: `2px solid ${section.color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', flexShrink: 0,
                  transition: 'background 0.3s',
                }}>
                  {allDone ? '✓' : section.icon}
                </div>
                {idx < roadmapSections.length - 1 && (
                  <div style={{ width: '2px', flex: 1, background: 'var(--border-color)', minHeight: '24px', marginTop: '4px' }} />
                )}
              </div>

              {/* Section card */}
              <div className="card" style={{ flex: 1, padding: '0', overflow: 'hidden', marginBottom: idx < roadmapSections.length - 1 ? '0' : '0' }}>
                {/* Section header */}
                <div
                  onClick={() => toggleSection(section.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.9rem 1.25rem', cursor: 'pointer',
                    borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{section.title}</span>
                    <span style={{
                      fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: '999px',
                      background: allDone ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-secondary)',
                      color: allDone ? '#10b981' : 'var(--text-secondary)',
                      border: `1px solid ${allDone ? '#10b981' : 'var(--border-color)'}`,
                      whiteSpace: 'nowrap',
                    }}>
                      {stats.done}/{stats.total}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {section.appLink && (
                      <Link
                        href={section.appLink}
                        onClick={e => e.stopPropagation()}
                        style={{
                          fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: '6px',
                          background: `${section.color}22`, color: section.color,
                          border: `1px solid ${section.color}55`, textDecoration: 'none',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {section.appLinkLabel}
                      </Link>
                    )}
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  </div>
                </div>

                {/* Section body */}
                {isExpanded && (
                  <div style={{ padding: '1rem 1.25rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      {section.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      {section.topics.map(topic => {
                        const status: TopicStatus = progress[topic.id] || 'not-started';
                        const cfg = statusConfig[status];
                        return (
                          <button
                            key={topic.id}
                            onClick={() => cycleTopic(topic.id)}
                            title={`Click to mark: ${statusCycle[(statusCycle.indexOf(status) + 1) % statusCycle.length]}`}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '0.35rem',
                              padding: '0.3rem 0.65rem', borderRadius: '6px', cursor: 'pointer',
                              border: `1px solid ${cfg.border}`,
                              background: cfg.bg,
                              color: cfg.text,
                              fontSize: '0.8rem', fontFamily: 'inherit',
                              transition: 'all 0.15s',
                            }}
                          >
                            <span style={{ fontSize: '0.7rem' }}>{cfg.icon}</span>
                            {topic.label}
                          </button>
                        );
                      })}
                    </div>
                    {!allDone && (
                      <button
                        onClick={() => markSectionDone(section.id)}
                        style={{
                          fontSize: '0.75rem', padding: '0.3rem 0.75rem', borderRadius: '6px',
                          border: `1px solid ${section.color}`, background: 'transparent',
                          color: section.color, cursor: 'pointer', fontFamily: 'inherit',
                        }}
                      >
                        Mark all done
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion message */}
      {progressPct === 100 && (
        <div style={{
          textAlign: 'center', padding: '2rem', marginTop: '2rem',
          background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981',
          borderRadius: '12px',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
          <div style={{ fontWeight: 700, color: '#10b981', fontSize: '1.1rem' }}>Roadmap Complete!</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            You&apos;ve covered all DSA topics. Time to grind those interviews!
          </div>
          <Link href="/interview-studio" style={{
            display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1.25rem',
            background: '#10b981', color: 'white', borderRadius: '8px', textDecoration: 'none',
            fontWeight: 600, fontSize: '0.875rem',
          }}>
            Go to Interview Studio →
          </Link>
        </div>
      )}
    </main>
  );
}
