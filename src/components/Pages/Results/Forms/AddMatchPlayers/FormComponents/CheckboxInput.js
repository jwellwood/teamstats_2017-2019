import React from 'react';
import PropTypes from 'prop-types';
// MUI
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

const CheckboxInput = props => {
  const { mvp, onMVPSelect } = props;
  return (
    <FormControl>
      <Checkbox checked={mvp} onChange={onMVPSelect} />
      <FormHelperText style={{ textAlign: 'center' }} id="weight-helper-text">
        MVP
      </FormHelperText>
    </FormControl>
  );
};

CheckboxInput.propTypes = {
  mvp: PropTypes.bool.isRequired,
  onMVPSelect: PropTypes.func.isRequired,
};

export default CheckboxInput;
