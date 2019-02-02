import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  container: { margin: '30px auto' },
  button: {
    margin: '10px auto',
    background: '#ddd',
    height: '50px',
    width: '50px',
    fontWeight: 'bold',
    color: theme.palette.primary.dark,
    textDecoration: 'none',
  },
  buttonText: {
    textTransform: 'lowercase',
    fontFamily: 'Righteous',
    fontSize: '14px',
    background: theme.palette.primary.dark,
    borderRadius: '2px 2px 12px 2px',
    padding: '5px',
    color: '#fff',
  },
});

// Data to map
let id = 0;
function createData(icon, text, link) {
  id += 1;
  return { id, icon, text, link };
}

const listItems = [
  createData(<i className="fas fa-user-friends" />, 'players', '/players'),
  createData(<i className="fas fa-futbol" />, 'results', '/results'),
  createData(<i className="fas fa-chart-pie" />, 'stats', '/stats'),
];

const HomeButtons = props => {
  const { classes } = props;
  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="center"
      className={classes.container}
    >
      {listItems.map(item => (
        <Grid
          key={item.id}
          item
          xs={3}
          component={Link}
          to={item.link}
          style={{ textDecoration: 'none' }}
        >
          <Avatar className={classes.button}>{item.icon}</Avatar>
          <div className={classes.buttonText}>{item.text}</div>
        </Grid>
      ))}
    </Grid>
  );
};

HomeButtons.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(HomeButtons);
