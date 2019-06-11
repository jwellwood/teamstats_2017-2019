import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const BalanceForm = props => {
  const { onChange, balanceSubmit, balanceUpdateAmount } = props;
  return (
    <form onSubmit={balanceSubmit}>
      <Input
        type="number"
        placeholder="Update balance"
        name="balanceUpdateAmount"
        value={balanceUpdateAmount}
        onChange={onChange}
        required
      />
      <IconButton color="secondary" type="submit" value="Update">
        <Icon>done</Icon>
      </IconButton>
    </form>
  );
};

BalanceForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  balanceSubmit: PropTypes.func.isRequired,
  balanceUpdateAmount: PropTypes.string.isRequired,
};

export default BalanceForm;
