import React from 'react';
import PropTypes from 'prop-types';
// Components
import PlayerDetails from '../IndividualPlayer/PlayerDetails';

const SquadList = props => {
  const { players, totalGoals, totalMatches } = props;
  if (players) {
    const playersDataArray = players.map(player => (
      <PlayerDetails
        key={player.id}
        player={player}
        totalGoals={totalGoals}
        totalMatches={totalMatches}
      />
    ));
    return playersDataArray;
  }

  return <div>no players</div>;
};

SquadList.propTypes = {
  players: PropTypes.instanceOf(Array).isRequired,
  totalGoals: PropTypes.number.isRequired,
  totalMatches: PropTypes.number.isRequired,
};

export default SquadList;
