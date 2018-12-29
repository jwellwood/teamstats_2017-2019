import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
// Components
import Container from '../hoc/Container';
import PageHeader from '../layout/Navs/PageHeader';
import ResultBox from './ResultsComponents/ResultBox';
import Spinner from '../layout/Warnings/Spinner';
import TotalsTable from './ResultsComponents/ResultsTotals/TotalsTable';

const styles = theme => ({
  button: { margin: theme.spacing.unit },
  rightIcon: { marginLeft: theme.spacing.unit },
  winColor: { color: '#28B463' },
  drawColor: { color: '#F39C12' },
  defeatColor: { color: '#E74C3C' },
});

const Results = props => {
  const { classes, results, onDelete } = props;

  const getGoals = (a, b) => a + b;

  const getGoalsFor = () => {
    const getMyTeamHome = results.filter(result => result.homeTeamName === 'Madrid Reds');
    const getMyTeamAway = results.filter(result => result.awayTeamName === 'Madrid Reds');
    const myTeamHomeArray = getMyTeamHome.map(goals => +goals.homeTeamScore);
    const myTeamAwayArray = getMyTeamAway.map(goals => +goals.awayTeamScore);
    const homeTeamGoals = myTeamHomeArray.reduce(getGoals, 0);
    const awayTeamGoals = myTeamAwayArray.reduce(getGoals, 0);
    const goalsFor = homeTeamGoals + awayTeamGoals;
    return goalsFor;
  };

  const getGoalsAgainst = () => {
    const getOtherTeamHome = results.filter(result => result.homeTeamName !== 'Madrid Reds');
    const getOtherTeamAway = results.filter(result => result.awayTeamName !== 'Madrid Reds');
    const otherTeamHomeArray = getOtherTeamHome.map(goals => +goals.homeTeamScore);
    const otherTeamAwayArray = getOtherTeamAway.map(goals => +goals.awayTeamScore);
    const otherHomeTeamGoals = otherTeamHomeArray.reduce(getGoals, 0);
    const otherAwayTeamGoals = otherTeamAwayArray.reduce(getGoals, 0);
    const goalsAgainst = otherHomeTeamGoals + otherAwayTeamGoals;
    return goalsAgainst;
  };

  const totalMatches = results.length;
  const winCounter = results.filter(result => result.resultIndicator === 'W');
  const drawCounter = results.filter(result => result.resultIndicator === 'D');
  const lossCounter = results.filter(result => result.resultIndicator === 'L');
  const totalWins = winCounter.length;
  const totalDraws = drawCounter.length;
  const totalLoss = lossCounter.length;
  const winPercentage = (totalWins * 100) / totalMatches;
  const drawPercentage = (totalDraws * 100) / totalMatches;
  const lossPercentage = (totalLoss * 100) / totalMatches;

  return (
    <Container>
      <PageHeader title="Results" icon="" link="/" />
      <TotalsTable
        values={{
          totalMatches,
          getGoalsFor,
          getGoalsAgainst,
          totalWins,
          totalDraws,
          totalLoss,
        }}
      />
      <Button
        component={Link}
        to="/results/addResult"
        variant="contained"
        className={classes.button}
        size="small"
      >
        Add Match <Icon className={classes.rightIcon}>add</Icon>
      </Button>
      {results && results.length !== 0 ? (
        <ResultBox results={results} onDelete={onDelete} />
      ) : (
        <div>
          <p>There are currently no results</p>
          <Spinner />
        </div>
      )}
    </Container>
  );
};

Results.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  results: PropTypes.instanceOf(Array),
  onDelete: PropTypes.func,
};

Results.defaultProps = { results: [], onDelete: undefined };

export default compose(
  firestoreConnect([{ collection: 'results', orderBy: ['date', 'desc'] }]),
  withStyles(styles),
  // eslint-disable-next-line no-unused-vars
  connect((state, props) => ({ results: state.firestore.ordered.results })),
)(Results);
