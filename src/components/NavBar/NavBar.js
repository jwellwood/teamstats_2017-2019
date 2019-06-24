import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
// Components
import MainNav from './MainNav';

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
    const { auth, settings, team } = this.props;
    const { isAuthenticated } = this.state;
    const { allowRegistration } = settings;
    return (
      <MainNav
        isAuthenticated={isAuthenticated}
        auth={auth}
        onLogout={this.onLogout}
        allowRegistration={allowRegistration}
        team={team}
      />
    );
  }
}

NavBar.propTypes = {
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
)(NavBar);
