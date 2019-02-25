import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { colors } from '../../../assets/styles/colors';

const ValueBox = props => {
  const { children, color } = props;
  return (
    <Paper
      style={{
        width: '50px',
        padding: '5px',
        backgroundColor: color === 'win' ? colors.win : '#333',
      }}
    >
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

ValueBox.propTypes = { children: PropTypes.node.isRequired, color: PropTypes.string };
ValueBox.defaultProps = { color: '' };
export default ValueBox;
