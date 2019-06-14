import React from 'react';
import PropTypes from 'prop-types';

const BoxContainer = props => {
  const { children } = props;
  return <div style={{ margin: '3px 3px', padding: '2px' }}>{children}</div>;
};

BoxContainer.propTypes = { children: PropTypes.node.isRequired };

export default BoxContainer;
