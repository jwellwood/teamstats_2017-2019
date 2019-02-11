import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Firestore
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
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
    stats: [
      {
        name: '',
        app: false,
        goals: 0,
        assists: 0,
        mvp: false,
      },
    ],
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

  addAppButton = () => {
    const { player, firestore } = this.props;
    const addApp = { apps: player.apps + 1 };
    firestore.update({ collection: 'players', doc: player.id }, addApp);
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
      stats,
      matchNotes,
    } = this.state;
    const { players } = this.props;
    return (
      <Container>
        <PageHeader title="Add Match" link="/results" />
        <AddMatchForm
          players={players}
          onChange={this.onChange}
          onCheck={this.onCheck}
          onSubmit={this.onSubmit}
          matchType={matchType}
          date={date}
          homeTeamName={homeTeamName}
          homeTeamScore={homeTeamScore}
          awayTeamName={awayTeamName}
          awayTeamScore={awayTeamScore}
          resultIndicator={resultIndicator}
          forfeitedMatch={forfeitedMatch}
          stats={stats}
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

// export default firestoreConnect()(AddResult);

export default compose(
  firestoreConnect([
    { collection: 'players', orderBy: ['apps', 'desc'] },
    { collection: 'results' },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({
    players: state.firestore.ordered.players,
    results: state.firestore.ordered.results,
  })),
)(AddResult);
