import React, { useEffect, useRef, useState } from 'react';
import './ToggleAnswer.css';

interface Option {
  label: string;
  value: number;
}

interface ToggleAnswerProps {
  options: Option[];
  onMeanValueChange: (value: number) => void;
  disable: boolean;
}

const ToggleAnswer: React.FC<ToggleAnswerProps> = ({
  options,
  onMeanValueChange,
  disable,
}) => {

  const toggleRef = useRef<HTMLDivElement | null>(null);
  const [localOptionIndex, setLocalOptiontIndex] = useState<number>(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [translateValue, setTranslateValue] = useState<string>('0px'); // explaination line59

  const handleButtonClick = (optionIndex: number) => {
    setLocalOptiontIndex(optionIndex);
    onMeanValueChange(options[optionIndex].value); // Notify parent with selected value
  };

  const calculateTranslateValue = (): string => {
    const toggleElement = toggleRef.current;

    const screenWidth = window.innerWidth;

    if (toggleElement && screenWidth < 764){
      const containerHeight = toggleElement.clientHeight;
      const buttonHeight = containerHeight / options.length;
      return `translateY(${localOptionIndex * buttonHeight}px)`;
    }
    else if (toggleElement && screenWidth > 764){
      const containerWidth = toggleElement.clientWidth;
      const buttonWidth = containerWidth / options.length;
      return `translateX(${localOptionIndex * buttonWidth}px)`;
    }
    return '0px'
  };

  const selectOption =  (index: number) => {
    if (!disable) {
      handleButtonClick(index);
    }
    else
    console.debug(
      'Forbidden Action on Element', String(toggleRef.current?.outerText),
       ' at Index', String(index));
  };

  {/* Handle window resize and update translate value for
      when you guys are messing around in dev tools! */}
   const handleResize = () => {
    setTranslateValue(calculateTranslateValue());
  };

  useEffect(() => {
    // Update translate value initially
    setTranslateValue(calculateTranslateValue());

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [localOptionIndex]);

  return (
    <div className="toggle-container" ref={toggleRef}>
      {options.map((option, index) => (
        <div
          key={index}
          className="option-text"
          onClick={() => selectOption(index)}
          style={{
            color: localOptionIndex === index ? '#645d57' : 'white',
            cursor: disable ? 'not-allowed' : 'pointer',
          }}
        >
          {option.label}
        </div>
      ))}

      <div className="toggle-button"
        style={{
          transform: String(translateValue),
        }}
      />
    </div>
  );
};

export default ToggleAnswer;

