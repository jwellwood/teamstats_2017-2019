import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

// styling
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  table: { padding: '0px 20px ' },
});

// Component
const Totals = props => {
  const { classes, totalPlayers, totalGoals, totalAssists, totalOwed } = props;
  // data for map
  let id = 0;
  function createData(icon, total, text, record, topPlayer) {
    id += 1;
    return { id, icon, total, text, record, topPlayer };
  }

  const listItems = [
    createData(<i className="fas fa-futbol" />, totalGoals, 'Goals'),
    createData(<i className="fas fa-key" />, totalAssists, 'Assists'),

    createData(
      <i className="fas fa-dollar-sign" />,
      <span style={totalOwed > 0 ? { color: '#E74C3C' } : { color: '#28B463' }}>
        €{parseFloat(totalOwed).toFixed(2)}
      </span>,
      'Total Owed',
    ),
  ];

  return (
    <div className={classes.root}>
      <List>
        <Paper>
          <ListItem>
            <Avatar style={{ background: '#555' }}>
              <i className="fas fa-users" />
            </Avatar>
            <ListItemText primary={totalPlayers} secondary="Total Players" />
          </ListItem>
        </Paper>
        {listItems.map(item => (
          <div key={item.id}>
            <ListItem>
              <Avatar>{item.icon}</Avatar>

              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.table}
              >
                <Grid item>
                  <ListItemText primary={item.total} secondary={item.text} />
                </Grid>
                {/* <Grid item>
                  <ListItemText primary={item.topPlayer} secondary={item.record} />
                </Grid> */}
              </Grid>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

Totals.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  totalPlayers: PropTypes.number.isRequired,
  totalGoals: PropTypes.number.isRequired,
  totalAssists: PropTypes.number.isRequired,
  totalOwed: PropTypes.number.isRequired,
};

export default withStyles(styles)(Totals);
