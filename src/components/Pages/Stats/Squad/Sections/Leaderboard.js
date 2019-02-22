import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
// Components
import TopStatItem from '../../../../layout/Stats/TopStatItem';
import NumberAvatar from '../../../../layout/Stats/NumberAvatar';
import Spinner from '../../../../layout/Warnings/Spinner';
// Helpers
import {
  getMostApps,
  getMostGoals,
  getMostAssists,
  getMostMVP,
  getBestGoalPerGame,
  getBestAssistPerGame,
} from '../../functions/playerCalcs';
import Disclaimer from '../../../../layout/Warnings/Disclaimer';

const Leaderboard = props => {
  const { players } = props;

  const mostApps = getMostApps(players).name.map(name => <TopStatItem key={name} data={name} />);
  const mostGoals = getMostGoals(players).name.map(name => <TopStatItem key={name} data={name} />);
  const mostAssists = getMostAssists(players).name.map(name => (
    <TopStatItem key={name} data={name} />
  ));
  const mostMVP = getMostMVP(players).name.map(name => <TopStatItem key={name} data={name} />);
  const mostGoalsPerMatch = getBestGoalPerGame(players).name.map(name => (
    <TopStatItem key={name} data={name} />
  ));
  const mostAssistsPerMatch = getBestAssistPerGame(players).name.map(name => (
    <TopStatItem key={name} data={name} />
  ));

  let id = 0;
  const createData = (description, name, value) => {
    id += 1;
    return { id, description, name, value };
  };

  const leaderboard = [
    createData('Most Appearances', mostApps, getMostApps(players).value),
    createData('Top Scorer', mostGoals, getMostGoals(players).value),
    createData('Most Assists', mostAssists, getMostAssists(players).value),
    createData('Most MVP Awards', mostMVP, getMostMVP(players).value),
    createData(
      'Best Goals / Match*',
      mostGoalsPerMatch,
      getBestGoalPerGame(players).value.toFixed(1),
    ),
    createData(
      'Best Assists / Match*',
      mostAssistsPerMatch,
      getBestAssistPerGame(players).value.toFixed(1),
    ),
  ];

  return (
    <div>
      {leaderboard.map(leader => (
        <Grid item xs={12} key={leader.id}>
          <List dense>
            <ListItem>
              <ListItemText
                primary={<span style={{ textTransform: 'uppercase' }}>{leader.description}</span>}
                secondary={
                  <span style={{ color: '#58D68D' }}>{leader.value > 0 ? leader.name : null}</span>
                }
              />
              <ListItemAvatar>
                <NumberAvatar>
                  {leader.value === -Infinity || leader.value === '-Infinity' ? (
                    <Spinner />
                  ) : (
                    leader.value
                  )}
                </NumberAvatar>
              </ListItemAvatar>
            </ListItem>
            <Divider />
          </List>
        </Grid>
      ))}
      <Disclaimer message="*Players must have played more than one match" />
    </div>
  );
};

Leaderboard.propTypes = { players: PropTypes.instanceOf(Array).isRequired };

export default Leaderboard;
