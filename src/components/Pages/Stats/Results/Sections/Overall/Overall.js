import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Components
import PerGame from './PerGame';
import SwitchButton from '../../../../../layout/ui/SwitchButton';
import Percentages from './Percentages';
// Helpers
import { colors } from '../../../../../../assets/styles/colors';

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
  const { matchTotals, checked, handleChange, value } = props;
  const {
    totalMatches,
    totalWins,
    totalDraws,
    totalLosses,
    totalGoalsFor,
    totalGoalsAgainst,
  } = matchTotals;
  const goalDiff = totalGoalsFor - totalGoalsAgainst;
  const goalsPerGame = (totalGoalsFor / totalMatches).toFixed(2);
  const againstPerGame = (totalGoalsAgainst / totalMatches).toFixed(2);
  const differencePerGame = (goalDiff / totalMatches).toFixed(2);
  const pointsPerGame = ((totalWins * 3 + totalDraws) / totalMatches).toFixed(2);

  const tableItems = [
    createData('Pl', totalMatches),
    createData('W', totalWins),
    createData('D', totalDraws),
    createData('L', totalLosses),
    createData('GF', totalGoalsFor),
    createData('GA', totalGoalsAgainst),
    createData('+/-', goalDiff, goalDiff > 0 ? colors.win : colors.lose),
  ];

  return (
    <div>
      <SwitchButton
        checked={checked}
        handleChange={handleChange}
        value={value}
        label="Include forfeits"
      />
      <Paper style={{ marginBottom: '10px' }}>
        <Grid container direction="row" justify="space-evenly" alignItems="center">
          {tableItems.map(item => (
            <Grid item key={item.id}>
              <Grid container direction="column" justify="flex-start" alignContent="flex-start">
                <Typography variant="subtitle1" style={{ opacity: '0.5' }}>
                  {item.header}
                </Typography>
                <Typography style={{ fontWeight: 'bold', color: item.color, fontSize: '12px' }}>
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
        differencePerGame={differencePerGame}
        pointsPerGame={pointsPerGame}
      />
      <Percentages matchTotals={matchTotals} />
    </div>
  );
};

Overall.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  matchTotals: PropTypes.shape({}).isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Overall);
