import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Firestore
import { firestoreConnect } from 'react-redux-firebase';
// Components
import Container from '../../../hoc/Container';
import AddForm from './AddForm';
import PageHeader from '../../../layout/Navs/PageHeader';

class AddPlayer extends Component {
  state = {
    name: '',
    number: '',
    position: '',
    targetApps: '',
    targetGoals: '',
    targetAssists: '',
    /*eslint-disable */
    goals: 0,
    assists: 0,
    apps: 0,
    mvp: 0,
    balance: 0,
    /* eslint-enable */
  };

  onSubmit = e => {
    e.preventDefault();
    const newPlayer = this.state;
    const { firestore, history } = this.props;
    firestore.add({ collection: 'players' }, newPlayer).then(() => history.push('/players'));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, number, position, targetApps, targetGoals, targetAssists } = this.state;
    return (
      <Container>
        <PageHeader title="Add Player" icon="fas fa-user-plus" link="/players" />
        <AddForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          name={name}
          number={number}
          position={position}
          targetApps={targetApps}
          targetGoals={targetGoals}
          targetAssists={targetAssists}
        />
      </Container>
    );
  }
}

AddPlayer.propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default firestoreConnect()(AddPlayer);
