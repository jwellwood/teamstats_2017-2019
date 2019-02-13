import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
// MUI
import Button from '@material-ui/core/Button';
// Components
import FormFields from '../FormFields';
import PageHeader from '../../../layout/Navs/PageHeader';
import ValidationMessage from '../layout/ValidationMessage';

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
      resultIndicator: {
        element: 'select',
        value: 'W',
        label: true,
        labelText: 'Result',
        config: {
          name: 'resultIndicator_input',
          options: [
            { val: 'W', text: 'Win' },
            { val: 'D', text: 'Draw' },
            { val: 'L', text: 'Lose' },
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
          options: [{ val: 'home', text: 'Home' }, { val: 'away', text: 'Away' }],
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
    },
    submissionError: false,
  };

  updateForm = newState => {
    this.setState({ formData: newState });
  };

  submitForm = e => {
    const { formData } = this.state;
    e.preventDefault();
    const dataToSubmit = {};
    let formIsValid = true;

    Object.keys(formData).forEach(key => {
      dataToSubmit[key] = formData[key].value;
    });

    Object.keys(formData).forEach(key => {
      formIsValid = formData[key].valid && formIsValid;
    });

    if (formIsValid) {
      const { firestore, history } = this.props;
      firestore.add({ collection: 'results' }, dataToSubmit).then(() => history.push('/results'));
    } else {
      this.setState({ submissionError: true });
    }
  };

  render() {
    const { formData, submissionError } = this.state;
    const submissionErrorMessage = (
      <ValidationMessage>
        <div style={{ maxWidth: '260px', margin: '5px auto' }}>
          There was a problem with the submission. Check the fields marked *
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

export default firestoreConnect()(AddResultForm);
