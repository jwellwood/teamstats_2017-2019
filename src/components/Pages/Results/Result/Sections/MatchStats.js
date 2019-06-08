import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// MUI
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// Helpers
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '../../../../layout/hoc/Container';
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import { columns } from './Stats';
import AddMatchPlayers from '../../Forms/AddMatchPlayers';

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
class MatchStats extends Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, result } = this.props;
    const { open } = this.state;
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
        goals: player.matchGoals,
        assists: player.matchAssists,
        mvp: player.matchMvp,
      }));
    }

    return (
      <Container>
        <StatsHeader title="Match Stats" />

        <Paper style={{ background: '#333', padding: '2px' }}>
          <div>
            <Button
              variant="text"
              className={classes.button}
              color="secondary"
              onClick={this.handleClickOpen}
            >
              Add
            </Button>
            <Dialog
              fullScreen
              open={open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add Player Stats</DialogTitle>
              <DialogContent>
                <AddMatchPlayers result={result} />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Done
                </Button>
              </DialogActions>
            </Dialog>
          </div>
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
  }
}

MatchStats.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(MatchStats);
