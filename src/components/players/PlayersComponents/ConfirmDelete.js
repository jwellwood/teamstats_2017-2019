import React from 'react';
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
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ConfirmDelete extends React.Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { onDelete, player } = this.props;
    return (
      <div>
        <IconButton onClick={this.handleClickOpen}>
          <Icon>delete</Icon>
        </IconButton>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {`Are you sure you want to delete ${player.name}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You will lose all data for this player.{' '}
              <span style={{ color: '#9a0007', fontWeight: 'bold' }}>
                This action cannot be undone.
              </span>
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

ConfirmDelete.propTypes = {
  onDelete: PropTypes.func.isRequired,
  player: PropTypes.shape({}).isRequired,
};

export default ConfirmDelete;
