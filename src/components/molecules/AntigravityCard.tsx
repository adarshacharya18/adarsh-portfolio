import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface AntigravityCardProps {
  children: React.ReactNode;
  className?: string;
}

const AntigravityCard: React.FC<AntigravityCardProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the rotation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse position to rotation angle (max 15 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // smooth ease-out
      className={`relative rounded-2xl border border-border-primary/40 bg-bg-secondary/30 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] overflow-hidden group ${className}`}
    >
      {/* Glossy gradient overlay that moves slightly */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ transform: 'translateZ(-1px)' }}
      />

      {/* 
        This nested div uses a Z-translation to 'pop out' 
        from the card background when rotated.
      */}
      <div style={{ transform: 'translateZ(40px)' }} className="h-full w-full pointer-events-none">
        <div className="pointer-events-auto h-full w-full">{children}</div>
      </div>
    </motion.div>
  );
};

export default AntigravityCard;
