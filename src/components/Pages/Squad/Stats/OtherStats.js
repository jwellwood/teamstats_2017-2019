import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Typography from '@material-ui/core/Typography';
// Components
import StatsHeader from '../../../layout/Stats/StatsHeader';
import TableWrapper from '../../../layout/Table';
// Data
import columns from './Data';

const OtherStats = props => {
  const { playerStats, results } = props;
  const totalMatches = results.length;
  const totalPlayerApps = playerStats.map(p => p.apps).reduce((a, b) => a + b, 0);
  const playersPerGame = (totalPlayerApps / totalMatches).toFixed(2);
  const totalGoals = results.map(r => +r.teamScore).reduce((a, b) => +a + +b, 0);
  const totalPlayerGoals = playerStats.map(p => p.goals).reduce((a, b) => a + b, 0);
  const totalPlayerAssists = playerStats.map(p => p.assists).reduce((a, b) => a + b, 0);
  const totalPlayerMvp = playerStats.map(p => p.mvp).reduce((a, b) => a + b, 0);
  const ownGoalsFor = totalGoals - totalPlayerGoals;
  let id = 0;
  const createData = (description, value) => {
    id += 1;
    return { id, description, value };
  };

  const listItems = [
    createData('Matches played', totalMatches),
    createData('Players per game', playersPerGame),
    createData('Goals', totalPlayerGoals),
    createData('Assists', totalPlayerAssists),
    createData('MVPs awarded', totalPlayerMvp),
    createData('Own goals (for)', ownGoalsFor),
  ];

  const data = listItems.map(item => ({
    description: (
      <Typography variant="caption" style={{ color: '#eee' }}>
        {item.description}
      </Typography>
    ),
    value: (
      <Typography color="secondary" style={{ textAlign: 'center', fontWeight: 'bold' }}>
        {item.value} <span style={{ color: '#ccc', fontSize: '9px' }}>{item.tag}</span>
      </Typography>
    ),
  }));

  const TheadComponent = () => null;
  return (
    <div>
      <StatsHeader title="Other Stats" />
      <TableWrapper data={data} columns={columns} noHeader={TheadComponent} />
    </div>
  );
};

OtherStats.propTypes = {
  playerStats: PropTypes.instanceOf(Array).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

export default OtherStats;
