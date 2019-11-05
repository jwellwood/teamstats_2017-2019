import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Paper from '@material-ui/core/Paper';
// Components
import TableWrapper from '../../../../layout/Table';
// Data
import columns from './Data';
import IconFA from '../../../../../assets/icons/IconFA';

const MatchStats = props => {
  const { result } = props;

  let data = [{ name: 'No players', goals: '-', assists: '-', mvp: '-' }];
  if (result.matchPlayers.length !== 0) {
    data = result.matchPlayers.map(player => ({
      name: player.name,
      goals: player.matchGoals,
      assists: player.matchAssists,
      mvp: player.matchMvp ? (
        <IconFA icon={['fas', 'star']} color='#F4D03F' />
      ) : null,
    }));
  }

  return (
    <Paper style={{ background: '#333', padding: '2px' }}>
      <TableWrapper data={data} columns={columns} />
    </Paper>
  );
};

MatchStats.propTypes = { result: PropTypes.shape({}).isRequired };

export default MatchStats;
