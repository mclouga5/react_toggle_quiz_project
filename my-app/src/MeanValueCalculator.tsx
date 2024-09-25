import React, { useEffect, useState } from 'react';

interface MeanValueCalculatorProps {
    optionValues: number[];  // Array of values based on the selected toggle button position for each toggle option
    onMeanValueChange: (meanValue: number) => void;  // Callback to notify the parent of mean value
}

const MeanValueCalculator: React.FC<MeanValueCalculatorProps> =
({ optionValues,
   onMeanValueChange }) => {

    // Calculate mean value when optionValues change (number between 0 and 1)
    useEffect(() => {
        const total = optionValues.reduce((acc, curr) => acc + curr, 0);  // Sum all correctness values
        const meanValue = optionValues.length > 0
            ? total / optionValues.length
            : 0;  // Default to value if no values (never NaN)
            onMeanValueChange(meanValue);  // Notify parent of the mean correctness
    }, [optionValues, onMeanValueChange]);

    return null; // No UI for this component; just correctness logic
};

export default MeanValueCalculator;




