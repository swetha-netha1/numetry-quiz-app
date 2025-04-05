import React, { useState } from 'react';
import Home from './components/Home/Home';  // Fixed Home import
import UserInfo from './components/UserInfo/UserInfo';  // Fixed UserInfo path
import Quiz from './components/Quiz/Quiz';  // Fixed Quiz import (changed from Home)
import Results from './components/Results/Results';  // Fixed Results path

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    setCurrentScreen('userInfo');
  };

  const handleUserInfoSubmit = (info) => {
    setUserInfo(info);
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
    setCurrentScreen('results');
  };

  const handleRestart = () => {
    setCurrentScreen('home');
    setScore(0);
  };

  return (
    <div className="app">
      {currentScreen === 'home' && <Home onStartQuiz={handleStartQuiz} />}
      {currentScreen === 'userInfo' && (
        <UserInfo onSubmit={handleUserInfoSubmit} />
      )}
      {currentScreen === 'quiz' && (
        <Quiz userInfo={userInfo} onComplete={handleQuizComplete} />
      )}
      {currentScreen === 'results' && (
        <Results 
          userInfo={userInfo} 
          score={score} 
          onRestart={handleRestart} 
        />
      )}
    </div>
  );
}

export default App;