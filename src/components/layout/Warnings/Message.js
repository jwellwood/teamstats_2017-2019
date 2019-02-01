import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({ close: { padding: theme.spacing.unit / 2 } });

class Message extends React.Component {
  state = { open: false };

  componentWillMount() {
    const { message } = this.props;
    if (message) {
      this.setState({ open: true });
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes, message } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

// propTypes
Message.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  message: PropTypes.string.isRequired,
};

export default withStyles(styles)(Message);
