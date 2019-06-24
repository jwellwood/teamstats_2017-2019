/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { firestoreConnect } from 'react-redux-firebase';

import MainCard from './MainCard';
import avatar from '../../../../../assets/images/avatar.png';
import Spinner from '../../../../layout/Warnings/Spinner';

class PlayerCard extends Component {
  state = {
    playerImage: avatar,
    defaultImage: avatar,
    loading: true,
  };

  _isMounted = false;

  componentWillMount() {
    this._isMounted = true;
    const { firebase, player } = this.props;
    const { defaultImage } = this.state;

    if (player.image) {
      firebase
        .storage()
        .ref('players')
        .child(player.image)
        .getDownloadURL()
        .then(url => {
          if (this._isMounted) {
            this.setState({ playerImage: url });
          }
        });
    }
    return defaultImage;
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ playerImage: avatar });
  }

  render() {
    const { playerImage, loading } = this.state;
    const { auth, players, player, results, playerMatches, playerMatchStats } = this.props;
    const goalsList = playerMatchStats.map(match => match.matchGoals);
    const assistList = playerMatchStats.map(match => match.matchAssists);
    const mvpList = playerMatchStats.map(match => match.matchMvp);
    const goals = goalsList.reduce((a, b) => a + b, 0);
    const assists = assistList.reduce((a, b) => a + b, 0);
    const mvp = mvpList.reduce((a, b) => a + b, 0);

    const playerStats = {
      apps: playerMatches.length,
      goals,
      assists,
      mvp,
    };
    return !loading ? (
      <MainCard
        playerStats={playerStats}
        auth={auth}
        player={player}
        results={results}
        players={players}
        playerMatches={playerMatches}
        playerMatchStats={playerMatchStats}
        playerImage={playerImage}
      />
    ) : (
      <Spinner />
    );
  }
}

PlayerCard.propTypes = {
  auth: PropTypes.bool.isRequired,
  firebase: PropTypes.shape({}).isRequired,
  players: PropTypes.instanceOf(Array).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  playerMatches: PropTypes.instanceOf(Array).isRequired,
  playerMatchStats: PropTypes.instanceOf(Array).isRequired,
  player: PropTypes.shape({}).isRequired,
};
export default firestoreConnect()(PlayerCard);
