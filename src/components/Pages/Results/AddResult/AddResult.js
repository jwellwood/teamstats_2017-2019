import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Firestore
import { firestoreConnect } from 'react-redux-firebase';
// Components
import Container from '../../../hoc/Container';
import AddMatchForm from './AddMatchForm';
import PageHeader from '../../../layout/Navs/PageHeader';

class AddResult extends Component {
  state = {
    date: '',
    matchType: 'League',
    homeTeamName: '',
    homeTeamScore: 0,
    awayTeamName: '',
    awayTeamScore: 0,
    resultIndicator: 'W',
    forfeitedMatch: false,
    matchNotes: '',
  };

  onSubmit = e => {
    e.preventDefault();
    const newResult = this.state;
    const { firestore, history } = this.props;
    firestore.add({ collection: 'results' }, newResult).then(() => history.push('/results'));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    this.setState({ forfeitedMatch: e.target.checked });
  };

  render() {
    const {
      matchType,
      date,
      homeTeamName,
      homeTeamScore,
      awayTeamName,
      awayTeamScore,
      resultIndicator,
      forfeitedMatch,
      matchNotes,
    } = this.state;
    return (
      <Container>
        <PageHeader title="Add Match" link="/results" />
        <AddMatchForm
          onChange={this.onChange}
          onCheck={this.onCheck}
          onSubmit={this.onSubmit}
          matchType={matchType}
          date={date}
          homeTeamName={homeTeamName}
          homeTeamScore={parseInt(homeTeamScore, 10)}
          awayTeamName={awayTeamName}
          awayTeamScore={parseInt(awayTeamScore, 10)}
          resultIndicator={resultIndicator}
          forfeitedMatch={forfeitedMatch}
          matchNotes={matchNotes}
        />
      </Container>
    );
  }
}

AddResult.propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default firestoreConnect()(AddResult);
