import React from 'react';
import PropTypes from 'prop-types';

const Label = props => {
  const { children } = props;
  return (
    <div
      style={{
        fontWeight: 'bold',
        textAlign: 'left',
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        margin: '10px auto',
        padding: '10px',
        background: '#ddd',
        width: '90%',
      }}
    >
      {children}
    </div>
  );
};

Label.propTypes = { children: PropTypes.node.isRequired };

export default Label;
