import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// Components
import BoxContainer from '../../../layout/hoc/BoxContainer';
import BoxLinks from '../../../layout/Navs/BoxLinks';
// Data
import columns from './Data';
// styles

const styles = theme => ({
  tableHeader: {
    backgroundColor: '#333',
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '12px',
  },
});

const ResultsTotals = props => {
  const { classes, auth, results } = props;
  const getGoals = arr => arr.reduce((a, b) => a + b, 0);
  const goalsForArray = results.map(result => +result.teamScore);
  const goalsAgainstArray = results.map(result => +result.opponentScore);
  const goalsFor = getGoals(goalsForArray);
  const goalsAgainst = getGoals(goalsAgainstArray);
  const difference = goalsFor - goalsAgainst;
  const played = results.length;
  const wins = results.filter(res => (+res.teamScore > +res.opponentScore ? res : null));
  const draws = results.filter(res => (+res.teamScore === +res.opponentScore ? res : null));
  const loss = results.filter(res => (+res.teamScore < +res.opponentScore ? res : null));
  const winPoints = wins.filter(result => result.matchType === 'League').length;
  const drawPoints = draws.filter(result => result.matchType === 'League').length;
  const points = winPoints * 3 + drawPoints;

  const data = [
    {
      played,
      wins: wins.length,
      draws: draws.length,
      loss: loss.length,
      goalsFor,
      goalsAgainst,
      difference,
      points,
    },
  ];

  return (
    <BoxContainer>
      <Paper style={{ padding: '10px', background: '#222', textAlign: 'center' }}>
        <Grid container justify="center" style={{ margin: '10px auto' }}>
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
        </Grid>
        <BoxLinks auth={auth} link="/results/addresult" />
      </Paper>
    </BoxContainer>
  );
};

ResultsTotals.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  auth: PropTypes.bool.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

export default withStyles(styles)(ResultsTotals);
