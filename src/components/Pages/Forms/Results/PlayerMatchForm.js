import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const PlayerMatchForm = props => {
  const { player } = props;
  return (
    <div style={{ padding: '5px' }}>
      <Grid container direction="column">
        <Grid container direction="row" justify="space-between" alignItems="center">
          <div style={{ fontWeight: 'bold' }}>{player.name}</div>
          <Button variant="contained" size="small">
            Played
          </Button>
        </Grid>
        <Grid container direction="row" justify="space-around" alignItems="center">
          <div>Goals</div>
          <div>Assists</div>
          <div>MVP</div>
        </Grid>
      </Grid>
    </div>
  );
};

PlayerMatchForm.propTypes = { player: PropTypes.shape({}).isRequired };
export default PlayerMatchForm;
