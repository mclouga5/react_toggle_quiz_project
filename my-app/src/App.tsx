import React, { useEffect, useState } from 'react';
import QuestionAnswer from './QuestionAnswer'
import Navigation from './Navigation';
import { gradients, questionsList } from './data';
import Confetti from './Confetti';
import './App.css';

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [meanValue, setMeanValue] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  {/* Question Logic */}
  const isLastQuestion = currentQuestionIndex === questionsList.length - 1;

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Trigger confetti on the last question
      setShowConfetti(true);
    }
    setCurrentQuestionIndex(prevIndex => Math.min(prevIndex + 1, questionsList.length - 1));
  };

  {/* Answer Logic */}
  const handleAnswerSelect = (value: number) => {
    setMeanValue(value);
  };

  const allAnswersCorrect = (meanValue === 1);

  useEffect(() => {
    if (meanValue < 0.5) {
      document.body.style.background = gradients[0].gradient;
    } else if (meanValue >= 0.5 && meanValue < 1) {
      document.body.style.background = gradients[1].gradient;
    } else if (meanValue === 1) {
      document.body.style.background = gradients[2].gradient;
    }
  }, [meanValue]);

  {/* Navigation Logic */}
  const nextButtonText = isLastQuestion ? "End Quiz" : "Next Question";
  const currentQuestionAnswer = questionsList[currentQuestionIndex];

  return (
    <div id="Container">
      {/* Conditionally render the Confetti component */}
      <Confetti trigger={showConfetti} />

      {/* Display Questions and Answers */}
      <div key={'Question' + String(currentQuestionIndex)}>
        <QuestionAnswer
          questionAnswer={currentQuestionAnswer}
          onAnswerSelect={handleAnswerSelect}
          disableAnswering={allAnswersCorrect}
        />

        {/* Navigate through QuestionAnswerSet's */}
        <Navigation
          advanceButtonText={nextButtonText}
          onAdvance={handleNextQuestion}
          disableAdvance={!(meanValue === 1) || isLastQuestion && !allAnswersCorrect}
        />
      </div>
    </div>
  );
};

export default App;