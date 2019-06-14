import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  disclaimer: {
    color: '#ccc',
    fontSize: '9px',
    margin: '2px 10px',
    textAlign: 'center',
  },
});

const Disclaimer = props => {
  const { classes, message } = props;
  return <Typography className={classes.disclaimer}>{message}</Typography>;
};

Disclaimer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  message: PropTypes.string.isRequired,
};
export default withStyles(styles)(Disclaimer);
