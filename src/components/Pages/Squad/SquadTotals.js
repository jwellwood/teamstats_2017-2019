import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Paper from '@material-ui/core/Paper';
// Components
import PlayersOverview from './SquadStats/PlayersOverview';
import MoreStatsModal from '../../layout/Stats/MoreStatsModal';
import StatsAvatar from '../../layout/Stats/StatsAvatar';
import BoxContainer from '../../hoc/BoxContainer';

const SquadTotals = props => {
  const { players, results } = props;

  const totalPlayers = players.length;
  const totalTeamGoals = players.reduce((totalGoals, player) => totalGoals + player.goals, 0);

  const totalTeamOwed = players.reduce(
    (totalOwed, player) => totalOwed + parseFloat(player.balance.toString()),
    0,
  );

  // Data to map
  let id = 0;
  const createData = (icon, value, title) => {
    id += 1;
    return { id, icon, value, title };
  };

  const listItems = [
    createData(<i className="fas fa-users" />, totalPlayers, 'TOTAL PLAYERS'),
    createData(<i className="fas fa-futbol" />, totalTeamGoals, 'GOALS SCORED'),
    createData(
      <i className="fas fa-dollar-sign" />,
      <span style={totalTeamOwed > 0 ? { color: '#E74C3C' } : { color: '#28B463' }}>
        €{parseFloat(totalTeamOwed).toFixed(2)}
      </span>,
      'OWED',
      null,
    ),
  ];

  return (
    <BoxContainer>
      <Paper style={{ padding: '10px' }}>
        <StatsAvatar itemsToMap={listItems} />
        <MoreStatsModal title="Squad" link="/players/addplayer" icon="person_add">
          <PlayersOverview players={players} results={results} />
        </MoreStatsModal>
      </Paper>
    </BoxContainer>
  );
};

SquadTotals.propTypes = {
  players: PropTypes.instanceOf(Array).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

export default SquadTotals;
