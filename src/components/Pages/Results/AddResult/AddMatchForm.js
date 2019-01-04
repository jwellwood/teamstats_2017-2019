import React from 'react';
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

const styles = () => ({
  container: {
    padding: '5px',
    margin: '10px',
    border: '2px solid #17A589',
  },
  formControl: { width: '250px', margin: '10px', textAlign: 'center' },
  teamAndScore: { width: '250px', margin: '10px auto', textAlign: 'center' },
});

const AddMatchForm = props => {
  const {
    classes,
    onSubmit,
    onChange,
    onCheck,
    matchType,
    date,
    homeTeamName,
    homeTeamScore,
    awayTeamName,
    awayTeamScore,
    resultIndicator,
    forfeitedMatch,
    matchNotes,
  } = props;
  const textInputProps = { minLength: 2 };
  const numberInputProps = { min: 0, max: 999 };
  return (
    <Container>
      <Paper className={classes.container}>
        <form onSubmit={onSubmit}>
          <FormTitle title="Match Details" />
          <FormControl className={classes.formControl}>
            <TextField
              className={classes.inputStyle}
              type="date"
              name="date"
              onChange={onChange}
              value={date}
              required
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select
              className={classes.inputStyle}
              native
              onChange={onChange}
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
              onChange={onChange}
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
                <TextField
                  label="Home Team"
                  type="text"
                  name="homeTeamName"
                  inputProps={textInputProps}
                  required
                  onChange={onChange}
                  value={homeTeamName}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Score"
                  type="number"
                  name="homeTeamScore"
                  inputProps={numberInputProps}
                  required
                  onChange={onChange}
                  value={homeTeamScore}
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
                  onChange={onChange}
                  value={awayTeamName}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Score"
                  type="number"
                  name="awayTeamScore"
                  inputProps={numberInputProps}
                  required
                  onChange={onChange}
                  value={awayTeamScore}
                />
              </Grid>
            </Grid>
          </div>
          <FormTitle title="Other" />
          <FormControl className={classes.formControl}>
            <TextField
              label="Match Notes"
              placeholder="Match Notes"
              variant="outlined"
              fullWidth
              multiline
              type="text"
              name="matchNotes"
              onChange={onChange}
              value={matchNotes}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormControlLabel
              control={<Checkbox checked={forfeitedMatch} onChange={onCheck} color="primary" />}
              label="Forfeit?"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button variant="contained" color="secondary" type="submit" value="Submit">
              Submit
            </Button>
          </FormControl>
        </form>
      </Paper>
    </Container>
  );
};

AddMatchForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  matchType: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  homeTeamName: PropTypes.string.isRequired,
  homeTeamScore: PropTypes.number.isRequired,
  awayTeamName: PropTypes.string.isRequired,
  awayTeamScore: PropTypes.number.isRequired,
  resultIndicator: PropTypes.string.isRequired,
  forfeitedMatch: PropTypes.bool.isRequired,
  matchNotes: PropTypes.string.isRequired,
};

export default withStyles(styles)(AddMatchForm);
