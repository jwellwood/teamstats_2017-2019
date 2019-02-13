import React, { Component } from 'react';
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
import ResultCard from './ResultsCard/ResultCard';
// helpers
import { modalLeft } from '../../../../helpers/transitions';
import MatchDetails from './Sections/MatchDetails';
import MatchStats from './Sections/MatchStats';
import MatchReport from './Sections/MatchReport';

const styles = {
  appBar: { position: 'sticky' },
  flex: { flex: 1, fontFamily: 'Righteous' },
};

class ResultDetails extends Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { classes, result, teamName } = this.props;
    return (
      <div>
        <div role="presentation" onClick={this.handleClickOpen}>
          <ResultCard result={result} teamName={teamName} />
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
                {result.opponentName}
              </Typography>

              <Button color="inherit" component={Link} to={`/results/${result.id}/`}>
                edit
              </Button>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Container>
            <MatchDetails result={result} teamName={teamName} />
            <MatchStats result={result} />
            <MatchReport result={result} />
          </Container>
        </Dialog>
      </div>
    );
  }
}

ResultDetails.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  teamName: PropTypes.string,
  result: PropTypes.shape({}).isRequired,
};

ResultDetails.defaultProps = { teamName: '' };
export default withStyles(styles)(ResultDetails);
