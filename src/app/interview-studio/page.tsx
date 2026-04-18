'use client';

import { useState, useEffect } from 'react';
import InterviewStudioLayout from '@/components/InterviewStudio/InterviewStudioLayout';

export default function InterviewStudioPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <InterviewStudioLayout />;
}
