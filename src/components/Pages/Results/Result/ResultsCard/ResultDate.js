import React from 'react';

const ResultDate = props => {
  const { result } = props;
  const { date } = result;
  const year = date.slice(2, -6);
  let month = date.slice(5, -3);
  const day = date.slice(8, 10);
  switch (month) {
    case '01':
      month = 'Jan';
      break;
    case '02':
      month = 'Feb';
      break;
    case '03':
      month = 'Mar';
      break;
    case '04':
      month = 'Apr';
      break;
    case '05':
      month = 'May';
      break;
    case '06':
      month = 'Jun';
      break;
    case '07':
      month = 'Jul';
      break;
    case '08':
      month = 'Aug';
      break;
    case '09':
      month = 'Sep';
      break;
    case '10':
      month = 'Oct';
      break;
    case '11':
      month = 'Nov';
      break;
    case '12':
      month = 'Dec';
      break;
    default:
      return month;
  }
  return (
    <div style={{ color: '#fff', fontWeight: 'bold' }}>
      <p>
        {day} {month} <span style={{ color: '#aaa' }}> {`'${year}`}</span>
      </p>
    </div>
  );
};

export default ResultDate;
