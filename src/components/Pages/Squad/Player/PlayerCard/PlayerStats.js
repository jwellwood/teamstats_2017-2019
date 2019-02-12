import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  avatar: { margin: '5px' },
  numAvatar: {
    width: 19,
    height: 19,
    padding: '5px',
    margin: '3px auto',
    fontWeight: 'bold',
    fontSize: 14,

    background: theme.palette.primary.light,
  },
  name: {
    margin: '10px',
    padding: '3px',
    color: 'white',
    fontFamily: 'Righteous',
    background: theme.palette.primary.light,
    width: '100%',
  },
  statsKey: { fontSize: '10px', color: '#bbb' },
  extras: {
    padding: '2px',
    fontSize: '11px',
    borderTop: '1px solid #333',
    marginTop: '3px',
  },
});

const PlayerStats = props => {
  const { classes, player } = props;

  const playerTargetTotal = +player.targetApps + +player.targetGoals + +player.targetAssists;
  let playerTargetAchieved = player.apps + player.goals + player.assists;
  if (player.apps === '0') {
    playerTargetAchieved = '0';
  }
  const percentageTotal = (playerTargetAchieved * 100) / playerTargetTotal;

  let id = 0;
  const createData = (statType, statValue, statTarget, statColor) => {
    id += 1;
    return { id, statType, statValue, statTarget, statColor };
  };

  const listItems = [
    createData('APPS', player.apps, player.targetApps, player.apps === 0 ? '#E74C3C' : '#F39C12'),
    createData(
      'GOALS',
      player.goals,
      player.targetGoals,
      player.goals === 0 ? '#E74C3C' : '#F39C12',
    ),
    createData(
      'ASSISTS',
      player.assists,
      player.targetAssists,
      player.assists === 0 ? '#E74C3C' : '#F39C12',
    ),
  ];

  return (
    <Grid>
      <Grid container direction="row" justify="space-evenly" alignItems="center">
        {listItems.map(item => (
          <Grid item key={item.id} style={{ width: '30%' }}>
            <Avatar
              className={classes.numAvatar}
              style={
                item.statValue >= item.statTarget
                  ? { background: '#229954' }
                  : { background: item.statColor }
              }
            >
              {item.statValue}
            </Avatar>
            <div className={classes.statsKey}>{item.statType}</div>
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.extras}
      >
        <div
          style={
            player.balance > 0
              ? { color: '#E74C3C', padding: '5px' }
              : { color: '#28B463', padding: '5px' }
          }
        >
          €{parseFloat(player.balance).toFixed(2)}
        </div>
        <div style={{ fontWeight: 'bold' }}>
          <span style={{ color: '#bbb' }}>Target: </span>
          {percentageTotal.toFixed(1)}
          <span style={{ color: '#bbb' }}>%</span>
        </div>
      </Grid>
    </Grid>
  );
};

PlayerStats.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(PlayerStats);
