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
// Assets
import { positionColor, colors } from '../../../../../assets/styles/colors';

// Components
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import ValueBox from '../../../../layout/Stats/ValueBox';
import BoxContainer from '../../../../layout/hoc/BoxContainer';

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
  const { classes, player, playerImage } = props;

  const displayBalance = (
    <span style={player.balance > 0 ? { color: colors.lose } : { color: colors.win }}>
      €{parseFloat(player.balance).toFixed(2)}
    </span>
  );
  let id = 0;
  const createData = (title, value, textColor) => {
    id += 1;
    return { id, title, value, textColor };
  };

  const listItems = [
    createData('Number', player.number, ''),
    createData('Position', player.position, positionColor(player.position)),

    createData('Balance', displayBalance, ''),
  ];

  return (
    <BoxContainer>
      <StatsHeader title="Details" />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={4}>
          <Avatar alt="Player avatar" src={playerImage} className={classes.bigAvatar} />
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
                <ValueBox textColor={item.textColor}>{item.value}</ValueBox>
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
  playerImage: PropTypes.string.isRequired,
};

export default withStyles(styles)(PlayerOverview);
