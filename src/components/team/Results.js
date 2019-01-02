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
import ResultBox from './ResultsList/ResultsCard/ResultBox';
import Spinner from '../layout/Warnings/Spinner';
import ResultsList from './ResultsList/ResultsList';

const styles = theme => ({
  button: { margin: theme.spacing.unit },
  rightIcon: { marginLeft: theme.spacing.unit },
  winColor: { color: '#28B463' },
  drawColor: { color: '#F39C12' },
  defeatColor: { color: '#E74C3C' },
});

const Results = props => {
  const { classes, results, onDelete } = props;

  return (
    <Container>
      <PageHeader title="Results" icon="" link="/" />
      <ResultsList results={results} />
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
