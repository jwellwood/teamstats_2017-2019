import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
// Form
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
// Component
import Container from '../../hoc/Container';
import PageHeader from '../../layout/Navs/PageHeader';
import ConfirmDelete from '../ConfirmDelete';
import Spinner from '../../layout/Warnings/Spinner';

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
  inputStyle: { width: '200px', display: 'block', margin: '5px auto' },
});

class EditPlayer extends Component {
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.numberInput = React.createRef();
    this.positionInput = React.createRef();
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
      position: this.positionInput.current.value,
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
    const textInputProps = { minLength: 2 };
    const numberInputProps = { min: 1 };
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
                  required
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
                  required
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

              <Select
                className={classes.inputStyle}
                native
                inputRef={this.positionInput}
                defaultValue={player.position}
                required
                input={<FilledInput name="position" id="position" labelwidth={0} />}
              >
                <option value="GK">Goalkeeper</option>
                <option value="DF">Defender</option>
                <option value="MF">Midfielder</option>
                <option value="FW">Forward</option>
              </Select>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="targetGoals">Target Goals</InputLabel>
                <Input
                  type="number"
                  name="targetGoals"
                  inputProps={numberInputProps}
                  required
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
                  required
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
