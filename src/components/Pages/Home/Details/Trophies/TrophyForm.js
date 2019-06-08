import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const styles = () => ({
  container: {
    padding: '5px',
    margin: '10px',
    border: '2px solid #17A589',
    minWidth: '260px',
  },
  formControl: { width: '250px', margin: '10px', textAlign: 'center' },
  teamAndScore: { width: '250px', margin: '10px auto', textAlign: 'center' },
});

const textInputProps = { minLength: 2 };

const TrophyForm = props => {
  const { classes, trophyName, year, winner, onSubmit, onChange, onCheck } = props;
  return (
    <form onSubmit={onSubmit}>
      <FormControl className={classes.formControl}>
        <TextField
          label="Trophy Name"
          type="text"
          name="trophyName"
          inputProps={textInputProps}
          required
          onChange={onChange}
          value={trophyName}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          label="Year"
          type="text"
          name="year"
          inputProps={{ minLength: 4, maxLength: 4 }}
          required
          onChange={onChange}
          value={year}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <FormControlLabel
          control={<Checkbox checked={winner} onChange={onCheck} color="primary" />}
          label="Winner?"
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Button variant="contained" color="secondary" type="submit" value="Submit">
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

TrophyForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  trophyName: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  winner: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
};

export default withStyles(styles)(TrophyForm);
