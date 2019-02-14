import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// Helpers
import { colors } from '../../../../../assets/styles/colors';

const styles = () => ({
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
  const { classes, result, teamName } = props;
  const { resultIndicator } = result;

  let resultColor = colors.draw;

  switch (resultIndicator) {
    case 'W':
      resultColor = colors.win;
      break;
    case 'D':
      resultColor = colors.draw;
      break;
    case 'L':
      resultColor = colors.lose;
      break;
    default:
      return resultColor;
  }

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
      <Paper className={classes.teamNames} style={{ float: 'right', textAlign: 'right' }}>
        {homeTeam}
      </Paper>
      <Paper className={classes.scoreBox} style={{ backgroundColor: resultColor }}>
        <p className={classes.scoreNumbers}>{homeScore}</p>
        <p className={classes.scoreNumbers}>{awayScore}</p>
      </Paper>
      <Paper className={classes.teamNames} style={{ float: 'left', textAlign: 'left' }}>
        {awayTeam}
      </Paper>
    </div>
  );
};

ScoreBox.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
  teamName: PropTypes.string,
};

ScoreBox.defaultProps = { teamName: '' };

export default withStyles(styles)(ScoreBox);
