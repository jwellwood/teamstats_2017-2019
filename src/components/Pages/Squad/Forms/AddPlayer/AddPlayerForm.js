import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Firestore
import { firestoreConnect } from 'react-redux-firebase';
// MUI
import Button from '@material-ui/core/Button';
// Other
import FormFields from '../../../../layout/Forms/FormFields';
import PageHeader from '../../../../layout/Navs/PageHeader';
import ValidationMessage from '../../../../layout/Forms/ValidationMessage';

import {
  image,
  name,
  number,
  position,
  captain,
  targetApps,
  targetGoals,
  targetAssists,
  balance,
} from './Data';

class AddPlayerForm extends Component {
  state = {
    formData: {
      image,
      name,
      number,
      position,
      captain,
      targetApps,
      targetGoals,
      targetAssists,
      balance,
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
      firestore.add({ collection: 'players' }, dataToSubmit).then(() => history.push('/players'));
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
        <PageHeader title="Add Player" link="/players" />
        <form onSubmit={this.submitForm}>
          <FormFields
            formData={formData}
            change={newState => this.updateForm(newState)}
            onblur={newState => this.updateForm(newState)}
          />
          {submissionError ? submissionErrorMessage : null}
          <Button style={{ margin: '10px auto' }} variant="contained" color="primary" type="submit">
            Add Player
          </Button>
        </form>
      </div>
    );
  }
}

AddPlayerForm.propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default firestoreConnect()(AddPlayerForm);
