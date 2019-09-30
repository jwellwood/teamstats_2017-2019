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
import { initialFormData } from './data';

class AddResultForm extends Component {
  state = {
    formData: {
      date: {
        element: 'input',
        value: '',
        label: true,
        labelText: 'Date*',
        config: {
          name: 'date_input',
          type: 'date',
          placeholder: '',
        },
        validation: { required: true },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      matchType: {
        element: 'select',
        value: 'League',
        label: true,
        labelText: 'Match Type',
        config: {
          name: 'matchType_input',
          options: [
            { val: 'League', text: 'League' },
            { val: 'Cup', text: 'Cup' },
            { val: 'Tournament', text: 'Tournament' },
            { val: 'Friendly', text: 'Friendly' },
          ],
        },
        validation: { required: false },
        valid: true,
      },
      forfeitedMatch: {
        element: 'checkbox',
        value: false,
        label: true,
        labelText: 'Forfeit',
        config: { name: 'forfeitedMatch_input' },
        validation: { required: false },
        valid: true,
      },
      homeOrAway: {
        element: 'select',
        value: 'home',
        label: true,
        labelText: 'My Team Details',
        config: {
          name: 'homeOrAway_input',
          options: [
            { val: 'home', text: 'Home' },
            { val: 'away', text: 'Away' },
          ],
        },
        validation: { required: false },
        valid: true,
      },
      teamScore: {
        element: 'input',
        value: 0,
        label: false,
        labelText: 'Team Score',
        config: {
          name: 'teamScore_input',
          type: 'number',
          placeholder: 'Score',
        },
        validation: { required: true },
        valid: true,
        touched: false,
        validationMessage: '',
      },
      opponentName: {
        element: 'input',
        value: '',
        label: true,
        labelText: 'Opponent Details*',
        config: {
          name: 'opponentName_input',
          type: 'text',
          placeholder: 'Opponent team name',
        },
        validation: { required: true, minChar: 3 },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      opponentScore: {
        element: 'input',
        value: 0,
        label: false,
        labelText: 'Opponent Score',
        config: {
          name: 'opponentScore_input',
          type: 'number',
          placeholder: 'Score',
        },
        validation: { required: true },
        valid: true,
        touched: false,
        validationMessage: '',
      },

      matchNotes: {
        element: 'textarea',
        value: '',
        label: true,
        labelText: 'Match Notes',
        config: {
          name: 'matchNotes_input',
          type: 'text',
        },
        validation: { required: false },
        valid: true,
        touched: false,
        validationMessage: '',
      },

      matchPlayers: {
        element: 'Array',
        value: [],
        label: false,
        labelText: 'Match Players',
        config: {
          name: 'matchPlayers_input',
          type: 'array',
        },
        validation: { required: false },
        valid: true,
        touched: false,
        validationMessage: '',
      },
    },
  };

  updateForm = newState => {
    this.setState({ formData: newState });
  };

  resetForm = () => {
    this.setState({
      formData: initialFormData,
    });
  };

  submitForm = e => {
    const { formData } = this.state;
    e.preventDefault();
    let dataToSubmit = {};
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
        .then(() => () => this.resetForm())
        .then(() => history.push('/results'));
    } else {
      this.setState({ submissionError: true });
    }
  };

  render() {
    const { formData, submissionError } = this.state;
    console.log(formData);
    const teamGoals = formData ? +formData.teamScore.value : null;
    const goalsScoredByPlayers = formData
      ? formData.matchPlayers.value
          .map(a => a.matchGoals)
          .reduce((a, b) => a + b, 0)
      : null;
    const assistsByPlayers = formData
      ? formData.matchPlayers.value
          .map(a => a.matchAssists)
          .reduce((a, b) => a + b, 0)
      : null;
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
        <form onSubmit={e => this.submitForm(e)}>
          <FormFields
            formData={formData}
            change={newState => this.updateForm(newState)}
            onblur={newState => this.updateForm(newState)}
          />
          {formData.forfeitedMatch.value === false ? (
            <AddMatchPlayers matchPlayers={formData.matchPlayers} />
          ) : null}

          {submissionError ? submissionErrorMessage : null}
          <Button
            style={{ margin: '10px auto' }}
            variant="contained"
            color="primary"
            type="submit"
          >
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
