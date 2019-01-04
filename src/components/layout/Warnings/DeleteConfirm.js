import React, { Component } from 'react';
import PropTypes from 'prop-types';
// MUI
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// Helpers
import { modalDown } from '../../../helpers/transitions';

class DeleteConfirm extends Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { onDelete, type, name } = this.props;
    const message = type === 'player' ? name : 'this match';
    return (
      <div>
        <IconButton onClick={this.handleClickOpen}>
          <Icon>delete</Icon>
        </IconButton>
        <Dialog open={open} TransitionComponent={modalDown} keepMounted onClose={this.handleClose}>
          <DialogTitle>{`Are you sure you want to delete ${message}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText>You will lose all data for this {type}.</DialogContentText>
            <hr />
            <DialogContentText style={{ color: '#9a0007', fontWeight: 'bold' }}>
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={this.handleClose} color="primary">
              Go back
            </Button>
            <Button variant="text" onClick={onDelete} color="default">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteConfirm.propTypes = {
  onDelete: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
};

DeleteConfirm.defaultProps = { name: '' };

export default DeleteConfirm;
