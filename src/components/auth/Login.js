import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
// Actions
import { notifyUser } from '../../actions/notifyActions';
// Components
import AuthForm from './AuthForm';

class Login extends Component {
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
      .login({
        email,
        password,
      })
      .catch(err => notifyUser('Invalid details', 'error')); // eslint-disable-line no-unused-vars
  };

  render() {
    const { notify } = this.props;
    const { email, password } = this.state;
    const { message, messageType } = notify;
    return (
      <AuthForm
        title="Sign in"
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

Login.propTypes = {
  firebase: PropTypes.shape({}).isRequired,
  notify: PropTypes.shape({}).isRequired,
  notifyUser: PropTypes.func.isRequired,
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({ notify: state.notify }), // eslint-disable-line no-unused-vars
    { notifyUser },
  ),
)(Login);
