import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Icon } from '@material-ui/core';
import Container from '../../hoc/Container';

// styling
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    marginTop: 10,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

// Component
const NotFound = props => {
  const { classes } = props;
  return (
    <Container>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3" color="primary">
          Page not found
        </Typography>
        <Icon>warning</Icon>
        <Typography component="p">
          Sorry, that page is unavailable. Please use a valid URL.
        </Typography>
      </Paper>
    </Container>
  );
};

NotFound.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(NotFound);
