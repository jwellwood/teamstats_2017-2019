import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Grid from '@material-ui/core/Grid';

const Container = props => {
  const { children } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={12} md={8}>
        {children}
      </Grid>
    </Grid>
  );
};

Container.propTypes = { children: PropTypes.node.isRequired };

export default Container;
