import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { firestoreConnect } from 'react-redux-firebase';
// MUI
import Card from '@material-ui/core/Card';
// Components
import FormComponents from './FormComponents';

const INITIAL_STATE = {
  app: false,
  goals: 0,
  assists: 0,
  mvp: false,
  added: false,
};
class MatchPlayerForm extends Component {
  state = { ...INITIAL_STATE };

  onAppSelect = () => {
    const { app } = this.state;
    this.setState({ app: !app });
  };

  onMVPSelect = () => {
    const { mvp } = this.state;
    this.setState({ mvp: !mvp });
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: +e.target.value });
  };

  onAddPlayer = e => {
    e.preventDefault();
    const { goals, assists, mvp } = this.state;
    const { player, matchPlayers } = this.props;
    this.setState({ added: true });
    const updateMatchPlayer = {
      id: player.id,
      name: player.name,
      matchGoals: +goals,
      matchAssists: +assists,
      matchMvp: mvp ? 1 : 0,
    };
    matchPlayers.value.push(updateMatchPlayer);
  };

  onResetPlayer = e => {
    e.preventDefault();
    const { player, matchPlayers } = this.props;
    this.setState({ ...INITIAL_STATE });
    matchPlayers.value.map(a =>
      a.id === player.id
        ? matchPlayers.value.splice(matchPlayers.value.indexOf(a), 1)
        : matchPlayers.value,
    );
    return matchPlayers;
  };

  render() {
    const { player } = this.props;
    const { app, mvp, goals, assists, added } = this.state;
    return (
      <Card
        style={{
          margin: '5px',
          padding: '10px',
          border: '2px solid',
          borderColor: added ? '#2ECC71' : '#E74C3C',
        }}
      >
        <FormComponents
          player={player}
          app={app}
          mvp={mvp}
          goals={goals}
          assists={assists}
          onChange={this.onChange}
          onAppSelect={this.onAppSelect}
          onMVPSelect={this.onMVPSelect}
          onAddPlayer={this.onAddPlayer}
          onResetPlayer={this.onResetPlayer}
          added={added}
        />
      </Card>
    );
  }
}

MatchPlayerForm.propTypes = {
  player: PropTypes.shape({}).isRequired,
  firestore: PropTypes.shape({}).isRequired,
  matchPlayers: PropTypes.shape({}).isRequired,
};

export default firestoreConnect()(MatchPlayerForm);
