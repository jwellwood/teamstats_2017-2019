import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

// styling
const styles = theme => ({
  root: { margin: theme.spacing.unit },
  button: { margin: theme.spacing.unit },
});

// component
const PageHeader = props => {
  const { classes, title, link } = props;
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <h3 className={classes.root}>{title}</h3>
      <IconButton
        component={Link}
        to={link}
        variant="fab"
        color="default"
        className={classes.button}
      >
        <Icon>arrow_back</Icon>
      </IconButton>
    </Grid>
  );
};

PageHeader.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default withStyles(styles)(PageHeader);
