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
import StatsHeader from '../../../../layout/Stats/StatsHeader';
// Helpers
import { colors } from '../../../../../assets/styles/colors';
import { getMax, getMin } from '../../functions/helpers';
import {
  getMostGoalsScored,
  getMostGoalsConceded,
  getFewestGoalsScored,
  getCleanSheets,
  getGoalsFor,
  getGoalsAgainst,
} from '../../functions/goalCalcs';

const GoalStats = props => {
  const { homeResults, awayResults } = props;

  // Calc goals home and away
  const goalsForArray = getGoalsFor(homeResults, awayResults);
  const goalsAgainstArray = getGoalsAgainst(homeResults, awayResults);
  // Most scored in one game
  const mostScored = getMax(goalsForArray);
  const mostScoredVs = getMostGoalsScored(homeResults, awayResults, mostScored);
  const mostScoredAgainst = mostScoredVs.map(name => <TopStatItem key={name} data={name} />);
  // Most conceded in one game
  const mostConceded = getMax(goalsAgainstArray);
  const mostConcededVs = getMostGoalsConceded(homeResults, awayResults, mostConceded);
  const mostConcededAgainst = mostConcededVs.map(name => <TopStatItem key={name} data={name} />);
  // Fewest scored in one game
  const fewestScored = getMin(goalsForArray);
  const fewestScoredVs = getFewestGoalsScored(homeResults, awayResults, fewestScored);
  const fewestScoredAgainst = fewestScoredVs.map(name => <TopStatItem key={name} data={name} />);
  // Clean sheets
  const cleanSheets = goalsAgainstArray.filter(result => result === 0).length;
  const cleanSheetVs = getCleanSheets(homeResults, awayResults);
  const cleanSheetsAgainst = cleanSheetVs.map(name => <TopStatItem key={name} data={name} />);

  let id = 0;
  const createData = (description, name, value, color) => {
    id += 1;
    return { id, description, name, value, color };
  };

  const goalsData = [
    createData('Most scored', mostScoredAgainst, mostScored, colors.win),
    createData('Fewest scored ', fewestScoredAgainst, fewestScored, colors.draw),
    createData('Most conceded', mostConcededAgainst, mostConceded, colors.lose),
    createData('Clean sheets', cleanSheetsAgainst, cleanSheets, colors.win),
  ];

  return (
    <div>
      <StatsHeader title="Game stats" />
      {goalsData.map(stat => (
        <Grid item xs={12} key={stat.id}>
          <List dense>
            <ListItem>
              <ListItemText
                primary={<span style={{ textTransform: 'uppercase' }}>{stat.description}</span>}
                secondary={<span style={{ color: stat.color }}>{stat.name}</span>}
              />
              <ListItemAvatar>
                <NumberAvatar>{stat.value}</NumberAvatar>
              </ListItemAvatar>
            </ListItem>
            <Divider />
          </List>
        </Grid>
      ))}
    </div>
  );
};

GoalStats.propTypes = {
  homeResults: PropTypes.instanceOf(Array).isRequired,
  awayResults: PropTypes.instanceOf(Array).isRequired,
};

export default GoalStats;
