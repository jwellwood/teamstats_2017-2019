import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import Container from '../../hoc/Container';
import { MoreStatsTransition } from '../../../helpers/transitions';

const styles = {
  appBar: { position: 'sticky' },
  flex: { flex: 1 },
};

class MoreStatsModal extends Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { classes, title, children } = this.props;
    return (
      <div>
        <div className={classes.fab}>
          <Fab
            color="secondary"
            size="small"
            onClick={this.handleClickOpen}
            className={classes.button}
          >
            <i className="material-icons">bar_chart</i>
          </Fab>
        </div>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          TransitionComponent={MoreStatsTransition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {title}
              </Typography>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Container>{children}</Container>
        </Dialog>
      </div>
    );
  }
}

MoreStatsModal.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(MoreStatsModal);
