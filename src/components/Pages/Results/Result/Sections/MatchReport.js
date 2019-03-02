import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import Container from '../../../../hoc/Container';

const styles = () => ({
  text: {
    textAlign: 'left',
    padding: '5px',
    fontFamily: 'Varela Round',
    fontSize: '13px',
    margin: '10px',
  },
});

const MatchReport = props => {
  const { classes, result } = props;
  return (
    <Container>
      <StatsHeader title="Match Notes" />
      <Paper style={{ background: '#333', padding: '1px' }}>
        <Paper elevation={5} className={classes.text} square>
          {result.matchNotes ? result.matchNotes : 'There are no notes for this match'}
        </Paper>
      </Paper>
    </Container>
  );
};

MatchReport.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(MatchReport);
