import { useEffect } from 'react';
import { useMotionValue, MotionValue } from 'framer-motion';

export interface OptimizedScrollContext {
  scrollYProgress: MotionValue<number>;
}

export function useOptimizedScroll(): OptimizedScrollContext {
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const updateScroll = () => {
      const y = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = height > 0 ? y / height : 0;
      scrollYProgress.set(progress);
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });

    // Initial calculation
    updateScroll();

    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [scrollYProgress]);

  return { scrollYProgress };
}
