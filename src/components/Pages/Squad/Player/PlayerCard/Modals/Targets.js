import React from 'react';
import PropTypes from 'prop-types';
import ModalWrapper from './ModalWrapper';
import PlayerTargets from '../../Sections/PlayerTargets';

const Targets = props => {
  const { auth, playerStats, player, playerImage } = props;
  return (
    <ModalWrapper
      auth={auth}
      player={player}
      playerImage={playerImage}
      icon='bullseye'
    >
      <PlayerTargets playerStats={playerStats} player={player} />
    </ModalWrapper>
  );
};

Targets.propTypes = {
  auth: PropTypes.bool.isRequired,
  player: PropTypes.shape({}).isRequired,
  playerStats: PropTypes.shape({}).isRequired,
  playerImage: PropTypes.string.isRequired,
};

export default Targets;
