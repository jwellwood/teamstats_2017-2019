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
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// Component
import Grid from '@material-ui/core/Grid';
import Container from '../hoc/Container';
// import ConfirmDelete from './PlayersComponents/ConfirmDelete';
import ConfirmMatchDelete from './ResultsComponents/ConfirmMatchDelete';
import Spinner from '../layout/Warnings/Spinner';
import PageHeader from '../layout/Navs/PageHeader';

const styles = theme => ({
  container: {
    padding: '5px',
    textAlign: 'center',
  },
  paper: { margin: '10px auto', borderColor: theme.palette.primary.dark, border: '2px solid' },
  matchInfo: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: theme.palette.secondary.light,
  },
  inputStyle: { width: '300px', display: 'block', margin: '5px 0px' },
  numberInput: { width: '60px', margin: '0px 0px 0px 10px' },
  teamAndScore: { margin: '10px' },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class EditResult extends Component {
  constructor(props) {
    super(props);
    this.dateInput = React.createRef();
    this.matchTypeInput = React.createRef();
    this.resultIndicatorInput = React.createRef();
    this.forfeitedMatchInput = React.createRef();
    this.homeTeamNameInput = React.createRef();
    this.awayTeamNameInput = React.createRef();
    this.homeTeamScoreInput = React.createRef();
    this.awayTeamScoreInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { result, firestore, history } = this.props;
    const updatedResult = {
      date: this.dateInput.current.value,
      matchType: this.matchTypeInput.current.value,
      resultIndicator: this.resultIndicatorInput.current.value,
      forfeitedMatch: this.forfeitedMatchInput.current.checked,
      homeTeamName: this.homeTeamNameInput.current.value,
      homeTeamScore: this.homeTeamScoreInput.current.value,
      awayTeamName: this.awayTeamNameInput.current.value,
      awayTeamScore: this.awayTeamScoreInput.current.value,
    };
    firestore
      .update({ collection: 'results', doc: result.id }, updatedResult)
      .then(history.push('/results'));
  };

  onDelete = () => {
    const { result, firestore, history } = this.props;
    firestore.delete({ collection: 'results', doc: result.id }).then(history.push('/results'));
  };

  render() {
    const { classes, result } = this.props;
    const textInputProps = { minLength: 2, required: 'true' };
    const numberInputProps = { min: 0, required: 'true' };
    if (result) {
      return (
        <Container>
          <PageHeader title="Edit Match" icon="fas fa-futbol" link="/results" />
          <Paper className={classes.container}>
            <form onSubmit={this.onSubmit}>
              <Grid container direction="column" alignItems="center" justify="center">
                <TextField
                  fullWidth
                  className={classes.inputStyle}
                  variant="filled"
                  type="date"
                  name="date"
                  inputProps={textInputProps}
                  inputRef={this.dateInput}
                  defaultValue={result.date}
                />

                <Select
                  className={classes.inputStyle}
                  native
                  inputRef={this.matchTypeInput}
                  defaultValue={result.matchType}
                  required
                  input={<FilledInput name="matchType" id="matchType" labelwidth={0} />}
                >
                  <option value="League">League</option>
                  <option value="Cup">Cup</option>
                  <option value="Tournament">Tournament</option>
                  <option value="Friendly">Friendly</option>
                </Select>

                <Select
                  className={classes.inputStyle}
                  native
                  inputProps={numberInputProps}
                  inputRef={this.resultIndicatorInput}
                  defaultValue={result.resultIndicator}
                  required
                  input={
                    <FilledInput name="resultIndicator" id="resultIndicator" labelWidth={0} />
                  }
                >
                  <option value="W">Win</option>
                  <option value="D">Draw</option>
                  <option value="L">Lose</option>
                </Select>
              </Grid>

              <Grid container direction="column" justify="center" alignItems="center">
                <div className={classes.teamAndScore}>
                  <Grid container direction="row">
                    <Grid item xs={9}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          label="Home Team"
                          placeholder="Home Team"
                          variant="filled"
                          type="text"
                          name="homeTeamName"
                          inputProps={textInputProps}
                          inputRef={this.homeTeamNameInput}
                          defaultValue={result.homeTeamName}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                      <FormControl className={classes.numberInput}>
                        <TextField
                          label="Score"
                          variant="filled"
                          type="number"
                          name="homeTeamScore"
                          inputProps={numberInputProps}
                          inputRef={this.homeTeamScoreInput}
                          defaultValue={result.homeTeamScore}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.teamAndScore}>
                  <Grid container direction="row">
                    <Grid item xs={9}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          label="Away Team"
                          placeholder="Away Team"
                          variant="filled"
                          type="text"
                          name="awayTeamName"
                          inputProps={textInputProps}
                          inputRef={this.awayTeamNameInput}
                          defaultValue={result.awayTeamName}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                      <FormControl className={classes.numberInput}>
                        <TextField
                          label="Score"
                          variant="filled"
                          type="number"
                          name="awayTeamScore"
                          inputProps={numberInputProps}
                          inputRef={this.awayTeamScoreInput}
                          defaultValue={result.awayTeamScore}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>

              </Grid>
              <FormControlLabel
                control={(
                  <Checkbox
                    inputRef={this.forfeitedMatchInput}
                    defaultChecked={result.forfeitedMatch}
                    color="primary"
                  />
                )}
                label="Forfeit?"
              />
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  type="submit"
                  value="Submit"
                >
                  Update <Icon className={classes.rightIcon}>edit</Icon>
                </Button>
              </div>

            </form>
            <ConfirmMatchDelete onDelete={this.onDelete} />
          </Paper>
        </Container>
      );
    }
    return <Spinner />;
  }
}

EditResult.propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}),
};

EditResult.defaultProps = { result: {} };

export default compose(
  firestoreConnect(props => [
    { collection: 'results', storeAs: 'result', doc: props.match.params.id },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect(({ firestore: { ordered } }, props) => ({ result: ordered.result && ordered.result[0] })),
  withStyles(styles),
)(EditResult);
