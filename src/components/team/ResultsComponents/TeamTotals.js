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
  const {
    classes,
    totalMatches,
    totalWins,
    totalDraws,
    totalLoss,
    winPercentage,
    drawPercentage,
    lossPercentage,
  } = props;
  // data for map
  let id = 0;
  function createData(icon, total, text, percentage) {
    id += 1;
    return { id, icon, total, text, percentage };
  }

  const listItems = [
    createData(
      <i className="fas fa-plus" />,
      totalWins,
      'wins',
      winPercentage ? (
        <span
          style={
            winPercentage <= 60
              ? { color: '#E74C3C', fontWeight: 'bold' }
              : { color: '#28B463', fontWeight: 'bold' }
          }
        >
          {winPercentage}
        </span>
      ) : null,
    ),
    createData(<i className="fas fa-equals" />, totalDraws, 'draws', drawPercentage),
    createData(
      <i className="fas fa-minus" />,
      totalLoss,
      'defeats',
      lossPercentage ? (
        <span
          style={
            lossPercentage >= 30
              ? { color: '#E74C3C', fontWeight: 'bold' }
              : { color: '#28B463', fontWeight: 'bold' }
          }
        >
          {lossPercentage}
        </span>
      ) : null,
    ),
  ];

  return (
    <div className={classes.root}>
      <List>
        <Paper>
          <ListItem>
            <Avatar style={{ background: '#555' }}>
              <i className="fas fa-list-ul" />
            </Avatar>
            <ListItemText primary={totalMatches} secondary="Total Matches" />
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
                  <ListItemText primary={item.total} secondary={`${item.text}`} />
                </Grid>
                <Grid item>
                  <div>
                    {item.percentage}
                    <span style={{ fontSize: '0.7em' }}> %</span>
                  </div>
                </Grid>
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
  totalMatches: PropTypes.number.isRequired,
  totalWins: PropTypes.number.isRequired,
  totalDraws: PropTypes.number.isRequired,
  totalLoss: PropTypes.number.isRequired,
  winPercentage: PropTypes.number.isRequired,
  drawPercentage: PropTypes.number.isRequired,
  lossPercentage: PropTypes.number.isRequired,
};

export default withStyles(styles)(Totals);
