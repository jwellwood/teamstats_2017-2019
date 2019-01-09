import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
// Components
import StatsHeader from '../../../../layout/Stats/StatsHeader';
// Helpers
import { positions } from '../../../../../assets/styles/colors';
import { getPosition } from '../../../../../helpers/players/helpers';

const PositionsGraph = props => {
  const { players } = props;

  const totalGKs = getPosition(players, 'GK');
  const totalDFs = getPosition(players, 'DF');
  const totalMFs = getPosition(players, 'MF');
  const totalFWs = getPosition(players, 'FW');
  const data = {
    datasets: [
      {
        data: [totalGKs, totalDFs, totalMFs, totalFWs],
        backgroundColor: [positions.GK, positions.DF, positions.MF, positions.FW],
      },
    ],
    labels: ['GK', 'DF', 'MF', 'FW'],
  };
  return (
    <div>
      <StatsHeader title="Positions" />
      <div style={{ padding: '0px 8px' }}>
        <Bar
          data={data}
          legend={{ display: false }}
          options={{
            scales: {
              yAxes: [{ ticks: { beginAtZero: true, stepSize: '1' } }],
              xAxes: [{ gridlines: { offsetGridLines: true } }],
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

PositionsGraph.propTypes = { players: PropTypes.instanceOf(Array).isRequired };

export default PositionsGraph;
