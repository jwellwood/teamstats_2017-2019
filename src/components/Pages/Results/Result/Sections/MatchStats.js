import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// Components
// Data
import columns from './Data';

const styles = theme => ({
  tableHeader: {
    backgroundColor: '#333',
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '12px',
  },
});
const MatchStats = props => {
  const { classes, result } = props;

  let data = [{ name: 'No players', goals: '-', assists: '-', mvp: '-' }];
  if (result.matchPlayers.length !== 0) {
    data = result.matchPlayers.map(player => ({
      name: player.name,
      goals: player.matchGoals,
      assists: player.matchAssists,
      mvp: player.matchMvp ? <i className="fas fa-star" style={{ color: '#F4D03F' }} /> : null,
    }));
  }

  return (
    <Paper style={{ background: '#333', padding: '2px' }}>
      <div>
        <ReactTable
          data={data}
          columns={columns}
          showPagination={false}
          minRows={1}
          className="-striped"
          getTheadThProps={() => ({ className: classes.tableHeader })}
          getTdProps={() => ({
            style: {
              fontSize: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            },
          })}
        />
      </div>
    </Paper>
  );
};

MatchStats.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(MatchStats);
