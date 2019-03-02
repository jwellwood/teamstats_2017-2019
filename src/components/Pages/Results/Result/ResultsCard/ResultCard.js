import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
// Components
import ScoreBox from './ScoreBox';
import ResultDate from './ResultDate';
import BoxContainer from '../../../../hoc/BoxContainer';
// Helpers
import { resultColor, matchTypeColor } from '../../../../../assets/styles/colors';
import Disclaimer from '../../../../layout/Warnings/Disclaimer';

const styles = theme => ({
  main: {
    textDecoration: 'none',
    borderLeft: '3px solid',
    cursor: 'pointer',
  },
  dateBar: {
    fontSize: '12px',
    padding: '0px 0px 0px 5px ',
    backgroundColor: '#444',
    borderRadius: '2px 2px 0px 0px',
  },
  matchTypeBar: {
    fontSize: '12px',
    padding: '0 5px',
    backgroundColor: '#333',
  },
  resultMarker: { width: '39px' },
  avatar: {
    margin: 5,
    width: 20,
    height: 20,
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#111',
  },
  date: { color: 'white', margin: 5 },
  matchType: { marginBottom: 2 },
  forfeit: { fontSize: '10px', padding: '0 2px', margin: '0 auto', color: '#666' },
  iconButton: { width: '20px', height: '20px' },
  editButton: {
    color: theme.palette.primary.light,
    cursor: 'pointer',
    fontSize: '15px',
  },
});

const ResultCard = props => {
  const { classes, result, teamName } = props;
  const { matchType, teamScore, opponentScore } = result;

  let teamResult = null;
  if (+teamScore > +opponentScore) {
    teamResult = 'W';
  } else if (+teamScore === +opponentScore) {
    teamResult = 'D';
  } else {
    teamResult = 'L';
  }

  return (
    <BoxContainer>
      <Paper
        elevation={20}
        className={classes.main}
        style={{ textDecoration: 'none', borderColor: resultColor(teamResult) }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
          component={Link}
          to={`results/${result.id}`}
          style={{ textDecoration: 'none' }}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
            className={classes.dateBar}
          >
            <Avatar className={classes.avatar} style={{ background: resultColor(teamResult) }}>
              {teamResult}
            </Avatar>
            <ResultDate result={result} />
          </Grid>
          <Grid container className={classes.matchTypeBar}>
            <div className={classes.matchType} style={{ color: matchTypeColor(matchType) }}>
              {result.matchType}
            </div>
          </Grid>
          <ScoreBox result={result} teamName={teamName} teamResult={teamResult} />
          {result.forfeitedMatch ? <Disclaimer message="*Automatic 7-0 due to forfeit" /> : null}
        </Grid>
      </Paper>
    </BoxContainer>
  );
};

ResultCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
  teamName: PropTypes.string,
};

ResultCard.defaultProps = { teamName: '' };

export default withStyles(styles)(ResultCard);
