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
import Container from '../../../layout/hoc/Container';
import PlayerCard from './PlayerCard/PlayerCard';
import PlayerOverview from './Sections/PlayerOverview';
import PlayerTargets from './Sections/PlayerTargets';
import avatar from '../../../../assets/images/avatar.png';
// helpers
import { modalLeft } from '../../../../helpers/transitions';
// import { playerGoals } from '../../../../functions/Players/functions';
import Spinner from '../../../layout/Warnings/Spinner';
import IndividualStats from './Sections/IndividualStats';

const styles = {
  appBar: { position: 'sticky' },
  flex: { flex: 1, fontFamily: 'Righteous' },
};

class Player extends React.Component {
  state = {
    open: false,
    playerImage: avatar,
    defaultImage: avatar,
    loading: true,
  };

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

  componentDidMount() {
    // const { playerMatches } = this.props;
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.setState({ playerImage: avatar });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open, playerImage, defaultImage, loading } = this.state;
    const { auth, classes, player, results, playerMatches, playerMatchStats } = this.props;
    const totalMatches = results.length;
    const filterResults = results.filter(a => !a.forfeitedMatch);
    const totalTeamGoals = filterResults.reduce((totalGoals, a) => totalGoals + +a.teamScore, 0);
    // player.apps = playerMatches.length;

    return (
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div role="presentation" onClick={this.handleClickOpen}>
            <PlayerCard
              results={results}
              player={player}
              image={player.image ? playerImage : defaultImage}
            />
          </div>
        )}

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
              {auth ? (
                <Button color="inherit" component={Link} to={`/players/${player.id}`}>
                  edit
                </Button>
              ) : null}

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
            <IndividualStats player={player} totalTeamGoals={totalTeamGoals} />
          </Container>
        </Dialog>
      </div>
    );
  }
}

Player.propTypes = {
  auth: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
  firebase: PropTypes.shape({}).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  playerMatches: PropTypes.instanceOf(Array).isRequired,
  playerMatchStats: PropTypes.instanceOf(Array).isRequired,
};

export default compose(
  firestoreConnect(),
  withStyles(styles),
)(Player);
