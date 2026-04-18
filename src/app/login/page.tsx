'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <span className="login-icon">🧠</span>
          <h1>DSA Learning Assistant</h1>
          <p>Pattern-driven • Interview-focused • Beginner-friendly</p>
        </div>

        <div className="login-divider" />

        <div className="login-body">
          <h2>Sign in to continue</h2>
          <button
            className="btn-google"
            onClick={() => signIn('google', { callbackUrl })}
          >
            <svg className="google-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
          padding: 1rem;
        }

        .login-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1.5rem;
          padding: 3rem 2.5rem;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          text-align: center;
        }

        .login-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .login-icon {
          font-size: 3rem;
          line-height: 1;
        }

        .login-brand h1 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .login-brand p {
          margin: 0;
          font-size: 0.8rem;
          color: var(--text-tertiary);
          letter-spacing: 0.02em;
        }

        .login-divider {
          height: 1px;
          background: var(--border-color);
          margin-bottom: 1.5rem;
        }

        .login-body h2 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin: 0 0 1.5rem 0;
        }

        .btn-google {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.875rem 1.5rem;
          background: white;
          color: #3c4043;
          border: 1px solid #dadce0;
          border-radius: 0.75rem;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }

        .btn-google:hover {
          background: #f8f9fa;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .btn-google:active {
          background: #f1f3f4;
        }

        .google-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
