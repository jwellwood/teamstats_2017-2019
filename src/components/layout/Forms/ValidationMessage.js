import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../../assets/styles/colors';

const ValidationMessage = props => {
  const { children } = props;
  return (
    <div
      style={{ fontWeight: 'bold', color: colors.draw, fontSize: '0.8rem', marginBottom: '10px' }}
    >
      {children}
    </div>
  );
};

ValidationMessage.propTypes = { children: PropTypes.node.isRequired };

export default ValidationMessage;
