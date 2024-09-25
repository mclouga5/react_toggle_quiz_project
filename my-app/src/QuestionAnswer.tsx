import React, { useState, useEffect }from 'react';
import ToggleAnswer from './ToggleAnswer';
import MeanValueCalculator from './MeanValueCalculator';
import './ToggleAnswer.css';

interface Answer {
  label: string;
  value: number;
}

interface QuestionAnswerSet {
  question: string;
  answerList: Answer[][];
}

interface QuestionAnswerProps {
  questionAnswer: QuestionAnswerSet;
  onAnswerSelect: (value: number) => void; // Callback to handle answer selection
  disableAnswering: boolean;
}

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
    questionAnswer,
    onAnswerSelect,
    disableAnswering,}) => {
  const {question, answerList} = questionAnswer;
  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const handleOptionSelect = (index: number, value: number) => {
    const updatedValues = [...selectedValues];
    updatedValues[index] = value; // Update the selected value for this toggle
    setSelectedValues(updatedValues); // Update state with new selected values
  };

  useEffect(() => {
    if (selectedValues.length === 0) {
      const initialValues = answerList.map(
        (options) => options[0].value
      );
      setSelectedValues(initialValues);
    }
  }, [answerList, question]);

  return (
    <div>
      {/* Display the question text */}
      <h1>{question}</h1>

      {/* Map through the answerList and render ToggleAnswer for each set */}
      {answerList.map((options, index) => (
        <ToggleAnswer
          key={'Answer' + String(index)} // Provide a unique key for each answer set
          options={options} // Pass the current set of options to ToggleAnswer
          onMeanValueChange={(value) => handleOptionSelect(index, value)} // Handle option selection
          disable={disableAnswering}
        />
      ))}

      {/* MeanValueCalculator for calculating the mean of selected values */}
      <MeanValueCalculator optionValues={selectedValues} onMeanValueChange={onAnswerSelect} />

    </div>
  );
};

export default QuestionAnswer;