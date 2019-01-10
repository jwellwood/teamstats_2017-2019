import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Trophies from './Trophies/Trophies';

// styling
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '400px',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  avatar: { background: theme.palette.primary.dark },
});

// Component
const TeamDetails = props => {
  const { classes, team, trophies } = props;
  const { city, leagueFinish } = team[0];

  // Data to map
  let id = 0;
  function createData(icon, name, text, type) {
    id += 1;
    return { id, icon, name, text, type };
  }

  const listItems = [
    createData(<i className="fas fa-globe-americas" />, city, 'Home city'),
    createData(<i className="fas fa-award" />, leagueFinish, 'Finish last season'),
  ];

  return (
    <Grid item xs={9} md={5}>
      <List className={classes.root}>
        {listItems.map(item => (
          <div key={item.id}>
            <ListItem>
              <Avatar className={classes.avatar}>{item.icon}</Avatar>
              <ListItemText primary={item.name} secondary={item.text} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
      <Trophies trophies={trophies} />
    </Grid>
  );
};

TeamDetails.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  team: PropTypes.instanceOf(Array).isRequired,
  trophies: PropTypes.instanceOf(Array),
};

TeamDetails.defaultProps = { trophies: null };
export default withStyles(styles)(TeamDetails);
