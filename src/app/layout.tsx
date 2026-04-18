import type { Metadata } from 'next';
import '../styles/globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
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
        <ThemeProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
