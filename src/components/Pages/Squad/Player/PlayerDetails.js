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
import Container from '../../../hoc/Container';
import PlayerCard from './PlayerCard/PlayerCard';
import PlayerOverview from './Sections/PlayerOverview';
import PlayerTargets from './Sections/PlayerTargets';
import OtherPlayerStats from './Sections/OtherPlayerStats';
import PerGameGraph from './Sections/PerGameGraph';
// helpers
import { modalLeft } from '../../../../helpers/transitions';

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
    const { classes, player, results, players } = this.props;
    const totalMatches = results.length;
    const totalTeamGoals = players.reduce((totalGoals, a) => totalGoals + +a.goals, 0);
    return (
      <div>
        <div role="presentation" onClick={this.handleClickOpen}>
          <PlayerCard player={player} />
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
            <PlayerOverview player={player} totalMatches={totalMatches} />
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
  players: PropTypes.instanceOf(Array).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

export default withStyles(styles)(PlayerDetails);
