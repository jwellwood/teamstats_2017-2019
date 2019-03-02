import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import ScoreBox from '../ResultsCard/ScoreBox';
// Helpers
import { resultColor, matchTypeColor } from '../../../../../assets/styles/colors';
import formatDate from '../../../../../helpers/date';
import Container from '../../../../hoc/Container';

const styles = theme => ({
  details: { padding: '1px 10px' },
  number: { fontWeight: 'bold', paddingRight: '10px' },
  button: { fontSize: '12px' },
  scoreBox: { background: theme.palette.secondary.main },
});

const MatchDetails = props => {
  const { classes, result, teamName } = props;
  const { teamScore, opponentScore } = result;
  const date = formatDate(result.date);

  let matchPoints = '-';

  let teamResult = null;
  if (+teamScore > +opponentScore) {
    teamResult = 'W';
  } else if (+teamScore === +opponentScore) {
    teamResult = 'D';
  } else {
    teamResult = 'L';
  }

  if (result.matchType === 'League') {
    switch (teamResult) {
      case 'W':
        matchPoints = 3;
        break;
      case 'D':
        matchPoints = 1;
        break;
      case 'L':
        matchPoints = 0;
        break;
      default:
        return matchPoints;
    }
  }

  let id = 0;
  const createData = (title, value, textColor) => {
    id += 1;
    return { id, title, value, textColor };
  };

  const listItems = [
    createData('Date', date, '#ccc'),
    createData('Competition', result.matchType, matchTypeColor(result.matchType)),
    createData('Goal Difference', result.teamScore - result.opponentScore, resultColor(teamResult)),
    createData('Points', matchPoints, resultColor(teamResult)),
  ];

  return (
    <Container>
      <StatsHeader title="Details" />

      <Paper style={{ background: '#333', padding: '2px' }}>
        <Paper className={classes.scoreBox}>
          <Grid container style={{ fontFamily: 'Varela Round' }}>
            <ScoreBox result={result} teamName={teamName} teamResult={teamResult} />
          </Grid>
        </Paper>

        {listItems.map(item => (
          <List dense key={item.id}>
            <ListItem>
              <ListItemText
                primary={(
                  <span
                    style={{
                      textAlign: 'left',
                      textTransform: 'uppercase',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.title}
                  </span>
)}
              />
            </ListItem>
            <ListItemSecondaryAction>
              <Typography className={classes.number} style={{ color: item.textColor }}>
                {item.value}
              </Typography>
            </ListItemSecondaryAction>
          </List>
        ))}
        <Button
          component={Link}
          to={`/results/${result.id}/edit`}
          color="secondary"
          className={classes.button}
        >
          edit
        </Button>
      </Paper>
    </Container>
  );
};

MatchDetails.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
  teamName: PropTypes.string.isRequired,
};

export default withStyles(styles)(MatchDetails);
