import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// // MUI
import { withStyles } from '@material-ui/core/styles';
// import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
// Components
import { IconButton, Icon } from '@material-ui/core';
import ScoreBox from './ScoreBox';
import ResultDate from './ResultDate';
import MatchStats from '../Sections/MatchStats';
import BoxContainer from '../../../../layout/hoc/BoxContainer';
// Helpers
import { resultColor, matchTypeColor } from '../../../../../assets/styles/colors';
import Disclaimer from '../../../../layout/Warnings/Disclaimer';
import styles from './styles';
import MatchReport from '../Sections/MatchReport';

const ResultCard = props => {
  const { classes, result, teamName } = props;
  const { matchType, teamScore, opponentScore } = result;
  let backgroundColor = '#fff';
  let teamResult = '';
  if (+teamScore > +opponentScore) {
    teamResult = 'W';
    backgroundColor = 'rgba(46, 204, 113, 0.2)';
  } else if (+teamScore === +opponentScore) {
    teamResult = 'D';
    backgroundColor = 'rgba(241, 196, 15, 0.2)';
  } else {
    teamResult = 'L';
    backgroundColor = 'rgba(231, 76, 60, 0.3)';
  }

  return (
    <BoxContainer>
      <ExpansionPanel style={{ border: `2px solid ${resultColor(teamResult)}`, backgroundColor }}>
        <ExpansionPanelSummary
          className={classes.root}
          aria-controls="panel-content"
          id="panel-header"
        >
          <Grid container direction="column" alignContent="center" style={{ padding: 0 }}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              alignContent="center"
              className={classes.matchTypeBar}
            >
              <Grid item className={classes.matchType} style={{ color: matchTypeColor(matchType) }}>
                {result.matchType}
              </Grid>

              <Grid item className={classes.date}>
                <ResultDate result={result} />
              </Grid>
            </Grid>
            <Grid item style={{ border: `1px solid ${resultColor(teamResult)}` }}>
              <ScoreBox result={result} teamName={teamName} teamResult={teamResult} />
            </Grid>
          </Grid>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails style={{ padding: '1px', margin: '0px auto' }}>
          <Grid container direction="column">
            <div>{result.forfeitedMatch ? <Disclaimer message="*Forfeited" /> : null}</div>
            <MatchStats result={result} />
            <MatchReport result={result} />
          </Grid>
        </ExpansionPanelDetails>
        <IconButton component={Link} to={`/results/${result.id}/edit`} color="primary" size="small">
          <Icon fontSize="small">edit</Icon>
        </IconButton>
      </ExpansionPanel>
    </BoxContainer>
  );
};

ResultCard.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
  teamName: PropTypes.string,
};

ResultCard.defaultProps = { teamName: '' };

export default withStyles(styles)(ResultCard);

//   return (
//     <BoxContainer>
//       <Paper
//         elevation={20}
//         className={classes.main}
//         style={{ textDecoration: 'none', borderColor: resultColor(teamResult) }}
//       >
//         <Grid
//           container
//           direction="row"
//           alignItems="center"
//           justify="space-between"
//           component={Link}
//           to={`results/${result.id}`}
//           style={{ textDecoration: 'none' }}
//         >
//           <Grid
//             container
//             direction="row"
//             alignItems="center"
//             justify="space-between"
//             className={classes.dateBar}
//           >
//             <Avatar className={classes.avatar} style={{ background: resultColor(teamResult) }}>
//               {teamResult}
//             </Avatar>

//           </Grid>

//         </Grid>
//       </Paper>
//     </BoxContainer>
//   );
// };
