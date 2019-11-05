import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';

import Container from '../../layout/hoc/Container';
import TeamDetails from './Details/TeamDetails';
import HomeButtons from './Buttons';
import IconFA from '../../../assets/icons/IconFA';

const HomeContent = props => {
  const { auth } = props;
  return (
    <Container>
      <HomeButtons />
      <TeamDetails {...props} />
      {auth.uid ? (
        <IconButton variant='contained' component={Link} to='/editteam'>
          <IconFA icon='pen' size='xs' />
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
