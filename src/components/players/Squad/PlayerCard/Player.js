import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// Components
import PlayerImage from './PlayerImage';
import PlayerStats from './PlayerStats';

const styles = () => {};

const Player = props => {
  const { player, totalGoals } = props;
  return (
    <Paper elevation={1} square style={{ margin: '10px 2px', cursor: 'pointer' }}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={6} style={{ background: ' #333' }}>
          <PlayerImage number={player.number} name={player.name} position={player.position} />
        </Grid>
        <Grid item xs={6}>
          <PlayerStats player={player} totalGoals={totalGoals} />
        </Grid>
      </Grid>
    </Paper>
  );
};

Player.propTypes = {
  player: PropTypes.shape({}).isRequired,
  totalGoals: PropTypes.number.isRequired,
};

export default withStyles(styles)(Player);
