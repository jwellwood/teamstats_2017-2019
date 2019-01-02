import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import StatsHeader from '../../layout/Stats/StatsHeader';
import { colors } from '../../../assets/styles/colors';

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
        // label: null,
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
    <div>
      <StatsHeader title="Per Game" />
      <div style={{ padding: '0px 8px' }}>
        <HorizontalBar data={data} legend={{ display: false }} />
      </div>
    </div>
  );
};

export default PerGameGraph;
