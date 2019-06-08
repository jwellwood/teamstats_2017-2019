import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
// MUI
import Button from '@material-ui/core/Button';
// Components
import FormFields from '../../../layout/Forms/FormFields';
import PageHeader from '../../../layout/Navs/PageHeader';
import ValidationMessage from '../../../layout/Forms/ValidationMessage';
import {
  date,
  matchType,
  resultIndicator,
  forfeitedMatch,
  homeOrAway,
  teamScore,
  opponentName,
  opponentScore,
  matchNotes,
  matchPlayers,
} from './index';

class AddResultForm extends Component {
  state = {
    formData: {
      date,
      matchType,
      resultIndicator,
      forfeitedMatch,
      homeOrAway,
      teamScore,
      opponentName,
      opponentScore,
      matchNotes,
      matchPlayers,
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
