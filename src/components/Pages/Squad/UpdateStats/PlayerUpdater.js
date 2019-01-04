import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
// Components
import Container from '../../../hoc/Container';
import DetailsHeader from './DetailsHeader';
import Spinner from '../../../layout/Warnings/Spinner';
import BalanceForm from './BalanceForm';
import StatsUpdater from './StatsUpdater';

class PlayerUpdater extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: '',
    isAuthenticated: false,
  };

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    }
    return { isAuthenticated: false };
  }

  // ******************************************************************************

  addAppButton = () => {
    const { player, firestore } = this.props;
    const addApp = { apps: player.apps + 1 };
    firestore.update({ collection: 'players', doc: player.id }, addApp);
  };

  addGoalButton = () => {
    const { player, firestore } = this.props;
    const addGoal = { goals: player.goals + 1 };
    firestore.update({ collection: 'players', doc: player.id }, addGoal);
  };

  addAssistButton = () => {
    const { player, firestore } = this.props;
    const addAssist = { assists: player.assists + 1 };
    firestore.update({ collection: 'players', doc: player.id }, addAssist);
  };

  addMvpButton = () => {
    const { player, firestore } = this.props;
    const addMvp = { mvp: player.mvp + 1 };
    firestore.update({ collection: 'players', doc: player.id }, addMvp);
  };

  // ***************************************************************************

  removeAppButton = () => {
    const { player, firestore } = this.props;
    const removeApp = { apps: player.apps - 1 };
    firestore.update({ collection: 'players', doc: player.id }, removeApp);
  };

  removeGoalButton = () => {
    const { player, firestore } = this.props;
    const removeGoal = { goals: player.goals - 1 };
    firestore.update({ collection: 'players', doc: player.id }, removeGoal);
  };

  removeAssistButton = () => {
    const { player, firestore } = this.props;
    const removeAssist = { assists: player.assists - 1 };
    firestore.update({ collection: 'players', doc: player.id }, removeAssist);
  };

  removeMvpButton = () => {
    const { player, firestore } = this.props;
    const removeMvp = { mvp: player.mvp - 1 };
    firestore.update({ collection: 'players', doc: player.id }, removeMvp);
  };

  // *********************************************************************************

  toggleBalanceForm = () => {
    const { showBalanceUpdate } = this.state;
    this.setState({ showBalanceUpdate: !showBalanceUpdate });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  balanceReset = () => {
    const { player, firestore } = this.props;
    const resetBalance = { balance: player.balance - player.balance };
    firestore.update({ collection: 'players', doc: player.id }, resetBalance);
  };

  balanceSubmit = e => {
    e.preventDefault();
    const { player, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;
    const playerBalanceUpdate = { balance: parseFloat(balanceUpdateAmount) };
    firestore.update({ collection: 'players', doc: player.id }, playerBalanceUpdate);
  };

  // *********************************************************************************

  render() {
    const { player } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount, isAuthenticated } = this.state;
    let balanceForm = '';
    if (showBalanceUpdate) {
      balanceForm = (
        <BalanceForm
          balanceSubmit={this.balanceSubmit}
          balanceUpdateAmount={balanceUpdateAmount}
          onChange={this.onChange}
        />
      );
    } else {
      balanceForm = null;
    }
    if (player) {
      if (player.apps === 0) {
        player.apps = 0;
      }
      return (
        <Container>
          <DetailsHeader player={player} />
          <StatsUpdater
            player={player}
            isAuthenticated={isAuthenticated}
            toggleBalanceForm={this.toggleBalanceForm}
            balanceForm={balanceForm}
            addAppButton={this.addAppButton}
            removeAppButton={this.removeAppButton}
            addGoalButton={this.addGoalButton}
            removeGoalButton={this.removeGoalButton}
            addAssistButton={this.addAssistButton}
            removeAssistButton={this.removeAssistButton}
            addMvpButton={this.addMvpButton}
            removeMvpButton={this.removeMvpButton}
            balanceReset={this.balanceReset}
          />
        </Container>
      );
    }
    return <Spinner />;
  }
}

PlayerUpdater.propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}),
  auth: PropTypes.shape({}).isRequired,
};

PlayerUpdater.defaultProps = { player: {} };

export default compose(
  firestoreConnect(props => [
    { collection: 'players', storeAs: 'player', doc: props.match.params.id },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({
    player: state.firestore.ordered.player && state.firestore.ordered.player[0],
    auth: state.firebase.auth,
  })),
)(PlayerUpdater);
