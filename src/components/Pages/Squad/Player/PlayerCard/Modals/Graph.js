import React from 'react';
import PropTypes from 'prop-types';
import ModalWrapper from './ModalWrapper';
import StatsGraph from '../../Sections/StatsGraph';

const Graph = props => {
  const { auth, player, playerImage, playerMatches } = props;
  return (
    <div>
      <ModalWrapper
        auth={auth}
        player={player}
        playerImage={playerImage}
        icon='chart-line'
      >
        <StatsGraph player={player} playerMatches={playerMatches} />
      </ModalWrapper>
    </div>
  );
};

Graph.propTypes = {
  auth: PropTypes.bool.isRequired,
  player: PropTypes.shape({}).isRequired,
  playerMatches: PropTypes.instanceOf(Array).isRequired,
  playerImage: PropTypes.string.isRequired,
};

export default Graph;
