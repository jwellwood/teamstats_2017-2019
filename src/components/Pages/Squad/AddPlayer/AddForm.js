import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// Form
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Container from '../../../hoc/Container';
import FormTitle from '../../../layout/Forms/FormTitle';
import FileUpload from '../../../layout/Forms/FileUpload';
import avatar from '../../../../assets/images/avatar.png';

// styling
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

const textInputProps = { minLength: 2, required: true };
const numberInputProps = { min: 1, required: true };

// Component
const AddForm = props => {
  const {
    classes,
    onSubmit,
    onChange,
    storeFilename,
    name,
    number,
    position,
    targetApps,
    targetGoals,
    targetAssists,
  } = props;
  return (
    <Container>
      <Paper className={classes.container}>
        <form onSubmit={onSubmit}>
          <FormTitle title="Player Image" />
          <FormControl className={classes.formControl}>
            <FileUpload
              dir="players"
              defaultImg={avatar}
              filename={filename => storeFilename(filename)}
            />
          </FormControl>
          <FormTitle title="Player Details" />
          <FormControl className={classes.formControl}>
            <TextField
              label="Name"
              type="text"
              name="name"
              inputProps={textInputProps}
              onChange={onChange}
              value={name}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              label="Number"
              type="number"
              name="number"
              inputProps={numberInputProps}
              onChange={onChange}
              value={number}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select
              className={classes.inputStyle}
              native
              onChange={onChange}
              value={position}
              inputProps={{ name: 'position', id: 'position' }}
            >
              <option value="GK">Goalkeeper</option>
              <option value="DF">Defender</option>
              <option value="MF">Midfielder</option>
              <option value="FW">Forward</option>
            </Select>
          </FormControl>
          <FormTitle title="Targets" />
          <FormControl className={classes.formControl}>
            <TextField
              label="Target Appearances"
              type="number"
              name="targetApps"
              inputProps={numberInputProps}
              onChange={onChange}
              value={targetApps}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              label="Target Goals"
              type="number"
              name="targetGoals"
              inputProps={numberInputProps}
              onChange={onChange}
              value={targetGoals}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              label="Target Assists"
              type="number"
              name="targetAssists"
              inputProps={numberInputProps}
              onChange={onChange}
              value={targetAssists}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              type="submit"
              value="Submit"
            >
              Submit
            </Button>
          </FormControl>
        </form>
      </Paper>
    </Container>
  );
};

AddForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  storeFilename: PropTypes.func.isRequired,
  number: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  targetApps: PropTypes.string.isRequired,
  targetGoals: PropTypes.string.isRequired,
  targetAssists: PropTypes.string.isRequired,
};

export default withStyles(styles)(AddForm);
