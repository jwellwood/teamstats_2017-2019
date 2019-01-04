import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// styling
const styles = theme => ({
  root: { padding: theme.spacing.unit, marginTop: '20px' },
  message: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
  },
});

// component
const Message = props => {
  const { classes, message } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <Typography variant="body1" component="h3" className={classes.message}>
        {message}
      </Typography>
    </Paper>
  );
};
// propTypes
Message.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  message: PropTypes.string.isRequired,
};

export default withStyles(styles)(Message);
