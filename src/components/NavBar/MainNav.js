import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
// MUI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
// Components
import AppMenu from './AppMenu';
import TopNav from './TopNav';
import Logo from '../../assets/images/logo.jpg';
// styling
import styles from './styles';

const MainNav = props => {
  const { classes, isAuthenticated, team, onLogout, allowRegistration, auth } = props;
  return (
    <AppBar position="static" className={classes.root}>
      {isAuthenticated ? (
        <TopNav
          text="signed in as "
          secondaryText={`${auth.email}`}
          icon="exit_to_app"
          onLogout={onLogout}
          link="/"
        />
      ) : (
        <TopNav text="Sign in" icon="person" link="/login" />
      )}
      {allowRegistration && !isAuthenticated ? (
        <TopNav text="Register" icon="lock_open" link="/register" />
      ) : null}
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <Avatar alt="Team badge" src={Logo} className={classes.bigAvatar} />
          </NavLink>

          <Typography style={{ fontFamily: 'Righteous' }} variant="h6" color="inherit">
            {team ? team[0].name : null}
          </Typography>
          <AppMenu isAuthenticated={isAuthenticated} onLogout={onLogout} />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

MainNav.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  auth: PropTypes.shape({}).isRequired,
  team: PropTypes.instanceOf(Array),
  onLogout: PropTypes.func.isRequired,
  allowRegistration: PropTypes.bool.isRequired,
};

MainNav.defaultProps = { team: null };

export default withStyles(styles)(MainNav);
