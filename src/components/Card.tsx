
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
  onClick?: () => void;
}

const Card = ({ children, className, index = 0, onClick }: CardProps) => {
  return (
    <motion.div
      className={cn(
        'p-6 rounded-xl border bg-card text-card-foreground shadow-sm',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;
