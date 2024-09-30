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
  onMeanValueChange?: (meanValue: number) => void;
  onAnswerSelect: (value: number[]) => void; // Callback to handle answer selection
  disableAnswering: boolean;
  userSelectedValues: number[];
}

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
    questionAnswer,
    onMeanValueChange = () => {},
    onAnswerSelect,
    disableAnswering,
    userSelectedValues}) => {
  const {question, answerList} = questionAnswer;
  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const handleOptionSelect = (index: number, value: number) => {
    const updatedValues = [...selectedValues];
    updatedValues[index] = value;
    setSelectedValues(updatedValues);
  };

  useEffect(() => {
    if (userSelectedValues.length > 0 && selectedValues.length === 0) {
      setSelectedValues(userSelectedValues);
    } else if (selectedValues.length === 0) {
      const defaultValues = answerList.map((options) => options[0].value);
      setSelectedValues(defaultValues);
    }
  }, [userSelectedValues, answerList, question]);

  useEffect(() => {
    if (JSON.stringify(selectedValues) !== JSON.stringify(userSelectedValues)) {
      onAnswerSelect(selectedValues);
    }
  }, [selectedValues, onAnswerSelect, userSelectedValues]);


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
          selectedValue={selectedValues[index]}
        />
      ))}

      {/* MeanValueCalculator for calculating the mean of selected values */}
      <MeanValueCalculator optionValues={selectedValues} onMeanValueChange={onMeanValueChange} />

    </div>
  );
};

export default QuestionAnswer;