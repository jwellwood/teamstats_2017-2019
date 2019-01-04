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
    </Container>
  </div>
);
// MatchStats.propTypes = {
//   classes: PropTypes.shape({}).isRequired,
//   result: PropTypes.shape({}).isRequired,
// };

export default MatchStats;
