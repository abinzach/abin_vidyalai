import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the context
const WindowWidthContext = createContext();

// Create a custom hook to use the window width context
export const useWindowWidthContext = () => useContext(WindowWidthContext);

// Create the context provider component
export const WindowWidthProvider = ({ children }) => {
  const [isSmallerDevice, setIsSmallerDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallerDevice(width < 500);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowWidthContext.Provider value={{ isSmallerDevice }}>
      {children}
    </WindowWidthContext.Provider>
  );
};

WindowWidthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
