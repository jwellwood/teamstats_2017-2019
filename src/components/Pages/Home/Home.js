import React from 'react';
// MUI
import Grid from '@material-ui/core/Grid';
// Components
import Container from '../../hoc/Container';
import TeamDetails from './TeamDetails';
import Badge from './Badge';
import HomeButtons from './HomeButtons';

const Home = () => (
  <Container>
    <HomeButtons />
    <Grid container direction="row" justify="center" alignItems="center">
      <Badge />
      <TeamDetails />
    </Grid>
  </Container>
);

export default Home;
