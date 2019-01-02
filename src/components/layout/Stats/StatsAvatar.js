import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = () => ({
  item: { margin: '5px auto', textAlign: 'center' },
  value: { fontWeight: 'bold', margin: '0 auto' },
  statsKey: { fontSize: '10px', color: '#aaa', textTransform: 'uppercase', margin: '0 auto' },
});

const StatsAvatar = props => {
  const { classes, itemsToMap } = props;
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignContent="center"
        alignItems="center"
      >
        {itemsToMap.map(item => (
          <Grid item xs={4} sm={2} key={item.id} className={classes.item}>
            <Avatar style={{ margin: 'auto', background: item.color, fontWeight: 'bold' }}>
              {item.icon}
            </Avatar>
            <Typography className={classes.value}>{item.value}</Typography>
            <Typography className={classes.statsKey}>{item.title}</Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

StatsAvatar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  itemsToMap: PropTypes.instanceOf(Array).isRequired,
};

export default withStyles(styles)(StatsAvatar);
