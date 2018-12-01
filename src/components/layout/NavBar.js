import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
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
import Logo from '../../assets/logo.jpg';

// styling
const styles = theme => ({
  root: { flexGrow: 1 },
  appBar: {},
  bigAvatar: {
    border: '2px solid',
    borderColor: theme.palette.primary.dark,
    margin: 10,
    width: 50,
    height: 50,
  },
});

// component
class NavBar extends Component {
  state = { isAuthenticated: false };

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    }
    return { isAuthenticated: false };
  }

  onLogout = e => {
    e.preventDefault();
    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { classes, auth, settings } = this.props;
    const { isAuthenticated } = this.state;
    const { allowRegistration } = settings;
    return (
      <AppBar position="static" className={classes.root}>
        {isAuthenticated ? (
          <TopNav
            text="signed in as "
            secondaryText={`${auth.email}`}
            icon="exit_to_app"
            onLogout={this.onLogout}
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
            <Avatar alt="Team badge" src={Logo} className={classes.bigAvatar} />
            <Typography variant="h6" color="inherit">
              Madrid Reds
            </Typography>
            <AppMenu isAuthenticated={isAuthenticated} onLogout={this.onLogout} />
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  firebase: PropTypes.shape({}).isRequired,
  auth: PropTypes.shape({}).isRequired,
  settings: PropTypes.shape({}).isRequired,
};

export default compose(
  firebaseConnect(),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({ auth: state.firebase.auth, settings: state.settings })),
  withStyles(styles),
)(NavBar);
