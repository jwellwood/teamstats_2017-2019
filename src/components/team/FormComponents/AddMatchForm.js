import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

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
  } = props;
  const textInputProps = { minLength: 2, required: 'true' };
  const numberInputProps = { min: 0, max: 999, required: 'true' };
  return (
    <Paper className={classes.container}>
      <form onSubmit={onSubmit}>
        <Grid container direction="column" alignItems="center" justify="center">
          <TextField
            fullWidth
            className={classes.inputStyle}
            variant="outlined"
            type="date"
            name="date"
            onChange={onChange}
            value={date}
            required
          />

          <Select
            className={classes.inputStyle}
            native
            onChange={onChange}
            value={matchType}
            required
            input={<OutlinedInput name="matchType" id="matchType" labelWidth={0} />}
          >
            <option value="League">League</option>
            <option value="Cup">Cup</option>
            <option value="Tournament">Tournament</option>
            <option value="Friendly">Friendly</option>
          </Select>

          <Select
            className={classes.inputStyle}
            native
            onChange={onChange}
            value={resultIndicator}
            required
            input={<OutlinedInput name="resultIndicator" id="resultIndicator" labelWidth={0} />}
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
                    variant="outlined"
                    type="text"
                    name="homeTeamName"
                    inputProps={textInputProps}
                    onChange={onChange}
                    value={homeTeamName}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl className={classes.numberInput}>
                  <TextField
                    label="Score"
                    variant="outlined"
                    type="number"
                    name="homeTeamScore"
                    inputProps={numberInputProps}
                    onChange={onChange}
                    value={homeTeamScore}
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
                    variant="outlined"
                    type="text"
                    name="awayTeamName"
                    inputProps={textInputProps}
                    onChange={onChange}
                    value={awayTeamName}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <FormControl className={classes.numberInput}>
                  <TextField
                    label="Score"
                    variant="outlined"
                    type="number"
                    name="awayTeamScore"
                    inputProps={numberInputProps}
                    onChange={onChange}
                    value={awayTeamScore}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
        </Grid>

        <FormControlLabel
          control={<Checkbox checked={forfeitedMatch} onChange={onCheck} color="primary" />}
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
            Submit <Icon className={classes.rightIcon}>done</Icon>
          </Button>
        </div>
      </form>
    </Paper>
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
};

export default withStyles(styles)(AddMatchForm);
