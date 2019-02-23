import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ValueBox from '../../../../layout/Stats/ValueBox';

const PerGame = props => {
  const { goalsPerGame, againstPerGame, differencePerGame, pointsPerGame } = props;

  const goalDifference = differencePerGame > 0 ? `+${differencePerGame}` : `-${differencePerGame}`;
  let id = 0;
  const createData = (description, value) => {
    id += 1;
    return { id, description, value };
  };

  const goalsData = [
    createData('Goals / game', goalsPerGame),
    createData('Conceded / game', againstPerGame),
    createData('Goal Difference / game', goalDifference),
    createData('Points / game', pointsPerGame),
  ];

  return (
    <div>
      {goalsData.map(item => (
        <div key={item.id}>
          <List dense>
            <ListItem>
              <ListItemText>
                <Typography
                  style={{
                    textAlign: 'left',
                    textTransform: 'uppercase',
                    color: '#333',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {item.description}
                </Typography>
              </ListItemText>

              <ValueBox>{item.value}</ValueBox>
            </ListItem>
          </List>
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
  differencePerGame: PropTypes.string.isRequired,
};

export default PerGame;
