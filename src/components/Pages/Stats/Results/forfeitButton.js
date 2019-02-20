import React from 'react';
import PropTypes from 'prop-types';

// MUI
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const ForfeitButton = props => {
  const { checked, handleChange, value } = props;
  return (
    <div style={{ textAlign: 'left', paddingLeft: '10px', fontSize: '8px' }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} value={value} />}
        label="Include forfeits?"
      />
    </div>
  );
};

ForfeitButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ForfeitButton;
