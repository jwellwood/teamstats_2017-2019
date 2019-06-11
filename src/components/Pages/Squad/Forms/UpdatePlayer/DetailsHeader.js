import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Container from '../../../../layout/hoc/Container';
import BoxContainer from '../../../../layout/hoc/BoxContainer';

// Component
const DetailsHeader = props => {
  const { player } = props;
  return (
    <Container>
      <BoxContainer>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <IconButton component={Link} to="/players" variant="fab" color="default">
            <Icon>arrow_back</Icon>
          </IconButton>
          <div style={{ fontWeight: 'bold' }}>{player.name}</div>
          <div>
            <IconButton
              variant="contained"
              color="default"
              component={Link}
              to={`/players/edit/${player.id}`}
            >
              <Icon>edit</Icon>
            </IconButton>
            <IconButton
              variant="contained"
              color="default"
              component={Link}
              to={`/players/edit/image/${player.id}`}
            >
              <Icon>photo</Icon>
            </IconButton>
          </div>
        </Grid>
        <Typography variant="body2">Are you sure you want to edit this player?</Typography>
      </BoxContainer>
    </Container>
  );
};

DetailsHeader.propTypes = { player: PropTypes.shape({}).isRequired };

export default DetailsHeader;
