import React from 'react';
import PropTypes from 'prop-types';
// // MUI
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/LockOutlined';
// Components
import Message from '../layout/Warnings/Message';

// styling
const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: { marginTop: theme.spacing.unit * 3 },
});

// Component
const AuthForm = props => {
  const { classes, message, messageType, onSubmit, onChange, email, password, title } = props;
  return (
    <main className={classes.layout}>
      {message ? <Message message={message} messageType={messageType} /> : null}
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5">{title}</Typography>
        <form onSubmit={onSubmit} className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              required
              value={email}
              onChange={onChange}
            />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={onChange}
            />
          </FormControl>

          <Button
            type="submit"
            value="login"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {title}
          </Button>
        </form>
      </Paper>
    </main>
  );
};

AuthForm.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  message: PropTypes.string,
  messageType: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

AuthForm.defaultProps = {
  message: '',
  messageType: '',
};

export default withStyles(styles)(AuthForm);
