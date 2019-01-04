import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../../../../helpers/results/date';

const ResultDate = props => {
  const { result } = props;
  const date = formatDate(result.date);
  const { day, month, year } = date;
  return (
    <div style={{ padding: '5px', color: '#fff', fontWeight: 'bold' }}>
      <div>
        {day} {month} <div style={{ fontWeight: 'lighter', color: '#aaa' }}> {year}</div>
      </div>
    </div>
  );
};

ResultDate.propTypes = { result: PropTypes.shape({}).isRequired };

export default ResultDate;
