import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
import Container from '../../hoc/Container';
import Player from '../Squad/PlayerCard/Player';
import PlayerOverview from './PlayerOverview';
import PlayerTargets from './PlayerTargets';
import OtherPlayerStats from './OtherPlayerStats';
// helpers
import { PlayerStatsTransition } from '../../../helpers/transitions';

const styles = {
  appBar: { position: 'sticky' },
  flex: { flex: 1 },
};

class PlayerDetails extends React.Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { classes, player, totalGoals, totalMatches } = this.props;
    return (
      <div>
        <div role="presentation" onClick={this.handleClickOpen}>
          <Player player={player} totalGoals={totalGoals} />
        </div>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          scroll="paper"
          TransitionComponent={PlayerStatsTransition}
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
            <PlayerOverview player={player} totalMatches={totalMatches} />
            <PlayerTargets player={player} />
            <OtherPlayerStats player={player} totalGoals={totalGoals} />
          </Container>
        </Dialog>
      </div>
    );
  }
}

PlayerDetails.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
  totalGoals: PropTypes.number.isRequired,
  totalMatches: PropTypes.number.isRequired,
};

export default withStyles(styles)(PlayerDetails);
