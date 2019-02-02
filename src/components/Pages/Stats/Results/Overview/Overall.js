import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import StatsHeader from '../../../../layout/Stats/StatsHeader';
// Components
import PerGame from './PerGame';
import Container from '../../../../hoc/Container';
import { colors } from '../../../../../assets/styles/colors';

const styles = () => ({
  root: { padding: '5px 15px' },
  cell: { padding: '10px', width: '30px' },
});

let id = 0;
function createData(header, data, color) {
  id += 1;
  return { id, header, data, color };
}

const Overall = props => {
  const { classes, matchTotals, goalTotals } = props;
  const { totalPlayed, totalWins, totalDraws, totalLosses } = matchTotals;
  const { totalGoalsFor, totalGoalsAgainst } = goalTotals;
  const goalDiff = totalGoalsFor - totalGoalsAgainst;
  const goalsPerGame = (totalGoalsFor / totalPlayed).toFixed(2);
  const againstPerGame = (totalGoalsAgainst / totalPlayed).toFixed(2);
  const pointsPerGame = ((totalWins * 3 + totalDraws) / totalPlayed).toFixed(2);

  const tableItems = [
    createData('Pl', totalPlayed),
    createData('W', totalWins),
    createData('D', totalDraws),
    createData('L', totalLosses),
    createData('GF', totalGoalsFor),
    createData('GA', totalGoalsAgainst),
    createData('+/-', goalDiff, goalDiff > 0 ? colors.win : colors.lose),
  ];

  return (
    <Container>
      <StatsHeader title="Overview" />
      <div className={classes.root}>
        <Paper>
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            {tableItems.map(item => (
              <Grid item key={item.id}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Typography variant="subtitle1" style={{ opacity: '0.5' }}>
                    {item.header}
                  </Typography>
                  <Typography variant="caption" style={{ fontWeight: 'bold', color: item.color }}>
                    {item.data}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Paper>
        <PerGame
          goalsPerGame={goalsPerGame}
          againstPerGame={againstPerGame}
          pointsPerGame={pointsPerGame}
        />
      </div>
    </Container>
  );
};

Overall.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  matchTotals: PropTypes.shape({}).isRequired,
  goalTotals: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Overall);
