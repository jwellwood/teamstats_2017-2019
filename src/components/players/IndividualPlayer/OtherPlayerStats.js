import React from 'react';
import PropTypes from 'prop-types';
// Components
import StatsHeader from '../../layout/Stats/StatsHeader';
import StatsAvatar from '../../layout/Stats/StatsAvatar';

// Component
const OtherPlayerStats = props => {
  const { player, totalGoals } = props;
  const { apps, goals, assists, mvp, balance } = player;
  let goalsPG = (goals / apps).toFixed(2);
  let assistsPG = (assists / apps).toFixed(2);
  let mvpPG = (mvp / apps).toFixed(2);

  const goalContribution = ((player.goals + player.assists) * 100) / totalGoals;
  if (apps === 0) {
    goalsPG = '0';
    assistsPG = '0';
    mvpPG = '0';
  }

  // Data to map
  let id = 0;
  function createData(icon, title, value) {
    id += 1;
    return { id, icon, title, value };
  }

  const listItems = [
    createData(<i className="fas fa-futbol" />, 'Goals / game', goalsPG),
    createData(<i className="fas fa-key" />, 'Assists / game', assistsPG),
    createData(<i className="far fa-star" />, 'MVP / game', mvpPG),
    createData(<i className="fas fa-star" />, 'MVP', mvp),
    createData(
      <i className="fas fa-percentage" />,
      'Goal/Assist %',
      `${goalContribution.toFixed(1)}%`,
    ),
    createData(
      <i className="fas fa-dollar-sign" />,
      'Balance',
      <span style={balance > 0 ? { color: '#E74C3C' } : { color: '#28B463' }}>
        €{parseFloat(balance).toFixed(2)}
      </span>,
    ),
  ];

  return (
    <div>
      <StatsHeader title="Stats" />
      <StatsAvatar itemsToMap={listItems} />
    </div>
  );
};

OtherPlayerStats.propTypes = {
  player: PropTypes.shape({}).isRequired,
  totalGoals: PropTypes.number.isRequired,
};

export default OtherPlayerStats;
