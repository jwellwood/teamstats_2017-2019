import React from 'react';
import PropTypes from 'prop-types';

// MUI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// Components
import { Typography } from '@material-ui/core';
import PlayerImage from './PlayerImage';
import PlayerStats from './PlayerStats';
import BoxContainer from '../../../../layout/hoc/BoxContainer';

const PlayerCard = props => {
  const { player, image } = props;

  return (
    <BoxContainer>
      <Paper
        elevation={12}
        square
        style={{
          cursor: 'pointer',
          border: player.balance > 0 ? '2px solid #E74C3C' : null,
        }}
      >
        <Grid container direction="row" alignItems="center">
          <Grid item xs={7} style={{ background: ' #333' }}>
            <PlayerImage
              number={player.number}
              name={player.name}
              position={player.position}
              image={image}
              captain={player.captain}
            />
          </Grid>
          <Grid item xs={5}>
            <PlayerStats player={player} />
          </Grid>
        </Grid>
        {player.balance > 0 ? (
          <Typography
            variant="caption"
            color="primary"
            style={{ textAlign: 'right', padding: '3px' }}
          >
            €{parseFloat(player.balance).toFixed(2)}
          </Typography>
        ) : null}
      </Paper>
    </BoxContainer>
  );
};

PlayerCard.propTypes = {
  player: PropTypes.shape({}).isRequired,
  image: PropTypes.string.isRequired,
};

export default PlayerCard;
