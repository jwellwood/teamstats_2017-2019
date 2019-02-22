import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// helpers
import { colors } from '../../../../../assets/styles/colors';

const PerGame = props => {
  const { goalsPerGame, againstPerGame, differencePerGame, pointsPerGame } = props;

  let id = 0;
  const createData = (description, value, color) => {
    id += 1;
    return { id, description, value, color };
  };

  const goalsData = [
    createData('Goals / game', goalsPerGame),
    createData('Conceded / game', againstPerGame),
    createData(
      'Goal Difference / game',
      differencePerGame > 0 ? `+${differencePerGame}` : differencePerGame,
    ),
    createData('Points / game', pointsPerGame, pointsPerGame > 1.66 ? colors.win : colors.lose),
  ];

  return (
    <div style={{ margin: '15px' }}>
      {goalsData.map(item => (
        <div key={item.id}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Typography style={{ textTransform: 'uppercase', fontSize: '11px' }}>
              {item.description}
            </Typography>
            <div style={{ fontWeight: 'bold', color: item.color }}>{item.value}</div>
          </Grid>
          <Divider />
        </div>
      ))}
    </div>
  );
};

PerGame.propTypes = {
  goalsPerGame: PropTypes.string.isRequired,
  againstPerGame: PropTypes.string.isRequired,
  pointsPerGame: PropTypes.string.isRequired,
};

export default PerGame;
