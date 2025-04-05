import React, { useEffect } from 'react';
import axios from 'axios';
import './Results.css';

function Results({ userInfo, score, onRestart }) {
  const totalQuestions = 10;
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    const saveResults = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/results', {
          name: userInfo.name,
          email: userInfo.email,
          score,
          totalQuestions,
          percentage
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('Results saved successfully:', response.data);
      } catch (error) {
        console.error('Error saving results:', 
          error.response?.data?.message || 
          error.message || 
          'Unknown error occurred');
      }
    };

    saveResults();
  }, [userInfo, score, totalQuestions, percentage]);

  return (
    <div className="results">
      <h2>Quiz Results</h2>
      <div className="user-info">
        <p>Name: {userInfo.name}</p>
        <p>Email: {userInfo.email}</p>
      </div>
      <div className="score">
        <p>You scored {score} out of {totalQuestions} ({percentage}%)</p>
        {percentage >= 70 ? (
          <p className="success">Congratulations! You passed!</p>
        ) : (
          <p className="fail">Keep practicing! You can do better!</p>
        )}
      </div>
      <button onClick={onRestart} className="restart-button">
        Take Quiz Again
      </button>
    </div>
  );
}

export default Results;