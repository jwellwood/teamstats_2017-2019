import React from 'react';
import PropTypes from 'prop-types';
// Components
import SwitchButton from '../../../../layout/ui/SwitchButton';
import StatsList from './StatsList';
// functions
import {
  getMostGoalsScored,
  getFewestGoalsScored,
  getMostGoalsConceded,
  getFewestGoalsConceded,
  getCleanSheets,
  getBiggestWinningMargin,
  getBiggestLosingMargin,
} from '../../../../../functions/Results/functions';

const GoalStats = props => {
  const { results, checked, handleChange, value } = props;

  const mostGoalsMatch = (
    <StatsList
      title="Most goals"
      data={getMostGoalsScored(results).match}
      value={getMostGoalsScored(results).value}
    />
  );
  const fewestGoalsMatch = (
    <StatsList
      title="Fewest goals"
      data={getFewestGoalsScored(results).match}
      value={getFewestGoalsScored(results).value}
    />
  );
  const biggestWin = (
    <StatsList
      title="Biggest winning margin"
      data={getBiggestWinningMargin(results).match}
      value={getBiggestWinningMargin(results).value}
    />
  );
  const mostConcededMatch = (
    <StatsList
      title="Most conceded"
      data={getMostGoalsConceded(results).match}
      value={getMostGoalsConceded(results).value}
    />
  );
  const fewestConcededMatch = (
    <StatsList
      title="Fewest conceded"
      data={getFewestGoalsConceded(results).match}
      value={getFewestGoalsConceded(results).value}
    />
  );
  const cleanSheets = (
    <StatsList
      title="Clean sheets"
      data={getCleanSheets(results)}
      value={getCleanSheets(results).length}
    />
  );

  const biggestLoss = (
    <StatsList
      title="Heaviest defeat"
      data={getBiggestLosingMargin(results).match}
      value={getBiggestLosingMargin(results).value}
    />
  );

  let id = 0;
  const createData = (number, color) => {
    id += 1;
    return { id, number, color };
  };

  const goalsData = [
    createData(mostGoalsMatch),
    createData(biggestWin),
    createData(fewestConcededMatch),
    createData(cleanSheets),
    createData(fewestGoalsMatch),
    createData(mostConcededMatch),
    createData(biggestLoss),
  ];

  return (
    <div>
      <SwitchButton
        checked={checked}
        handleChange={handleChange}
        value={value}
        label="Include forfeits"
      />
      {goalsData.map(stat => (
        <div key={stat.id}>{stat.number}</div>
      ))}
    </div>
  );
};

GoalStats.propTypes = {
  results: PropTypes.instanceOf(Array).isRequired,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default GoalStats;
