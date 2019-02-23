import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const ValueBox = props => {
  const { children } = props;
  return (
    <Paper style={{ width: '50px', padding: '5px', backgroundColor: '#333' }}>
      <Typography
        style={{
          textAlign: 'right',
          textTransform: 'uppercase',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        {children}
      </Typography>
    </Paper>
  );
};

ValueBox.propTypes = { children: PropTypes.node.isRequired };

export default ValueBox;
