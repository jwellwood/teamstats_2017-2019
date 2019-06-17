import React from 'react';
import PropTypes from 'prop-types';
// Components
import Player from '../Player';
import Spinner from '../../../layout/Warnings/Spinner';

const PlayerList = props => {
  const { auth, results, players } = props;
  if (players) {
    return players.map(player => {
      const playerMatches = [];
      // eslint-disable-next-line max-len
      results.map(result => result.matchPlayers.map(pl => (pl.id === player.id ? playerMatches.push(result) : null)));

      const playerMatchStats = playerMatches.map(match => {
        const stats = match.matchPlayers.filter(pl => pl.id === player.id);
        return stats[0];
      });

      // player.goals = playerMatchStats.map(({matchGoals}))

      // console.log(player.name, playerMatches, playerMatchStats);
      return (
        <Player
          auth={auth}
          key={player.id}
          player={player}
          results={results}
          players={players}
          playerMatches={playerMatches}
          playerMatchStats={playerMatchStats}
        />
      );
    });
  }
  return players && players.length === 0 ? <div>Start adding players</div> : <Spinner />;
};

PlayerList.propTypes = {
  auth: PropTypes.bool.isRequired,
  players: PropTypes.instanceOf(Array),
  results: PropTypes.instanceOf(Array),
};

export default PlayerList;
