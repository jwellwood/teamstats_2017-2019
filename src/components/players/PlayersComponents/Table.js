import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
// Components
import Spinner from '../../layout/Spinner';

// styling
const styles = theme => ({
  chip: {
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: 15,
    width: '100%',
    cursor: 'pointer',
  },
  avatar: { border: '1px solid', borderColor: theme.palette.secondary.main },
  numAvatar: {
    width: 30,
    height: 30,
    color: '#fafafa',
    fontSize: 12,
    fontWeight: 'bold',
    background: theme.palette.primary.light,
  },
  table: { marginBottom: '20px' },
  button: { margin: theme.spacing.unit },
  rightIcon: { marginLeft: theme.spacing.unit },
});

// columns
const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    minWidth: 150,
    resizable: false,
  },
  {
    Header: 'Apps',
    accessor: 'apps',
    width: 75,
    resizable: false,
  },
  {
    Header: 'Goals',
    accessor: 'goals',
    width: 75,
    resizable: false,
  },
  {
    Header: 'Assists',
    accessor: 'assists',
    width: 75,
    resizable: false,
  },
  {
    Header: 'MVP',
    accessor: 'mvp',
    width: 75,
    resizable: false,
  },
  {
    Header: '%',
    accessor: 'inv',
    width: 75,
    resizable: false,
    style: { backgroundColor: '#222', color: 'white' },
  },
  {
    Header: '€',
    accessor: 'balance',
    width: 75,
    resizable: false,
  },
];

// Component
const Table = props => {
  const { classes, players, totalGoals } = props;
  if (players) {
    const playerDataArray = players.map(player => ({
      id: player.id,
      name: (
        <Chip
          avatar={<Avatar className={classes.numAvatar}>{player.number}</Avatar>}
          label={player.name}
          component={Link}
          to={`/players/${player.id}`}
          className={classes.chip}
          color="secondary"
        />
      ),
      number: player.number,
      targetApps: <div>{player.targetApps}</div>,
      targetGoals: <div>{player.targetGoals}</div>,
      targetAssists: <div>{player.targetAssists}</div>,
      apps: <div>{player.apps}</div>,
      goals: <div>{player.goals}</div>,
      assists: <div>{player.assists}</div>,
      mvp: <div>{player.mvp}</div>,
      inv: <div>{(((player.goals + player.assists) / totalGoals) * 100).toFixed(1)}</div>,
      balance: (
        <div style={player.balance > 0 ? { color: '#E74C3C' } : { color: '#28B463' }}>
          €{parseFloat(player.balance).toFixed(0)}
        </div>
      ),
    }));

    return (
      <Grid item>
        <Button
          component={Link}
          to="/players/addPlayer"
          variant="contained"
          className={classes.button}
          size="small"
          color="default"
        >
          Add Player <Icon className={classes.rightIcon}>add</Icon>
        </Button>
        <ReactTable
          className={classes.table}
          data={playerDataArray}
          columns={columns}
          minRows={1}
          showPagination={false}
          loading={players.length === 0}
          getTdProps={() => ({
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            },
          })}
          getTheadProps={() => ({
            style: {
              background: '#d32f2f',
              color: '#fafafa',
              padding: '5px 0px 5px 0px',
            },
          })}
          getNoDataProps={() => ({
            style: {
              background: '#ff9800',
              color: '#9a0007',
            },
          })}
          manual
          sortable={false}
        />
      </Grid>
    );
  }
  return <Spinner />;
};

Table.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  players: PropTypes.instanceOf(Array),
  totalGoals: PropTypes.number.isRequired,
};

Table.defaultProps = { players: [] };

export default withStyles(styles)(Table);
