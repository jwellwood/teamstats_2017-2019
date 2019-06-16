import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
// MUI
import Button from '@material-ui/core/Button';
// Components
import ValidationMessage from '../../../layout/Forms/ValidationMessage';
import PageHeader from '../../../layout/Navs/PageHeader';
import FormFields from '../../../layout/Forms/FormFields';
import AddMatchPlayers from './AddMatchPlayers';
import {
  date,
  matchType,
  forfeitedMatch,
  homeOrAway,
  teamScore,
  opponentName,
  opponentScore,
  matchNotes,
  matchPlayers,
} from './Data';

class AddResultForm extends Component {
  state = {
    formData: {
      date,
      matchType,
      forfeitedMatch,
      homeOrAway,
      teamScore,
      opponentName,
      opponentScore,
      matchNotes,
      matchPlayers,
    },
  };

  updateForm = newState => {
    this.setState({ formData: newState });
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: +e.target.value });
  };

  submitForm = e => {
    const { formData } = this.state;
    e.preventDefault();
    const dataToSubmit = {};
    let formIsValid = true;

    Object.keys(formData).forEach(key => {
      dataToSubmit[key] = formData[key].value;
      formIsValid = formData[key].valid && formIsValid;
    });

    const goalsScoredByPlayers = formData.matchPlayers.value
      .map(a => a.matchGoals)
      .reduce((a, b) => a + b, 0);
    if (+formData.teamScore.value < goalsScoredByPlayers) {
      formIsValid = false;
    }

    if (formIsValid) {
      const { firestore, history } = this.props;
      firestore
        .add({ collection: 'results' }, dataToSubmit)
        .then(() => this.setState({
          formData: {
            date,
            matchType,
            forfeitedMatch,
            homeOrAway,
            teamScore,
            opponentName,
            opponentScore,
            matchNotes,
            matchPlayers,
          },
        }))
        .then(() => history.push('/results'));
    } else {
      this.setState({ submissionError: true });
    }
  };

  render() {
    const { formData, submissionError } = this.state;
    const teamGoals = +formData.teamScore.value;
    const goalsScoredByPlayers = formData.matchPlayers.value
      .map(a => a.matchGoals)
      .reduce((a, b) => a + b, 0);
    const assistsByPlayers = formData.matchPlayers.value
      .map(a => a.matchAssists)
      .reduce((a, b) => a + b, 0);
    const submissionErrorMessage = (
      <ValidationMessage>
        <div style={{ maxWidth: '260px', margin: '5px auto' }}>
          {teamGoals < goalsScoredByPlayers || teamGoals < assistsByPlayers
            ? 'You have entered more goals / assists for players than the team scored'
            : 'There was a problem with the submission. Check the fields marked *'}
        </div>
      </ValidationMessage>
    );
    return (
      <div>
        <PageHeader title="Add Match" link="/results" />
        <form onSubmit={this.submitForm}>
          <FormFields
            formData={formData}
            change={newState => this.updateForm(newState)}
            onblur={newState => this.updateForm(newState)}
          />
          {formData.forfeitedMatch.value === false ? (
            <AddMatchPlayers matchPlayers={formData.matchPlayers} />
          ) : null}

          {submissionError ? submissionErrorMessage : null}
          <Button style={{ margin: '10px auto' }} variant="contained" color="primary" type="submit">
            Add Match
          </Button>
        </form>
      </div>
    );
  }
}

AddResultForm.propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default compose(
  firestoreConnect([{ collection: 'players', orderBy: ['apps', 'desc'] }]),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({ players: state.firestore.ordered.players })),
)(AddResultForm);

// export default firestoreConnect()(AddResultForm);
