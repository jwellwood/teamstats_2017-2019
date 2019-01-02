import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
// Components
import Spinner from '../layout/Warnings/Spinner';
import Container from '../hoc/Container';
import PageHeader from '../layout/Navs/PageHeader';
import SquadList from './Squad/SquadList';
import TotalsTable from './Squad/TotalsTable';
import TopStatItem from '../layout/Stats/TopStatItem';
// import { getTotal } from '../../helpers/calcs';

class Players extends Component {
  state = {
    Apps: {
      totalTeamApps: null,
      teamTargetApps: null,
      topAppPlayer: null,
      topAppValue: null,
    },
    Goals: {
      totalTeamGoals: null,
      teamTargetGoals: null,
      topGoalPlayer: null,
      topGoalValue: null,
      topGoalsPerMatchPlayer: null,
      topGoalsPerMatchValue: null,
    },
    Assists: {
      totalTeamAssists: null,
      teamTargetAssists: null,
      topAssistPlayer: null,
      topAssistValue: null,
      topAssistsPerMatchPlayer: null,
      topAssistsPerMatchValue: null,
    },
    MVP: {
      totalTeamMVP: null,
      mvpPerGame: null,
      topMVPPlayer: null,
      topMVPValue: null,
    },
    Money: {
      totalTeamOwed: null,
      topBalancePlayer: null,
      topBalanceValue: null,
    },
  };

  static getDerivedStateFromProps(props, state) {
    const { players } = props;
    if (players) {
      // Apps

      const totalTeamApps = players.reduce((totalApps, player) => totalApps + player.apps, 0);

      const teamTargetApps = players.reduce(
        (targetApps, player) => targetApps + +player.targetApps,
        0,
      );
      const allApps = players.map(player => player.apps);
      const topAppValue = Math.max(...allApps);
      const topAppObject = players.filter(player => (player.apps === topAppValue ? player.name : null));
      const topAppPlayer = topAppObject.map(player => (
        <TopStatItem data={player.name} key={player.id} />
      ));
      // Goals
      const totalTeamGoals = players.reduce((totalGoals, player) => totalGoals + player.goals, 0);
      const teamTargetGoals = players.reduce(
        (targetGoals, player) => targetGoals + +player.targetGoals,
        0,
      );
      const allGoals = players.map(player => player.goals);
      const topGoalValue = Math.max(...allGoals);
      const topGoalObject = players.filter(player => (player.goals === topGoalValue ? player.name : null));
      const topGoalPlayer = topGoalObject.map(player => (
        <TopStatItem data={player.name} key={player.id} />
      ));
      const getGoalsPerMatch = players.map(player => (player.apps > 1 ? player.goals / player.apps : null));
      const topGoalsPerMatchValue = Math.max(...getGoalsPerMatch);
      const topGoalsPerMatchObject = players.filter(player => (player.goals / player.apps === topGoalsPerMatchValue && player.apps > 1
        ? player.name
        : null));
      const topGoalsPerMatchPlayer = topGoalsPerMatchObject.map(player => (
        <TopStatItem data={player.name} key={player.id} />
      ));
      // Assists
      const totalTeamAssists = players.reduce(
        (totalAssists, player) => totalAssists + player.assists,
        0,
      );
      const teamTargetAssists = players.reduce(
        (targetAssists, player) => targetAssists + +player.targetAssists,
        0,
      );
      const allAssists = players.map(player => player.assists);
      const topAssistValue = Math.max(...allAssists);
      const topAssistObject = players.filter(player => (player.assists === topAssistValue ? player.name : null));
      const topAssistPlayer = topAssistObject.map(player => (
        <TopStatItem data={player.name} key={player.id} />
      ));
      const getAssistsPerMatch = players.map(player => (player.apps > 1 ? player.assists / player.apps : null));
      const topAssistsPerMatchValue = Math.max(...getAssistsPerMatch);
      const topAssistsPerMatchObject = players.filter(player => (player.assists / player.apps === topAssistsPerMatchValue && player.apps > 1
        ? player.name
        : null));
      const topAssistsPerMatchPlayer = topAssistsPerMatchObject.map(player => (
        <TopStatItem data={player.name} key={player.id} />
      ));
      // MVP
      const totalTeamMVP = players.reduce((totalMVP, player) => totalMVP + player.mvp, 0);
      const allMVP = players.map(player => player.mvp);
      const topMVPValue = Math.max(...allMVP);
      const topMVPObject = players.filter(player => (player.mvp === topMVPValue ? player.name : null));
      const topMVPPlayer = topMVPObject.map(player => (
        <TopStatItem data={player.name} key={player.id} />
      ));

      // Money
      const totalTeamOwed = players.reduce(
        (totalOwed, player) => totalOwed + parseFloat(player.balance.toString()),
        0,
      );
      const allBalance = players.map(player => player.balance);
      const topBalanceValue = Math.max(...allBalance);
      const topBalanceObject = players.filter(player => (player.balance === topBalanceValue ? player.name : null));
      const topBalancePlayer = topBalanceObject.map(player => player.name);

      return {
        Apps: { totalTeamApps, teamTargetApps, topAppPlayer, topAppValue },
        Goals: {
          totalTeamGoals,
          teamTargetGoals,
          topGoalPlayer,
          topGoalValue,
          topGoalsPerMatchPlayer,
          topGoalsPerMatchValue,
        },
        Assists: {
          totalTeamAssists,
          teamTargetAssists,
          topAssistPlayer,
          topAssistValue,
          topAssistsPerMatchPlayer,
          topAssistsPerMatchValue,
        },
        MVP: { totalTeamMVP, topMVPPlayer, topMVPValue },
        Money: { totalTeamOwed, topBalancePlayer, topBalanceValue },
      };
    }
    return state;
  }

  render() {
    const { players, results } = this.props;
    const { Apps, Goals, Assists, Money, MVP } = this.state;

    if (players) {
      const forfeitedMatches = results.filter(result => result.forfeitedMatch);
      const totalMatches = results.length - forfeitedMatches.length;
      const playersPerMatch = results ? Apps.totalTeamApps / totalMatches : null;
      const mvpPerGame = results ? MVP.totalTeamMVP / totalMatches : null;
      const totalPlayers = players.length;

      return (
        <Container>
          <PageHeader title="Squad" icon="" link="/" />
          <TotalsTable
            Apps={Apps}
            Goals={Goals}
            Assists={Assists}
            MVP={MVP}
            Money={Money}
            totalPlayers={totalPlayers}
            playersPerMatch={playersPerMatch}
            mvpPerGame={mvpPerGame}
            players={players}
          />
          <SquadList
            players={players}
            totalGoals={Goals.totalTeamGoals}
            totalMatches={totalMatches}
          />
        </Container>
      );
    }
    return <Spinner />;
  }
}

Players.propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  players: PropTypes.instanceOf(Array),
  results: PropTypes.instanceOf(Array),
};

Players.defaultProps = { players: [], results: [] };

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
)(Players);
