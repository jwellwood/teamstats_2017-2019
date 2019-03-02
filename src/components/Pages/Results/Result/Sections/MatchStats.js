import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// MUI
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import StatsHeader from '../../../../layout/Stats/StatsHeader';
// Helpers
import Container from '../../../../hoc/Container';

const styles = theme => ({
  details: { padding: '1px 10px' },
  number: { fontWeight: 'bold', paddingRight: '10px' },
  button: { fontSize: '12px' },
  scoreBox: { background: theme.palette.secondary.main },
  tableHeader: {
    backgroundColor: theme.palette.secondary.main,
    color: '#222',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '12px',
  },
});
const MatchStats = props => {
  const { classes, result } = props;

  let data = [
    { name: 'Player Name 1', goals: 0, assists: 0, mvp: 0 },
    { name: 'Player Name 2', goals: 0, assists: 0, mvp: 0 },
    { name: 'Player Name 3', goals: 0, assists: 0, mvp: 0 },
    { name: 'Player Name 4', goals: 0, assists: 0, mvp: 0 },
    { name: 'Player Name 5', goals: 0, assists: 0, mvp: 0 },
    { name: 'Player Name 6', goals: 0, assists: 0, mvp: 0 },
    { name: 'Player Name 7', goals: 0, assists: 0, mvp: 0 },
  ];
  if (result.matchPlayers) {
    data = result.matchPlayers.map(player => ({
      name: player.name,
      goals: player.goals,
      assists: player.assists,
      mvp: player.mvp,
    }));
  }

  const columns = [
    {
      Header: '',
      accessor: 'name',
      style: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: '12px',
        textTransform: 'uppercase',
        background: '#fff',
      },
      sortable: false,
      resizable: false,
    },
    {
      Header: 'Goals',
      accessor: 'goals',
      width: 60,
      style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
      sortable: false,
      resizable: false,
    },
    {
      Header: 'Assists',
      accessor: 'assists',
      width: 60,
      style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
      sortable: false,
      resizable: false,
    },
    {
      Header: 'MVP',
      accessor: 'mvp',
      width: 60,
      style: { backgroundColor: '#333', color: '#fff', fontWeight: 'bold' },
      sortable: false,
      resizable: false,
    },
  ];
  return (
    <Container>
      <StatsHeader title="Match Stats" />

      <Paper style={{ background: '#333', padding: '2px' }}>
        <Button
          component={Link}
          to={`/results/${result.id}/add_details`}
          color="secondary"
          className={classes.button}
        >
          add
        </Button>
        <div>
          <ReactTable
            data={data}
            columns={columns}
            showPagination={false}
            minRows={1}
            className="-striped"
            getTheadThProps={() => ({ className: classes.tableHeader })}
            // getTheadGroupThProps={() => ({
            //   style: {
            //     backgroundColor: '#333',
            //     color: '#fff',
            //     textTransform: 'uppercase',
            //     fontWeight: 'bold',
            //     textAlign: 'left',
            //   },
            // })}
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
        <Button
          component={Link}
          to={`/results/${result.id}/edit`}
          color="secondary"
          className={classes.button}
        >
          edit
        </Button>
      </Paper>
    </Container>
  );
};

MatchStats.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(MatchStats);
