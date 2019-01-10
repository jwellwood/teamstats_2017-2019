import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// helpers

import { Typography, ListItemSecondaryAction } from '@material-ui/core';
import { modalDown } from '../../../../helpers/transitions';

const styles = () => ({
  root: {
    fontWeight: 'bold',
    backgroundColor: '#eee',
  },
  avatar: {
    margin: 'auto',
    backgroundColor: '#F5B041',
    color: '#B7950B',
  },
  runnerUp: {
    margin: 'auto',
    backgroundColor: '#E5E7E9',
    color: '#95A5A6',
  },
});

class Trophies extends React.Component {
  state = { open: false, isAuthenticated: false };

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    }
    return { isAuthenticated: false };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, trophies, firestore } = this.props;
    const { open, isAuthenticated } = this.state;
    return (
      <div>
        <Button
          onClick={this.handleClickOpen}
          color="secondary"
          variant="contained"
          fullWidth
          size="small"
        >
          Trophy Cabinet
        </Button>
        <Dialog open={open} TransitionComponent={modalDown} onClose={this.handleClose} fullScreen>
          <DialogContent>
            {!trophies ? (
              <Typography variant="body2">No trophies... yet!</Typography>
            ) : (
              <List className={classes.root}>
                {trophies.map(trophy => (
                  <Grid key={trophy.trophyName + trophy.year}>
                    <ListItem onClick={this.handleClose}>
                      <Avatar className={trophy.winner ? classes.avatar : classes.runnerUp}>
                        <i className="fas fa-trophy" />
                      </Avatar>
                      <ListItemText
                        primary={trophy.trophyName}
                        secondary={`${trophy.year}, ${trophy.winner ? 'Winner' : 'Runner-up'}`}
                      />
                      {isAuthenticated ? (
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={() => firestore.delete({ collection: 'trophies', doc: trophy.id })
                            }
                            type="trophy"
                          >
                            <i className="material-icons">clear</i>
                          </IconButton>
                        </ListItemSecondaryAction>
                      ) : null}
                    </ListItem>
                  </Grid>
                ))}
              </List>
            )}
          </DialogContent>
          <Grid container direction="row" justify="space-between">
            <DialogActions>
              <Button component={Link} to="/addtrophy" color="secondary" variant="text">
                Add
              </Button>
            </DialogActions>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" variant="text">
                Close
              </Button>
            </DialogActions>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

Trophies.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  trophies: PropTypes.instanceOf(Array),
  firestore: PropTypes.shape({}).isRequired,
};

Trophies.defaultProps = { trophies: null };

export default compose(
  firestoreConnect(),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({ auth: state.firebase.auth })),
  // eslint-disable-next-line no-unused-vars
  withStyles(styles),
)(Trophies);
