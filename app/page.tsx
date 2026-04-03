'use client';

import { useState } from 'react';
import QuizStart from '@/components/QuizStart';
import QuizQuestion from '@/components/QuizQuestion';
import QuizResult from '@/components/QuizResult';
import { questions } from '@/data/questions';

export type QuizState = 'start' | 'playing' | 'finished';

export interface AnswerRecord {
  questionIndex: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [score, setScore] = useState(0);

  const handleStart = () => {
    setQuizState('playing');
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0);
  };

  const handleAnswer = (selectedAnswer: number) => {
    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    const newRecord: AnswerRecord = {
      questionIndex: currentQuestion,
      selectedAnswer,
      isCorrect,
    };
    const newAnswers = [...answers, newRecord];
    const newScore = isCorrect ? score + question.points : score;

    setAnswers(newAnswers);
    setScore(newScore);

    if (currentQuestion + 1 >= questions.length) {
      setQuizState('finished');
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleRestart = () => {
    setQuizState('start');
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0);
  };

  return (
    <div className="container">
      {quizState === 'start' && (
        <QuizStart onStart={handleStart} totalQuestions={questions.length} />
      )}
      {quizState === 'playing' && (
        <QuizQuestion
          question={questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          currentScore={score}
        />
      )}
      {quizState === 'finished' && (
        <QuizResult
          score={score}
          answers={answers}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
