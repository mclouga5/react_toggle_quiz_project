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
  const [selectedOptionSize, setSelectedOptionSize] = useState<{ width: string; height: string }>({ width: '0', height: '0' });
  const [translateValue, setTranslateValue] = useState<string>('0px'); // explaination line59

  {/* selected option styling */}
  const calculateTranslateValue = (): string => {
    const toggleElement = toggleRef.current;

    const screenWidth = window.innerWidth;

    if (toggleElement && screenWidth < 764){
      const containerHeight = toggleElement.clientHeight;
      const selectedOptionHeight = containerHeight / options.length;
      return `translateY(${localOptionIndex * selectedOptionHeight}px)`;
    }
    else if (toggleElement && screenWidth > 764){
      const containerWidth = toggleElement.clientWidth;
      const selectedOptionWidth = containerWidth / options.length;
      return `translateX(${localOptionIndex * selectedOptionWidth}px)`;
    }
    return '0px'
  };

  const calculateSelectedOptionSize = () => {
    const toggleElement = toggleRef.current;

    if (toggleElement) {
      const screenWidth = window.innerWidth;
      const containerSize = screenWidth < 764 ? toggleElement.clientHeight : toggleElement.clientWidth;
      const selectedOptionSizeValue = containerSize / options.length;

      // Set the width and height of the selected option based on the current screen size
      setSelectedOptionSize({
        width: screenWidth < 764 ? '90vw' : `${selectedOptionSizeValue}px`,
        height: screenWidth < 764 ? `${100 / options.length}%` : `${toggleElement.clientHeight}px`,
      });
    }
  };

  {/* toggle selected option functionality */}
  const handleOptionClick = (optionIndex: number) => {
    setLocalOptiontIndex(optionIndex);
    onMeanValueChange(options[optionIndex].value); // Notify parent with selected value
  };

  {/* Handle window resize and update translate value for
      when you guys are messing around in dev tools! */}
   const handleResize = () => {
    setTranslateValue(calculateTranslateValue());
    calculateSelectedOptionSize();
  };

  useEffect(() => {
    // Update translate and size values initially
    setTranslateValue(calculateTranslateValue());
    calculateSelectedOptionSize();

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
          onClick={() => !disable && handleOptionClick(index)}
          style={{
            color: localOptionIndex === index ? '#645d57' : 'white',
            cursor: disable ? 'not-allowed' : 'pointer',
          }}
        >
          {option.label}
        </div>
      ))}

      <div className="selected-option"
        style={{
          transform: String(translateValue),
          width: selectedOptionSize.width,
          height: selectedOptionSize.height,
        }}
      />
    </div>
  );
};

export default ToggleAnswer;

