'use client';

import { useState } from 'react';
import { Question } from '@/data/questions';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedAnswer: number) => void;
  currentScore: number;
}

const difficultyConfig = {
  easy: { label: 'Easy', color: '#10b981', bg: '#d1fae5' },
  medium: { label: 'Medium', color: '#f59e0b', bg: '#fef3c7' },
  hard: { label: 'Hard', color: '#ef4444', bg: '#fee2e2' },
};

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  currentScore,
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const progress = (questionNumber / totalQuestions) * 100;
  const diff = difficultyConfig[question.difficulty];

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
  };

  const handleNext = () => {
    if (selected === null) return;
    const answer = selected;
    setSelected(null);
    setRevealed(false);
    onAnswer(answer);
  };

  const getOptionStyle = (index: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      width: '100%',
      padding: '1rem 1.25rem',
      borderRadius: '12px',
      border: '2px solid var(--border)',
      background: 'var(--card)',
      cursor: revealed ? 'default' : 'pointer',
      textAlign: 'left',
      fontSize: '1rem',
      fontWeight: '500',
      color: 'var(--text)',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    };

    if (!revealed) {
      if (selected === index) {
        return { ...base, borderColor: 'var(--primary)', background: '#ede9fe' };
      }
      return base;
    }

    if (index === question.correctAnswer) {
      return { ...base, borderColor: '#10b981', background: '#d1fae5', color: '#065f46' };
    }
    if (index === selected && index !== question.correctAnswer) {
      return { ...base, borderColor: '#ef4444', background: '#fee2e2', color: '#991b1b' };
    }
    return { ...base, opacity: 0.5 };
  };

  const getOptionIcon = (index: number): string => {
    if (!revealed) return ['A', 'B', 'C', 'D'][index];
    if (index === question.correctAnswer) return '✓';
    if (index === selected && index !== question.correctAnswer) return '✗';
    return ['A', 'B', 'C', 'D'][index];
  };

  const isCorrect = revealed && selected === question.correctAnswer;

  return (
    <div className="card">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: '600' }}>
          Question {questionNumber} of {totalQuestions}
        </span>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span
            className="badge"
            style={{ background: diff.bg, color: diff.color }}
          >
            {diff.label}
          </span>
          <span className="badge badge-primary">🏆 {currentScore} pts</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Category */}
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: '500' }}>
          📂 {question.category} • {question.points} points
        </span>
      </div>

      {/* Question */}
      <h2
        style={{
          fontSize: '1.35rem',
          fontWeight: '700',
          marginBottom: '1.75rem',
          lineHeight: '1.4',
          color: 'var(--text)',
        }}
      >
        {question.question}
      </h2>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {question.options.map((option, index) => (
          <button
            key={index}
            style={getOptionStyle(index)}
            onClick={() => handleSelect(index)}
          >
            <span
              style={{
                minWidth: '28px',
                height: '28px',
                borderRadius: '50%',
                background: revealed && index === question.correctAnswer
                  ? '#10b981'
                  : revealed && index === selected && index !== question.correctAnswer
                  ? '#ef4444'
                  : 'var(--border)',
                color: revealed && (index === question.correctAnswer || (index === selected && index !== question.correctAnswer))
                  ? 'white'
                  : 'var(--text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: '700',
                flexShrink: 0,
              }}
            >
              {getOptionIcon(index)}
            </span>
            {option}
          </button>
        ))}
      </div>

      {/* Explanation */}
      {revealed && (
        <div
          style={{
            padding: '1rem',
            borderRadius: '12px',
            background: isCorrect ? '#d1fae5' : '#fee2e2',
            borderLeft: `4px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
            marginBottom: '1.5rem',
          }}
        >
          <p style={{ fontWeight: '700', marginBottom: '0.25rem', color: isCorrect ? '#065f46' : '#991b1b' }}>
            {isCorrect ? `✓ Correct! +${question.points} points` : '✗ Incorrect'}
          </p>
          <p style={{ fontSize: '0.9rem', color: isCorrect ? '#065f46' : '#991b1b', opacity: 0.9 }}>
            {question.explanation}
          </p>
        </div>
      )}

      {/* Next Button */}
      <button
        className="btn btn-primary"
        onClick={handleNext}
        disabled={!revealed}
        style={{ width: '100%' }}
      >
        {questionNumber === totalQuestions ? 'See Results 🏆' : 'Next Question →'}
      </button>
    </div>
  );
}
