import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
// Components
import StatsHeader from '../../layout/Stats/StatsHeader';
// Helpers
import { colors } from '../../../assets/styles/colors';

const PositionsGraph = props => {
  const { players } = props;
  const getGKs = players.filter(player => player.position === 'GK');
  const totalGKs = getGKs.length;
  const getDFs = players.filter(player => player.position === 'DF');
  const totalDFs = getDFs.length;
  const getMFs = players.filter(player => player.position === 'MF');
  const totalMFs = getMFs.length;
  const getFWs = players.filter(player => player.position === 'FW');
  const totalFWs = getFWs.length;
  const data = {
    datasets: [
      {
        data: [totalGKs, totalDFs, totalMFs, totalFWs],
        backgroundColor: [colors.GK, colors.DF, colors.MF, colors.FW],
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
          }}
        />
      </div>
    </div>
  );
};

PositionsGraph.propTypes = { players: PropTypes.instanceOf(Array).isRequired };

export default PositionsGraph;
