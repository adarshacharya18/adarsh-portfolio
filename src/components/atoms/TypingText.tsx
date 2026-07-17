import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

interface TypingTextProps {
  text: string;
  speed?: number; // ms per character
  delay?: number; // ms before start
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 15, delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (shouldReduceMotion) return;

    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      timeoutId = setTimeout(() => {
        const char = text.charAt(index);
        setDisplayedText((prev) => prev + char);
        index++;
        if (index < text.length) {
          startTyping();
        }
      }, speed);
    };

    const delayTimeout = setTimeout(() => {
      setDisplayedText('');
      startTyping();
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <span>{text}</span>;
  }

  return <span>{displayedText}</span>;
};

export default TypingText;
