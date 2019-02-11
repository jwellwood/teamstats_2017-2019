import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import ValidationMessage from './layout/ValidationMessage';
import Label from './layout/Label';
import FormContainer from './layout/FormContainer';

const styles = () => ({
  selectInput: { width: '260px', margin: '5px auto' },
  numberInput: { width: '60px', alignContent: 'right' },
});

const FormFields = props => {
  const { classes, formData, change } = props;

  const validate = element => {
    let error = [true, ''];

    if (element.validation.minChar) {
      const valid = element.value.length >= element.validation.minChar;
      const message = `${
        !valid ? `Must be more than ${element.validation.minChar} characters` : ''
      }`;
      error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }
    return error;
  };

  const changeHandler = (e, id, blur) => {
    e.preventDefault();
    const newState = formData;
    if (newState[id].element === 'checkbox') {
      newState[id].value = e.target.checked;
    } else {
      newState[id].value = e.target.value;
    }

    if (blur) {
      const validData = validate(newState[id]);
      // eslint-disable-next-line prefer-destructuring
      newState[id].valid = validData[0];
      // eslint-disable-next-line prefer-destructuring
      newState[id].validationMessage = validData[1];
    }
    newState[id].touched = true;

    change(newState);
  };

  const showLabel = (show, label) => (show ? <Label>{label}</Label> : null);
  const showValidation = data => {
    let errorMessage = null;
    if (data.validation && !data.valid) {
      errorMessage = <ValidationMessage>{data.validationMessage}</ValidationMessage>;
    }
    return errorMessage;
  };
  const renderTemplates = data => {
    let formTemplate = '';
    const values = data.settings;
    const { type } = values.config;

    switch (values.element) {
      case 'input':
        formTemplate = (
          <div>
            {showLabel(values.label, values.labelText)}
            {type === 'number' ? (
              <TextField
                {...values.config}
                label={values.config.placeholder}
                value={values.value}
                onChange={e => changeHandler(e, data.id, false)}
                onBlur={e => changeHandler(e, data.id, true)}
                inputProps={
                  values.config.name === 'balance_input' ? { step: 0.5 } : { min: 0, max: 99 }
                }
                className={classes.selectInput}
                variant="outlined"
              />
            ) : (
              <TextField
                {...values.config}
                value={values.value}
                onChange={e => changeHandler(e, data.id, false)}
                onBlur={e => changeHandler(e, data.id, true)}
                className={classes.selectInput}
              />
            )}

            {showValidation(values)}
          </div>
        );
        break;
      case 'select':
        formTemplate = (
          <div>
            {showLabel(values.label, values.labelText)}
            <Select
              className={classes.selectInput}
              name={values.config.name}
              value={values.value}
              onChange={e => changeHandler(e, data.id)}
              native
            >
              {values.config.options.map(item => (
                <option key={item.val} value={item.val}>
                  {item.text}
                </option>
              ))}
            </Select>
          </div>
        );
        break;
      case 'textarea':
        formTemplate = (
          <div>
            {showLabel(values.label, values.labelText)}
            <TextField
              className={classes.selectInput}
              {...values.config}
              variant="outlined"
              fullWidth
              multiline
              value={values.value}
              onChange={e => changeHandler(e, data.id)}
            />
          </div>
        );
        break;
      case 'checkbox':
        formTemplate = (
          <FormControlLabel
            control={(
              <Checkbox
                checked={values.value}
                onChange={e => changeHandler(e, data.id)}
                color="primary"
              />
)}
            label={values.labelText}
            labelPlacement="start"
          />
        );
        break;
      case 'hidden':
        formTemplate = null;
        break;
      default:
        return formTemplate;
    }
    return formTemplate;
  };

  const renderFormFields = () => {
    const formArray = [];
    Object.keys(formData).forEach(elementName => {
      formArray.push({
        id: elementName,
        settings: formData[elementName],
      });
    });

    return formArray.map(item => <div key={item.id}>{renderTemplates(item)}</div>);
  };

  return <FormContainer>{renderFormFields()}</FormContainer>;
};

export default withStyles(styles)(FormFields);
