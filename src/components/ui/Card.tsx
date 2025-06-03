import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isInteractive?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  isInteractive = false,
}) => {
  const baseStyles = 'bg-white rounded-xl shadow-sm overflow-hidden';
  const interactiveStyles = isInteractive
    ? 'cursor-pointer transition-all hover:shadow-md'
    : '';

  const MotionComponent = motion.div;
  
  return isInteractive ? (
    <MotionComponent
      whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
      className={`${baseStyles} ${interactiveStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </MotionComponent>
  ) : (
    <div className={`${baseStyles} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => {
  return <div className={`p-6 border-b ${className}`}>{children}</div>;
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className = '',
  children,
}) => {
  return <div className={`p-6 border-t bg-gray-50 ${className}`}>{children}</div>;
};

export default Card;