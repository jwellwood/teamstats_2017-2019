import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import Container from '../../layout/hoc/Container';
import TeamDetails from './Details/TeamDetails';
import HomeButtons from './Buttons';

const HomeContent = props => {
  const { auth } = props;
  return (
    <Container>
      <HomeButtons />
      <TeamDetails {...props} />
      {auth.uid ? (
        <IconButton variant="contained" color="default" component={Link} to="/editteam">
          <Icon>edit</Icon>
        </IconButton>
      ) : null}
    </Container>
  );
};

HomeContent.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  team: PropTypes.instanceOf(Array).isRequired,
  trophies: PropTypes.instanceOf(Array),
  players: PropTypes.instanceOf(Array),
};

HomeContent.defaultProps = {
  trophies: [],
  players: [],
};

export default HomeContent;
