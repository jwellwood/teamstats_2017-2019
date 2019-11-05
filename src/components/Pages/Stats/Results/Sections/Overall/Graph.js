import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
// styles
import styles from './styles';
import { colors } from '../../../../../../assets/styles/colors';

const Graph = props => {
  const { data, percentages, classes } = props;
  const { win, lose } = percentages;

  return (
    <Grid
      container
      direction='row'
      alignContent='center'
      justify='center'
      className={classes.root}
    >
      <Grid item xs={4} sm={4}>
        <Card className={classes.card}>
          <Pie
            data={data}
            options={{ legend: { display: false }, maintainAspectRatio: false }}
            height={30}
          />
        </Card>
      </Grid>
      <Grid item xs={4} sm={4}>
        <Card className={classes.card}>
          <Typography variant='h5' style={{ color: colors.win }}>
            {win}
          </Typography>
          <Typography variant='caption'>win %</Typography>
        </Card>
      </Grid>
      <Grid item xs={4} sm={4}>
        <Card className={classes.card}>
          <Typography variant='h5' style={{ color: colors.lose }}>
            {lose}
          </Typography>
          <Typography variant='caption'>lose %</Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

Graph.propTypes = {
  data: PropTypes.shape({}).isRequired,
  percentages: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Graph);
