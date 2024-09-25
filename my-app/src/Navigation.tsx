import React from 'react';

/**
 * Navigation component for controlling the advancing/retreating through items in a data structure.
 *
 * @param {Function} [onAdvance] - Callback for when the next button is clicked.
 * @param {Function} [onPrevious] - Callback for when the previous button is clicked.
 * @param {boolean} [disableAdvance] - Disables the next button if true.
 * @param {boolean} [disablePrevious] - Disables the previous button if true.
 * @param {string} [advanceButtonText='Next'] - Text to display on the next button.
 * @param {string} [previousButtonText='Previous'] - Text to display on the previous button. */

interface NavigationProps {
  onAdvance?: () => void;
  onPrevious?: () => void;
  disableAdvance?: boolean;
  disablePrevious?: boolean;
  previousButtonText?: string; // Optional Previous button text
  advanceButtonText?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  onAdvance,
  onPrevious,
  disableAdvance,
  disablePrevious,
  previousButtonText = 'Previous', // Default value
  advanceButtonText = 'Next',
}) => {

  return (
    <div>
      {onPrevious && (
        <button
            onClick={onPrevious}
            disabled={disablePrevious}>
          {previousButtonText}
        </button>
      )}
      {onAdvance && (
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
