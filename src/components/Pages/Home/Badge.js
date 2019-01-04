import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Logo from '../../../assets/images/logoBig.jpg';

const styles = theme => ({
  image: {
    margin: theme.spacing.unit,
    padding: '20px',
  },
});

const Badge = props => {
  const { classes } = props;
  return (
    <Grid item xs={9} md={5}>
      <img src={Logo} className={classes.image} alt="team badge" />
    </Grid>
  );
};

Badge.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(Badge);
