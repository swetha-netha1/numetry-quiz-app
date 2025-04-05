import React, { useState } from 'react';
import './Quiz.css'; // Add this at the top of your file
const questions = [
  {
    question: 'What is React?',
    options: [
      'A server-side framework',
      'A front-end JavaScript library',
      'A back-end programming language',
      'A database management system',
    ],
    correctAnswer: 'A front-end JavaScript library',
  },
  {
    question: 'Which company developed React?',
    options: ['Google', 'Facebook', 'Twitter', 'Microsoft'],
    correctAnswer: 'Facebook',
  },
  {
    question: 'What is JSX?',
    options: [
      'A syntax extension for JavaScript',
      'A templating language',
      'A CSS preprocessor',
      'A database query language',
    ],
    correctAnswer: 'A syntax extension for JavaScript',
  },
  {
    question: 'What is used to pass data to a component from outside?',
    options: ['setState', 'props', 'render with arguments', 'PropTypes'],
    correctAnswer: 'props',
  },
  {
    question: 'What is the correct syntax to render a React component?',
    options: [
      '<MyComponent />',
      '{MyComponent}',
      'render MyComponent',
      'MyComponent.render()',
    ],
    correctAnswer: '<MyComponent />',
  },
  {
    question: 'Which hook is used for side effects in a function component?',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correctAnswer: 'useEffect',
  },
  {
    question: 'What is the virtual DOM?',
    options: [
      'A lightweight copy of the actual DOM',
      'A DOM that exists only in virtual reality',
      'A backup of the DOM',
      'A DOM that is not connected to the browser',
    ],
    correctAnswer: 'A lightweight copy of the actual DOM',
  },
  {
    question: 'How do you create a state in a function component?',
    options: [
      'this.state = {}',
      'const [state, setState] = useState(initialValue)',
      'useState = state(initialValue)',
      'const state = createState(initialValue)',
    ],
    correctAnswer: 'const [state, setState] = useState(initialValue)',
  },
  {
    question: 'What is the purpose of keys in React?',
    options: [
      'To uniquely identify elements in lists',
      'To encrypt component data',
      'To access private methods',
      'To improve component styling',
    ],
    correctAnswer: 'To uniquely identify elements in lists',
  },
  {
    question: 'Which method is called when a component is being removed from the DOM?',
    options: [
      'componentWillUnmount',
      'componentDidUnmount',
      'componentRemove',
      'componentWillRemove',
    ],
    correctAnswer: 'componentWillUnmount',
  },
];

function Quiz({ userInfo, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleOptionSelect = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: option,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    onComplete(score);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return null; // Results will be shown by the parent component
  }

  return (
    <div className="quiz">
      <div className="user-display">
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
      </div>
      
      <div className="quiz-progress">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </div>
      
      <div className="question">
        <h3>{currentQuestion.question}</h3>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="radio"
                id={`option-${index}`}
                name="quiz-option"
                checked={selectedAnswers[currentQuestionIndex] === option}
                onChange={() => handleOptionSelect(option)}
              />
              <label htmlFor={`option-${index}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="navigation">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        
        {currentQuestionIndex < totalQuestions - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default Quiz;