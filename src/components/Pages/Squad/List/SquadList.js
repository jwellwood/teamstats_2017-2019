import React from 'react';
import PropTypes from 'prop-types';
// Components
import Player from '../Player';
import Spinner from '../../../layout/Warnings/Spinner';

const SquadList = props => {
  const { players, results } = props;
  if (players) {
    return players.map(player => (
      <Player key={player.id} player={player} results={results} players={players} />
    ));
  }
  return players.length === 0 ? <div>Start adding players</div> : <Spinner />;
};

SquadList.propTypes = {
  players: PropTypes.instanceOf(Array),
  results: PropTypes.instanceOf(Array),
};

SquadList.defaultProps = { players: [], results: [] };

export default SquadList;
