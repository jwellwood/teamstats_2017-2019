import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import MatchPlayerForm from './MatchPlayerForm';
import FormContainer from '../../../../layout/Forms/FormContainer';
import Label from '../../../../layout/Forms/Label';

const AddMatchPlayers = props => {
  const { players, matchPlayers } = props;
  return (
    <FormContainer>
      <Label>Match Players</Label>
      {players
        ? players.map(player => (
            <MatchPlayerForm
              player={player}
              key={player.id}
              matchPlayers={matchPlayers}
            />
          ))
        : null}
    </FormContainer>
  );
};

AddMatchPlayers.propTypes = {
  players: PropTypes.instanceOf(Array),
  matchPlayers: PropTypes.shape({}).isRequired,
};

export default compose(
  firestoreConnect([{ collection: 'players', orderBy: ['apps', 'desc'] }]),
  // eslint-disable-next-line no-unused-vars
  connect(state => ({ players: state.firestore.ordered.players })),
)(AddMatchPlayers);
