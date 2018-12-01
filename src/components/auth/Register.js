import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
// Actions
import { notifyUser } from '../../actions/notifyActions';
// Components
import AuthForm from './AuthForm';

class Register extends Component {
  state = {
    email: '',
    password: '',
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;
    firebase
      .createUser({
        email,
        password,
      })
      // eslint-disable-next-line no-unused-vars
      .catch(err => notifyUser('There was a problem with your registration. Try again', 'error'));
  };

  render() {
    const { notify, settings } = this.props;
    const { email, password } = this.state;
    const { message, messageType } = notify;
    if (!settings.allowRegistration) return <Redirect to="/" />;
    return (
      <AuthForm
        title="Register"
        email={email}
        password={password}
        message={message}
        messageType={messageType}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.shape({}).isRequired,
  settings: PropTypes.shape({}).isRequired,
  notify: PropTypes.shape({}).isRequired,
  notifyUser: PropTypes.func.isRequired,
};

export default compose(
  firebaseConnect(),
  connect(
    // eslint-disable-next-line no-unused-vars
    (state, props) => ({
      notify: state.notify,
      settings: state.settings,
    }),
    { notifyUser },
  ),
)(Register);
