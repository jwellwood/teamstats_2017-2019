import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Components
import Container from '../hoc/Container';

const styles = theme => ({
  root: {
    marginTop: '20px',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  title: { margin: '10px auto' },
});

const About = props => {
  const { classes } = props;
  return (
    <Container>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h6" component="h3" color="primary" className={classes.title}>
          About
        </Typography>
        <p>
          <strong>This app allows users to:</strong>
        </p>
        <ul style={{ textAlign: 'left' }}>
          <li>View the latest results</li>
          <li>View the current playing squad</li>
          <li>Track individual goal, assist and MVP stats</li>
          <li>Check how much money is owed</li>
        </ul>
        <hr />
        <p>
          <strong>The team captain can:</strong>
        </p>
        <ul style={{ textAlign: 'left' }}>
          <li>Add, edit and delete matches or players</li>
          <li>Set a player's targets for the season</li>
          <li>Enable registration for other admins</li>
        </ul>
        <hr />
        <p>
          <strong>If you notice a mistake in your stats, contact website admin</strong>{' '}
        </p>

        <hr />
        <Typography variant="caption" align="center">
          You can view the source code for this project here:{' '}
          <a href="https://github.com/jwellwood/teamstats">
            <i className="fab fa-github" />
          </a>
        </Typography>
        <Typography variant="caption" align="center">
          Version: 1.0.3
        </Typography>
      </Paper>
    </Container>
  );
};

About.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(About);
