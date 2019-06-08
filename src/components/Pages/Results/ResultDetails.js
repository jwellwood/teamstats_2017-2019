import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import ResultPage from './Result/ResultPage';

const ResultDetails = props => {
  const { result, team } = props;
  return result && team ? <ResultPage result={result} teamName={team[0].name} /> : null;
};

ResultDetails.propTypes = { result: PropTypes.shape({}), team: PropTypes.instanceOf(Array) };
ResultDetails.defaultProps = { result: null, team: null };

export default compose(
  firestoreConnect(props => [
    { collection: 'results', storeAs: 'result', doc: props.match.params.id },
    { collection: 'team' },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({
    result: state.firestore.ordered.result && state.firestore.ordered.result[0],
    auth: state.firebase.auth,
    team: state.firestore.ordered.team,
  })),
)(ResultDetails);
