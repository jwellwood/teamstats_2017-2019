import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Container from '../../../hoc/Container';
import BoxContainer from '../../../hoc/BoxContainer';

// Component
const DetailsHeader = props => {
  const { result } = props;
  return (
    <Container>
      <BoxContainer>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <IconButton component={Link} to="/results" variant="fab" color="default">
            <Icon>arrow_back</Icon>
          </IconButton>
          <div style={{ fontWeight: 'bold' }}>{result.opponentName}</div>
          <IconButton
            variant="contained"
            color="default"
            component={Link}
            to={`/results/${result.id}/edit`}
          >
            <Icon>edit</Icon>
          </IconButton>
        </Grid>
        <Typography variant="body2">Are you sure you want to edit this game?</Typography>
      </BoxContainer>
    </Container>
  );
};

DetailsHeader.propTypes = { result: PropTypes.shape({}).isRequired };

export default DetailsHeader;
