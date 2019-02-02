import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

// Components
import Container from '../components/hoc/Container';
import Stats from '../components/Pages/Stats/Stats';

const StatsContainer = props => {
  const { results, team, players } = props;
  const teamName = team ? team[0].name : null;
  return (
    <Container>
      <Stats results={results} teamName={teamName} players={players} />
    </Container>
  );
};

StatsContainer.propTypes = {
  results: PropTypes.instanceOf(Array),
  players: PropTypes.instanceOf(Array),
  team: PropTypes.instanceOf(Array),
};

StatsContainer.defaultProps = { results: [], players: [], team: null };

export default compose(
  firestoreConnect([
    { collection: 'results', orderBy: ['date', 'desc'] },
    { collection: 'team' },
    { collection: 'players', orderBy: ['apps', 'desc'] },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({
    players: state.firestore.ordered.players,
    results: state.firestore.ordered.results,
    team: state.firestore.ordered.team,
  })),
)(StatsContainer);
