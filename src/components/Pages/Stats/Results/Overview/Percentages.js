import React from 'react';
import PropTypes from 'prop-types';
// Components
import Graph from './Graph';
import { getPercentage } from '../../functions/helpers';
import { colors } from '../../../../../assets/styles/colors';

const Percentages = props => {
  const { matchTotals } = props;
  const { totalPlayed, totalWins, totalDraws, totalLosses } = matchTotals;
  const winPercentage = getPercentage(totalWins, totalPlayed);
  const drawPercentage = getPercentage(totalDraws, totalPlayed);
  const lossPercentage = getPercentage(totalLosses, totalPlayed);

  let id = 0;
  const createData = (icon, value, title, color) => {
    id += 1;
    return { id, icon, value, title, color };
  };

  const listItems = [
    createData(totalWins, `${winPercentage}%`, '', colors.win),
    createData(totalDraws, `${drawPercentage}%`, '', colors.draw),
    createData(totalLosses, `${lossPercentage}%`, '', colors.lose),
  ];

  const data = {
    labels: ['Win', 'Draw', 'Defeat'],
    datasets: [
      {
        data: [winPercentage, drawPercentage, lossPercentage],
        backgroundColor: [colors.win, colors.draw, colors.lose],
      },
    ],
  };

  return (
    <Graph data={data} title="Total Matches" itemsToMap={listItems} totalPlayed={totalPlayed} />
  );
};

Percentages.propTypes = { matchTotals: PropTypes.shape({}).isRequired };

export default Percentages;
