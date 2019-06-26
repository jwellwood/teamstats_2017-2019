import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
// MUI
import { withStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  root: { margin: '0 auto' },
  total: { fontWeight: 'bold', color: '#58D68D' },
  target: { fontSize: '12px', fontWeight: 'bold' },
  progress: { padding: '5px' },
  avatar: { margin: '10px' },
  percentage: { padding: '3px', fontSize: '12px', background: '#222' },
});

const ProgressBar = props => {
  const { classes, title, total, target, percentage } = props;
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item xs={9}>
          <Grid container direction="row" justify="space-between" alignContent="center">
            <Typography
              style={{ textTransform: 'uppercase', fontWeight: 'bold', fontSize: '12px' }}
            >
              {title}
            </Typography>
            <Typography className={classes.target}>
              <span className={classes.total}>{total}</span>/ {target}
            </Typography>
          </Grid>

          <LinearProgress
            className={classes.progress}
            value={percentage}
            valueBuffer={100}
            variant="determinate"
          />
        </Grid>

        <Grid item xs={3}>
          <ListItemAvatar className={classes.avatar}>
            <Avatar className={classes.percentage}>
              {percentage.toFixed(1)}
              <span style={{ fontSize: '10px', opacity: '0.7' }}>%</span>
            </Avatar>
          </ListItemAvatar>
        </Grid>
      </Grid>
    </div>
  );
};

ProgressBar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired,
  target: PropTypes.number.isRequired,
};

export default withStyles(styles)(ProgressBar);
