import React from 'react';
import PropTypes from 'prop-types';
// Components
import StatsHeader from '../../layout/Stats/StatsHeader';
import StatsAvatar from '../../layout/Stats/StatsAvatar';

const OtherPlayerStats = props => {
  const { totalPlayers, playersPerMatch, mvpPerGame, Money } = props;

  let id = 0;
  const createData = (icon, value, title, color) => {
    id += 1;
    return { id, icon, value, title, color };
  };

  const listItems = [
    createData(<i className="fas fa-users" />, totalPlayers, 'Total Players'),
    createData(<i className="fas fa-user" />, playersPerMatch.toFixed(1), 'Players / Match'),
    createData(<i className="fas fa-star" />, mvpPerGame.toFixed(1), 'MVP / Match'),
    createData(
      <i className="fas fa-dollar-sign" />,
      <span style={Money.totalTeamOwed > 0 ? { color: '#E74C3C' } : { color: '#28B463' }}>
        €{parseFloat(Money.totalTeamOwed).toFixed(2)}
      </span>,
      'Total Owed',
    ),
    createData(
      <i className="fas fa-dollar-sign" />,
      <span style={Money.topBalanceValue > 0 ? { color: '#E74C3C' } : { color: '#28B463' }}>
        €{parseFloat(Money.topBalanceValue).toFixed(2)}
      </span>,
      Money.topBalancePlayer,
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
  totalPlayers: PropTypes.number.isRequired,
  playersPerMatch: PropTypes.number.isRequired,
  mvpPerGame: PropTypes.number.isRequired,
  Money: PropTypes.shape({}).isRequired,
  MVP: PropTypes.shape({}).isRequired,
};

export default OtherPlayerStats;
