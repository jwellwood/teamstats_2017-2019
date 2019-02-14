import React from 'react';
import PropTypes from 'prop-types';
// Components
import Leaderboard from './Sections/Leaderboard';
import Progress from './Sections/Progress';
import Positions from './Sections/Positions';
import OtherPlayerStats from './Sections/Other';
import Comparison from './Sections/Comparison';

const PlayerStats = props => {
  const { players, results } = props;
  return (
    <div>
      <Leaderboard players={players} />
      <Progress players={players} />
      <Positions players={players} />
      <OtherPlayerStats players={players} results={results} />
      <Comparison players={players} results={results} />
    </div>
  );
};

PlayerStats.propTypes = {
  players: PropTypes.instanceOf(Array).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

export default PlayerStats;
