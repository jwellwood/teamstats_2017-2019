import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
// Components
import ScoreBox from './ScoreBox';
// Helpers
import { colors, matchTypes } from '../../../../assets/styles/colors';

const styles = theme => ({
  box: {
    marginBottom: '20px',
    border: '1px solid #222',
    background: '#eee',
  },
  dateBar: {
    fontSize: '12px',
    padding: '0px 0px 0px 5px ',
    backgroundColor: '#444',
    borderRadius: '2px 2px 0px 0px',
  },
  matchTypeBar: {
    fontSize: '12px',
    padding: '0 5px',
    backgroundColor: '#333',
  },
  resultMarker: { width: '39px' },
  avatar: {
    margin: 5,
    width: 20,
    height: 20,
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#111',
  },
  date: { color: 'white', margin: 5 },
  matchType: { marginBottom: 2 },
  forfeit: { fontSize: '10px', padding: '0 2px', margin: '0 auto', color: '#666' },
  iconButton: { width: '20px', height: '20px' },
  editButton: {
    color: theme.palette.primary.light,
    cursor: 'pointer',
    fontSize: '15px',
  },
});

const ResultBox = props => {
  const { classes, results } = props;
  if (results) {
    const resultsDataArray = results.map(result => {
      const { date, resultIndicator, matchType } = result;
      const year = date.slice(0, -6);
      let month = date.slice(5, -3);
      const day = date.slice(8, 10);
      switch (month) {
        case '01':
          month = 'Jan';
          break;
        case '02':
          month = 'Feb';
          break;
        case '03':
          month = 'Mar';
          break;
        case '04':
          month = 'Apr';
          break;
        case '05':
          month = 'May';
          break;
        case '06':
          month = 'Jun';
          break;
        case '07':
          month = 'Jul';
          break;
        case '08':
          month = 'Aug';
          break;
        case '09':
          month = 'Sep';
          break;
        case '10':
          month = 'Oct';
          break;
        case '11':
          month = 'Nov';
          break;
        case '12':
          month = 'Dec';
          break;
        default:
          return month;
      }

      let resultColor = colors.draw;
      switch (resultIndicator) {
        case 'W':
          resultColor = colors.win;
          break;
        case 'D':
          resultColor = colors.draw;
          break;
        case 'L':
          resultColor = colors.lose;
          break;
        default:
          return resultColor;
      }

      let matchTypeColor = matchTypes.league;
      switch (matchType) {
        case 'League':
          matchTypeColor = matchTypes.league;
          break;
        case 'Cup':
          matchTypeColor = matchTypes.cup;
          break;
        case 'Friendly':
          matchTypeColor = matchTypes.friendly;
          break;
        case 'Tournament':
          matchTypeColor = matchTypes.tournament;
          break;
        default:
          return matchTypeColor;
      }

      return (
        <Paper className={classes.box} key={result.id}>
          <Grid container direction="row" alignItems="center" justify="space-between">
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-between"
              className={classes.dateBar}
            >
              <Avatar className={classes.avatar} style={{ background: resultColor }}>
                {result.resultIndicator}
              </Avatar>

              <div className={classes.date}>
                {day}-{month}-{year}
              </div>

              <IconButton
                className={classes.iconButton}
                size="small"
                component={Link}
                to={`/results/${result.id}`}
              >
                <Icon className={classes.editButton}>equalizer</Icon>
              </IconButton>
            </Grid>
            <Grid container className={classes.matchTypeBar}>
              <div className={classes.matchType} style={{ color: matchTypeColor }}>
                {result.matchType}
              </div>
            </Grid>

            <ScoreBox result={result} />

            {result.forfeitedMatch ? (
              <div className={classes.forfeit}>*Automatic 7-0 due to forfeit</div>
            ) : null}
          </Grid>
        </Paper>
      );
    });

    return <div style={{ margin: '10px' }}>{resultsDataArray.sort()} </div>;
  }
  return <p>No results found</p>;
};

ResultBox.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  results: PropTypes.instanceOf(Array),
};

ResultBox.defaultProps = { results: [] };

export default withStyles(styles)(ResultBox);
