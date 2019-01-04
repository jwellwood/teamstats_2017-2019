import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import StatsHeader from '../../../../layout/Stats/StatsHeader';

const styles = () => ({ text: { padding: '10px', fontFamily: 'Varela Round', fontSize: '13px', margin: '8px' } });

const MatchReport = props => {
  const { classes, result } = props;
  return (
    <div>
      <StatsHeader title="Match Notes" />
      <Paper elevation={5} className={classes.text}>
        {result.matchNotes ? result.matchNotes : 'There are no notes for this match'}
      </Paper>
    </div>
  );
};

MatchReport.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(MatchReport);
