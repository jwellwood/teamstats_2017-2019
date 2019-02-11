import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// Component
import Container from '../../../hoc/Container';
import Spinner from '../../../layout/Warnings/Spinner';
import PageHeader from '../../../layout/Navs/PageHeader';
import DeleteConfirm from '../../../layout/Warnings/DeleteConfirm';
import FormTitle from '../layout/FormTitle';

const styles = () => ({
  container: {
    padding: '5px',
    margin: '10px',
    background: '#E5E8E8',
    minWidth: '260px',
  },
  formControl: { width: '250px', margin: '10px', textAlign: 'center' },
  teamAndScore: { width: '250px', margin: '10px auto', textAlign: 'center' },
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
    this.matchNotesInput = React.createRef();
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
      matchNotes: this.matchNotesInput.current.value,
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
    const textInputProps = { minLength: 2 };
    const numberInputProps = { min: 0 };
    if (result) {
      return (
        <Container>
          <PageHeader title="Edit Match" link="/results" />
          <Container>
            <Paper className={classes.container}>
              <form onSubmit={this.onSubmit}>
                <FormTitle title="Match Details" />
                <FormControl className={classes.formControl}>
                  <TextField
                    type="date"
                    name="date"
                    inputProps={textInputProps}
                    required
                    inputRef={this.dateInput}
                    defaultValue={result.date}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Select
                    native
                    inputRef={this.matchTypeInput}
                    defaultValue={result.matchType}
                    required
                    inputProps={{ name: 'matchType', id: 'matchType' }}
                  >
                    <option value="League">League</option>
                    <option value="Cup">Cup</option>
                    <option value="Tournament">Tournament</option>
                    <option value="Friendly">Friendly</option>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <Select
                    native
                    inputRef={this.resultIndicatorInput}
                    defaultValue={result.resultIndicator}
                    required
                    inputProps={{ name: 'resultIndicator', id: 'resultIndicator' }}
                  >
                    <option value="W">Win</option>
                    <option value="D">Draw</option>
                    <option value="L">Lose</option>
                  </Select>
                </FormControl>

                <FormTitle title="Score" />
                <div className={classes.teamAndScore}>
                  <Grid container direction="row" justify="space-between">
                    <Grid item xs={9}>
                      <TextField
                        label="Home Team"
                        type="text"
                        name="homeTeamName"
                        inputProps={textInputProps}
                        required
                        inputRef={this.homeTeamNameInput}
                        defaultValue={result.homeTeamName}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        label="Score"
                        type="number"
                        name="homeTeamScore"
                        inputProps={numberInputProps}
                        required
                        inputRef={this.homeTeamScoreInput}
                        defaultValue={result.homeTeamScore}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div className={classes.teamAndScore}>
                  <Grid container direction="row" justify="space-between">
                    <Grid item xs={9}>
                      <TextField
                        label="Away Team"
                        type="text"
                        name="awayTeamName"
                        inputProps={textInputProps}
                        required
                        inputRef={this.awayTeamNameInput}
                        defaultValue={result.awayTeamName}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextField
                        label="Score"
                        type="number"
                        name="awayTeamScore"
                        inputProps={numberInputProps}
                        required
                        inputRef={this.awayTeamScoreInput}
                        defaultValue={result.awayTeamScore}
                      />
                    </Grid>
                  </Grid>
                </div>
                <FormTitle title="Other" />
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Match Notes"
                    variant="filled"
                    multiline
                    type="text"
                    name="matchNotes"
                    inputRef={this.matchNotesInput}
                    defaultValue={result.matchNotes}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
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
                </FormControl>

                <Grid container direction="row" justify="space-between" alignItems="center">
                  <DeleteConfirm onDelete={this.onDelete} type="match" />
                  <Button variant="contained" color="secondary" type="submit" value="Submit">
                    Update
                  </Button>
                </Grid>
              </form>

            </Paper>
          </Container>
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
