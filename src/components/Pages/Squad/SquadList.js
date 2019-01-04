import React from 'react';
import PropTypes from 'prop-types';
// Components
import PlayerDetails from './Player/PlayerDetails';
import Spinner from '../../layout/Warnings/Spinner';

const SquadList = props => {
  const { players, results } = props;
  let squad = <Spinner />;
  if (players) {
    const playersArray = players.map(player => (
      <PlayerDetails key={player.id} player={player} results={results} players={players} />
    ));
    squad = playersArray;
  }
  if (players.length === 0) {
    squad = <div>Start adding players</div>;
  }
  return squad;
};

SquadList.propTypes = {
  players: PropTypes.instanceOf(Array).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

export default SquadList;
