export interface Question {
  id: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export const questions: Question[] = [
  {
    id: 1,
    category: 'Science',
    difficulty: 'easy',
    question: 'What is the chemical symbol for water?',
    options: ['HO', 'H2O', 'H2O2', 'OH'],
    correctAnswer: 1,
    explanation: 'Water is composed of two hydrogen atoms and one oxygen atom, giving it the formula H2O.',
    points: 10,
  },
  {
    id: 2,
    category: 'Geography',
    difficulty: 'easy',
    question: 'Which is the largest continent by area?',
    options: ['Africa', 'North America', 'Asia', 'Europe'],
    correctAnswer: 2,
    explanation: 'Asia is the largest continent, covering about 44.6 million km² — roughly 30% of Earth\'s total land area.',
    points: 10,
  },
  {
    id: 3,
    category: 'History',
    difficulty: 'medium',
    question: 'In which year did World War II end?',
    options: ['1943', '1944', '1945', '1946'],
    correctAnswer: 2,
    explanation: 'World War II ended in 1945 with Germany surrendering in May and Japan in September.',
    points: 20,
  },
  {
    id: 4,
    category: 'Technology',
    difficulty: 'medium',
    question: 'What does "HTML" stand for?',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Hyper Transfer Markup Language',
      'Home Tool Markup Language',
    ],
    correctAnswer: 0,
    explanation: 'HTML stands for HyperText Markup Language, the standard language for creating web pages.',
    points: 20,
  },
  {
    id: 5,
    category: 'Science',
    difficulty: 'medium',
    question: 'How many planets are in our solar system?',
    options: ['7', '8', '9', '10'],
    correctAnswer: 1,
    explanation: 'There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. Pluto was reclassified as a dwarf planet in 2006.',
    points: 20,
  },
  {
    id: 6,
    category: 'Mathematics',
    difficulty: 'easy',
    question: 'What is the value of π (Pi) to two decimal places?',
    options: ['3.12', '3.14', '3.16', '3.18'],
    correctAnswer: 1,
    explanation: 'Pi (π) is approximately 3.14159..., commonly rounded to 3.14.',
    points: 10,
  },
  {
    id: 7,
    category: 'Literature',
    difficulty: 'medium',
    question: 'Who wrote the novel "1984"?',
    options: ['Aldous Huxley', 'Ray Bradbury', 'George Orwell', 'H.G. Wells'],
    correctAnswer: 2,
    explanation: '"1984" was written by George Orwell and published in 1949. It\'s a dystopian novel about a totalitarian society.',
    points: 20,
  },
  {
    id: 8,
    category: 'Science',
    difficulty: 'hard',
    question: 'What is the speed of light in a vacuum?',
    options: ['299,792,458 m/s', '199,792,458 m/s', '399,792,458 m/s', '299,792,000 m/s'],
    correctAnswer: 0,
    explanation: 'The speed of light in a vacuum is exactly 299,792,458 meters per second (approximately 3 × 10⁸ m/s).',
    points: 30,
  },
  {
    id: 9,
    category: 'Geography',
    difficulty: 'hard',
    question: 'What is the capital city of Australia?',
    options: ['Sydney', 'Melbourne', 'Brisbane', 'Canberra'],
    correctAnswer: 3,
    explanation: 'Canberra is the capital of Australia. It was purpose-built as the capital and is located between Sydney and Melbourne.',
    points: 30,
  },
  {
    id: 10,
    category: 'Technology',
    difficulty: 'hard',
    question: 'Which programming language was created by Guido van Rossum?',
    options: ['Ruby', 'Python', 'Perl', 'Java'],
    correctAnswer: 1,
    explanation: 'Python was created by Guido van Rossum and first released in 1991. It is named after the British comedy group Monty Python.',
    points: 30,
  },
];

export const getTotalPossibleScore = (): number => {
  return questions.reduce((sum, q) => sum + q.points, 0);
};
