import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
// Components
import TopStatItem from '../../../layout/Stats/TopStatItem';
// Helpers
import { colors } from '../../../../assets/styles/colors';
import { getAverage, getMax, getMin } from '../../../../helpers/calcs';
import {
  getMostGoalsScored,
  getMostGoalsConceded,
  getFewestGoalsScored,
  getCleanSheets,
  getGoalsFor,
  getGoalsAgainst,
} from './goalCalcs';

const styles = theme => ({ number: { background: theme.palette.primary.dark, fontSize: '13px', fontWeight: 'bold' } });

const GoalStats = props => {
  const { classes, results, goalTotals } = props;

  // General stats
  const totalMatches = results.length;
  const goalsFor = goalTotals.totalGoalsFor;
  const goalsAgainst = goalTotals.totalGoalsAgainst;
  const goalsForAverage = getAverage(goalsFor, totalMatches);
  const goalAgainstAverage = getAverage(goalsAgainst, totalMatches);
  // Home and away
  const homeResults = results.filter(result => result.homeTeamName === 'Madrid Reds');
  const awayResults = results.filter(result => result.awayTeamName === 'Madrid Reds');
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
  const cleanSheets = goalsAgainstArray.filter(result => result === '0').length;
  const cleanSheetVs = getCleanSheets(homeResults, awayResults);
  const cleanSheetsAgainst = cleanSheetVs.map(name => <TopStatItem key={name} data={name} />);

  let id = 0;
  const createData = (description, name, value, color) => {
    id += 1;
    return { id, description, name, value, color };
  };

  const goalsData = [
    createData('Goals per game', '', goalsForAverage),
    createData('Conceded per game', '', goalAgainstAverage),
    createData('Most Goals in one game', mostScoredAgainst, mostScored, colors.win),
    createData('Fewest scored in one game', fewestScoredAgainst, fewestScored, colors.draw),
    createData('Most conceded in one game', mostConcededAgainst, mostConceded, colors.lose),
    createData('Clean sheets', cleanSheetsAgainst, cleanSheets, colors.win),
  ];

  return (
    <div>
      {goalsData.map(stat => (
        <Grid item xs={12} key={stat.id}>
          <List dense>
            <ListItem>
              <ListItemText
                primary={<span style={{ textTransform: 'uppercase' }}>{stat.description}</span>}
                secondary={<span style={{ color: stat.color }}>{stat.name}</span>}
              />
              <ListItemAvatar>
                <Avatar className={classes.number}>{stat.value}</Avatar>
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
  classes: PropTypes.shape({}).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  goalTotals: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(GoalStats);
