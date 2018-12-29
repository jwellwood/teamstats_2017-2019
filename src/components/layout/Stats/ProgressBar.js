import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: { padding: '8px 16px', margin: '0 auto' },
  total: { fontWeight: 'bold', color: '#58D68D' },
  progress: { padding: '5px' },
  avatar: { margin: '10px' },
  percentage: { padding: '3px', fontSize: '12px', background: theme.palette.primary.dark },
});

const ProgressBar = props => {
  const { classes, title, total, target, percentage } = props;
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item xs={9}>
          <Grid container direction="row" justify="space-between" alignContent="center">
            <Typography variant="body2" style={{ textTransform: 'uppercase' }}>
              {title}
            </Typography>
            <Typography>
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

        <Grid item>
          <ListItemAvatar className={classes.avatar}>
            <Avatar className={classes.percentage}>{percentage.toFixed(1)}%</Avatar>
          </ListItemAvatar>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(ProgressBar);
