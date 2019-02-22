import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { colors } from '../../../../../assets/styles/colors';
import formatDate from '../../../../../helpers/date';

const styles = theme => ({
  root: { width: '100%', margin: '1px auto' },
  avatar: {
    margin: 5,
    width: 23,
    height: 23,
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#333',
  },
  heading: {
    textAlign: 'left',
    textTransform: 'uppercase',
    color: '#333',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  fixture: {
    padding: '5px',
    width: '100%',
    maxWidth: '300px',
    margin: 'auto',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '13px',
  },
  secondRow: {
    color: '#ccc',
    fontSize: '12px',
  },
});

class StatsList extends Component {
  state = { expanded: null };

  handleChange = panel => (event, expanded) => {
    this.setState({ expanded: expanded ? panel : false });
  };

  render() {
    const { classes, title, data, value } = this.props;
    const { expanded } = this.state;
    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Typography className={classes.heading}>{title}</Typography>
              <Avatar className={classes.avatar}>{value}</Avatar>
            </Grid>
          </ExpansionPanelSummary>
          {data.map(item => (
            <ExpansionPanelDetails key={Math.random()}>
              <Paper className={classes.fixture}>
                <Grid
                  className={classes.firstRow}
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <div style={{ fontFamily: 'Righteous' }}>
                    {item.opponentName}{' '}
                    <span className={classes.secondRow}>
                      {item.homeOrAway === 'home' ? '(h)' : '(a)'}
                    </span>
                  </div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      color: +item.teamScore > +item.opponentScore ? colors.win : colors.lose,
                    }}
                  >
                    {item.homeOrAway === 'home' ? item.teamScore : item.opponentScore} -{' '}
                    {item.homeOrAway === 'away' ? item.teamScore : item.opponentScore}
                  </div>
                </Grid>
                <Grid
                  className={classes.secondRow}
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>{item.matchType}</Grid>
                  <Grid item>{formatDate(item.date)}</Grid>
                </Grid>
              </Paper>
            </ExpansionPanelDetails>
          ))}
        </ExpansionPanel>
      </div>
    );
  }
}

StatsList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.number.isRequired,
};

export default withStyles(styles)(StatsList);

//         {data.map(item => (
//           <Paper key={item.date}>
//             <Grid container direction="row" alignContent="center" justify="space-evenly">
//               <div>{item.date}</div>
//               <div>{item.opponentName}</div>
//               <div>{item.matchType}</div>
//               <div>{item.teamScore}</div>
//               <div>{item.opponentScore}</div>
//             </Grid>
//           </Paper>
//         ))}
//       </Paper>
//     </div>
//   );
// };

// };

// export default StatsList;
