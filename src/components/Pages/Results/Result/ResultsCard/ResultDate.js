import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../../../../helpers/date';

const ResultDate = props => {
  const { result } = props;
  const date = formatDate(result.date);
  return <div style={{ fontSize: '10px', padding: '5px' }}>{date}</div>;
};

ResultDate.propTypes = { result: PropTypes.shape({}).isRequired };

export default ResultDate;
