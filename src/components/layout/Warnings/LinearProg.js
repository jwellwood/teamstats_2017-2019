import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = { root: { width: '100%', margin: 'auto' } };

const LinearProg = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress color="secondary" variant="indeterminate" />
    </div>
  );
};

LinearProg.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(LinearProg);
