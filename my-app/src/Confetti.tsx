import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';  // Importing canvas-confetti

interface ConfettiProps {
  trigger: boolean;  // Whether or not to fire the confetti
}

const Confetti: React.FC<ConfettiProps> = ({ trigger }) => {
  useEffect(() => {
    if (trigger) {
      // Fire confetti when the `trigger` prop is true
      fireConfetti();
    }
  }, [trigger]);

  // Function to fire confetti
  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return null;  // This component does not render any UI
};

export default Confetti;
