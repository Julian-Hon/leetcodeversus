import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [dailyProblem, setDailyProblem] = useState(null);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const fetchDailyProblem = async () => {
      try {
        const response = await axios.get('http://localhost:5001/daily-problem');
        console.log('Fetched data:', response.data);
        setDailyProblem(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching daily problem:', error);
        setError('Failed to fetch daily problem. Please try again later.');
      }
    };

    fetchDailyProblem();
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const id = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    } else if (timeLeft === 0) {
      clearInterval(intervalId);
      setIsRunning(false);
    }
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setTimeLeft(30 * 60); // Reset to 30 minutes
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="App">
      <h1>Daily Problem</h1>
      <div className="timer">
        <h2>Time Left: {formatTime(timeLeft)}</h2>
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      {error ? (
        <p className="error">{error}</p>
      ) : dailyProblem ? (
        <div>
          <h2>{dailyProblem.questionTitle}</h2>
          <p><strong>Difficulty:</strong> {dailyProblem.difficulty}</p>
          <p><strong>Question:</strong> <span dangerouslySetInnerHTML={{ __html: dailyProblem.question }}></span></p>
          <p><strong>Example Test Cases:</strong> <span dangerouslySetInnerHTML={{ __html: dailyProblem.exampleTestcases }}></span></p>
          <a href={dailyProblem.questionLink} target="_blank" rel="noopener noreferrer">View on LeetCode</a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;