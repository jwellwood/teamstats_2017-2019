import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Spinner from '../../layout/Warnings/Spinner';
// Components
import ResultDetails from './Result/ResultDetails';

const ResultList = props => {
  const { results } = props;
  if (results) {
    return results.map(result => <ResultDetails key={result.id} result={result} />);
  }
  if (results.length === 0) return <div>Start adding results!</div>;
  return <Spinner />;
};

ResultList.propTypes = { results: PropTypes.instanceOf(Array) };

ResultList.defaultProps = { results: [] };

export default ResultList;
