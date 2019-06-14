import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  text: {
    textAlign: 'left',
    padding: '5px',
    fontFamily: 'Varela Round',
    fontSize: '11px',
    margin: '5px 0px 0px 0px',
    background: '#333',
    color: theme.palette.secondary.main,
  },
});

const MatchReport = props => {
  const { classes, result } = props;
  return (
    <Paper elevation={5} className={classes.text}>
      {result.matchNotes ? result.matchNotes : 'There are no notes for this match'}
    </Paper>
  );
};

MatchReport.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(MatchReport);
