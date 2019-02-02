/* eslint no-underscore-dangle: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
// Components
import Container from '../components/hoc/Container';
import PlayerCard from '../components/Pages/Squad/Player/PlayerCard/PlayerCard';
import PlayerOverview from '../components/Pages/Squad/Player/Sections/PlayerOverview';
import PlayerTargets from '../components/Pages/Squad/Player/Sections/PlayerTargets';
import OtherPlayerStats from '../components/Pages/Squad/Player/Sections/OtherPlayerStats';
import PerGameGraph from '../components/Pages/Squad/Player/Sections/PerGameGraph';
import avatar from '../assets/images/avatar.png';
// helpers
import { modalLeft } from '../helpers/transitions';

const styles = {
  appBar: { position: 'sticky' },
  flex: { flex: 1 },
};

class PlayerDetails extends React.Component {
  state = { open: false, playerImage: '', defaultImage: avatar };

  _isMounted = false;

  componentWillMount() {
    this._isMounted = true;
    const { player, firebase } = this.props;
    const { defaultImage } = this.state;
    if (player.image) {
      firebase
        .storage()
        .ref('players')
        .child(player.image)
        .getDownloadURL()
        .then(url => {
          if (this._isMounted) {
            this.setState({ playerImage: url });
          }
        });
    }
    return defaultImage;
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ playerImage: '' });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open, playerImage, defaultImage } = this.state;
    const { classes, player, results, players } = this.props;
    const totalMatches = results.length;
    const totalTeamGoals = players.reduce((totalGoals, a) => totalGoals + +a.goals, 0);
    return (
      <div>
        <div role="presentation" onClick={this.handleClickOpen}>
          <PlayerCard player={player} image={player.image ? playerImage : defaultImage} />
        </div>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          scroll="paper"
          TransitionComponent={modalLeft}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {player.name}
              </Typography>
              <Button color="inherit" component={Link} to={`/players/${player.id}`}>
                edit
              </Button>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Container>
            <PlayerOverview
              player={player}
              totalMatches={totalMatches}
              image={player.image ? playerImage : defaultImage}
            />
            <PlayerTargets player={player} />
            <PerGameGraph player={player} />
            <OtherPlayerStats player={player} totalTeamGoals={totalTeamGoals} />
          </Container>
        </Dialog>
      </div>
    );
  }
}

PlayerDetails.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
  firebase: PropTypes.shape({}).isRequired,
  players: PropTypes.instanceOf(Array).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

export default compose(
  firestoreConnect(),
  withStyles(styles),
)(PlayerDetails);
