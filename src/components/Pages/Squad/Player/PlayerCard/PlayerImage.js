import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
// Assets
import { positionColor } from '../../../../../assets/styles/colors';
import styles from './styles';

const PlayerImage = props => {
  const { classes, name, number, position, image, captain } = props;
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid container direction="row" justify="center" alignItems="center">
        <div className={classes.playerNumber}>{number}</div>

        <Avatar alt="player image" src={image} className={classes.avatar} />
        <div className={classes.playerNumber} style={{ color: positionColor(position) }}>
          {position}
        </div>
      </Grid>
      {captain ? <div className={classes.captain}>C</div> : null}
      <div className={classes.name}>{name}</div>
    </Grid>
  );
};

PlayerImage.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  captain: PropTypes.bool.isRequired,
};

export default withStyles(styles)(PlayerImage);
