import React from 'react';
import PropTypes from 'prop-types';
// Components
import { Typography } from '@material-ui/core';
import ProgressBars from './Sections/ProgressBars';
import Leaderboard from './Sections/Leaderboard';
import OtherPlayerStats from './Sections/OtherPlayerStats';
import PositionsGraph from './Sections/PositionsGraph';

const PlayersOverview = props => {
  const { players, results } = props;
  if (players.length !== 0) {
    return (
      <div>
        <Leaderboard players={players} />
        <ProgressBars players={players} />
        <PositionsGraph players={players} />
        <OtherPlayerStats players={players} results={results} />
      </div>
    );
  }
  return <Typography>There are currently no players in the squad</Typography>;
};

PlayersOverview.propTypes = {
  players: PropTypes.instanceOf(Array),
  results: PropTypes.instanceOf(Array),
};

PlayersOverview.defaultProps = { players: [], results: [] };

export default PlayersOverview;
