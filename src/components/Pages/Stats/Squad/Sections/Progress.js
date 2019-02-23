import React from 'react';
import PropTypes from 'prop-types';
// Components
import ProgressBar from '../../../../layout/Stats/ProgressBar';
import StatsHeader from '../../../../layout/Stats/StatsHeader';
// Calcs
import {
  getTotalTeamApps,
  targetTeamApps,
  getTotalTeamGoals,
  targetTeamGoals,
  getTotalTeamAssists,
  targetTeamAssists,
} from '../../../../../functions/Players/functions';

const Progress = props => {
  const { players } = props;
  const p = players;

  const appPercentage = (getTotalTeamApps(p) * 100) / targetTeamApps(p);
  const goalPercentage = (getTotalTeamGoals(p) * 100) / targetTeamGoals(p);
  const assistPercentage = (getTotalTeamAssists(p) * 100) / targetTeamAssists(p);
  const totalStats = getTotalTeamApps(p) + getTotalTeamGoals(p) + getTotalTeamAssists(p);
  const totalTarget = targetTeamApps(p) + targetTeamGoals(p) + targetTeamAssists(p);
  const totalProgress = (totalStats * 100) / totalTarget;
  let percentageId = 0;
  const createPercentageData = (description, total, target, percentage) => {
    percentageId += 1;
    return { percentageId, description, total, target, percentage };
  };

  const percentages = [
    createPercentageData('Apps', getTotalTeamApps(p), targetTeamApps(p), appPercentage),
    createPercentageData('Goals', getTotalTeamGoals(p), targetTeamGoals(p), goalPercentage),
    createPercentageData('Assists', getTotalTeamAssists(p), targetTeamAssists(p), assistPercentage),
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

Progress.propTypes = { players: PropTypes.instanceOf(Array).isRequired };

export default Progress;
