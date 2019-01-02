import React from 'react';
import PropTypes from 'prop-types';
// Components
import ProgressBars from './ProgressBars';
import Leaderboard from './Leaderboard';
import OtherPlayerStats from './OtherPlayerStats';
import PositionsGraph from './PositionsGraph';

const PlayersOverview = props => {
  const {
    Apps,
    Goals,
    Assists,
    Money,
    MVP,
    mvpPerGame,
    totalPlayers,
    playersPerMatch,
    players,
  } = props;

  return (
    <div>
      <Leaderboard Apps={Apps} Goals={Goals} Assists={Assists} MVP={MVP} players={players} />
      <ProgressBars Apps={Apps} Goals={Goals} Assists={Assists} MVP={MVP} />
      <PositionsGraph players={players} />
      <OtherPlayerStats
        totalPlayers={totalPlayers}
        playersPerMatch={playersPerMatch}
        Money={Money}
        MVP={MVP}
        mvpPerGame={mvpPerGame}
        players={players}
      />
    </div>
  );
};

PlayersOverview.propTypes = {
  Apps: PropTypes.shape({}).isRequired,
  Goals: PropTypes.shape({}).isRequired,
  Assists: PropTypes.shape({}).isRequired,
  MVP: PropTypes.shape({}).isRequired,
  Money: PropTypes.shape({}).isRequired,
  totalPlayers: PropTypes.number.isRequired,
  playersPerMatch: PropTypes.number.isRequired,
  mvpPerGame: PropTypes.number.isRequired,
  players: PropTypes.instanceOf(Array),
};

PlayersOverview.defaultProps = { players: [] };

export default PlayersOverview;
