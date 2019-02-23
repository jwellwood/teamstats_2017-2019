import React from 'react';
import PropTypes from 'prop-types';
// Components
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import StatsAvatar from '../../../../layout/Stats/StatsAvatar';
import BoxContainer from '../../../../hoc/BoxContainer';

// Component
const OtherPlayerStats = props => {
  const { player, totalTeamGoals } = props;
  const { mvp, balance } = player;
  let goalContribution = ((player.goals + player.assists) * 100) / totalTeamGoals;
  if (totalTeamGoals === 0) {
    goalContribution = 0;
  }

  // Data to map
  let id = 0;
  function createData(icon, title, value) {
    id += 1;
    return { id, icon, title, value };
  }

  const listItems = [
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
    <BoxContainer>
      <StatsHeader title="Stats" />
      <StatsAvatar itemsToMap={listItems} />
    </BoxContainer>
  );
};

OtherPlayerStats.propTypes = {
  player: PropTypes.shape({}).isRequired,
  totalTeamGoals: PropTypes.number.isRequired,
};

export default OtherPlayerStats;
