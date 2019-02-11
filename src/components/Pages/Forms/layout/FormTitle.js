import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = { root: { width: '100%', background: '#ddd', fontWeight: 'bold' } };
const FormTitle = props => {
  const { classes, title } = props;
  return (
    <Typography variant="body1" className={classes.root}>
      {title}
    </Typography>
  );
};

FormTitle.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(FormTitle);
