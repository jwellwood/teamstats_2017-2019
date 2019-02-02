import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../components/layout/Warnings/Spinner';
import Home from '../components/Pages/Home/Home';

const TeamHome = props => {
  const { team, trophies, players, results } = props;
  if (team) {
    return <Home team={team} trophies={trophies} players={players} results={results} />;
  }
  return <Spinner />;
};

TeamHome.propTypes = {
  team: PropTypes.instanceOf(Array),
  trophies: PropTypes.instanceOf(Array),
  players: PropTypes.instanceOf(Array),
  results: PropTypes.instanceOf(Array),
};

TeamHome.defaultProps = { team: null, trophies: null, players: null, results: null };

export default compose(
  firestoreConnect([
    { collection: 'team' },
    { collection: 'trophies', orderBy: ['year', 'desc'] },
    { collection: 'players', orderBy: ['apps', 'desc'] },
    { collection: 'results', orderBy: ['date', 'desc'] },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({
    team: state.firestore.ordered.team,
    trophies: state.firestore.ordered.trophies,
    players: state.firestore.ordered.players,
    results: state.firestore.ordered.results,
  })),
)(TeamHome);
