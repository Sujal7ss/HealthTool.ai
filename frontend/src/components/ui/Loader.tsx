import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'white';
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  color = 'primary',
  text
}) => {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };
  
  const colorMap = {
    primary: 'text-primary-500',
    secondary: 'text-secondary-500',
    accent: 'text-accent-500',
    white: 'text-white'
  };

  const circleVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: { 
      opacity: 1, 
      pathLength: 1,
      transition: { 
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.svg
        className={`${sizeMap[size]} ${colorMap[color]}`}
        viewBox="0 0 50 50"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          variants={circleVariants}
        />
      </motion.svg>
      
      {text && (
        <p className={`mt-2 text-sm ${colorMap[color]}`}>{text}</p>
      )}
    </div>
  );
};

export default Loader;