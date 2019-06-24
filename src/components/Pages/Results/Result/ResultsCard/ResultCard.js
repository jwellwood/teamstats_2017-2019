import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// // MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
// Components

import ScoreBox from './ScoreBox';
import ResultDate from './ResultDate';
import MatchStats from '../Sections/MatchStats';
import BoxContainer from '../../../../layout/hoc/BoxContainer';
// Helpers
import { resultColor, matchTypeColor } from '../../../../../assets/styles/colors';
import styles from './styles';
import MatchReport from '../Sections/MatchReport';

const ResultCard = props => {
  const { auth, classes, result, teamName } = props;
  const { matchType, teamScore, opponentScore } = result;
  let backgroundColor = '#fff';
  let teamResult = '';
  if (+teamScore > +opponentScore) {
    teamResult = 'W';
    backgroundColor = 'rgba(46, 204, 113, 0.2)';
  } else if (+teamScore === +opponentScore) {
    teamResult = 'D';
    backgroundColor = 'rgba(241, 196, 15, 0.2)';
  } else {
    teamResult = 'L';
    backgroundColor = 'rgba(231, 76, 60, 0.3)';
  }

  return (
    <BoxContainer>
      <ExpansionPanel style={{ border: `2px solid ${resultColor(teamResult)}`, backgroundColor }}>
        <ExpansionPanelSummary
          className={classes.root}
          aria-controls="panel-content"
          id="panel-header"
        >
          <Grid container direction="column" alignContent="center" style={{ padding: 0 }}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              alignContent="center"
              className={classes.matchTypeBar}
            >
              <Grid item className={classes.matchType} style={{ color: matchTypeColor(matchType) }}>
                {result.matchType}
              </Grid>

              <Grid item className={classes.date}>
                <ResultDate result={result} />
              </Grid>
            </Grid>
            <Grid item>
              <ScoreBox result={result} teamName={teamName} teamResult={teamResult} />
            </Grid>
          </Grid>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails style={{ padding: '1px', margin: '0px auto' }}>
          <Grid container direction="column">
            {result.forfeitedMatch ? (
              <Typography color="primary" variant="caption">
                Match forfeited by oppenent
              </Typography>
            ) : (
              <MatchStats result={result} />
            )}
            {result.matchNotes !== '' ? <MatchReport result={result} /> : null}
          </Grid>
        </ExpansionPanelDetails>
        {auth ? (
          <IconButton
            component={Link}
            to={`/results/${result.id}/edit`}
            color="primary"
            size="small"
          >
            <Icon fontSize="small">edit</Icon>
          </IconButton>
        ) : null}
      </ExpansionPanel>
    </BoxContainer>
  );
};

ResultCard.propTypes = {
  auth: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
  teamName: PropTypes.string,
};

ResultCard.defaultProps = { teamName: '' };

export default withStyles(styles)(ResultCard);
