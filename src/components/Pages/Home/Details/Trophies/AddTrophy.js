import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Firestore
import { firestoreConnect } from 'react-redux-firebase';
import Container from '../../../../layout/hoc/Container';
import TrophyForm from './TrophyForm';
import PageHeader from '../../../../layout/Navs/PageHeader';
// Components
class AddTrophy extends Component {
  state = {
    trophyName: '',
    year: '',
    winner: false,
  };

  onSubmit = e => {
    e.preventDefault();
    const newTrophy = this.state;
    const { firestore, history } = this.props;
    firestore.add({ collection: 'trophies' }, newTrophy).then(() => history.push('/'));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    this.setState({ winner: e.target.checked });
  };

  render() {
    const { trophyName, year, winner } = this.state;
    return (
      <Container>
        <PageHeader title="Add Trophy" link="/" />
        <TrophyForm
          trophyName={trophyName}
          year={year}
          winner={winner}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          onCheck={this.onCheck}
        />
      </Container>
    );
  }
}

AddTrophy.propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default firestoreConnect()(AddTrophy);
