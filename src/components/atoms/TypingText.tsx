import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

interface TypingTextProps {
  text: string;
  speed?: number; // ms per character
  delay?: number; // ms before start
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 15, delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState(shouldReduceMotion ? text : '');

  useEffect(() => {
    if (shouldReduceMotion) {
      const timer = setTimeout(() => {
        setDisplayedText(text);
      }, 0);
      return () => clearTimeout(timer);
    }

    let intervalTimer: ReturnType<typeof setInterval>;

    const delayTimer = setTimeout(() => {
      // Set to empty string asynchronously to avoid synchronous state changes inside effect
      setDisplayedText('');

      let index = 0;
      intervalTimer = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
        if (index >= text.length) {
          clearInterval(intervalTimer);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      if (intervalTimer) {
        clearInterval(intervalTimer);
      }
    };
  }, [text, speed, delay, shouldReduceMotion]);

  return <span>{displayedText}</span>;
};

export default TypingText;
