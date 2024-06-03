import React from 'react';
import PropTypes from 'prop-types';
import { useWindowWidthContext } from '../../context/WindowWidthContext';

export default function Container({ children }) {
  const { isSmallerDevice } = useWindowWidthContext(); // state being called from context

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <div style={{ width: isSmallerDevice ? '95%' : '85%' }}>{children}</div>
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a React node and is required
};
