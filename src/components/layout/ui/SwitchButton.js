import React from 'react';
import PropTypes from 'prop-types';
// MUI
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const SwitchButton = props => {
  const { checked, handleChange, value, label } = props;
  return (
    <div style={{ textAlign: 'left', padding: '0px 5px', width: '150px' }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} value={value} />}
        label={<span style={{ fontSize: '0.75rem' }}>{label}</span>}
      />
    </div>
  );
};

SwitchButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

SwitchButton.defaultProps = { label: '' };

export default SwitchButton;
