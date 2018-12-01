import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
// Component
import Grid from '@material-ui/core/Grid';
import Container from '../hoc/Container';
import ConfirmDelete from './PlayersComponents/ConfirmDelete';
import Spinner from '../layout/Spinner';
import PageHeader from '../layout/PageHeader';

const styles = theme => ({
  container: {
    padding: '5px',
    textAlign: 'center',
  },
  formControl: {
    margin: '20px auto',
    width: '200px',
    display: 'block',
  },
  button: { margin: theme.spacing.unit },
  rightIcon: { marginLeft: theme.spacing.unit },
});

class EditPlayer extends Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.numberInput = React.createRef();
    this.targetAppsInput = React.createRef();
    this.targetGoalsInput = React.createRef();
    this.targetAssistsInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { player, firestore, history } = this.props;
    const updatedPlayer = {
      name: this.nameInput.current.value,
      number: this.numberInput.current.value,
      targetApps: this.targetAppsInput.current.value,
      targetGoals: this.targetGoalsInput.current.value,
      targetAssists: this.targetAssistsInput.current.value,
    };
    firestore
      .update({ collection: 'players', doc: player.id }, updatedPlayer)
      .then(history.push('/players'));
  };

  onDelete = () => {
    const { player, firestore, history } = this.props;
    firestore.delete({ collection: 'players', doc: player.id }).then(history.push('/players'));
  };

  render() {
    const { classes, player } = this.props;
    const textInputProps = { minLength: 2, required: 'true' };
    const numberInputProps = { min: 1, required: 'true' };
    if (player) {
      return (
        <Container>
          <PageHeader title="Edit Player" icon="fas fa-user-edit" link="/players" />
          <Paper className={classes.container}>
            <form onSubmit={this.onSubmit}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input
                  type="text"
                  name="name"
                  minLength="2"
                  inputProps={textInputProps}
                  inputRef={this.nameInput}
                  defaultValue={player.name}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="number">Number</InputLabel>
                <Input
                  type="number"
                  name="number"
                  inputProps={numberInputProps}
                  inputRef={this.numberInput}
                  defaultValue={player.number}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="targetApps">Target Appearances</InputLabel>
                <Input
                  type="number"
                  name="targetApps"
                  required
                  inputProps={numberInputProps}
                  inputRef={this.targetAppsInput}
                  defaultValue={player.targetApps}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="targetGoals">Target Goals</InputLabel>
                <Input
                  type="number"
                  name="targetGoals"
                  inputProps={numberInputProps}
                  inputRef={this.targetGoalsInput}
                  defaultValue={player.targetGoals}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="targetAssists">Target Assists</InputLabel>
                <Input
                  type="number"
                  name="targetAssists"
                  inputProps={numberInputProps}
                  inputRef={this.targetAssistsInput}
                  defaultValue={player.targetAssists}
                />
              </FormControl>
              <Grid container direction="row" justify="space-between" alignItems="center">
                <ConfirmDelete onDelete={this.onDelete} player={player} />
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  type="submit"
                  value="Submit"
                >
                  Update <Icon className={classes.rightIcon}>edit</Icon>
                </Button>
              </Grid>
            </form>
          </Paper>
        </Container>
      );
    }
    return <Spinner />;
  }
}

EditPlayer.propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}),
};

EditPlayer.defaultProps = { player: {} };

export default compose(
  firestoreConnect(props => [
    { collection: 'players', storeAs: 'player', doc: props.match.params.id },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect(({ firestore: { ordered } }, props) => ({ player: ordered.player && ordered.player[0] })),
  withStyles(styles),
)(EditPlayer);
