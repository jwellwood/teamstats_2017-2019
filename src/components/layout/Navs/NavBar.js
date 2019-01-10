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
import Logo from '../../../assets/images/logo.jpg';
// styling
const styles = theme => ({
  root: { flexGrow: 1 },
  appBar: {},
  bigAvatar: {
    border: '2px solid',
    borderColor: theme.palette.primary.dark,
    margin: '10px 0',
    width: 48,
    height: 48,
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
    const { classes, auth, settings, team } = this.props;
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
          <Grid container justify="space-around" alignItems="center">
            <Avatar alt="Team badge" src={Logo} className={classes.bigAvatar} />
            <Typography style={{ fontFamily: 'Righteous' }} variant="h6" color="inherit">
              {team ? team[0].name : null}
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
  team: PropTypes.instanceOf(Array),
};

NavBar.defaultProps = { team: null };

export default compose(
  firebaseConnect('', [{ collection: 'team' }]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings,
    team: state.firestore.ordered.team,
  })),

  // eslint-disable-next-line no-unused-vars

  withStyles(styles),
)(NavBar);
