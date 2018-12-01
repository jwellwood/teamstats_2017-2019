import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

function Transition(props) {
  return (
    <Slide
      direction="down"
      {...props}
      timeout={{
        enter: 2000,
        exit: 500,
      }}
    />
  );
}

const styles = theme => ({
  root: {
    fontWeight: 'bold',
    backgroundColor: '#eee',
  },
  avatar: {
    margin: 'auto',
    backgroundColor: '#222',
    color: 'rgba(255, 160, 0)',
  },
  runnerUp: {
    margin: 'auto',
    backgroundColor: '#222',
    color: theme.palette.primary.light,
  },
});

class Trophies extends React.Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    // Data to map
    let id = 0;
    function createData(icon, name, text, type) {
      id += 1;
      return { id, icon, name, text, type };
    }

    const listItems = [
      createData(<i className="fas fa-trophy" />, 'IFL Copita', '2018, winners', 'winner'),
      createData(<i className="far fa-star" />, '4th', '2017, best league finish', 'fourth'),
      createData(<i className="fas fa-trophy" />, 'IFL Cup', '2016, winners', 'winner'),
      createData(<i className="fas fa-medal" />, 'League Cup', '2015, runner-up', 'runnerUp'),
    ];
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
        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={this.handleClose}>
          <DialogContent>
            <List className={classes.root}>
              {listItems.map(item => (
                <Grid key={item.id}>
                  <ListItem onClick={this.handleClose}>
                    <Avatar className={item.type === 'winner' ? classes.avatar : classes.runnerUp}>
                      {item.icon}
                    </Avatar>
                    <ListItemText primary={item.name} secondary={item.text} />
                  </ListItem>
                </Grid>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" variant="text">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Trophies.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(Trophies);
