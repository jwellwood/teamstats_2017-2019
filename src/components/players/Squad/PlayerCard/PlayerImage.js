import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
// Assets
import avatar from '../../../../assets/images/avatar.png';
import { colors } from '../../../../assets/styles/colors';

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
    margin: '10px',
    padding: '3px',
    color: 'white',
    fontFamily: 'Righteous',
    background: theme.palette.primary.light,
    width: '100%',
  },
});

const PlayerImage = props => {
  const { classes, name, number, position } = props;
  let color = '#fff';
  switch (position) {
    case 'GK':
      color = colors.GK;
      break;
    case 'DF':
      color = colors.DF;
      break;
    case 'MF':
      color = colors.MF;
      break;
    case 'FW':
      color = colors.FW;
      break;
    default:
      return color;
  }

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid container direction="row" justify="center" alignItems="center">
        <div className={classes.numAvatar}>{number}</div>
        <Avatar alt="player image" src={avatar} className={classes.avatar} />
        <div className={classes.numAvatar} style={{ color }}>
          {position}
        </div>
      </Grid>

      <div className={classes.name}>{name}</div>
    </Grid>
  );
};

PlayerImage.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};

export default withStyles(styles)(PlayerImage);
