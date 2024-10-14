import React, { useEffect } from 'react';


interface DynamicStyleUpdaterProps {
  /** Function that returns the CSS background value based on some condition */
  getStyle: () => React.CSSProperties;
  triggerCondition?: any;
  elementSelector?: string;
}

const DynamicStyleUpdater: React.FC<DynamicStyleUpdaterProps> = ({
  getStyle,
  triggerCondition,
  elementSelector = 'body', }) => {

    useEffect(() => {
      const element = document.querySelector(elementSelector) as HTMLElement | null;
      const newStyle = getStyle();

      if (!element) return; // Exit if no element is found

      // Apply the calculated style safely
      Object.keys(newStyle).forEach((key) => {
        const styleKey = key as keyof React.CSSProperties; // Ensure key is a valid CSS property
        const styleValue = newStyle[styleKey];

        if (styleValue) {
          element.style[styleKey as any] = styleValue.toString();
        }
      });
    }, [getStyle, triggerCondition, elementSelector]);

    return null; // No visible rendering, purely for side effects
};

export default DynamicStyleUpdater;