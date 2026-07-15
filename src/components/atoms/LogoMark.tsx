import React from 'react';

interface LogoMarkProps {
  size?: number;
  className?: string;
}

/**
 * AA Monogram Mark
 *
 * Geometric construction:
 *   Two "A" letterforms sharing a central leg, forming a continuous
 *   zigzag silhouette (left foot → left peak → center → right peak → right foot).
 *   Each A retains its own crossbar. The dual-peak profile suggests
 *   growth and upward trajectory; the shared center leg communicates
 *   unity and precision.
 *
 * Coordinates (48×48 viewBox):
 *   Left  A: peak (15, 6)  feet (3, 42) and (24, 42)
 *   Right A: peak (33, 6)  feet (24, 42) and (45, 42)
 *   Crossbars at y = 28
 */
const LogoMark: React.FC<LogoMarkProps> = ({ size = 24, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M 3,42 L 15,6 L 24,42 L 33,6 L 45,42" />
      <path d="M 8,28 L 20.5,28" />
      <path d="M 27.5,28 L 40,28" />
    </svg>
  );
};

export default LogoMark;
