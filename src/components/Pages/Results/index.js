/* Gets the list of results from redux, and passes them down the props chain.
Gets auth and makes it a boolean value to decide whether or not to render add/edit buttons.
Gets team name to dynamically render the team name in the result box.  */

import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

// Components
import Container from '../../layout/hoc/Container';
import PageHeader from '../../layout/Navs/PageHeader';
import ResultsTotals from './Totals/ResultsTotals';
import ResultList from './List/ResultList';

const Results = props => {
  const { auth, results, team, onDelete } = props;
  const teamName = team ? team[0].name : 'Team Name';
  return (
    <Container>
      <PageHeader title="Results" icon="" link="/" />
      <ResultsTotals auth={!!auth.uid} results={results} teamName={teamName} />
      <ResultList auth={!!auth.uid} results={results} onDelete={onDelete} teamName={teamName} />
    </Container>
  );
};

Results.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  results: PropTypes.instanceOf(Array),
  team: PropTypes.instanceOf(Array),
  onDelete: PropTypes.func,
};

Results.defaultProps = { results: [], team: null, onDelete: undefined };

export default compose(
  firestoreConnect([{ collection: 'results', orderBy: ['date', 'desc'] }, { collection: 'team' }]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({
    auth: state.firebase.auth,
    results: state.firestore.ordered.results,
    team: state.firestore.ordered.team,
  })),
)(Results);
