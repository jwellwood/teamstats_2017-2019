import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Trophies from './Trophies/Trophies';
import Logo from '../../../assets/images/logoBig.jpg';

// styling
const styles = theme => ({
  root: { padding: '10px', margin: '10px' },
  image: {
    width: '100px',
    padding: '10px',
  },
  avatar: { background: '#eee', color: theme.palette.primary.main },
});

// Component
const TeamDetails = props => {
  const { classes, team, trophies, players } = props;
  const { city, leagueFinish } = team[0];

  // Data to map
  let id = 0;
  function createData(icon, name, text, type) {
    id += 1;
    return { id, icon, name, text, type };
  }

  const listItems = [
    createData(<i className="fas fa-globe-americas" />, 'Home city', city),
    createData(
      <i className="fas fa-users" />,
      'Current squad',
      `${players ? players.length : null} players`,
    ),
    createData(<i className="fas fa-award" />, 'Finish last season', leagueFinish),
    createData(<i className="fas fa-trophy" />, 'Trophies won', trophies ? trophies.length : null),
  ];

  return (
    <Paper className={classes.root}>
      <Grid container direction="column" justify="center" alignContent="center">
        <Grid item>
          <img src={Logo} className={classes.image} alt="team badge" />
        </Grid>
        <Grid item>
          <List>
            {listItems.map(item => (
              <div key={item.id}>
                <ListItem>
                  <Avatar className={classes.avatar}>{item.icon}</Avatar>
                  <ListItemText primary={item.name} secondary={item.text} />
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
          </List>
          <Trophies trophies={trophies} />
        </Grid>
      </Grid>
    </Paper>
  );
};

TeamDetails.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  team: PropTypes.instanceOf(Array).isRequired,
  trophies: PropTypes.instanceOf(Array),
};

TeamDetails.defaultProps = { trophies: null };
export default withStyles(styles)(TeamDetails);
