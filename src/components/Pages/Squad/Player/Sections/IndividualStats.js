import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// helpers
import { Paper } from '@material-ui/core';
import { colors } from '../../../../../assets/styles/colors';
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import BoxContainer from '../../../../hoc/BoxContainer';
import ValueBox from '../../../../layout/Stats/ValueBox';

const IndividualStats = props => {
  const { player, totalTeamGoals } = props;
  const { apps, goals, assists, mvp, balance } = player;
  const goalsPG = (goals / apps).toFixed(2);
  const assistsPG = (assists / apps).toFixed(2);
  const mvpPG = (mvp / apps).toFixed(2);
  let goalContribution = ((player.goals + player.assists) * 100) / totalTeamGoals;
  if (totalTeamGoals === 0) {
    goalContribution = 0;
  }
  const overallContribution = (
    <span>
      {goalContribution.toFixed(1)}
      <span style={{ color: '#ccc', fontSize: '9px' }}>%</span>
    </span>
  );
  const displayBalance = (
    <span style={balance > 0 ? { color: colors.lose } : { color: colors.win }}>
      €{parseFloat(balance).toFixed(2)}
    </span>
  );

  let id = 0;
  const createData = (description, value, color) => {
    id += 1;
    return { id, description, value, color };
  };

  const listItems = [
    createData('Goals / game', goalsPG),
    createData('Assists / game', assistsPG),
    createData('MVP Total', mvp),
    createData('MVP / game', mvpPG),
    createData('Goal involvement', overallContribution),
    createData('Balance', displayBalance),
  ];

  return (
    <BoxContainer>
      <StatsHeader title="Stats" />
      <div>
        {listItems.map(item => (
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
    </BoxContainer>
  );
};

IndividualStats.propTypes = {
  player: PropTypes.shape({}).isRequired,
  totalTeamGoals: PropTypes.number.isRequired,
};

export default IndividualStats;
