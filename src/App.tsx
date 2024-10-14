import React, { useCallback, useState } from 'react';
import QuestionAnswer from './QuestionAnswer'
import Navigation from './Navigation';
import { gradients, questionsList } from './data';
import Confetti from './Confetti';
import DynamicStyleUpdater from './DynamicStyleUpdater';
import './App.css';

const App: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [meanValue, setMeanValue] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<number[][]>(
    questionsList.map(() => []) // Initialize empty arrays for each question
  );

  {/* Question Logic */}
  const isLastQuestion = currentQuestionIndex === questionsList.length - 1;

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Trigger confetti on the last question
      setShowConfetti(true);
    }
    setCurrentQuestionIndex(prevIndex => Math.min(prevIndex + 1, questionsList.length - 1));
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex != 0) {
    setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
    }
  };

  {/* Answer Logic */}
  const handleAnswerSelect = (indices: number[]) => {
    setSelectedOptions(prevSelectedOptions => {
      const updatedSelectedOptions = [...prevSelectedOptions];
      updatedSelectedOptions[currentQuestionIndex] = indices; // Update selected options for the current question
      return updatedSelectedOptions;
    });
  };

  const handleMeanValueChange = useCallback((mean: number) => {
    setMeanValue(mean);
  }, []);

  const allAnswersCorrect = (meanValue === 1);

  const getBackgroundStyle = () => {
    if (meanValue < 0.5) {
      return { background: gradients[0].gradient};
    } else if (meanValue >= 0.5 && meanValue < 1) {
      return { background: gradients[1].gradient};
    } else if (meanValue === 1) {
      return { background: gradients[2].gradient};
    }
    return { background: 'white', color: 'black' };
  };

  {/* Navigation Logic */}
  const nextButtonText = isLastQuestion ? "End Quiz" : "Next Question";
  const showAdvanceButton = !(questionsList.length === 0);
  const showPreviousButton = !(currentQuestionIndex === 0);
  const currentQuestionAnswer = questionsList[currentQuestionIndex];

  return (
    <div id="Container">
      {/* Conditionally render the Confetti component */}
      <Confetti trigger={showConfetti} />

      {/* Background changer component with flexible condition */}
      <DynamicStyleUpdater
        getStyle={getBackgroundStyle}
        triggerCondition={meanValue}
        elementSelector='body' />

      {/* Display Questions and Answers */}
      <div key={'Question' + String(currentQuestionIndex)} className='flex flex-col items-center'>
        <QuestionAnswer
          questionAnswer={currentQuestionAnswer}
          onMeanValueChange={handleMeanValueChange}
          onAnswerSelect={handleAnswerSelect}
          disableAnswering={allAnswersCorrect}
          userSelectedIndices={selectedOptions[currentQuestionIndex]}
        />

        {/* Navigate through QuestionAnswerSet's */}
        <Navigation
          showAdvanceButton={showAdvanceButton}
          showPreviousButton={showPreviousButton}
          advanceButtonText={nextButtonText}
          previousButtonText="Previous Question"
          onAdvance={handleNextQuestion}
          onPrevious={handlePreviousQuestion}
          disableAdvance={!(meanValue === 1) || isLastQuestion && !allAnswersCorrect}
        />
      </div>
    </div>
  );
};

export default App;