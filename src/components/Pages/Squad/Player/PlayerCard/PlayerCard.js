import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// Components
import PlayerImage from './PlayerImage';
import PlayerStats from './PlayerStats';
import BoxContainer from '../../../../hoc/BoxContainer';

const styles = () => {};

const PlayerCard = props => {
  const { player } = props;
  return (
    <BoxContainer>
      <Paper elevation={12} square style={{ margin: '10px 2px', cursor: 'pointer' }}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={6} style={{ background: ' #333' }}>
            <PlayerImage number={player.number} name={player.name} position={player.position} />
          </Grid>
          <Grid item xs={6}>
            <PlayerStats player={player} />
          </Grid>
        </Grid>
      </Paper>
    </BoxContainer>
  );
};

PlayerCard.propTypes = { player: PropTypes.shape({}).isRequired };

export default withStyles(styles)(PlayerCard);
