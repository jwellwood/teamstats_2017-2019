import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// styling
const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    textAlign: 'center',
  },
});

// component

const Spinner = props => {
  const { classes } = props;
  return (
    <div className={classes.progress}>
      <CircularProgress className={classes.progress} color="secondary" />
    </div>
  );
};

Spinner.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(Spinner);
