import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styles from './styles';

const PlayerStats = props => {
  const { classes, player, playerStats } = props;
  const { apps, goals, assists } = playerStats;

  let id = 0;
  const createData = (statType, statValue, statTarget, statColor) => {
    id += 1;
    return { id, statType, statValue, statTarget, statColor };
  };

  const listItems = [
    createData('APPS', apps, player.targetApps, apps === 0 ? '#E74C3C' : '#F39C12'),
    createData('GOALS', goals, player.targetGoals, goals === 0 ? '#E74C3C' : '#F39C12'),
    createData('ASSISTS', assists, player.targetAssists, assists === 0 ? '#E74C3C' : '#F39C12'),
  ];

  return (
    <Grid container direction="row" justify="space-around" alignContent="center">
      {listItems.map(item => (
        <Grid item key={item.id}>
          <div
            className={classes.numAvatar}
            style={
              item.statValue >= item.statTarget
                ? { background: '#229954' }
                : { background: item.statColor }
            }
          >
            {item.statValue}
          </div>
          <div className={classes.statsKey}>{item.statType}</div>
        </Grid>
      ))}
    </Grid>
  );
};

PlayerStats.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
  playerStats: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(PlayerStats);
