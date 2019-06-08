import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import listItems from './Data';
import styles from './styles';

const HomeButtons = props => {
  const { classes } = props;
  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="center"
      className={classes.container}
    >
      {listItems.map(item => (
        <Grid
          key={item.id}
          item
          xs={3}
          component={Link}
          to={item.link}
          style={{ textDecoration: 'none' }}
        >
          <Avatar className={classes.button}>{item.icon}</Avatar>
          <div className={classes.buttonText}>{item.text}</div>
        </Grid>
      ))}
    </Grid>
  );
};

HomeButtons.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(HomeButtons);
