import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: theme.palette.secondary.main,
    height: '100px',
    width: '40%',
    fontWeight: 'bold',
    color: theme.palette.primary.dark,
    padding: '3px',
  },
  icon: {
    fontSize: '2rem',
    margin: '10px',
  },
});

const HomeButtons = props => {
  const { classes } = props;
  return (
    <Grid container direction="row" justify="center">
      <Button variant="contained" component={Link} to="/players/" className={classes.button}>
        <div>
          View Players
          <div className={classes.icon}>
            <i className="fas fa-user-friends" />
          </div>
        </div>
      </Button>
      <Button variant="contained" component={Link} to="/results/" className={classes.button}>
        <div>
          View Matches
          <div className={classes.icon}>
            <i className="fas fa-futbol" />
          </div>
        </div>
      </Button>
    </Grid>
  );
};

HomeButtons.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(HomeButtons);
