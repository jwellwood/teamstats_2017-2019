import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
// Components

import Container from '../components/hoc/Container';
import TeamDetails from '../components/Pages/Home/TeamDetails';
import HomeButtons from '../components/Pages/Home/HomeButtons';
import Badge from '../components/Pages/Home/Badge';
import Spinner from '../components/layout/Warnings/Spinner';

const TeamHome = props => {
  const { team, trophies } = props;
  if (team) {
    return (
      <Container>
        <HomeButtons />
        <Grid container direction="row" justify="center" alignItems="center">
          <Badge />
          <TeamDetails team={team} trophies={trophies} />
        </Grid>
        <IconButton variant="contained" color="default" component={Link} to="/editteam">
          <Icon>edit</Icon>
        </IconButton>
      </Container>
    );
  }
  return <Spinner />;
};

TeamHome.propTypes = {
  team: PropTypes.instanceOf(Array),
  trophies: PropTypes.instanceOf(Array),
};

TeamHome.defaultProps = { team: null, trophies: null };

export default compose(
  firestoreConnect([{ collection: 'team' }, { collection: 'trophies', orderBy: ['year', 'desc'] }]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({
    team: state.firestore.ordered.team,
    trophies: state.firestore.ordered.trophies,
  })),
)(TeamHome);
