import React from 'react';
import PropTypes from 'prop-types';
// Components
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import StatsAvatar from '../../../../layout/Stats/StatsAvatar';
// Helpers
import { totalTeamApps } from '../../functions/playerCalcs';

const OtherPlayerStats = props => {
  const { players, results } = props;
  const filteredResults = results.filter(res => !res.forfeitedMatch);
  const totalMatches = filteredResults.length;
  const totalPlayers = players.length;

  const playersPerMatch = filteredResults ? totalTeamApps(players) / totalMatches : null;
  const totalTeamMVP = players.reduce((totalMVP, player) => totalMVP + player.mvp, 0);
  const mvpPerGame = results ? totalTeamMVP / totalMatches : null;

  const totalPlayerGoals = players.reduce((totalGoals, player) => totalGoals + player.goals, 0);
  const getGoals = (a, b) => a + b;

  const totalTeamGoals = filteredResults.map(res => +res.teamScore);
  const teamGoals = totalTeamGoals.reduce(getGoals, 0);

  const ownGoalsFor = teamGoals - totalPlayerGoals;

  // Money
  const totalTeamOwed = players.reduce(
    (totalOwed, player) => totalOwed + parseFloat(player.balance.toString()),
    0,
  );
  const allBalance = players.map(player => player.balance);
  const topBalanceValue = Math.max(...allBalance);
  const topBalanceObject = players.filter(player => (player.balance === topBalanceValue && topBalanceValue > 0 ? player.name : null));
  const topBalancePlayer = topBalanceObject.map(player => player.name);

  let id = 0;
  const createData = (icon, value, title, color) => {
    id += 1;
    return { id, icon, value, title, color };
  };

  const listItems = [
    createData(<i className="fas fa-users" />, totalPlayers, 'Total Players'),
    createData(<i className="fas fa-user" />, playersPerMatch.toFixed(1), 'Players / Match'),
    createData(<i className="fas fa-star" />, mvpPerGame.toFixed(1), 'MVP / Match'),
    createData(<i className="fas fa-meh" />, ownGoalsFor, 'Own Goals (by opposition)'),
    createData(
      <i className="fas fa-dollar-sign" />,
      <span style={totalTeamOwed > 0 ? { color: '#E74C3C' } : { color: '#28B463' }}>
        €{parseFloat(totalTeamOwed).toFixed(2)}
      </span>,
      'Total Owed',
    ),
    createData(
      <i className="fas fa-dollar-sign" />,
      <span style={topBalanceValue > 0 ? { color: '#E74C3C' } : { color: '#28B463' }}>
        €{parseFloat(topBalanceValue).toFixed(2)}
      </span>,
      topBalancePlayer,
    ),
  ];

  return (
    <div>
      <StatsHeader title="Other" />
      <StatsAvatar itemsToMap={listItems} />
    </div>
  );
};

OtherPlayerStats.propTypes = {
  players: PropTypes.instanceOf(Array).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

export default OtherPlayerStats;
