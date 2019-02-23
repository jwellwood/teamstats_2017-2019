import React from 'react';
import PropTypes from 'prop-types';
// Components
import TopStatItem from '../../../../layout/Stats/TopStatItem';
import Disclaimer from '../../../../layout/Warnings/Disclaimer';
// Helpers
import {
  getMostAppsPlayer,
  getMostGoalsPlayer,
  getMostAssistsPlayer,
  getMostMvpPlayer,
  getBestGoalsPerGame,
  getBestAssistsPerGame,
} from '../../../../../functions/Players/functions';

const Leaderboard = props => {
  const { players } = props;

  const mostApps = (
    <TopStatItem
      title="Most Apps"
      data={getMostAppsPlayer(players).player}
      value={getMostAppsPlayer(players).value}
    />
  );
  const mostGoals = (
    <TopStatItem
      title="Most Goals"
      data={getMostGoalsPlayer(players).player}
      value={getMostGoalsPlayer(players).value}
    />
  );
  const mostAssists = (
    <TopStatItem
      title="Most Assists"
      data={getMostAssistsPlayer(players).player}
      value={getMostAssistsPlayer(players).value}
    />
  );
  const mostMVP = (
    <TopStatItem
      title="Most MVP"
      data={getMostMvpPlayer(players).player}
      value={getMostMvpPlayer(players).value}
    />
  );
  const bestGpg = (
    <TopStatItem
      title="Best Goals per Game*"
      data={getBestGoalsPerGame(players).player}
      value={getBestGoalsPerGame(players).value}
    />
  );
  const bestApg = (
    <TopStatItem
      title="Best Assists per Game*"
      data={getBestAssistsPerGame(players).player}
      value={getBestAssistsPerGame(players).value}
    />
  );

  let id = 0;
  const createData = (number, color) => {
    id += 1;
    return { id, number, color };
  };

  const leaderData = [
    createData(mostApps),
    createData(mostGoals),
    createData(mostAssists),
    createData(mostMVP),
    createData(bestGpg),
    createData(bestApg),
  ];

  return (
    <div>
      {leaderData.map(stat => (
        <div key={stat.id}>{stat.number}</div>
      ))}
      <Disclaimer message="*Players must have played more than one match" />
    </div>
  );
};

Leaderboard.propTypes = { players: PropTypes.instanceOf(Array).isRequired };

export default Leaderboard;
