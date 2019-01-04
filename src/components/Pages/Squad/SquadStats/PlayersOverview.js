import React from 'react';
import PropTypes from 'prop-types';
// Components
import ProgressBars from './Sections/ProgressBars';
import Leaderboard from './Sections/Leaderboard';
import OtherPlayerStats from './Sections/OtherPlayerStats';
import PositionsGraph from './Sections/PositionsGraph';

const PlayersOverview = props => {
  const { players, results } = props;

  return (
    <div>
      <Leaderboard players={players} />
      <ProgressBars players={players} />
      <PositionsGraph players={players} />
      <OtherPlayerStats players={players} results={results} />
    </div>
  );
};

PlayersOverview.propTypes = {
  players: PropTypes.instanceOf(Array),
  results: PropTypes.instanceOf(Array),
};

PlayersOverview.defaultProps = { players: [], results: [] };

export default PlayersOverview;
