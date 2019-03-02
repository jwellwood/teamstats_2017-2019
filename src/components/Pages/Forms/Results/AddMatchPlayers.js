import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PlayerMatchForm from './PlayerMatchForm';

class AddMatchPlayers extends Component {
  state = { playersList: [], matchPlayers: [] };

  componentDidMount() {
    const { players } = this.props;
    this.setState({ matchPlayers: players });
  }

  render() {
    const { players } = this.props;
    return (
      <div>
        {players
          ? players.map(player => (
            <div key={player.id} style={{ border: '1px solid red' }}>
              <PlayerMatchForm player={player} />
            </div>
          ))
          : null}
      </div>
    );
  }
}

AddMatchPlayers.propTypes = { players: PropTypes.instanceOf(Array).isRequired };

export default compose(
  firestoreConnect([
    { collection: 'players', orderBy: ['apps', 'desc'] },
    { collection: 'results' },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({
    players: state.firestore.ordered.players,
    results: state.firestore.ordered.results,
  })),
)(AddMatchPlayers);
