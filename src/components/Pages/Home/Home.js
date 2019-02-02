import React from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import Container from '../../hoc/Container';
import TeamDetails from './TeamDetails';
import HomeButtons from './HomeButtons';

const Home = props => {
  const { team, trophies, players } = props;
  return (
    <Container>
      <HomeButtons />
      <TeamDetails team={team} trophies={trophies} players={players} />
      <IconButton variant="contained" color="default" component={Link} to="/editteam">
        <Icon>edit</Icon>
      </IconButton>
    </Container>
  );
};

export default Home;
