import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
// Form
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Input from '@material-ui/core/Input';

// styling
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

const textInputProps = { minLength: 2, required: true };
const numberInputProps = { min: 1, required: true };

// Component
const AddForm = props => {
  const {
    classes,
    onSubmit,
    onChange,
    name,
    number,
    position,
    targetApps,
    targetGoals,
    targetAssists,
  } = props;
  return (
    <Paper className={classes.container}>
      <form onSubmit={onSubmit}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            type="text"
            name="name"
            inputProps={textInputProps}
            onChange={onChange}
            value={name}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="number">Number</InputLabel>
          <Input
            type="number"
            name="number"
            inputProps={numberInputProps}
            onChange={onChange}
            value={number}
          />
        </FormControl>

        <Select
          className={classes.inputStyle}
          native
          onChange={onChange}
          value={position}
          input={<OutlinedInput name="position" id="position" labelWidth={0} />}
        >
          <option value="GK">Goalkeeper</option>
          <option value="DF">Defender</option>
          <option value="MF">Midfielder</option>
          <option value="FW">Forward</option>
        </Select>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="targetApps">Target Appearances</InputLabel>
          <Input
            type="number"
            name="targetApps"
            inputProps={numberInputProps}
            onChange={onChange}
            value={targetApps}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="targetGoals">Target Goals</InputLabel>
          <Input
            type="number"
            name="targetGoals"
            inputProps={numberInputProps}
            onChange={onChange}
            value={targetGoals}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="targetAssists">Target Assists</InputLabel>
          <Input
            type="number"
            name="targetAssists"
            inputProps={numberInputProps}
            onChange={onChange}
            value={targetAssists}
          />
        </FormControl>
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

AddForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  targetApps: PropTypes.string.isRequired,
  targetGoals: PropTypes.string.isRequired,
  targetAssists: PropTypes.string.isRequired,
};

export default withStyles(styles)(AddForm);
