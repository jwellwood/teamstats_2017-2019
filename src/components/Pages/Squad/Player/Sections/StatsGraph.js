import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import BoxContainer from '../../../../layout/hoc/BoxContainer';

const StatsGraph = props => {
  const { player, playerMatches } = props;

  const sep = playerMatches.filter(match => match.date.slice(5, -3) === '09');
  const oct = playerMatches.filter(match => match.date.slice(5, -3) === '10');
  const nov = playerMatches.filter(match => match.date.slice(5, -3) === '11');
  const dec = playerMatches.filter(match => match.date.slice(5, -3) === '12');
  const jan = playerMatches.filter(match => match.date.slice(5, -3) === '01');
  const feb = playerMatches.filter(match => match.date.slice(5, -3) === '02');
  const mar = playerMatches.filter(match => match.date.slice(5, -3) === '03');
  const apr = playerMatches.filter(match => match.date.slice(5, -3) === '04');
  const may = playerMatches.filter(match => match.date.slice(5, -3) === '05');
  const jun = playerMatches.filter(match => match.date.slice(5, -3) === '06');

  const monthStats = array => array.map(match => {
    const stats = match.matchPlayers.filter(pl => pl.id === player.id);
    return stats[0];
  });

  const apps = array => monthStats(array).length;
  const goals = array => monthStats(array)
    .map(match => +match.matchGoals)
    .reduce((a, b) => a + b, 0);
  const assists = array => monthStats(array)
    .map(match => +match.matchAssists)
    .reduce((a, b) => a + b, 0);
  const data = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Apps',
        borderColor: '#2ECC71',
        borderWidth: 3,
        data: [
          apps(sep),
          apps(oct),
          apps(nov),
          apps(dec),
          apps(jan),
          apps(feb),
          apps(mar),
          apps(apr),
          apps(may),
          apps(jun),
        ],
      },
      {
        label: 'Goals',
        borderColor: '#3498DB',
        borderWidth: 1,
        data: [
          goals(sep),
          goals(oct),
          goals(nov),
          goals(dec),
          goals(jan),
          goals(feb),
          goals(mar),
          goals(apr),
          goals(may),
          goals(jun),
        ],
      },
      {
        label: 'Assists',
        borderColor: '#A569BD',
        borderWidth: 1,
        data: [
          assists(sep),
          assists(oct),
          assists(nov),
          assists(dec),
          assists(jan),
          assists(feb),
          assists(mar),
          assists(apr),
          assists(may),
          assists(jun),
        ],
      },
    ],
  };
  return (
    <BoxContainer>
      <StatsHeader title="By Month" />
      <Line
        data={data}
        legend={{ display: true }}
        height={250}
        options={{
          // maintainAspectRatio: false,
          scales: { yAxes: [{ ticks: { beginAtZero: true, stepSize: 1 } }] },
        }}
      />
    </BoxContainer>
  );
};

StatsGraph.propTypes = {
  player: PropTypes.shape({}).isRequired,
  playerMatches: PropTypes.instanceOf(Array).isRequired,
};

export default StatsGraph;
