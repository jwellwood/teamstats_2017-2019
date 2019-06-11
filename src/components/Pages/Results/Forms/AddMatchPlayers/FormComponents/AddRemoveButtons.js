import React from 'react';
import PropTypes from 'prop-types';
// MUI
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';

const AddRemoveButtons = props => {
  const { added, onAddPlayer, onResetPlayer } = props;
  return (
    <div>
      {!added ? (
        <Fab size="small" color="secondary" onClick={onAddPlayer}>
          <Icon>add</Icon>
        </Fab>
      ) : (
        <IconButton onClick={onResetPlayer}>
          <Icon>autorenew</Icon>
        </IconButton>
      )}
    </div>
  );
};

AddRemoveButtons.propTypes = {
  added: PropTypes.bool.isRequired,
  onAddPlayer: PropTypes.func.isRequired,
  onResetPlayer: PropTypes.func.isRequired,
};

export default AddRemoveButtons;
