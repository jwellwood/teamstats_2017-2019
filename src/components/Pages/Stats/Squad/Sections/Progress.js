import React from 'react';
import PropTypes from 'prop-types';
// Components
import ProgressBar from '../../../../layout/Stats/ProgressBar';
import StatsHeader from '../../../../layout/Stats/StatsHeader';
// Calcs
import {
  totalTeamApps,
  targetTeamApps,
  totalTeamGoals,
  targetTeamGoals,
  totalTeamAssists,
  targetTeamAssists,
} from '../../functions/playerCalcs';

const Progress = props => {
  const { players } = props;
  const p = players;

  const appPercentage = (totalTeamApps(p) * 100) / targetTeamApps(p);
  const goalPercentage = (totalTeamGoals(p) * 100) / targetTeamGoals(p);
  const assistPercentage = (totalTeamAssists(p) * 100) / targetTeamAssists(p);

  let percentageId = 0;
  const createPercentageData = (description, total, target, percentage) => {
    percentageId += 1;
    return { percentageId, description, total, target, percentage };
  };

  const percentages = [
    createPercentageData('Apps', totalTeamApps(p), targetTeamApps(p), appPercentage),
    createPercentageData('Goals', totalTeamGoals(p), targetTeamGoals(p), goalPercentage),
    createPercentageData('Assists', totalTeamAssists(p), targetTeamAssists(p), assistPercentage),
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
