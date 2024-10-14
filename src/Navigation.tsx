import React from 'react';
import Button from './components/button'

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
        <Button
          className="text-md p-2 mt-4 mr-2"
          onClick={onPrevious}
          disabled={disablePrevious}
          label={previousButtonText}>
        </Button>
      )}
      {showAdvanceButton && onAdvance && (
        <Button
          className="text-md p-2 mt-4"
          onClick={onAdvance}
          disabled={disableAdvance}
          label={advanceButtonText}>
        </Button>
      )}
    </div>
  );
};

export default Navigation;

