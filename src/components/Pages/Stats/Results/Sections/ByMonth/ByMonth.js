import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import SwitchButton from '../../../../../layout/ui/SwitchButton';
import StatsHeader from '../../../../../layout/Stats/StatsHeader';
import BoxContainer from '../../../../../layout/hoc/BoxContainer';
import { colors } from '../../../../../../assets/styles/colors';
import PointsPerGame from './PointsPerGame';

const ByMonth = props => {
  const { results, checked, handleChange, value } = props;
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

  const avgScored = array => (
    array
      .map(result => result.teamScore)
      .map(Number)
      .reduce((a, b) => a + b, 0) / array.length
  ).toFixed(2);

  const avgConceded = array => (
    array
      .map(result => result.opponentScore)
      .map(Number)
      .reduce((a, b) => a + b, 0) / array.length
  ).toFixed(2);
  const avgDifference = array => (avgScored(array) - avgConceded(array)).toFixed(2);
  const data = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Scored',
        borderColor: colors.win,
        borderWidth: 3,
        data: [
          avgScored(sep),
          avgScored(oct),
          avgScored(nov),
          avgScored(dec),
          avgScored(jan),
          avgScored(feb),
          avgScored(mar),
          avgScored(apr),
          avgScored(may),
          avgScored(jun),
        ],
      },
      {
        label: 'Condeded',
        borderColor: colors.lose,
        borderWidth: 1,
        data: [
          avgConceded(sep),
          avgConceded(oct),
          avgConceded(nov),
          avgConceded(dec),
          avgConceded(jan),
          avgConceded(feb),
          avgConceded(mar),
          avgConceded(apr),
          avgConceded(may),
          avgConceded(jun),
        ],
      },
      {
        label: 'Difference',
        borderColor: colors.draw,
        borderWidth: 1,
        data: [
          avgDifference(sep),
          avgDifference(oct),
          avgDifference(nov),
          avgDifference(dec),
          avgDifference(jan),
          avgDifference(feb),
          avgDifference(mar),
          avgDifference(apr),
          avgDifference(may),
          avgDifference(jun),
        ],
      },
    ],
  };
  return (
    <BoxContainer>
      <StatsHeader title="Averages By Month" />
      <SwitchButton
        checked={checked}
        handleChange={handleChange}
        value={value}
        label="Include forfeits"
      />
      <Line
        data={data}
        legend={{ display: true }}
        height={250}
        options={{
          // maintainAspectRatio: false,
          scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
        }}
      />
      <PointsPerGame results={results} />
    </BoxContainer>
  );
};

ByMonth.propTypes = { results: PropTypes.instanceOf(Array).isRequired };

export default ByMonth;
