import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
// MUI
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
// Components
import StatsAvatar from '../../../../../layout/Stats/StatsAvatar';

const TotalPieChart = props => {
  const { data, title, itemsToMap, totalPlayed } = props;
  return (
    <div>
      <List dense>
        <ListItem>
          <ListItemText primary={<span style={{ textTransform: 'uppercase' }}>{title}</span>} />
          <ListItemAvatar>
            <Avatar>{totalPlayed}</Avatar>
          </ListItemAvatar>
        </ListItem>
      </List>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={8} md={4} style={{ textAlign: 'center' }}>
          <Doughnut data={data} legend={{ position: 'right' }} />
        </Grid>

        <Grid item xs={12}>
          <StatsAvatar itemsToMap={itemsToMap} />
        </Grid>
      </Grid>
      <hr />
    </div>
  );
};

TotalPieChart.propTypes = {
  data: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  itemsToMap: PropTypes.instanceOf(Array).isRequired,
  totalPlayed: PropTypes.number.isRequired,
};

export default TotalPieChart;
