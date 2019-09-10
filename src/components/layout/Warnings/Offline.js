import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Icon } from '@material-ui/core';
import BoxContainer from '../hoc/BoxContainer';

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
    <BoxContainer>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3" color="primary">
          Site under maintenance
        </Typography>
        <Icon>warning</Icon>
        <Typography component="p">
          The site is currently down. Please try again later.
        </Typography>
      </Paper>
    </BoxContainer>
  );
};

NotFound.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(NotFound);
