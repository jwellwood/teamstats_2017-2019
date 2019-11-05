import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
// styles
import styles from './styles';
import { colors } from '../../../../../assets/styles/colors';

const Percentages = props => {
  const { classes, results, playerMatches, avgScore } = props;
  let playedPercentage = (
    (playerMatches.length * 100) /
    results.length
  ).toFixed(1);
  if (results.length === 0) {
    playedPercentage = 0;
  }
  const wonMatches = playerMatches.filter(
    match => +match.teamScore > +match.opponentScore,
  ).length;
  const winPercentage = ((wonMatches / playerMatches.length) * 100).toFixed(1);
  // Data
  const createData = (stat, text, color) => ({ stat, text, color });
  const listItems = [
    createData(playedPercentage, '% played'),
    createData(winPercentage, '% won'),
    createData(avgScore, 'avg +/-', avgScore > 0 ? colors.win : colors.lose),
  ];

  return (
    <Grid
      container
      direction='row'
      alignContent='center'
      justify='center'
      className={classes.root}
    >
      {listItems.map(item => (
        <Grid key={item.text} item xs={4} sm={4}>
          <Card className={classes.card}>
            <Typography variant='h5' style={{ color: item.color }}>
              {item.stat}
            </Typography>
            <Typography variant='caption'>{item.text}</Typography>
          </Card>
        </Grid>
      ))}
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
