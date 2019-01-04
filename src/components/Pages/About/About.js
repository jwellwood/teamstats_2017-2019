import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

import Typography from '@material-ui/core/Typography';
// Components
import Container from '../../hoc/Container';
import PageHeader from '../../layout/Navs/PageHeader';

const styles = theme => ({
  root: {
    marginTop: '20px',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  title: { margin: '10px auto', textAlign: 'left', fontWeigh: 'bold' },
});

const About = props => {
  const { classes } = props;
  return (
    <Container>
      <PageHeader title="About" link="/" />
      <div className={classes.root}>
        <Typography variant="subtitle2" className={classes.title}>
          Users can:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="View Results" secondary="Check the latest results" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText
              primary="View the current squad"
              secondary="Track individual and team stats"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText
              primary="Balance the books"
              secondary="Check how much money each team member owes"
            />
          </ListItem>
        </List>

        <hr />
        <Typography variant="subtitle2" className={classes.title}>
          Registered users can:
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText
              primary="Manage the team"
              secondary="Add, edit or delete matches or players"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText
              primary="Set targets"
              secondary="Set a player's appearance, goal, and assist targets for the season"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText
              primary="Enable registration"
              secondary="Allow other users to create accounts. To do this go to settings and click allow registration"
            />
          </ListItem>
        </List>

        <hr />
        <Typography variant="body2">
          <strong>If you notice a mistake in your stats, contact website admin</strong>
        </Typography>

        <hr />
        <Typography variant="caption" align="center" style={{ color: '#ccc' }}>
          You can view the source code for this project here:{' '}
          <a href="https://github.com/jwellwood/teamstats">
            <i className="fab fa-github" />
          </a>
        </Typography>
        <Typography variant="caption" align="center">
          Version: 2.0.2
        </Typography>
      </div>
    </Container>
  );
};

About.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(About);
