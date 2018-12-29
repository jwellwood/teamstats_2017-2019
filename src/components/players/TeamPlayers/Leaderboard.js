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
import Typography from '@material-ui/core/Typography';
// Components
import StatsHeader from '../../layout/Stats/StatsHeader';

const styles = theme => ({
  number: { background: theme.palette.primary.dark },
  disclaimer: {
    color: '#ccc',
    fontSize: '9px',
    margin: '2px 10px',
  },
});

const Leaderboard = props => {
  const { classes, Apps, Goals, Assists, MVP } = props;

  let id = 0;
  const createData = (description, name, value) => {
    id += 1;
    return { id, description, name, value };
  };

  const leaderboard = [
    createData('Most Appearances', Apps.topAppPlayer, Apps.topAppValue),
    createData('Top Scorer', Goals.topGoalPlayer, Goals.topGoalValue),
    createData('Most Assists', Assists.topAssistPlayer, Assists.topAssistValue),
    createData('Most MVP Awards', MVP.topMVPPlayer, MVP.topMVPValue),
    createData(
      'Best Goals / Match*',
      Goals.topGoalsPerMatchPlayer,
      Goals.topGoalsPerMatchValue.toFixed(1),
    ),
    createData(
      'Best Assists / Match*',
      Assists.topAssistsPerMatchPlayer,
      Assists.topAssistsPerMatchValue.toFixed(1),
    ),
  ];

  return (
    <div>
      <StatsHeader title="Leaderboard" />
      {leaderboard.map(leader => (
        <Grid item xs={12} key={leader.id}>
          <List dense>
            <ListItem>
              <ListItemText
                primary={<span style={{ textTransform: 'uppercase' }}>{leader.description}</span>}
                secondary={(
                  <span style={{ color: '#58D68D', fontFamily: 'Righteous', fontWeight: 'bold' }}>
                    {leader.name}
                  </span>
)}
              />
              <ListItemAvatar>
                <Avatar className={classes.number}>{leader.value}</Avatar>
              </ListItemAvatar>
            </ListItem>
            <Divider />
          </List>
        </Grid>
      ))}
      <Typography className={classes.disclaimer}>
        * Players must have played more than one match
      </Typography>
    </div>
  );
};

Leaderboard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  Apps: PropTypes.shape({}).isRequired,
  Goals: PropTypes.shape({}).isRequired,
  Assists: PropTypes.shape({}).isRequired,
  MVP: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Leaderboard);
