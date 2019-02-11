import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Firestore
import { firestoreConnect } from 'react-redux-firebase';
// MUI
import Button from '@material-ui/core/Button';

import FormFields from '../FormFields';
import PageHeader from '../../../layout/Navs/PageHeader';
import ValidationMessage from '../layout/ValidationMessage';

class AddPlayerForm extends Component {
  state = {
    formData: {
      image: {
        element: 'file',
        value: '',
        label: true,
        labelText: 'Player Image',
        config: {
          name: 'player_image_input',
          type: 'file',
        },
        validation: { required: false },
        valid: true,
      },
      name: {
        element: 'input',
        value: '',
        label: true,
        labelText: 'Player Details*',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Name',
        },
        validation: { required: true, minChar: 3 },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      number: {
        element: 'input',
        value: 0,
        label: false,
        labelText: 'Number',
        config: {
          name: 'number_input',
          type: 'number',
          placeholder: 'Number',
        },
        validation: { required: false },
        valid: true,
      },
      position: {
        element: 'select',
        value: 'GK',
        label: true,
        labelText: 'Position',
        config: {
          name: 'position_input',
          options: [
            { val: 'GK', text: 'Goalkeeper' },
            { val: 'DF', text: 'Defender' },
            { val: 'MF', text: 'Midfielder' },
            { val: 'FW', text: 'Forward' },
          ],
        },
        validation: { required: false },
        valid: true,
      },
      captain: {
        element: 'checkbox',
        value: false,
        label: true,
        labelText: 'Captain',
        config: { name: 'captain_input' },
        validation: { required: false },
        valid: true,
      },
      targetApps: {
        element: 'input',
        value: 1,
        label: true,
        labelText: 'Targets',
        config: {
          name: 'targetApps_input',
          type: 'number',
          placeholder: 'Target Apps',
        },
        validation: { required: false },
        valid: true,
      },
      targetGoals: {
        element: 'input',
        value: 1,
        label: false,
        labelText: 'Target Goals',
        config: {
          name: 'targetGoals_input',
          type: 'number',
          placeholder: 'Target Goals',
        },
        validation: { required: false },
        valid: true,
      },
      targetAssists: {
        element: 'input',
        value: 1,
        label: false,
        labelText: 'Target Assists',
        config: {
          name: 'targetAssists_input',
          type: 'number',
          placeholder: 'Target Assists',
        },
        validation: { required: false },
        valid: true,
      },
      goals: {
        element: 'hidden',
        value: 0,
        label: false,
        labelText: 'Goals',
        config: {
          name: 'goals_input',
          type: 'number',
          placeholder: 'Goals',
        },
        validation: { required: false },
        valid: true,
      },
      assists: {
        element: 'hidden',
        value: 0,
        label: false,
        labelText: 'Assists',
        config: {
          name: 'assists_input',
          type: 'number',
          placeholder: 'Assists',
        },
        validation: { required: false },
        valid: true,
      },
      apps: {
        element: 'hidden',
        value: 0,
        label: false,
        labelText: 'Appearances',
        config: {
          name: 'apps_input',
          type: 'number',
          placeholder: 'Apps',
        },
        validation: { required: false },
        valid: true,
      },
      mvp: {
        element: 'hidden',
        value: 0,
        label: false,
        labelText: 'MVP',
        config: {
          name: 'mvp_input',
          type: 'number',
          placeholder: 'MVP',
        },
        validation: { required: false },
        valid: true,
      },
      balance: {
        element: 'input',
        value: 0,
        label: true,
        labelText: 'Money owed',
        config: {
          name: 'balance_input',
          type: 'number',
          placeholder: '$ € £',
        },
        validation: { required: false },
        valid: true,
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
