import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
// Components
import Container from '../../hoc/Container';
// Helpers
import { modalDown } from '../../../helpers/transitions';

const styles = () => ({
  appBar: { position: 'sticky' },
  flex: { flex: 1 },
  buttons: { background: '#333', padding: '5px 0px', margin: '10px auto' },
  button: { margin: '10px' },
  fab: { margin: '5px' },
});

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
    const { classes, title, link, icon, children } = this.props;
    return (
      <div>
        <Paper className={classes.buttons}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            size="small"
            onClick={this.handleClickOpen}
          >
            View {title} stats
          </Button>
          <Fab className={classes.fab} component={Link} to={link} size="small" color="default">
            <i className="material-icons">{icon}</i>
          </Fab>
        </Paper>
        <Dialog fullScreen open={open} onClose={this.handleClose} TransitionComponent={modalDown}>
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

MoreStatsModal.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(MoreStatsModal);
