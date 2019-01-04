import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
// Components
import StatsHeader from '../../../../layout/Stats/StatsHeader';
// Helpers
import { colors } from '../../../../../assets/styles/colors';
import { getPointsPer, getTotal, getGoalsPer, getDiff } from '../../../../../helpers/calcs';

const styles = () => ({
  avatar: {
    fontSize: '13px',
    fontWeight: 'bold',
    margin: '0 auto',
    background: '#111',
  },
});

const HomeAndAway = props => {
  const { classes, homeResults, awayResults, goalTotals } = props;
  const { homeGoalsFor, homeGoalsAgainst, awayGoalsFor, awayGoalsAgainst } = goalTotals;
  // Home
  const totalHomePlayed = homeResults.length;
  const totalHomeWins = getTotal(homeResults, 'W');
  const totalHomeDraws = getTotal(homeResults, 'D');
  const totalHomeLoss = getTotal(homeResults, 'L');
  // Away
  const totalAwayPlayed = awayResults.length;
  const totalAwayWins = getTotal(awayResults, 'W');
  const totalAwayDraws = getTotal(awayResults, 'D');
  const totalAwayLoss = getTotal(awayResults, 'L');

  let id = 0;
  const createData = (title, home, away, color) => {
    id += 1;
    return { id, title, home, away, color };
  };

  const listItems = [
    createData('Played', totalHomePlayed, totalAwayPlayed),
    createData('Win', totalHomeWins, totalAwayWins),
    createData('Draw', totalHomeDraws, totalAwayDraws),
    createData('Lose', totalHomeLoss, totalAwayLoss),
    createData('Goals For', homeGoalsFor, awayGoalsFor, colors.win),
    createData(
      'Goals per game',
      getGoalsPer(homeGoalsFor, homeResults),
      getGoalsPer(awayGoalsFor, awayResults),
      colors.win,
    ),
    createData('Goals Against', homeGoalsAgainst, awayGoalsAgainst, colors.lose),
    createData(
      'Conceded per game',
      getGoalsPer(homeGoalsAgainst, homeResults),
      getGoalsPer(awayGoalsAgainst, awayResults),
      colors.lose,
    ),
    createData(
      'Goal Difference',
      getDiff(homeGoalsFor, homeGoalsAgainst),
      getDiff(awayGoalsFor, awayGoalsAgainst),
      colors.draw,
    ),
    createData(
      'Points per game',
      getPointsPer(totalHomeWins, totalAwayWins, totalHomePlayed),
      getPointsPer(totalAwayWins, totalAwayDraws, totalAwayPlayed),
    ),
  ];

  return (
    <div>
      <StatsHeader title="Details" />
      <Grid
        container
        direction="row"
        alignItems="center"
        style={{ textAlign: 'center', padding: '8px' }}
      >
        <Grid item xs={2}>
          <Typography variant="body2">HOME</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography />
        </Grid>
        <Grid item xs={2}>
          <Typography>AWAY</Typography>
        </Grid>
      </Grid>
      <Divider />
      {listItems.map(item => (
        <List key={item.id}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
            style={{ textAlign: 'center', padding: '0px 8px' }}
            key={item.id}
          >
            <Grid item xs={2}>
              <Avatar className={classes.avatar} style={{ color: item.color }}>
                {item.home}
              </Avatar>
            </Grid>

            <Grid item xs={8}>
              <Typography style={{ textTransform: 'uppercase', fontSize: '13px' }}>
                {item.title}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Avatar className={classes.avatar} style={{ color: item.color }}>
                {item.away}
              </Avatar>
            </Grid>
          </Grid>
        </List>
      ))}
    </div>
  );
};

HomeAndAway.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  homeResults: PropTypes.instanceOf(Array).isRequired,
  awayResults: PropTypes.instanceOf(Array).isRequired,
  goalTotals: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(HomeAndAway);
