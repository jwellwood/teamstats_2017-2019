import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Grid from '@material-ui/core/Grid';

import Divider from '@material-ui/core/Divider';
import PlayedSelect from './PlayedSelect';
import AddRemoveButtons from './AddRemoveButtons';
import NumberInput from './NumberInput';
import CheckboxInput from './CheckboxInput';

const FormComponents = props => {
  const { app, goals, assists, onChange } = props;
  return (
    <div>
      <PlayedSelect {...props} />
      {app ? (
        <div>
          <Divider />
          <Grid
            container
            direction="row"
            alignItems="center"
            alignContent="center"
            justify="space-between"
          >
            <Grid item xs={3}>
              <NumberInput
                name="goals"
                label="Goals"
                value={goals}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={3}>
              <NumberInput
                name="assists"
                label="Assists"
                value={assists}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={3}>
              <CheckboxInput {...props} />
            </Grid>
            <Grid item xs={2}>
              <AddRemoveButtons {...props} />
            </Grid>
          </Grid>
        </div>
      ) : null}
    </div>
  );
};

FormComponents.propTypes = {
  added: PropTypes.bool.isRequired,
  player: PropTypes.shape({}).isRequired,
  app: PropTypes.bool.isRequired,
  goals: PropTypes.number.isRequired,
  assists: PropTypes.number.isRequired,
  mvp: PropTypes.bool.isRequired,
  onAppSelect: PropTypes.func.isRequired,
  onMVPSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onResetPlayer: PropTypes.func.isRequired,
  onAddPlayer: PropTypes.func.isRequired,
};

export default FormComponents;
