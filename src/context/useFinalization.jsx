import { createContext, useContext, useState } from "react";

const FinalizationContext = createContext();

export const FinalizationProvider = ({ children }) => {
  const [hasFinalized, setHasFinalized] = useState(false);

  return (
    <FinalizationContext.Provider value={{ hasFinalized, setHasFinalized }}>
      {children}
    </FinalizationContext.Provider>
  );
};

export const useFinalization = () => useContext(FinalizationContext);
