import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const styles = theme => ({
  fixtureTeams: {
    width: '100%',
    margin: '5px auto',
    display: 'flex',
    padding: '0px 10px',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '15px',
    alignItems: 'center',
  },
  teamNames: {
    display: 'inline-block',
    padding: '3px',
    width: '50%',
    overflow: 'hidden',
    wordWrap: 'break-word',
    margin: '0 5px',
  },
  scoreBox: {
    display: 'flex',
    margin: '5 auto',
    width: '50px',
    padding: '5px',
    // position: 'absolute',
  },
  scoreNumbers: {
    width: '20px',
    border: '1px solid black',
    borderRadius: '3px',
    display: 'inline-block',
    padding: '2px',
    margin: '0 1px',
    background: 'white',
  },
});

const ScoreBox = props => {
  const { classes, result } = props;
  const { resultIndicator } = result;
  let resultColor = 'white';
  if (resultIndicator === 'W') {
    resultColor = '#58D68D';
  } else if (resultIndicator === 'D') {
    resultColor = '#F5B041';
  } else if (resultIndicator === 'L') {
    resultColor = '#E74C3C';
  }
  return (
    <div className={classes.fixtureTeams}>
      <Paper className={classes.teamNames} style={{ float: 'right', textAlign: 'right' }}>
        {result.homeTeamName}
      </Paper>
      <Paper className={classes.scoreBox} style={{ backgroundColor: resultColor }}>
        <p className={classes.scoreNumbers}>{result.homeTeamScore}</p>
        <p className={classes.scoreNumbers}>{result.awayTeamScore}</p>
      </Paper>
      <Paper className={classes.teamNames} style={{ float: 'left', textAlign: 'left' }}>
        {result.awayTeamName}
      </Paper>
    </div>
  );
};

export default withStyles(styles)(ScoreBox);
