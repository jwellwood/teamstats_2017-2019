import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
// Assets
import styles from './styles';

const PlayerImage = props => {
  const { classes, name, number, image, captain } = props;
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={5} sm={4} md={2}>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <div className={classes.playerNumber}>{number}</div>
          <Avatar alt="player image" src={image} className={classes.avatar} />
        </Grid>
      </Grid>

      <Grid item xs={7} sm={8} md={10}>
        <div className={classes.name}>
          {name} {captain ? <span className={classes.captain}>(C)</span> : null}
        </div>
      </Grid>
    </Grid>
  );
};

PlayerImage.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  captain: PropTypes.bool.isRequired,
};

export default withStyles(styles)(PlayerImage);
