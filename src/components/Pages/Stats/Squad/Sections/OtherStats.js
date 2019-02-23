import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// Components
import ValueBox from '../../../../layout/Stats/ValueBox';
import Positions from './Positions';
// functions
import { getTotalTeamApps } from '../../../../../functions/Players/functions';

const OtherStats = props => {
  const { players, results } = props;
  const totalPlayers = players.length;
  const filteredResults = results.filter(res => !res.forfeitedMatch);
  const totalMatches = filteredResults.length;
  const playersPerMatch = (getTotalTeamApps(players) / totalMatches).toFixed(2);
  const totalTeamOwed = players.reduce(
    (totalOwed, player) => totalOwed + parseFloat(player.balance.toString()),
    0,
  );
  const totalOwed = (
    <span style={totalTeamOwed > 0 ? { color: '#E74C3C' } : { color: '#28B463' }}>
      €{parseFloat(totalTeamOwed).toFixed(2)}
    </span>
  );

  const totalPlayerGoals = players.reduce((totalGoals, player) => totalGoals + player.goals, 0);
  const totalPlayerAssists = players.reduce(
    (totalAssists, player) => totalAssists + player.assists,
    0,
  );
  const getGoals = (a, b) => a + b;

  const totalTeamGoals = filteredResults.map(res => +res.teamScore);
  const teamGoals = totalTeamGoals.reduce(getGoals, 0);

  const ownGoalsFor = teamGoals - totalPlayerGoals;

  let id = 0;
  const createData = (description, value) => {
    id += 1;
    return { id, description, value };
  };

  const goalsData = [
    createData('Total Players', totalPlayers),
    createData('Players / Match', playersPerMatch),
    createData('Goals', totalPlayerGoals),
    createData('Assists', totalPlayerAssists),
    createData('Own Goals (for)', ownGoalsFor),
    createData('Total Owed', totalOwed),
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
      <Positions players={players} />
    </div>
  );
};

OtherStats.propTypes = {
  players: PropTypes.instanceOf(Array).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

export default OtherStats;
