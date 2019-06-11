import React from 'react';
import PropTypes from 'prop-types';
// MUI
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

const NumberInput = props => {
  const { onChange, name, label, value } = props;

  return (
    <FormControl fullWidth style={{ padding: '10px' }}>
      <TextField
        type="number"
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        inputProps={{ min: 0, max: 99 }}
        variant="outlined"
      />
    </FormControl>
  );
};

NumberInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default NumberInput;
