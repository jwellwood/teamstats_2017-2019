import React from 'react';
import PropTypes from 'prop-types';
// Components
import ProgressBar from '../../layout/Stats/ProgressBar';
import StatsHeader from '../../layout/Stats/StatsHeader';

const ProgressBars = props => {
  const { Apps, Goals, Assists } = props;

  const appPercentage = (Apps.totalTeamApps * 100) / Apps.teamTargetApps;
  const goalPercentage = (Goals.totalTeamGoals * 100) / Goals.teamTargetGoals;
  const assistPercentage = (Assists.totalTeamAssists * 100) / Assists.teamTargetAssists;

  let percentageId = 0;
  const createPercentageData = (description, total, target, percentage) => {
    percentageId += 1;
    return { percentageId, description, total, target, percentage };
  };

  const percentages = [
    createPercentageData('Apps', Apps.totalTeamApps, Apps.teamTargetApps, appPercentage),
    createPercentageData('Goals', Goals.totalTeamGoals, Goals.teamTargetGoals, goalPercentage),
    createPercentageData(
      'Assists',
      Assists.totalTeamAssists,
      Assists.teamTargetAssists,
      assistPercentage,
    ),
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

ProgressBars.propTypes = {
  Apps: PropTypes.shape({}).isRequired,
  Goals: PropTypes.shape({}).isRequired,
  Assists: PropTypes.shape({}).isRequired,
};

export default ProgressBars;
