import React from 'react';
import PropTypes from 'prop-types';

// MUI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// Components
import PlayerImage from './PlayerImage';
import PlayerStats from './PlayerStats';
import BoxContainer from '../../../../layout/hoc/BoxContainer';

const PlayerCard = props => {
  const { player, image } = props;

  return (
    <BoxContainer>
      <Paper elevation={12} square style={{ cursor: 'pointer' }}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={6} style={{ background: ' #333' }}>
            <PlayerImage
              number={player.number}
              name={player.name}
              position={player.position}
              image={image}
              captain={player.captain}
            />
          </Grid>
          <Grid item xs={6}>
            <PlayerStats player={player} />
          </Grid>
        </Grid>
      </Paper>
    </BoxContainer>
  );
};

PlayerCard.propTypes = {
  player: PropTypes.shape({}).isRequired,
  image: PropTypes.string.isRequired,
};

export default PlayerCard;
