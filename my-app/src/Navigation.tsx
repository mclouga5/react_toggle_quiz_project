import React from 'react';

interface NavigationProps {
  onAdvance?: () => void;
  onPrevious?: () => void;
  disableAdvance?: boolean;
  disablePrevious?: boolean;
  showAdvanceButton?: boolean;
  showPreviousButton?: boolean;
  previousButtonText?: string;
  advanceButtonText?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  onAdvance,
  onPrevious,
  disableAdvance,
  disablePrevious,
  showAdvanceButton = true,
  showPreviousButton = true,
  previousButtonText = 'Previous',
  advanceButtonText = 'Next',
}) => {
  return (
    <div>
      {showPreviousButton && onPrevious && (
        <button
          onClick={onPrevious}
          disabled={disablePrevious}
          style={{ marginRight: '5px' }}>
          {previousButtonText}
        </button>
      )}
      {showAdvanceButton && onAdvance && (
        <button
          onClick={onAdvance}
          disabled={disableAdvance}>
          {advanceButtonText}
        </button>
      )}
    </div>
  );
};

export default Navigation;

