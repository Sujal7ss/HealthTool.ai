import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  className = '',
  onClick,
  interactive = false
}) => {
  const cardContent = (
    <>
      {title && (
        <h3 className="text-lg font-medium text-neutral-800 mb-3">{title}</h3>
      )}
      {children}
    </>
  );

  if (interactive) {
    return (
      <motion.div
        className={`bg-white rounded-card shadow-card p-6 ${className}`}
        whileHover={{ 
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          y: -2,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div className={`bg-white rounded-card shadow-card p-6 ${className}`}>
      {cardContent}
    </div>
  );
};

export default Card;