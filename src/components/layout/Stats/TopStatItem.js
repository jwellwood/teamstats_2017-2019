import React from 'react';
import PropTypes from 'prop-types';

const TopStatItem = props => {
  const { data } = props;
  return (
    <span
      style={{
        padding: '3px',
        marginRight: '5px',
        display: 'block',
        fontFamily: 'Righteous',
      }}
    >
      {data}
    </span>
  );
};
// eslint-disable-next-line
TopStatItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]).isRequired };

export default TopStatItem;
