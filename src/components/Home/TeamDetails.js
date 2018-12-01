import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Trophies from './Trophies';

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
  const { classes } = props;

  // Data to map
  let id = 0;
  function createData(icon, name, text, type) {
    id += 1;
    return { id, icon, name, text, type };
  }

  const listItems = [
    createData(<i className="fas fa-globe-americas" />, 'Madrid', 'Home city'),
    createData(<i className="fas fa-award" />, '5th', 'Finish last season'),
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
            <Divider inset component="li" />
          </div>
        ))}
        <ListItem>
          <Avatar className={classes.avatar}>
            <i className="fas fa-trophy" />
          </Avatar>
          <ListItemText primary={<Trophies />} />
        </ListItem>
        <Divider inset component="li" />
      </List>
    </Grid>
  );
};

TeamDetails.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(TeamDetails);
