import React from 'react';
import PropTypes from 'prop-types';
// Components
import TableWrapper from '../../../../../layout/Table';
// Data
import columns from './Data';

const PerGame = props => {
  const { goalsPerGame, againstPerGame, differencePerGame, pointsPerGame } = props;

  const goalDifference = differencePerGame > 0 ? `+${differencePerGame}` : `-${differencePerGame}`;

  const data = [
    { name: 'Goals / game', value: goalsPerGame },
    { name: 'Conceded / game', value: againstPerGame },
    { name: 'Goal Difference / game', value: goalDifference },
    { name: 'Points / game', value: pointsPerGame },
  ];

  const TheadComponent = () => null;
  return <TableWrapper data={data} columns={columns} noHeader={TheadComponent} />;
};

PerGame.propTypes = {
  goalsPerGame: PropTypes.string.isRequired,
  againstPerGame: PropTypes.string.isRequired,
  pointsPerGame: PropTypes.string.isRequired,
  differencePerGame: PropTypes.string.isRequired,
};

export default PerGame;
