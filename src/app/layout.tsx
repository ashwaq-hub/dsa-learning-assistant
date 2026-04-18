import type { Metadata } from 'next';
import '../styles/globals.css';

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
    <html lang="en">
      <body>
        <nav className="nav">
          <div className="container nav-content">
            <div className="nav-brand">
              <span>🧠</span>
              <span>DSA Learning Assistant</span>
            </div>
            <div className="nav-links">
              <a href="/" className="nav-link active">Home</a>
              <a href="/patterns" className="nav-link">Patterns</a>
              <a href="/solver" className="nav-link">Problem Solver</a>
              <a href="/flashcards" className="nav-link">Flashcards</a>
              <a href="/interview" className="nav-link">Interview</a>
              <a href="/visual" className="nav-link">Visualize</a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <p>DSA Learning Assistant — Pattern-driven • Interview-focused • Beginner-friendly</p>
        </footer>
      </body>
    </html>
  );
}
