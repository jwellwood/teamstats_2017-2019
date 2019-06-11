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
import BoxContainer from '../../../../layout/hoc/BoxContainer';
// Helpers
import { resultColor, matchTypeColor } from '../../../../../assets/styles/colors';
import Disclaimer from '../../../../layout/Warnings/Disclaimer';
import styles from './styles';

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
