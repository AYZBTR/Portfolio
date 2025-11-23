// src/contexts/ScrollContext.tsx

import { createContext, useContext, ReactNode } from "react";

// Define the context shape
interface ScrollContextType {
  updateScroll: () => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

interface ScrollProviderProps {
  children: ReactNode;
  updateScroll: () => void; // Function passed from MainLayout
}

export const ScrollProvider = ({ children, updateScroll }: ScrollProviderProps) => {
  return (
    <ScrollContext.Provider value={{ updateScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Custom hook for consuming the context
export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider"); 
  }
  return context;
};

export default ScrollProvider;