import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
// Components
import Container from '../../layout/hoc/Container';
import PageHeader from '../../layout/Navs/PageHeader';
import ResultsStats from './Results';

const StatsContainer = props => {
  const { results, team } = props;
  const teamName = team ? team[0].name : null;
  return (
    <Container>
      <PageHeader title="Stats" link="/" />
      {results.length !== 0 ? (
        <ResultsStats results={results} teamName={teamName} />
      ) : (
        <div>No matches have been played yet</div>
      )}
    </Container>
  );
};

StatsContainer.propTypes = {
  results: PropTypes.instanceOf(Array),
  team: PropTypes.instanceOf(Array),
};

StatsContainer.defaultProps = { results: [], team: null };

export default compose(
  firestoreConnect([
    { collection: 'results', orderBy: ['date', 'desc'] },
    { collection: 'team' },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({
    players: state.firestore.ordered.players,
    results: state.firestore.ordered.results,
    team: state.firestore.ordered.team,
  })),
)(StatsContainer);
