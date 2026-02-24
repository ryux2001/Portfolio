import { createContext, useContext, useState } from 'react';

const AccesibilityContext = createContext();

export const AccesibilityProvider = ({ children }) => {
  const [animacionesActivas, setAnimacionesActivas] = useState(true);

  return (
    <AccesibilityContext.Provider value={{ animacionesActivas, setAnimacionesActivas }}>
      {children}
    </AccesibilityContext.Provider>
  );
};

export const useAccesibility = () => useContext(AccesibilityContext);