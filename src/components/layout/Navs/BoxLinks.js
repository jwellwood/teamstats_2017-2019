import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Components
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconFA from '../../../assets/icons/IconFA';

const BoxLinks = props => {
  const { auth, link, children } = props;
  return (
    <Grid container direction='row' justify='space-between' alignItems='center'>
      <Grid item xs={6}>
        {children}
      </Grid>
      <Grid item>
        {auth ? (
          <Button
            variant='contained'
            color='secondary'
            aria-label='Add'
            component={Link}
            to={link}
          >
            <IconFA icon='plus' />
          </Button>
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
