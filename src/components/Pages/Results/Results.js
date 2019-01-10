import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

// Components
import Container from '../../hoc/Container';
import PageHeader from '../../layout/Navs/PageHeader';
import ResultsTotals from './ResultsTotals';
import ResultList from './ResultList';

const Results = props => {
  const { results, team, onDelete } = props;
  const teamName = team ? team[0].name : null;
  return (
    <Container>
      <PageHeader title="Results" icon="" link="/" />
      <ResultsTotals results={results} teamName={teamName} />
      <ResultList results={results} onDelete={onDelete} />
    </Container>
  );
};

Results.propTypes = {
  results: PropTypes.instanceOf(Array),
  team: PropTypes.instanceOf(Array),
  onDelete: PropTypes.func,
};

Results.defaultProps = { results: [], team: null, onDelete: undefined };

export default compose(
  firestoreConnect([{ collection: 'results', orderBy: ['date', 'desc'] }, { collection: 'team' }]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({
    results: state.firestore.ordered.results,
    team: state.firestore.ordered.team,
  })),
)(Results);
