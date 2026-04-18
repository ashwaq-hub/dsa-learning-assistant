'use client';

import { useEffect, useRef } from 'react';

interface InterviewTimerProps {
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  onTimeEnd: () => void;
}

export default function InterviewTimer({
  timeLeft,
  setTimeLeft,
  onTimeEnd,
}: InterviewTimerProps) {
  const onTimeEndRef = useRef(onTimeEnd);
  onTimeEndRef.current = onTimeEnd;

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeEndRef.current();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, setTimeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isLowTime = timeLeft < 300; // 5 minutes
  const isCriticalTime = timeLeft < 60; // 1 minute

  const getTimerColor = () => {
    if (isCriticalTime) return '#ff6b6b';
    if (isLowTime) return '#ffd700';
    return '#1e90ff';
  };

  return (
    <div className="interview-timer">
      <div className="timer-display" style={{ color: getTimerColor() }}>
        <span className="timer-label">⏱️</span>
        <span className="timer-value">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>

      {isLowTime && (
        <div className="timer-warning">
          ⚠️ {isCriticalTime ? 'Critical time!' : 'Time running out!'}
        </div>
      )}

      <style jsx>{`
        .interview-timer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .timer-display {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.5rem;
          transition: color 0.2s;
        }

        .timer-label {
          font-size: 1.25rem;
          animation: ${isCriticalTime ? 'pulse' : 'none'} 1s infinite;
        }

        .timer-value {
          font-family: 'JetBrains Mono', monospace;
          min-width: 60px;
        }

        .timer-warning {
          font-size: 0.75rem;
          font-weight: 600;
          color: ${isCriticalTime ? '#ff6b6b' : '#ffd700'};
          animation: ${isLowTime ? 'pulse' : 'none'} 1s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @media (max-width: 768px) {
          .timer-display {
            font-size: 1.25rem;
          }

          .timer-label {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
