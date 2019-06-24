import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// Helpers
import { resultColor } from '../../../../../assets/styles/colors';

const styles = () => ({
  fixtureTeams: {
    margin: '1px auto',
    display: 'flex',
    justifyContent: 'center',
    padding: '0px 10px',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '15px',
    alignItems: 'center',
    color: '#222',
  },
  teamNames: {
    display: 'inline-block',
    padding: '3px',
    width: '100%',
    overflow: 'hidden',
    wordWrap: 'break-word',
    // margin: '0px 5px',
    fontSize: '14px',
  },
  scoreBox: {
    display: 'flex',
    margin: '0px auto',
    width: '50px',
    padding: '4px',
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
  const { classes, result, teamName, teamResult } = props;
  let homeTeam = teamName;
  let homeScore = result.teamScore;
  if (result.homeOrAway === 'away') {
    homeTeam = result.opponentName;
    homeScore = result.opponentScore;
  }

  let awayTeam = teamName;
  let awayScore = result.teamScore;
  if (result.homeOrAway === 'home') {
    awayTeam = result.opponentName;
    awayScore = result.opponentScore;
  }

  return (
    <div className={classes.fixtureTeams}>
      <div className={classes.teamNames} style={{ float: 'right', textAlign: 'right' }}>
        {homeTeam}
      </div>
      <Paper className={classes.scoreBox} style={{ backgroundColor: resultColor(teamResult) }}>
        <p className={classes.scoreNumbers}>{homeScore}</p>
        <p className={classes.scoreNumbers}>{awayScore}</p>
      </Paper>
      <div className={classes.teamNames} style={{ float: 'left', textAlign: 'left' }}>
        {awayTeam}
      </div>
    </div>
  );
};

ScoreBox.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
  teamName: PropTypes.string,
  teamResult: PropTypes.string.isRequired,
};

ScoreBox.defaultProps = { teamName: '' };

export default withStyles(styles)(ScoreBox);
