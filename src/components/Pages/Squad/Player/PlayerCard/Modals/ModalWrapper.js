import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import PlayerOverview from '../../Sections/PlayerOverview';
import IconFA from '../../../../../../assets/icons/IconFA';

const ResponsiveDialog = withMobileDialog({ breakpoint: 'xs' })(Dialog);

class ModalWrapper extends Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { auth, player, children, icon, playerImage } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        <IconButton
          aria-label='View ModalWrapper'
          color='secondary'
          onClick={this.handleClickOpen}
          size='small'
        >
          <IconFA icon={icon} />
        </IconButton>
        <ResponsiveDialog
          fullWidth
          open={open}
          onClose={this.handleClose}
          aria-labelledby='max-width-dialog-title'
        >
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h6' color='inherit'>
                {player.name}
              </Typography>
            </Toolbar>
          </AppBar>

          <DialogContent>
            <PlayerOverview player={player} playerImage={playerImage} />
            {children}
          </DialogContent>
          <DialogActions style={{ borderTop: '1px solid #333' }}>
            {auth ? (
              <Button component={Link} to={`/players/${player.id}/edit`}>
                Edit
              </Button>
            ) : null}
            <Button onClick={this.handleClose} color='primary'>
              Close
            </Button>
          </DialogActions>
        </ResponsiveDialog>
      </React.Fragment>
    );
  }
}

ModalWrapper.propTypes = {
  auth: PropTypes.bool.isRequired,
  player: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.string.isRequired,
  playerImage: PropTypes.string.isRequired,
};

export default ModalWrapper;
