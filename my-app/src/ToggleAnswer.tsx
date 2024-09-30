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
  selectedIndex: number; // Pass the selected value directly
}

const ToggleAnswer: React.FC<ToggleAnswerProps> = ({
  options,
  onMeanValueChange,
  disable,
  selectedIndex,
}) => {
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const [selectedOptionSize, setSelectedOptionSize] = useState<{ width: string; height: string }>({ width: '0', height: '0' });

  const calculateTranslateValue = (index: number): string => {
    const toggleElement = toggleRef.current;
    if (!toggleElement) return '0px';

    const screenWidth = window.innerWidth;
    const containerSize = screenWidth < 764 ? toggleElement.clientHeight : toggleElement.clientWidth;
    const selectedOptionSizeValue = containerSize / options.length;

    if (screenWidth < 764) {
      return `translateY(${index * selectedOptionSizeValue}px)`;
    } else {
      return `translateX(${index * selectedOptionSizeValue}px)`;
    }
  };

  const handleOptionClick = (optionValue: number) => {
    if (!disable) {
      onMeanValueChange(optionValue); // Notify parent with selected value
    }
  };

  useEffect(() => {
    const toggleElement = toggleRef.current;
    if (toggleElement) {
      const screenWidth = window.innerWidth;
      const containerSize = screenWidth < 764 ? toggleElement.clientHeight : toggleElement.clientWidth;
      const selectedOptionSizeValue = containerSize / options.length;

      setSelectedOptionSize({
        width: screenWidth < 764 ? '90vw' : `${selectedOptionSizeValue}px`,
        height: screenWidth < 764 ? `${100 / options.length}%` : `${toggleElement.clientHeight}px`,
      });
    }

    const handleResize = () => {
      if (toggleRef.current) {
        const toggleElement = toggleRef.current;
        const screenWidth = window.innerWidth;
        const containerSize = screenWidth < 764 ? toggleElement.clientHeight : toggleElement.clientWidth;
        const selectedOptionSizeValue = containerSize / options.length;

        setSelectedOptionSize({
          width: screenWidth < 764 ? '90vw' : `${selectedOptionSizeValue}px`,
          height: screenWidth < 764 ? `${100 / options.length}%` : `${toggleElement.clientHeight}px`,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [options.length]);

  return (
    <div className="toggle-container" ref={toggleRef}>
      {options.map((option, index) => (
        <div
          key={index}
          className="option-text"
          onClick={() => handleOptionClick(index)}
          style={{
            color: selectedIndex === index ? '#645d57' : 'white',
            cursor: disable ? 'not-allowed' : 'pointer',
          }}
        >
          {option.label}
        </div>
      ))}
      <div className="selected-option"
        style={{
          transform: calculateTranslateValue(selectedIndex),
          width: selectedOptionSize.width,
          height: selectedOptionSize.height,
        }}
      />
    </div>
  );
};

export default ToggleAnswer;
