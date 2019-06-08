import React from 'react';
import PropTypes from 'prop-types';

const BoxContainer = props => {
  const { children } = props;
  return <div style={{ margin: '5px 3px', padding: '5px' }}>{children}</div>;
};

BoxContainer.propTypes = { children: PropTypes.node.isRequired };

export default BoxContainer;
