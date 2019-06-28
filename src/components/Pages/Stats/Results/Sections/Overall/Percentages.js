import React from 'react';
import PropTypes from 'prop-types';
// Components
import Graph from './Graph';
import { getPercentage } from '../../../../../../functions/Results/functions';
import { colors } from '../../../../../../assets/styles/colors';

const Percentages = props => {
  const { matchTotals } = props;
  const { totalMatches, totalWins, totalDraws, totalLosses } = matchTotals;

  const percentages = {
    win: getPercentage(totalWins, totalMatches),
    draw: getPercentage(totalDraws, totalMatches),
    lose: getPercentage(totalLosses, totalMatches),
  };

  const data = {
    labels: ['Win', 'Draw', 'Defeat'],
    datasets: [
      {
        data: [percentages.win, percentages.draw, percentages.lose],
        backgroundColor: [colors.win, colors.draw, colors.lose],
      },
    ],
  };

  return <Graph data={data} title="Total Matches" percentages={percentages} />;
};

Percentages.propTypes = { matchTotals: PropTypes.shape({}).isRequired };

export default Percentages;
