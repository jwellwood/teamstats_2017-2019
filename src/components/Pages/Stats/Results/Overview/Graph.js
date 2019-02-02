import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
// MUI
import Grid from '@material-ui/core/Grid';
// Components
import StatsAvatar from '../../../../layout/Stats/StatsAvatar';

const Graph = props => {
  const { data, itemsToMap } = props;
  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={8} md={6} style={{ textAlign: 'center' }}>
          <Pie data={data} legend={{ position: 'right' }} />
        </Grid>
        <Grid item xs={12}>
          <StatsAvatar itemsToMap={itemsToMap} />
        </Grid>
      </Grid>
    </div>
  );
};

Graph.propTypes = {
  data: PropTypes.shape({}).isRequired,
  itemsToMap: PropTypes.instanceOf(Array).isRequired,
};

export default Graph;
