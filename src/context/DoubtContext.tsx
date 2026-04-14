import React, { createContext, useContext, useState, useEffect } from 'react';
import { Doubt, UserStats } from '@/src/types';

interface DoubtContextType {
  doubts: Doubt[];
  addDoubt: (doubt: Omit<Doubt, 'id' | 'status' | 'createdAt'>) => void;
  stats: UserStats;
}

const DoubtContext = createContext<DoubtContextType | undefined>(undefined);

export const DoubtProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doubts, setDoubts] = useState<Doubt[]>([
    {
      id: '1',
      title: 'How to calculate the derivative of sin(x^2)?',
      description: 'I am confused about the chain rule application here. I tried differentiating sin first but got stuck with the x^2 part.',
      subject: 'Mathematics',
      priority: 'High',
      status: 'Answered',
      createdAt: '2 hours ago',
      answer: "To differentiate sin(x^2), you need to use the chain rule. Let u = x^2. Then the function is sin(u). The derivative is cos(u) * du/dx. Since du/dx = 2x, the final answer is 2x * cos(x^2)."
    },
    {
      id: '2',
      title: 'Explain the concept of Quantum Entanglement',
      description: 'Looking for a simple analogy to understand this. Is it like two coins that always show the same result?',
      subject: 'Physics',
      priority: 'Medium',
      status: 'Pending',
      createdAt: '5 hours ago'
    },
    {
      id: '3',
      title: 'Structure of DNA and its components',
      description: 'Need a clear diagram and explanation of base pairing. Why does A always pair with T?',
      subject: 'Biology',
      priority: 'Low',
      status: 'Answered',
      createdAt: 'Yesterday',
      answer: "DNA consists of two strands forming a double helix. The components are nucleotides (sugar, phosphate, base). Base pairing (A-T, G-C) occurs due to hydrogen bonding and geometric fit. A and T form two hydrogen bonds, while G and C form three."
    }
  ]);

  const addDoubt = (newDoubt: Omit<Doubt, 'id' | 'status' | 'createdAt'>) => {
    const doubt: Doubt = {
      ...newDoubt,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Pending',
      createdAt: 'Just now'
    };
    setDoubts(prev => [doubt, ...prev]);
  };

  const stats: UserStats = {
    totalDoubts: doubts.length,
    solved: doubts.filter(d => d.status === 'Answered').length,
    pending: doubts.filter(d => d.status === 'Pending').length
  };

  return (
    <DoubtContext.Provider value={{ doubts, addDoubt, stats }}>
      {children}
    </DoubtContext.Provider>
  );
};

export const useDoubts = () => {
  const context = useContext(DoubtContext);
  if (context === undefined) {
    throw new Error('useDoubts must be used within a DoubtProvider');
  }
  return context;
};
