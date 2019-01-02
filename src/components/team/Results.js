import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

// Components
import Container from '../hoc/Container';
import PageHeader from '../layout/Navs/PageHeader';
import ResultBox from './ResultsList/ResultsCard/ResultBox';
import Spinner from '../layout/Warnings/Spinner';
import ResultsList from './ResultsList/ResultsList';

const Results = props => {
  const { results, onDelete } = props;

  return (
    <Container>
      <PageHeader title="Results" icon="" link="/" />
      <ResultsList results={results} />
      {results && results.length !== 0 ? (
        <ResultBox results={results} onDelete={onDelete} />
      ) : (
        <div>
          <p>There are currently no results</p>
          <Spinner />
        </div>
      )}
    </Container>
  );
};

Results.propTypes = {
  results: PropTypes.instanceOf(Array),
  onDelete: PropTypes.func,
};

Results.defaultProps = { results: [], onDelete: undefined };

export default compose(
  firestoreConnect([{ collection: 'results', orderBy: ['date', 'desc'] }]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({ results: state.firestore.ordered.results })),
)(Results);
