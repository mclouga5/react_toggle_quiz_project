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
  const [buttonSize, setButtonSize] = useState<{ width: string; height: string }>({ width: '0', height: '0' });
  const [translateValue, setTranslateValue] = useState<string>('0px'); // explaination line59

  {/* toggle button styling */}
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

  const calculateButtonSize = () => {
    const toggleElement = toggleRef.current;

    if (toggleElement) {
      const screenWidth = window.innerWidth;
      const containerSize = screenWidth < 764 ? toggleElement.clientHeight : toggleElement.clientWidth;
      const buttonSizeValue = containerSize / options.length;

      // Set the width and height of the button based on the current screen size
      setButtonSize({
        width: screenWidth < 764 ? '90vw' : `${buttonSizeValue}px`,
        height: screenWidth < 764 ? `${100 / options.length}%` : `${toggleElement.clientHeight}px`,
      });
    }
  };

  console.log(buttonSize)

  {/* toggle button functionality */}
  const handleButtonClick = (optionIndex: number) => {
    setLocalOptiontIndex(optionIndex);
    onMeanValueChange(options[optionIndex].value); // Notify parent with selected value
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
    calculateButtonSize();
  };

  useEffect(() => {
    // Update translate and size values initially
    setTranslateValue(calculateTranslateValue());
    calculateButtonSize();

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
          width: buttonSize.width,
          height: buttonSize.height,
        }}
      />
    </div>
  );
};

export default ToggleAnswer;

