import React from 'react';
import PropTypes from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';
// Components
import StatsHeader from '../../../../layout/Stats/StatsHeader';
// Helpers
import { colors } from '../../../../../assets/styles/colors';
import BoxContainer from '../../../../layout/hoc/BoxContainer';

const PerGameGraph = props => {
  const { player } = props;
  const { apps, goals, assists, mvp } = player;
  const goalsPG = (goals / apps).toFixed(2);
  const assistsPG = (assists / apps).toFixed(2);
  const mvpPG = (mvp / apps).toFixed(2);

  const data = {
    labels: ['Goals', 'Assists', 'MVP'],
    datasets: [
      {
        backgroundColor: colors.draw,
        borderColor: colors.lose,
        borderWidth: 3,
        hoverBackgroundColor: colors.win,
        hoverBorderColor: colors.win,
        data: [goalsPG, assistsPG, mvpPG],
      },
    ],
  };

  return (
    <BoxContainer>
      <StatsHeader title="Per Game" />
      <div style={{ padding: '0px 8px' }}>
        <HorizontalBar
          data={data}
          legend={{ display: false }}
          options={{
            scales: { xAxes: [{ ticks: { beginAtZero: true } }] },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </BoxContainer>
  );
};

PerGameGraph.propTypes = { player: PropTypes.shape({}).isRequired };

export default PerGameGraph;
