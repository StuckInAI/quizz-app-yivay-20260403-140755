'use client';

import { AnswerRecord } from '@/app/page';
import { questions, getTotalPossibleScore } from '@/data/questions';

interface QuizResultProps {
  score: number;
  answers: AnswerRecord[];
  onRestart: () => void;
}

function getGrade(score: number, total: number): { grade: string; message: string; emoji: string; color: string } {
  const pct = (score / total) * 100;
  if (pct === 100) return { grade: 'S', message: 'Perfect Score! Incredible!', emoji: '🏆', color: '#f59e0b' };
  if (pct >= 80) return { grade: 'A', message: 'Excellent Work!', emoji: '🌟', color: '#10b981' };
  if (pct >= 60) return { grade: 'B', message: 'Good Job!', emoji: '👍', color: '#6366f1' };
  if (pct >= 40) return { grade: 'C', message: 'Keep Practicing!', emoji: '📚', color: '#f59e0b' };
  return { grade: 'D', message: 'Better Luck Next Time!', emoji: '💪', color: '#ef4444' };
}

export default function QuizResult({ score, answers, onRestart }: QuizResultProps) {
  const totalPossible = getTotalPossibleScore();
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const percentage = Math.round((score / totalPossible) * 100);
  const { grade, message, emoji, color } = getGrade(score, totalPossible);

  const categoryStats = questions.reduce<Record<string, { correct: number; total: number }>>((acc, q, idx) => {
    const cat = q.category;
    if (!acc[cat]) acc[cat] = { correct: 0, total: 0 };
    acc[cat].total += 1;
    if (answers[idx]?.isCorrect) acc[cat].correct += 1;
    return acc;
  }, {});

  return (
    <div className="card">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${color}22, ${color}44)`,
            border: `4px solid ${color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '2.5rem',
          }}
        >
          {emoji}
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>{message}</h1>
        <p style={{ color: 'var(--text-light)' }}>You completed the quiz!</p>
      </div>

      {/* Score Summary */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <ScoreStat label="Score" value={`${score}`} sub={`/ ${totalPossible}`} color={color} />
        <ScoreStat label="Grade" value={grade} sub="" color={color} />
        <ScoreStat label="Correct" value={`${correctCount}`} sub={`/ ${questions.length}`} color="#10b981" />
        <ScoreStat label="Accuracy" value={`${percentage}%`} sub="" color="#6366f1" />
      </div>

      {/* Progress */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Overall Progress</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>{percentage}%</span>
        </div>
        <div className="progress-bar" style={{ height: '12px' }}>
          <div className="progress-fill" style={{ width: `${percentage}%` }} />
        </div>
      </div>

      {/* Category Breakdown */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Category Breakdown
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {Object.entries(categoryStats).map(([cat, stats]) => {
            const catPct = Math.round((stats.correct / stats.total) * 100);
            return (
              <div key={cat}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{cat}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    {stats.correct}/{stats.total} ({catPct}%)
                  </span>
                </div>
                <div style={{ height: '6px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${catPct}%`,
                      background: catPct >= 60 ? '#10b981' : catPct >= 40 ? '#f59e0b' : '#ef4444',
                      borderRadius: '999px',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Answer Review */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Answer Review
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {answers.map((answer, idx) => {
            const q = questions[answer.questionIndex];
            return (
              <div
                key={idx}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: answer.isCorrect ? '#d1fae5' : '#fee2e2',
                  border: `1px solid ${answer.isCorrect ? '#6ee7b7' : '#fca5a5'}`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}
              >
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>{answer.isCorrect ? '✓' : '✗'}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: '600', color: answer.isCorrect ? '#065f46' : '#991b1b', marginBottom: '0.1rem' }}>
                    Q{idx + 1}: {q.question}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: answer.isCorrect ? '#065f46' : '#991b1b', opacity: 0.8 }}>
                    Your answer: {q.options[answer.selectedAnswer]}
                    {!answer.isCorrect && ` → Correct: ${q.options[q.correctAnswer]}`}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: answer.isCorrect ? '#065f46' : '#991b1b',
                    flexShrink: 0,
                  }}
                >
                  {answer.isCorrect ? `+${q.points}` : '0'} pts
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Restart Button */}
      <button className="btn btn-primary" onClick={onRestart} style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}>
        Play Again 🔄
      </button>
    </div>
  );
}

function ScoreStat({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: 'var(--secondary)',
        borderRadius: '12px',
        padding: '1rem',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '1.5rem', fontWeight: '800', color }}>{value}</div>
      {sub && <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{sub}</div>}
      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>{label}</div>
    </div>
  );
}
