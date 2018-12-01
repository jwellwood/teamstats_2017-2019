import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// Component
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Container from '../../hoc/Container';

import Spinner from '../../layout/Spinner';
import PageHeader from '../../layout/PageHeader';

const styles = theme => ({
  container: {
    padding: '5px',
    textAlign: 'center',
  },
  formControl: {
    margin: '20px auto',
    width: '200px',
    display: 'block',
  },
  button: { margin: theme.spacing.unit },
  rightIcon: { marginLeft: theme.spacing.unit },
});

class MatchDetails extends Component {
  render() {
    const { classes, result } = this.props;

    if (result) {
      return (
        <Container>
          <PageHeader title="Match Details" icon="fas fa-info-circle" link="/results" />
          <Paper className={classes.container}>
            <IconButton
              onClick={this.handleClickOpen}
              size="small"
              component={Link}
              to={`/results/${result.id}/edit`}
            >
              <Icon>edit</Icon>
            </IconButton>
          </Paper>
        </Container>
      );
    }
    return <Spinner />;
  }
}

MatchDetails.propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}),
};

MatchDetails.defaultProps = { result: {} };

export default compose(
  firestoreConnect(props => [
    { collection: 'results', storeAs: 'result', doc: props.match.params.id },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect(({ firestore: { ordered } }, props) => ({ result: ordered.result && ordered.result[0] })),
  withStyles(styles),
)(MatchDetails);
