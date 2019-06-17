import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styles from './styles';

const PlayerStats = props => {
  const { classes, player } = props;

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
      <Grid container direction="row" justify="center" alignItems="center">
        {listItems.map(item => (
          <Grid item key={item.id} style={{ width: '30%' }}>
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
    </Grid>
  );
};

PlayerStats.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(PlayerStats);
