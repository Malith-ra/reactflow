'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type DnDContextType = [string | null, React.Dispatch<React.SetStateAction<string | null>>];

const DnDContext = createContext<DnDContextType | undefined>(undefined);

type DnDProviderProps = {
  children: ReactNode;
};

export const DnDProvider: React.FC<DnDProviderProps> = ({ children }) => {
  const [type, setType] = useState<string | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

export const useDnD = (): DnDContextType => {
  const context = useContext(DnDContext);
  if (!context) {
    throw new Error('useDnD must be used within a DnDProvider');
  }
  return context;
};
