'use client';

import { questions } from '@/data/questions';

interface QuizStartProps {
  onStart: () => void;
  totalQuestions: number;
}

export default function QuizStart({ onStart, totalQuestions }: QuizStartProps) {
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const categories = [...new Set(questions.map((q) => q.category))];

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: '2rem',
          }}
        >
          🧠
        </div>
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.75rem',
          }}
        >
          Quiz Challenge
        </h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
          Test your knowledge across multiple categories!
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <StatCard icon="❓" value={totalQuestions} label="Questions" />
        <StatCard icon="🏆" value={totalPoints} label="Total Points" />
        <StatCard icon="📚" value={categories.length} label="Categories" />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Categories
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
          {categories.map((cat) => (
            <span key={cat} className="badge badge-primary">
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '2rem', background: 'var(--secondary)', borderRadius: '12px', padding: '1rem' }}>
        <h3 style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>Difficulty & Points</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.9rem' }}>🟢 Easy = 10 pts</span>
          <span style={{ fontSize: '0.9rem' }}>🟡 Medium = 20 pts</span>
          <span style={{ fontSize: '0.9rem' }}>🔴 Hard = 30 pts</span>
        </div>
      </div>

      <button className="btn btn-primary" onClick={onStart} style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}>
        Start Quiz 🚀
      </button>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: string; value: number; label: string }) {
  return (
    <div
      style={{
        background: 'var(--secondary)',
        borderRadius: '12px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.25rem',
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>{value}</span>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{label}</span>
    </div>
  );
}
