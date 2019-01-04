import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import StatsHeader from '../../../../../layout/Stats/StatsHeader';
import { colors } from '../../../../../../assets/styles/colors';

const GoalsChart = props => {
  const { goalTotals } = props;
  const goalsFor = goalTotals.totalGoalsFor;
  const goalsAgainst = goalTotals.totalGoalsAgainst;
  const goalDiff = goalsFor - goalsAgainst;
  const data = {
    labels: ['Scored', 'Conceded', 'Difference'],
    datasets: [
      {
        backgroundColor: [colors.win, colors.lose, colors.draw],
        data: [goalsFor, goalsAgainst, goalDiff],
      },
    ],
  };

  return (
    <div>
      <StatsHeader title="Goals" />
      <div style={{ padding: '0px 8px' }}>
        <Bar
          data={data}
          legend={{ display: false }}
          options={{
            scales: {
              yAxes: [{ ticks: { beginAtZero: true, stepSize: '10' } }],
              xAxes: [{ gridlines: { offsetGridLines: true } }],
            },
          }}
        />
      </div>
    </div>
  );
};

GoalsChart.propTypes = { goalTotals: PropTypes.shape({}).isRequired };

export default GoalsChart;
