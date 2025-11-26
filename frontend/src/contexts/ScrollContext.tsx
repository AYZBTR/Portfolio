import { createContext, useContext, ReactNode } from "react";

interface ScrollContextType {
  updateScroll: () => void;
  scrollToSection: (id: string) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

interface ScrollProviderProps {
  children: ReactNode;
  updateScroll: () => void;
  scrollToSection: (id: string) => void;
}

export const ScrollProvider = ({
  children,
  updateScroll,
  scrollToSection,
}: ScrollProviderProps) => {
  return (
    <ScrollContext.Provider value={{ updateScroll, scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext<ScrollContextType | undefined>(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};

export default ScrollProvider;
