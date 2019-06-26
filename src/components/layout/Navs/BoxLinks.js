import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Components
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const BoxLinks = props => {
  const { auth, link, children } = props;
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item xs={6}>
        {children}
      </Grid>
      <Grid item xs={2}>
        {auth ? (
          <IconButton size="small" color="secondary" aria-label="Add" component={Link} to={link}>
            <Icon>add</Icon>
          </IconButton>
        ) : null}
      </Grid>
    </Grid>
  );
};

BoxLinks.propTypes = {
  auth: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
};

export default BoxLinks;
