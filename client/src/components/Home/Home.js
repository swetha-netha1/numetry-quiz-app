import React from 'react';
import './Home.css'; // Regular CSS import (no styles object)

function Home({ onStartQuiz }) {
  return (
    <div className="home">
      <h1>Welcome to the React Quiz!</h1>
      <p>Test your knowledge of React with this 10-question quiz.</p>
      <button className="start-button" onClick={onStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default Home;