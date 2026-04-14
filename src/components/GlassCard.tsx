import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard = ({ children, className, hover = true, onClick }: GlassCardProps) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' } : {}}
      onClick={onClick}
      className={cn(
        "bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-sm transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
