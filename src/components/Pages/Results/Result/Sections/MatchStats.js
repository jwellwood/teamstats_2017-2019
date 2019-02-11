import React from 'react';
// import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import Container from '../../../../hoc/Container';

const MatchStats = () => (
  <div>
    <StatsHeader title="Match Stats" />
    <Container>
      <Typography style={{ textAlign: 'center', color: 'green' }}>Coming soon</Typography>
      {/* {result.stats.map(player => (
          <div key={stats[].name}>
            <p>Name: {player.name}</p>
            <p>Played: {player.apps ? 'Y' : 'N'}</p>
            <p>Goals: {player.goals}</p>
            <p>Assists: {player.assists}</p>
            <p>MVP: {player.mvp ? 'Y' : 'N'}</p>
          </div>
        ))} */}
    </Container>
  </div>
);
// MatchStats.propTypes = {
//   classes: PropTypes.shape({}).isRequired,
//   result: PropTypes.shape({}).isRequired,
// };

export default MatchStats;
