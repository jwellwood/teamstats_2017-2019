import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
// style
import styles from './styles';

const TopNav = props => {
  const { classes, text, secondaryText, link, icon, onLogout } = props;
  return (
    <div>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="flex-end"
        className={classes.signedIn}
      >
        <p>
          {text}
          <span className={classes.email}>{secondaryText}</span>
        </p>
        <Link to={link}>
          <Icon color="inherit" onClick={onLogout} className={classes.logout}>
            {icon}
          </Icon>
        </Link>
      </Grid>
    </div>
  );
};

// prop types
TopNav.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  secondaryText: PropTypes.string,
  onLogout: PropTypes.func,
};

TopNav.defaultProps = {
  secondaryText: '',
  onLogout: null,
};

export default withStyles(styles)(TopNav);
