import type { Metadata } from 'next';
import '../styles/globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import AuthProvider from '@/components/AuthProvider';
import LayoutContent from '@/components/LayoutContent';

export const metadata: Metadata = {
  title: 'DSA Learning Assistant',
  description: 'Master Data Structures & Algorithms with interactive learning',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <LayoutContent>
     