import React from 'react';
import PropTypes from 'prop-types';
import Percentages from './Sections/Overview/Percentages';
import GoalStats from './Sections/Goals/GoalStats';
import OtherResultStats from './Sections/OtherResultStats';
import HomeAndAway from './Sections/HomeAway';
import GoalsChart from './Sections/Goals/GoalsChart';
// Components

const ResultsStats = props => {
  const { results, matchTotals, goalTotals, homeResults, awayResults } = props;
  return (
    <div>
      <Percentages results={results} matchTotals={matchTotals} />
      <GoalsChart goalTotals={goalTotals} />
      <GoalStats results={results} goalTotals={goalTotals} />
      <HomeAndAway goalTotals={goalTotals} homeResults={homeResults} awayResults={awayResults} />
      <OtherResultStats results={results} />
    </div>
  );
};

ResultsStats.propTypes = {
  results: PropTypes.instanceOf(Array).isRequired,
  matchTotals: PropTypes.shape({}).isRequired,
  goalTotals: PropTypes.shape({}).isRequired,
  homeResults: PropTypes.instanceOf(Array).isRequired,
  awayResults: PropTypes.instanceOf(Array).isRequired,
};

export default ResultsStats;
