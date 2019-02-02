import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Components
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const BoxLinks = props => {
  const { link } = props;
  return (
    <div>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            size="small"
            color="secondary"
            component={Link}
            to="/stats"
          >
            View more stats
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Fab size="small" color="default" aria-label="Add" component={Link} to={link}>
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
};

BoxLinks.propTypes = { link: PropTypes.string.isRequired };

export default BoxLinks;
