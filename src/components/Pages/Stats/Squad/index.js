import React from 'react';
import PropTypes from 'prop-types';
// Components
import Leaderboard from './Sections/Leaderboard';
import Progress from './Sections/Progress';
import OtherStats from './Sections/OtherStats';
import Comparison from './Sections/Comparison';
import BoxContainer from '../../../layout/hoc/BoxContainer';
import SecondaryTabs from '../../../layout/Stats/SecondaryTabs';

const PlayerStats = props => {
  const { players, results } = props;

  const tabTitles = [
    { id: 1, icon: <i className="fas fa-user-circle" /> },
    { id: 2, icon: <i className="fas fa-chart-line" /> },
    { id: 3, icon: <i className="fas fa-info-circle" /> },
    { id: 4, icon: <i className="fas fa-book-open" /> },
  ];

  const tabContent = [
    { id: 1, content: <Leaderboard players={players} /> },
    { id: 2, content: <Progress players={players} /> },
    { id: 3, content: <OtherStats players={players} results={results} /> },
    { id: 4, content: <Comparison players={players} results={results} /> },
  ];

  return (
    <SecondaryTabs tabTitles={tabTitles}>
      {tabContent.map(content => (
        <BoxContainer key={content.id}>{content.content}</BoxContainer>
      ))}
    </SecondaryTabs>
  );
};

PlayerStats.propTypes = {
  players: PropTypes.instanceOf(Array).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

export default PlayerStats;
