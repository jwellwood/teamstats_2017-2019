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
import BoxContainer from '../../hoc/BoxContainer';

const styles = theme => ({
  title: {
    margin: '5px auto',
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.palette.primary.dark,
  },
});

// Data to map
let id = 0;
function createData(title, text) {
  id += 1;
  return { id, title, text };
}

const listItemsMain = [
  createData('RESULTS', 'Keep up to date with the latest results'),
  createData('SQUAD', 'Check progress against set targets'),
  createData('STATS', 'Track the player and team stats throughout the season'),
];

const listItemsAdvanced = [
  createData('MANAGE', 'Add, edit or delete matches or players'),
  createData('SET TARGETS', "Set a player's appearance, goal, and assist targets for the season"),
  createData(
    'REGISTER USERS',
    'Allow other users to create accounts. To do this go to settings and click allow registration',
  ),
];

const About = props => {
  const { classes } = props;
  return (
    <Container>
      <PageHeader title="About" link="/" />
      <BoxContainer>
        <div className={classes.root}>
          <Typography variant="body1" className={classes.title}>
            Main features
          </Typography>
          <List dense>
            {listItemsMain.map(item => (
              <ListItem>
                <ListItemIcon>
                  <i className="material-icons">done_outline</i>
                </ListItemIcon>
                <ListItemText primary={item.title} secondary={item.text} />
              </ListItem>
            ))}
          </List>

          <hr />
          <Typography variant="body1" className={classes.title}>
            Advanced features
          </Typography>
          <Typography variant="caption" className={classes.title}>
            (for registered users)
          </Typography>
          <List dense>
            {listItemsAdvanced.map(item => (
              <ListItem>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary={item.title} secondary={item.text} />
              </ListItem>
            ))}
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
            Version: 2.2.2
          </Typography>
        </div>
      </BoxContainer>
    </Container>
  );
};

About.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(About);
