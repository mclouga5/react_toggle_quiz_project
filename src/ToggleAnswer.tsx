import React, { useEffect, useRef, useState } from 'react';

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
    <div className=" w-[90vw] sm:w-[60vw] h-24[vh] sm:h-[15vh] border-white border-2 rounded-lg sm:rounded-full grid sm:flex text-center items-start sm:items-center relative mb-4 overflow-hidden" ref={toggleRef}>
      {options.map((option, index) => (
        <div
          key={index}
          className="my-2 text-lg sm:text-xl flex-1 font-bold z-10 overflow-auto"
          onClick={() => handleOptionClick(index)}
          style={{
            color: selectedIndex === index ? '#645d57' : 'white',
            cursor: disable ? 'not-allowed' : 'pointer',
          }}
        >
          {option.label}
        </div>
      ))}
      <div className="sm:rounded-full absolute z-0 bg-slate-50/50 transition-transform duration-300 ease-in-out transition-width transition-height"
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
