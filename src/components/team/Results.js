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
import PageHeader from '../layout/PageHeader';
import ResultBox from './ResultsComponents/ResultBox';
import Spinner from '../layout/Spinner';
import TeamTotals from './ResultsComponents/TeamTotals';

const styles = theme => ({
  button: { margin: theme.spacing.unit },
  rightIcon: { marginLeft: theme.spacing.unit },
});

const Results = props => {
  const { classes, results, onDelete } = props;
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
      <PageHeader title="Results" icon="fas fa-futbol" link="/" />
      <TeamTotals
        totalMatches={totalMatches}
        totalWins={totalWins}
        totalDraws={totalDraws}
        totalLoss={totalLoss}
        winPercentage={+winPercentage.toFixed(1)}
        drawPercentage={+drawPercentage.toFixed(1)}
        lossPercentage={+lossPercentage.toFixed(1)}
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
