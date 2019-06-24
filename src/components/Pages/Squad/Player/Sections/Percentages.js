import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import styles from './styles';
import { colors } from '../../../../../assets/styles/colors';

const Percentages = props => {
  const { classes, results, playerMatches, avgScore } = props;
  let playedPercentage = ((playerMatches.length * 100) / results.length).toFixed(1);
  if (results.length === 0) {
    playedPercentage = 0;
  }
  const wonMatches = playerMatches.filter(match => +match.teamScore > +match.opponentScore).length;
  const winPercentage = ((wonMatches / playerMatches.length) * 100).toFixed(1);
  return (
    <Grid container direction="row" alignContent="center" justify="center" className={classes.root}>
      <Grid item xs={4} sm={4}>
        <Card className={classes.card}>
          <Typography variant="h5">{playedPercentage}</Typography>
          <Typography variant="caption">% played</Typography>
        </Card>
      </Grid>
      <Grid item xs={4} sm={4}>
        <Card className={classes.card}>
          <Typography variant="h5">{winPercentage}</Typography>
          <Typography variant="caption">% won</Typography>
        </Card>
      </Grid>
      <Grid item xs={4} sm={4}>
        <Card className={classes.card}>
          <Typography style={{ color: avgScore > 0 ? colors.win : colors.lose }} variant="h5">
            {avgScore}
          </Typography>
          <Typography variant="caption">team avg</Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

Percentages.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  avgScore: PropTypes.string.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  playerMatches: PropTypes.instanceOf(Array).isRequired,
};

export default withStyles(styles)(Percentages);
