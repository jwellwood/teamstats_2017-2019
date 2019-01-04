import React from 'react';
import PropTypes from 'prop-types';
// Components
import PlayerDetails from './Player/PlayerDetails';
import Spinner from '../../layout/Warnings/Spinner';

const SquadList = props => {
  const { players, results } = props;
  if (players) {
    return players.map(player => (
      <PlayerDetails key={player.id} player={player} results={results} players={players} />
    ));
  }
  if (players.length === 0) {
    return <div>Start adding players</div>;
  }
  return <Spinner />;
};

SquadList.propTypes = {
  players: PropTypes.instanceOf(Array),
  results: PropTypes.instanceOf(Array),
};

SquadList.defaultProps = { players: [], results: [] };

export default SquadList;
