import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

// styling
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '400px',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
});

// Component
const PlayerStats = props => {
  const { classes, player } = props;
  const { apps, goals, assists, mvp } = player;
  let goalsPG = (goals / apps).toFixed(2);
  let assistsPG = (assists / apps).toFixed(2);
  let mvpPG = (mvp / apps).toFixed(2);
  if (apps === 0) {
    goalsPG = '0';
    assistsPG = '0';
    mvpPG = '0';
  }

  // CONTRIBUTION RATING FORMULA

  // let goalsCalc = goals;
  // if (goals === '0' || goals === 0) {
  //   goalsCalc = 0.1;
  // }

  // let assistsCalc = assists;
  // if (assists === '0' || assists === 0) {
  //   assistsCalc = 0.1;
  // }

  // const contributionRating = (apps * (goalsCalc + assistsCalc)).toFixed(1);

  // Data to map
  let id = 0;
  function createData(icon, total, text) {
    id += 1;
    return { id, icon, total, text };
  }

  const listItems = [
    createData(<i className="fas fa-check" />, goalsPG, 'Goals per game'),
    createData(<i className="fas fa-key" />, assistsPG, 'Assists per game'),
    createData(<i className="far fa-star" />, mvpPG, 'MVP per game'),
    // createData(
    //   <i className="fas fa-chart-line" />,
    //   contributionRating,
    //   'Contribution Rating',
    // ),
  ];

  return (
    <List className={classes.root}>
      {listItems.map(item => (
        <div key={item.id}>
          <ListItem>
            <Avatar>{item.icon}</Avatar>
            <ListItemText primary={item.total} secondary={item.text} />
          </ListItem>
          <Divider inset component="li" />
        </div>
      ))}
    </List>
  );
};

PlayerStats.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(PlayerStats);
