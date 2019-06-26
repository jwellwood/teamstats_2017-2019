import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from '../../../layout/Stats/ProgressBar';
import StatsHeader from '../../../layout/Stats/StatsHeader';

const TeamTargets = props => {
  const { playerStats, players } = props;
  let percentageId = 0;
  const createPercentageData = (description, total, target, percentage) => {
    percentageId += 1;
    return { percentageId, description, total, target, percentage };
  };

  const teamApps = playerStats.map(player => player.apps).reduce((a, b) => a + b, 0);
  const teamGoals = playerStats.map(player => player.goals).reduce((a, b) => a + b, 0);
  const teamAssists = playerStats.map(player => player.assists).reduce((a, b) => a + b, 0);
  const targetApps = players.map(player => +player.targetApps).reduce((a, b) => a + b, 0);
  const targetGoals = players.map(player => +player.targetGoals).reduce((a, b) => a + b, 0);
  const targetAssists = players.map(player => +player.targetAssists).reduce((a, b) => a + b, 0);
  const appPercentage = (teamApps / targetApps) * 100;
  const goalPercentage = (teamGoals / targetGoals) * 100;
  const assistPercentage = (teamAssists / targetAssists) * 100;
  // Totals
  const totalStats = teamApps + teamGoals + teamAssists;
  const totalTarget = targetApps + targetGoals + targetAssists;
  const totalProgress = (totalStats * 100) / totalTarget;

  const percentages = [
    createPercentageData('Apps', teamApps, targetApps, appPercentage),
    createPercentageData('Goals', teamGoals, targetGoals, goalPercentage),
    createPercentageData('Assists', teamAssists, targetAssists, assistPercentage),
    createPercentageData('Total', totalStats, totalTarget, totalProgress),
  ];
  return (
    <div>
      <StatsHeader title="Team Progress" />
      {percentages.map(percent => (
        <ProgressBar
          key={percent.percentageId}
          title={percent.description}
          total={percent.total}
          target={percent.target}
          percentage={percent.percentage}
        />
      ))}
    </div>
  );
};

TeamTargets.propTypes = {
  players: PropTypes.instanceOf(Array).isRequired,
  playerStats: PropTypes.instanceOf(Array).isRequired,
};

export default TeamTargets;
