import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Grid from '@material-ui/core/Grid';

const Container = props => {
  const { children } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={7} lg={7}>
        {children}
      </Grid>
    </Grid>
  );
};

Container.propTypes = { children: PropTypes.node.isRequired };

export default Container;
