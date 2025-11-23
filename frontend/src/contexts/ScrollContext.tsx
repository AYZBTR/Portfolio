// src/contexts/ScrollContext.tsx

import { createContext, useContext, ReactNode } from "react";

interface ScrollContextType {
  updateScroll: () => void;
  scrollToSection: (id: string) => void;   // <-- ADD THIS
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

interface ScrollProviderProps {
  children: ReactNode;
  updateScroll: () => void;
  scrollToSection: (id: string) => void;   // <-- ADD THIS
}

export const ScrollProvider = ({
  children,
  updateScroll,
  scrollToSection
}: ScrollProviderProps) => {
  return (
    <ScrollContext.Provider value={{ updateScroll, scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};

export default ScrollProvider;
