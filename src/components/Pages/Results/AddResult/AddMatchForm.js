import React, { Component } from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
// Components
import Container from '../../../hoc/Container';
import FormTitle from '../../../layout/Forms/FormTitle';
import MainInput from './Inputs/MainInput';

const styles = () => ({
  container: {
    padding: '5px',
    margin: '10px',
    border: '2px solid #17A589',
    minWidth: '260px',
  },
  formControl: { width: '250px', margin: '10px', textAlign: 'center' },
  teamAndScore: { width: '250px', margin: '10px auto', textAlign: 'center' },
  fullWidth: { width: '90%', margin: '10px auto', padding: '10px' },
});

class AddMatchForm extends Component {
  state = {
    date: '',
    matchType: 'League',
    homeTeamName: '',
    homeTeamScore: 0,
    awayTeamName: '',
    awayTeamScore: 0,
    resultIndicator: 'W',
    forfeitedMatch: false,
    matchNotes: '',
  };

  onSubmit = e => {
    e.preventDefault();
    const newResult = this.state;
    const { firestore, history } = this.props;
    firestore.add({ collection: 'results' }, newResult).then(() => history.push('/results'));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    this.setState({ forfeitedMatch: e.target.checked });
  };

  render() {
    const {
      matchType,
      date,
      homeTeamName,
      homeTeamScore,
      awayTeamName,
      awayTeamScore,
      resultIndicator,
      forfeitedMatch,
      stats,
      matchNotes,
    } = this.state;
    const { players, classes } = this.props;
    return (
      <Container>
        <Paper className={classes.container}>
          <form onSubmit={this.onSubmit}>
            <FormTitle title="Match Details" />
            <FormControl className={classes.formControl}>
              <MainInput onChange={this.onChange} type="date" name="date" value={date} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Select
                className={classes.inputStyle}
                native
                onChange={this.onChange}
                value={matchType}
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
                className={classes.inputStyle}
                native
                onChange={this.onChange}
                value={resultIndicator}
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
                  <MainInput
                    label="Home Team"
                    type="text"
                    name="homeTeamName"
                    onChange={this.onChange}
                    value={homeTeamName}
                  />
                </Grid>
                <Grid item xs={2}>
                  <MainInput
                    label="Score"
                    type="number"
                    name="homeTeamScore"
                    onChange={this.onChange}
                    value={homeTeamScore}
                  />
                </Grid>
              </Grid>
            </div>
            <div className={classes.teamAndScore}>
              <Grid container direction="row" justify="space-between">
                <Grid item xs={9}>
                  <MainInput
                    label="Away Team"
                    type="text"
                    name="awayTeamName"
                    onChange={this.onChange}
                    value={awayTeamName}
                  />
                </Grid>
                <Grid item xs={2}>
                  <MainInput
                    label="Score"
                    type="number"
                    name="awayTeamScore"
                    onChange={this.onChange}
                    value={awayTeamScore}
                  />
                </Grid>
              </Grid>
            </div>
            <FormControl className={classes.formControl}>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={forfeitedMatch}
                    onChange={this.onForfeitCheck}
                    color="primary"
                  />
)}
                label="Forfeit?"
              />
            </FormControl>
            <FormTitle title="Players" />
            {/* *********************************************************************
             *********************************************************************
             ******************************PLAYERS******************************** */}

            {/* <Grid container direction="column" alignItems="center" justify="center">
              {players ? (
                players.map(player => (
                  <Paper className={classes.fullWidth} key={player.id}>
                    <div style={{ textAlign: 'left' }}>{player.name}</div>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                      <Grid item xs={2}>
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={stats[0].app}
                              onChange={() => console.log(`appAdded for ${player.name}`)}
                              color="primary"
                            />
)}
                        />
                      </Grid>

                      <Grid item xs={2}>
                        <TextField
                          label="Goals"
                          type="number"
                          name="goals"
                          // disabled={!stats[0].app}
                          // inputProps={numberInputProps}
                          required
                          onChange={() => console.log(`goalAdded for ${player.name}`)}
                          value={stats[0].goals}
                        />
                      </Grid>

                      <Grid item xs={2}>
                        <TextField
                          label="Assists"
                          type="number"
                          name="assists"
                          // inputProps={numberInputProps}
                          required
                          onChange={() => console.log(`AssistAdded for ${player.name}`)}
                          value={stats[0].assists}
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={stats[0].mvp}
                              onChange={() => console.log(`mvpAdded for ${player.name}`)}
                              color="secondary"
                            />
)}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                ))
              ) : (
                <div>Add some players first!</div>
              )}
            </Grid> */}
            {/** ********************************************************************
             *********************************************************************
             ******************************PLAYERS******************************** */}
            <FormTitle title="Other" />

            <TextField
              className={classes.fullWidth}
              label="Match Notes"
              placeholder="Match Notes"
              variant="outlined"
              fullWidth
              multiline
              type="text"
              name="matchNotes"
              onChange={this.onChange}
              value={matchNotes}
            />

            <FormControl className={classes.formControl}>
              <Button variant="contained" color="secondary" type="submit" value="Submit">
                Submit
              </Button>
            </FormControl>
          </form>
        </Paper>
      </Container>
    );
  }
}

AddMatchForm.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(AddMatchForm);
