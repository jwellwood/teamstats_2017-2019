import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// Components
import BoxContainer from '../../../layout/hoc/BoxContainer';
import BoxLinks from '../../../layout/Navs/BoxLinks';
// Data
import columns from './Data';
// styles
import { colors } from '../../../../assets/styles/colors';
import TableWrapper from '../../../layout/Table';

const ResultsTotals = props => {
  const { auth, results } = props;
  const getGoals = arr => arr.reduce((a, b) => a + b, 0);
  const goalsForArray = results.map(result => +result.teamScore);
  const goalsAgainstArray = results.map(result => +result.opponentScore);
  const goalsFor = getGoals(goalsForArray);
  const goalsAgainst = getGoals(goalsAgainstArray);
  const difference = (
    <span style={{ color: goalsFor - goalsAgainst > 0 ? colors.win : colors.lose }}>
      {goalsFor - goalsAgainst}
    </span>
  );
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
          <TableWrapper data={data} columns={columns} />
        </Grid>
        <BoxLinks auth={auth} link="/results/addresult">
          <Button
            fullWidth
            component={Link}
            to="/stats"
            variant="contained"
            color="primary"
            aria-label="View Stats"
            size="small"
          >
            Stats
          </Button>
        </BoxLinks>
      </Paper>
    </BoxContainer>
  );
};

ResultsTotals.propTypes = {
  auth: PropTypes.bool.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

export default ResultsTotals;
