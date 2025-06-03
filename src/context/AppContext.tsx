import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PortfolioData } from '../types';

interface AppContextType {
  portfolioData: PortfolioData | null;
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData | null>>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  selectedTemplate: string;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  return (
    <AppContext.Provider
      value={{
        portfolioData,
        setPortfolioData,
        isGenerating,
        setIsGenerating,
        progress,
        setProgress,
        activeStep,
        setActiveStep,
        selectedTemplate,
        setSelectedTemplate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};