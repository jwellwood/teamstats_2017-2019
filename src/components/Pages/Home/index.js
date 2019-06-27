import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../../layout/Warnings/Spinner';
import HomeContent from './HomeContent';

const Home = props => {
  const { auth, team, trophies, players, results } = props;
  if (team) {
    return (
      <HomeContent
        auth={auth}
        team={team}
        trophies={trophies}
        players={players}
        results={results}
      />
    );
  }
  return <Spinner />;
};

Home.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  team: PropTypes.instanceOf(Array),
  trophies: PropTypes.instanceOf(Array),
  players: PropTypes.instanceOf(Array),
  results: PropTypes.instanceOf(Array),
};

Home.defaultProps = { team: null, trophies: null, players: null, results: null };

export default compose(
  firestoreConnect([
    { collection: 'team' },
    { collection: 'trophies', orderBy: ['year', 'desc'] },
    { collection: 'players' },
    { collection: 'results', orderBy: ['date', 'desc'] },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({
    auth: state.firebase.auth,
    team: state.firestore.ordered.team,
    trophies: state.firestore.ordered.trophies,
    players: state.firestore.ordered.players,
    results: state.firestore.ordered.results,
  })),
)(Home);
