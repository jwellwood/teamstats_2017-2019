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
// Assets

// Components
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import { positions } from '../../../../../assets/styles/colors';
import BoxContainer from '../../../../hoc/BoxContainer';

const styles = theme => ({
  bigAvatar: {
    border: '3px solid',
    borderColor: theme.palette.primary.dark,
    margin: '10px auto',
    width: 80,
    height: 80,
  },
  details: { padding: '1px 10px' },
  number: { fontWeight: 'bold' },
});

const PlayerOverview = props => {
  const { classes, player, totalMatches, image } = props;
  let playedPercentage = (player.apps * 100) / totalMatches;
  if (totalMatches === 0) {
    playedPercentage = 0;
  }

  let color = '#fff';
  switch (player.position) {
    case 'GK':
      color = positions.GK;
      break;
    case 'DF':
      color = positions.DF;
      break;
    case 'MF':
      color = positions.MF;
      break;
    case 'FW':
      color = positions.FW;
      break;
    default:
      return color;
  }

  let id = 0;
  const createData = (title, value, textColor) => {
    id += 1;
    return { id, title, value, textColor };
  };

  const listItems = [
    createData('Number', player.number, ''),
    createData('Position', player.position, color),
    createData('Played', `${playedPercentage.toFixed(1)}%`, ''),
  ];

  return (
    <BoxContainer>
      <StatsHeader title="Details" />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={4}>
          <Avatar alt="Player avatar" src={image} className={classes.bigAvatar} />
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
                <Typography className={classes.number} style={{ color: item.textColor }}>
                  {item.value}
                </Typography>
              </ListItemSecondaryAction>
            </List>
          ))}
        </Grid>
      </Grid>
    </BoxContainer>
  );
};

PlayerOverview.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
  totalMatches: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default withStyles(styles)(PlayerOverview);
