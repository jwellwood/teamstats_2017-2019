import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import StatsHeader from '../../../../../layout/Stats/StatsHeader';
import BoxContainer from '../../../../../layout/hoc/BoxContainer';
import { colors } from '../../../../../../assets/styles/colors';

const PointsPerGame = props => {
  const { results } = props;
  const sep = results.filter(match => match.date.slice(5, -3) === '09');
  const oct = results.filter(match => match.date.slice(5, -3) === '10');
  const nov = results.filter(match => match.date.slice(5, -3) === '11');
  const dec = results.filter(match => match.date.slice(5, -3) === '12');
  const jan = results.filter(match => match.date.slice(5, -3) === '01');
  const feb = results.filter(match => match.date.slice(5, -3) === '02');
  const mar = results.filter(match => match.date.slice(5, -3) === '03');
  const apr = results.filter(match => match.date.slice(5, -3) === '04');
  const may = results.filter(match => match.date.slice(5, -3) === '05');
  const jun = results.filter(match => match.date.slice(5, -3) === '06');

  const points = array => {
    const wins = array.filter(result => +result.teamScore > +result.opponentScore).length;

    const draws = array.filter(result => +result.teamScore === +result.opponentScore).length;

    return ((wins * 3 + draws) / array.length).toFixed(2);
  };

  const data = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Points per game',
        borderColor: colors.win,
        borderWidth: 3,
        data: [
          points(sep),
          points(oct),
          points(nov),
          points(dec),
          points(jan),
          points(feb),
          points(mar),
          points(apr),
          points(may),
          points(jun),
        ],
      },
    ],
  };

  return (
    <BoxContainer>
      <StatsHeader title="Points per game" />

      <Line
        data={data}
        legend={{ display: true }}
        height={150}
        options={{ scales: { yAxes: [{ ticks: { beginAtZero: true, stepSize: 1 } }] } }}
      />
    </BoxContainer>
  );
};

PointsPerGame.propTypes = { results: PropTypes.instanceOf(Array).isRequired };

export default PointsPerGame;
