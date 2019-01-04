import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import DetailsHeader from './DetailsHeader';
import Spinner from '../../../layout/Warnings/Spinner';

const ResultUpdater = props => {
  const { result } = props;
  if (result) {
    return <DetailsHeader result={result} />;
  }
  return <Spinner />;
};

ResultUpdater.propTypes = { result: PropTypes.shape({}) };
ResultUpdater.defaultProps = { result: {} };

export default compose(
  firestoreConnect(props => [
    { collection: 'results', storeAs: 'result', doc: props.match.params.id },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({
    result: state.firestore.ordered.result && state.firestore.ordered.result[0],
    auth: state.firebase.auth,
  })),
)(ResultUpdater);
