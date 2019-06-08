import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PlayerMatchForm from './PlayerMatchForm';

const AddMatchPlayers = props => {
  const { players, result } = props;
  return (
    <div>
      {players
        ? players.map(player => <PlayerMatchForm player={player} key={player.id} result={result} />)
        : null}
    </div>
  );
};

AddMatchPlayers.propTypes = {
  players: PropTypes.instanceOf(Array),
  result: PropTypes.shape({}).isRequired,
};
AddMatchPlayers.defaultProps = { players: [] };

export default compose(
  firestoreConnect([{ collection: 'players', orderBy: ['apps', 'desc'] }]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({ players: state.firestore.ordered.players })),
)(AddMatchPlayers);
