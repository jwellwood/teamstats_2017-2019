import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

// styling
const styles = theme => ({
  root: { margin: theme.spacing.unit },
  button: { margin: theme.spacing.unit },
  bigAvatar: {
    border: '3px solid',
    borderColor: theme.palette.primary.dark,
    margin: 10,
    width: 60,
    height: 60,
  },
});

// Component
const DetailsHeader = props => {
  const { classes, player } = props;
  return (
    <div>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <h2 style={{ margin: '5px auto' }}>{player.name}</h2>
      </Grid>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <IconButton
          component={Link}
          to="/players"
          variant="fab"
          color="default"
          className={classes.button}
        >
          <Icon>arrow_back</Icon>
        </IconButton>

        <IconButton
          variant="contained"
          color="default"
          component={Link}
          to={`/players/edit/${player.id}`}
        >
          <Icon>edit</Icon>
        </IconButton>
      </Grid>
    </div>
  );
};

DetailsHeader.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(DetailsHeader);
