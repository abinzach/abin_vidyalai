import React from 'react';
import PropTypes from 'prop-types';
import { WindowWidthProvider } from '../context/WindowWidthContext';

const App = ({ Component, pageProps }) => (
  <WindowWidthProvider>
    <Component {...pageProps} />
  </WindowWidthProvider>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired, // Validates that Component is a React component
  pageProps: PropTypes.object, // Validates that pageProps is an object
};

export default App;
