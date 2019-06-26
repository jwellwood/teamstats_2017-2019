import React, { Component } from 'react';
import PropTypes from 'prop-types';
// MUI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const ResponsiveDialog = withMobileDialog({ breakpoint: 'xs' })(Dialog);

class StatsWrapper extends Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { children } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          aria-label="View StatsWrapper"
          onClick={this.handleClickOpen}
          size="small"
        >
          Stats
        </Button>
        <ResponsiveDialog
          fullWidth
          open={open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Stats
              </Typography>
            </Toolbar>
          </AppBar>

          <DialogContent>{children}</DialogContent>
          <DialogActions style={{ borderTop: '1px solid #333' }}>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </ResponsiveDialog>
      </React.Fragment>
    );
  }
}

StatsWrapper.propTypes = { children: PropTypes.node.isRequired };

export default StatsWrapper;
