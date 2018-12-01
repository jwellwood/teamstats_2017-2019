import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// Components
import ProgressCircle from '../ProgressCircle';

// Styling
const styles = theme => ({
  progress: { margin: theme.spacing.unit },
  avatar: {
    margin: 'auto',
    marginBottom: 5,
    backgroundColor: '#222',
    color: 'rgba(255, 160, 0)',
  },
  numberToGo: { color: theme.palette.primary.main },
});

// Component
const Targets = props => {
  const { classes, player } = props;

  let percentageApps = (player.apps * 100) / player.targetApps;
  let percentageGoals = (player.goals * 100) / player.targetGoals;
  let percentageAssists = (player.assists * 100) / player.targetAssists;
  if (player.targetApps === 0 || player.targetGoals === 0 || player.targetAssists === 0) {
    percentageApps = '0';
    percentageGoals = '0';
    percentageAssists = '0';
  }

  // Data to map
  let id = 0;
  const createData = (title, toGo, percentage, name, text, target) => {
    id += 1;
    return { id, title, toGo, percentage, name, text, target };
  };
  const listItems = [
    createData(
      'Apps',
      player.targetApps - player.apps,
      percentageApps,
      player.name,
      `made ${player.apps} appearances `,
      player.targetApps,
    ),
    createData(
      'Goals',
      player.targetGoals - player.goals,
      percentageGoals,
      player.name,
      `scored ${player.goals} goals `,
      player.targetGoals,
    ),
    createData(
      'Assists',
      player.targetAssists - player.assists,
      percentageAssists,
      player.name,
      `provided ${player.assists} assists `,
      player.targetAssists,
    ),
  ];
  const completedMessage = (
    <Avatar className={classes.avatar}>
      <i className="fas fa-trophy" />
    </Avatar>
  );

  return (
    <Grid container direction="row" justify="center" alignContent="center">
      {listItems.map(item => (
        <Grid item xs={6} sm={3} className={classes.progress} key={item.id}>
          <h3>{item.title}</h3>
          {item.toGo > 0 ? (
            <Typography variant="body1" gutterBottom>
              <strong className={classes.numberToGo}>{item.toGo}</strong> to go!
            </Typography>
          ) : (
            completedMessage
          )}
          <ProgressCircle percentageCompleted={item.percentage} />
          <Typography variant="caption" gutterBottom>
            <strong>{item.name}</strong> has {item.text}
            out of a target total of {item.target}
            <hr />
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

Targets.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Targets);
