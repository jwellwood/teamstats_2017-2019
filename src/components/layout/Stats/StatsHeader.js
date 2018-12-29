import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  heading: {
    fontFamily: 'Anton',
    margin: '10px',
    background: '#ddd',
    padding: '3px 10px',
    fontSize: '20px',
  },
});

const StatsHeader = props => {
  const { classes, title } = props;
  return <Typography className={classes.heading}>{title}</Typography>;
};

export default withStyles(styles)(StatsHeader);
