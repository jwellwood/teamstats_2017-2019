import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Container from '../hoc/Container';

const FormContainer = props => {
  const { children } = props;
  return (
    <Container>
      <Grid container alignContent="center" justify="center">
        <Grid item xs={12} md={6}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

FormContainer.propTypes = { children: PropTypes.node.isRequired };

export default FormContainer;
