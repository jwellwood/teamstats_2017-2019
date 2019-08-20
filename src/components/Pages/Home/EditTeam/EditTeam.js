import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
// Component
import Container from '../../../layout/hoc/Container';
import Spinner from '../../../layout/Warnings/Spinner';
import PageHeader from '../../../layout/Navs/PageHeader';
import FormTitle from '../../../layout/Forms/FormTitle';
// import FileUpload from '../../../layout/Forms/FileUpload';
// import defaultBadge from '../../../../assets/images/logoBig.jpg';

const styles = () => ({
  container: {
    padding: '5px',
    margin: '10px',
    background: '#E5E8E8',
    minWidth: '260px',
  },
  formControl: { width: '250px', margin: '10px', textAlign: 'center' },
  teamAndScore: { width: '250px', margin: '10px auto', textAlign: 'center' },
});

class EditTeam extends Component {
  // state = { defaultImg: defaultBadge };

  constructor(props) {
    super(props);
    // this.teamBadgeInput = React.createRef();
    this.teamNameInput = React.createRef();
    this.teamCityInput = React.createRef();
    this.leagueFinishInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { team, firestore, history } = this.props;
    const updatedTeam = {
      // badge: this.teamBadgeInput.current.value,
      name: this.teamNameInput.current.value,
      city: this.teamCityInput.current.value,
      leagueFinish: this.leagueFinishInput.current.value,
    };
    firestore
      .update({ collection: 'team', doc: team.id }, updatedTeam)
      .then(history.push('/'));
  };

  onDelete = () => {
    const { team, firestore, history } = this.props;
    firestore
      .delete({ collection: 'team', doc: team.id })
      .then(history.push('/'));
  };

  // storeFilename = filename => {};

  render() {
    const { classes, team } = this.props;
    // const { defaultImg } = this.state;
    const textInputProps = { minLength: 2 };
    if (team) {
      return (
        <Container>
          <PageHeader title="Edit Team" link="/" />
          <Container>
            <Paper className={classes.container}>
              <form onSubmit={this.onSubmit}>
                <FormTitle title="Team Details" />
                {/* <FormControl className={classes.formControl}>
                  <FileUpload
                    dir="team"
                    defaultImg={defaultImg}
                    filename={filename => this.storeFilename(filename)}
                  />
                </FormControl> */}
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Team Name"
                    type="text"
                    name="name"
                    inputProps={textInputProps}
                    required
                    inputRef={this.teamNameInput}
                    defaultValue={team.name}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Home city"
                    type="text"
                    name="city"
                    inputProps={textInputProps}
                    required
                    inputRef={this.teamCityInput}
                    defaultValue={team.city}
                  />
                </FormControl>

                <FormControl className={classes.formControl}>
                  <Select
                    label="League position last season"
                    native
                    inputRef={this.leagueFinishInput}
                    defaultValue={team.leagueFinish}
                    required
                    inputProps={{
                      name: 'leaguePosition',
                      id: 'leaguePosition',
                    }}
                  >
                    <option value="None">N/A</option>
                    <option value="1st">1st</option>
                    <option value="2nd">2nd</option>
                    <option value="3rd">3rd</option>
                    <option value="4th">4th</option>
                    <option value="5th">5th</option>
                    <option value="6th">6th</option>
                    <option value="7th">7th</option>
                    <option value="8th">8th</option>
                    <option value="9th">9th</option>
                    <option value="10th">10th</option>
                    <option value="11th">11th</option>
                    <option value="12th">12th</option>
                    <option value="13th">13th</option>
                    <option value="14th">14th</option>
                    <option value="15th">15th</option>
                    <option value="16th">16th</option>
                    <option value="17th">17th</option>
                    <option value="18th">18th</option>
                    <option value="19th">19th</option>
                    <option value="20th">20th</option>
                    <option value="Other">Other</option>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  value="Submit"
                >
                  Update
                </Button>
              </form>
            </Paper>
          </Container>
        </Container>
      );
    }
    return <Spinner />;
  }
}

EditTeam.propTypes = {
  firestore: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
  team: PropTypes.shape({}),
};

EditTeam.defaultProps = { team: null };

export default compose(
  firestoreConnect(props => [
    { collection: 'team', storeAs: 'team', doc: props.match.params.id },
  ]),
  // eslint-disable-next-line no-unused-vars
  connect(({ firestore: { ordered } }, props) => ({
    team: ordered.team && ordered.team[0],
  })),
  withStyles(styles),
)(EditTeam);
