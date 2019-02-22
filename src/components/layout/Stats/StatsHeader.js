import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  heading: {
    fontFamily: 'Anton',
    margin: '5px 0px',
    background: '#ddd',
    padding: '3px 10px',
    fontSize: '20px',
  },
});

const StatsHeader = props => {
  const { classes, title } = props;
  return <Typography className={classes.heading}>{title}</Typography>;
};

StatsHeader.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(StatsHeader);
