import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
// MUI
import Grid from '@material-ui/core/Grid';
// Components
import { Paper } from '@material-ui/core';
import StatsAvatar from '../../../../layout/Stats/StatsAvatar';

const Graph = props => {
  const { data, itemsToMap } = props;
  return (
    <Paper>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={5} md={3} style={{ textAlign: 'center' }}>
          <Pie data={data} legend={{ position: 'right' }} />
        </Grid>
        <Grid item xs={6}>
          <StatsAvatar itemsToMap={itemsToMap} />
        </Grid>
      </Grid>
    </Paper>
  );
};

Graph.propTypes = {
  data: PropTypes.shape({}).isRequired,
  itemsToMap: PropTypes.instanceOf(Array).isRequired,
};

export default Graph;
