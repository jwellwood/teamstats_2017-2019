import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
// Components
import Spinner from '../layout/Spinner';
import Container from '../hoc/Container';
import Table from './PlayersComponents/Table';
import Totals from './PlayersComponents/Totals';
import PageHeader from '../layout/PageHeader';

class Players extends Component {
  state = {
    totalGoals: null,
    totalAssists: null,
    totalOwed: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { players } = props;
    if (players) {
      const totalGs = players.reduce((totalGoals, player) => totalGoals + player.goals, 0);
      const totalAs = players.reduce((totalAssists, player) => totalAssists + player.assists, 0);
      const totalOd = players.reduce(
        (totalOwed, player) => totalOwed + parseFloat(player.balance.toString()),
        0,
      );
      return { totalGoals: totalGs, totalAssists: totalAs, totalOwed: totalOd };
    }
    return state;
  }

  render() {
    const { players } = this.props;
    const { totalGoals, totalAssists, totalOwed } = this.state;

    if (players) {
      return (
        <Container>
          <PageHeader title="Squad" icon="fas fa-users" link="/" />
          <Totals
            totalGoals={totalGoals}
            totalAssists={totalAssists}
            totalOwed={totalOwed}
            totalPlayers={players.length}
          />
          <Table players={players} totalGoals={totalGoals} />
        </Container>
      );
    }
    return <Spinner />;
  }
}

Players.propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  players: PropTypes.instanceOf(Array),
};

Players.defaultProps = { players: [] };

export default compose(
  firestoreConnect([{ collection: 'players', orderBy: ['name', 'asc'] }]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({ players: state.firestore.ordered.players })),
)(Players);
