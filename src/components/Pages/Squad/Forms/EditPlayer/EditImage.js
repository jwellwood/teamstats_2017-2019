import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// Form
import FormControl from '@material-ui/core/FormControl';

// Component
import Container from '../../../../layout/hoc/Container';
import FileUpload from '../../../../layout/Forms/FileUpload';
// Assets
import avatar from '../../../../../assets/images/avatar.png';
import PageHeader from '../../../../layout/Navs/PageHeader';
import styles from './styles';

class EditImage extends Component {
  state = { image: '' };

  componentDidMount() {
    const { player, firebase } = this.props;
    if (player) {
      firebase
        .storage()
        .ref('players')
        .child(player.image)
        .getDownloadURL()
        .then(url => {
          this.setState({ image: url });
        });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { player, firestore, history } = this.props;
    const { image } = this.state;
    const updatedImage = { image };

    firestore
      .update({ collection: 'players', doc: player.id }, updatedImage)
      .then(history.push('/players'));
  };

  onChange = (e, content = '') => {
    if (content === '') {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      this.setState({ image: content });
    }
  };

  storeFilename = filename => {
    const { image } = this.state;
    this.onChange(image, filename);
  };

  render() {
    const { classes } = this.props;
    const { image } = this.state;
    let defaultImage = avatar;
    if (image) {
      defaultImage = image;
    }
    return (
      <Container>
        <PageHeader title="Edit image" link="/players" />
        <Paper className={classes.container}>
          <form onSubmit={this.onSubmit}>
            <FormControl className={classes.formControl}>
              <FileUpload
                dir="players"
                defaultImg={defaultImage}
                filename={filename => this.storeFilename(filename)}
              />
            </FormControl>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Button variant="contained" color="secondary" type="submit" value="Submit">
                Update
              </Button>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
  }
}

EditImage.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  firebase: PropTypes.shape({}).isRequired,
  firestore: PropTypes.shape({}).isRequired,
};

export default compose(
  firestoreConnect(props => [
    { collection: 'players', storeAs: 'player', doc: props.match.params.id },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect(({ firestore: { ordered } }, props) => ({ player: ordered.player && ordered.player[0] })),
  withStyles(styles),
)(EditImage);
