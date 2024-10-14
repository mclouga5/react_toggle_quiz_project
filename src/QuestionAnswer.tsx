import React, { useState, useEffect }from 'react';
import ToggleAnswer from './ToggleAnswer';
import MeanValueCalculator from './MeanValueCalculator';

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
  userSelectedIndices: number[];
}

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
    questionAnswer,
    onMeanValueChange = () => {},
    onAnswerSelect,
    disableAnswering,
    userSelectedIndices}) => {
  const {question, answerList} = questionAnswer;
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const handleOptionSelect = (index: number, value: number) => {
    const updatedValues = [...selectedIndices];
    updatedValues[index] = value;
    setSelectedIndices(updatedValues);
  };

  useEffect(() => {
    if (userSelectedIndices.length > 0 && selectedIndices.length === 0) {
      setSelectedIndices(userSelectedIndices);
    } else if (selectedIndices.length === 0) {
      const defaultValues = (Array(answerList.length).fill(0))
      setSelectedIndices(defaultValues);
    }
  }, [userSelectedIndices, answerList, question]);

  const selectedValues = userSelectedIndices.map((selectedIndex, listIndex) => {
    const currentAnswerList = answerList[listIndex];
    return currentAnswerList[selectedIndex]?.value || 0;
  });

  useEffect(() => {
    if (JSON.stringify(selectedIndices) !== JSON.stringify(userSelectedIndices)) {
      onAnswerSelect(selectedIndices);
    }
  }, [selectedIndices, onAnswerSelect, userSelectedIndices]);


  return (
    <div className='flex flex-col items-center'>
      {/* Display the question text */}
       <div className="text-3xl font-bold mb-6 text-white">{question}</div>

      {/* Map through the answerList and render ToggleAnswer for each set */}
      {answerList.map((options, index) => (
        <ToggleAnswer
          key={'Answer' + String(index)} // Provide a unique key for each answer set
          options={options} // Pass the current set of options to ToggleAnswer
          onMeanValueChange={(value) => handleOptionSelect(index, value)} // Handle option selection
          disable={disableAnswering}
          selectedIndex={selectedIndices[index]}
        />
      ))}

      {/* MeanValueCalculator for calculating the mean of selected values */}
      <MeanValueCalculator optionValues={selectedValues} onMeanValueChange={onMeanValueChange} />

    </div>
  );
};

export default QuestionAnswer;