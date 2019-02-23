import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
// Assets
import { positions } from '../../../../../assets/styles/colors';

const styles = theme => ({
  avatar: { margin: '5px' },
  numAvatar: {
    width: 22,
    height: 22,
    color: '#fafafa',
    margin: '3px',
    fontFamily: 'Anton',
  },
  name: {
    margin: '5px',
    padding: '3px',
    color: 'white',
    fontFamily: 'Righteous',
    background: theme.palette.primary.light,
    width: '100%',
  },
  captain: {
    position: 'absolute',
    margin: '5px auto',
    width: 30,
    height: 10,
    borderRadius: '5px',
    fontFamily: 'Righteous',
    fontSize: '0.6rem',
    background: theme.palette.secondary.main,
    color: '#333',
  },
});

const PlayerImage = props => {
  const { classes, name, number, position, image, captain } = props;
  let color = '#fff';
  switch (position) {
    case 'GK':
      color = positions.GK;
      break;
    case 'DF':
      color = positions.DF;
      break;
    case 'MF':
      color = positions.MF;
      break;
    case 'FW':
      color = positions.FW;
      break;
    default:
      return color;
  }

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid container direction="row" justify="center" alignItems="center">
        <div className={classes.numAvatar}>{number}</div>

        <Avatar alt="player image" src={image} className={classes.avatar} />
        <div className={classes.numAvatar} style={{ color }}>
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
