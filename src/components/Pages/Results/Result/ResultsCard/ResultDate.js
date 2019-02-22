import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../../../../helpers/date';

const ResultDate = props => {
  const { result } = props;
  const date = formatDate(result.date);
  return <div style={{ padding: '5px', color: '#fff' }}>{date}</div>;
};

ResultDate.propTypes = { result: PropTypes.shape({}).isRequired };

export default ResultDate;
