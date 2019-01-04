import React from 'react';
import PropTypes from 'prop-types';
// Components
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import StatsAvatar from '../../../../layout/Stats/StatsAvatar';

// Component
const OtherResultStats = props => {
  const { results } = props;
  const forfeits = results.filter(result => result.forfeitedMatch === true).length;
  // Data to map
  let id = 0;
  function createData(icon, title, value) {
    id += 1;
    return { id, icon, title, value };
  }

  const listItems = [
    createData(<i className="fas fa-bell-slash" />, 'Forfeited Matches', forfeits),
  ];

  return (
    <div>
      <StatsHeader title="Other" />
      <StatsAvatar itemsToMap={listItems} />
    </div>
  );
};

OtherResultStats.propTypes = { results: PropTypes.instanceOf(Array).isRequired };

export default OtherResultStats;
