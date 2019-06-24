import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Paper from '@material-ui/core/Paper';
// Components
import StatsAvatar from '../../../layout/Stats/StatsAvatar';
import BoxContainer from '../../../layout/hoc/BoxContainer';
import BoxLinks from '../../../layout/Navs/BoxLinks';
// Calcs
import {
  getTotalTeamApps,
  targetTeamApps,
  getTotalTeamGoals,
  targetTeamGoals,
  getTotalTeamAssists,
  targetTeamAssists,
} from '../../../../functions/Players/functions';

const SquadTotals = props => {
  const { auth, players } = props;

  const totalPlayers = players.length;
  const totalTeamGoals = players.reduce((totalGoals, player) => totalGoals + player.goals, 0);

  const totalStats = getTotalTeamApps(players) + getTotalTeamGoals(players) + getTotalTeamAssists(players);
  const totalTarget = targetTeamApps(players) + targetTeamGoals(players) + targetTeamAssists(players);
  const totalProgress = (totalStats * 100) / totalTarget;

  // Data to map
  let id = 0;
  const createData = (icon, value, title) => {
    id += 1;
    return { id, icon, value, title };
  };

  const listItems = [
    createData(<i className="fas fa-users" />, totalPlayers, 'PLAYERS'),
    createData(<i className="fas fa-futbol" />, totalTeamGoals, 'GOALS SCORED'),
    createData(
      <i className="fas fa-bullseye" />,
      `${totalProgress.toFixed(1)}%`,
      'Team Target',
      null,
    ),
  ];

  return (
    <BoxContainer>
      <Paper style={{ padding: '10px', background: '#333' }}>
        <StatsAvatar itemsToMap={listItems} />
        <hr />
        <BoxLinks auth={auth} link="/players/addplayer" />{' '}
      </Paper>
    </BoxContainer>
  );
};

SquadTotals.propTypes = {
  auth: PropTypes.bool.isRequired,
  players: PropTypes.instanceOf(Array).isRequired,
};

export default SquadTotals;
