import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
// Components
import StatsHeader from '../../layout/Stats/StatsHeader';

const styles = theme => ({
  bigAvatar: {
    border: '1px solid',
    borderColor: theme.palette.primary.dark,
    margin: '10px auto',
    width: 60,
    height: 60,
  },
  details: { padding: '1px 10px' },
  number: { fontWeight: 'bold' },
});

const PlayerOverview = props => {
  const { classes, player, totalMatches } = props;
  const playedPercentage = (player.apps * 100) / totalMatches;
  let id = 0;
  const createData = (title, value) => {
    id += 1;
    return { id, title, value };
  };

  const listItems = [
    createData('Number', player.number),
    createData('Position', player.position),
    createData('Played %', `${playedPercentage.toFixed(1)}%`),
  ];

  return (
    <div>
      <StatsHeader title="Details" />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={4}>
          <Avatar
            alt="Player avatar"
            src="https://images.vexels.com/media/users/3/129733/isolated/preview/a558682b158debb6d6f49d07d854f99f-casual-male-avatar-silhouette-by-vexels.png"
            className={classes.bigAvatar}
          />
        </Grid>
        <Grid item xs={8} className={classes.details}>
          {listItems.map(item => (
            <List className={classes.list} dense key={item.id}>
              <ListItem>
                <ListItemText
                  primary={<span style={{ textTransform: 'uppercase' }}>{item.title}</span>}
                />
              </ListItem>
              <ListItemSecondaryAction>
                <Typography className={classes.number}>{item.value}</Typography>
              </ListItemSecondaryAction>
            </List>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

PlayerOverview.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
  totalMatches: PropTypes.number.isRequired,
};

export default withStyles(styles)(PlayerOverview);
