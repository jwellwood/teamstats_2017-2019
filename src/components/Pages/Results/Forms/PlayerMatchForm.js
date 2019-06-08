import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { Icon, IconButton, Typography } from '@material-ui/core';
// Redux
import { firestoreConnect } from 'react-redux-firebase';
import FormContainer from '../../../layout/Forms/FormContainer';

class PlayerMatchForm extends Component {
  state = {
    app: false,
    goals: 0,
    assists: 0,
    mvp: false,
    allowSubmit: true,
  };

  onAppSelect = () => {
    const { app } = this.state;
    this.setState({ app: !app });
  };

  onMVPSelect = () => {
    const { mvp } = this.state;
    this.setState({ mvp: !mvp });
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: +e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { goals, assists, mvp } = this.state;
    const { player, result, firestore } = this.props;
    const updatedPlayer = {
      apps: player.apps + 1,
      goals: player.goals + goals,
      assists: player.assists + assists,
      mvp: mvp ? player.mvp + 1 : player.mvp,
    };

    const updateMatchPlayer = {
      id: player.id,
      name: player.name,
      matchGoals: goals,
      matchAssists: assists,
      matchMvp: mvp ? 1 : 0,
    };
    const resultRef = firestore.collection('results').doc(result.id);
    resultRef.update({ matchPlayers: firestore.FieldValue.arrayUnion(updateMatchPlayer) });

    firestore.update({ collection: 'players', doc: player.id }, updatedPlayer);
    this.setState({ allowSubmit: false });
  };

  render() {
    const { player } = this.props;
    const { app, mvp, goals, assists, allowSubmit } = this.state;
    return (
      <FormContainer>
        <form onSubmit={this.onSubmit}>
          <Card
            style={{
              margin: '5px',
              padding: '10px',
              border: '2px solid',
              borderColor: app ? '#2ECC71' : '#E74C3C',
            }}
          >
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Typography style={{ fontWeight: 'bold', color: app ? '#2ECC71' : '#E74C3C' }}>
                {player.name}
              </Typography>
              <FormControlLabel
                control={<Switch checked={app} onChange={this.onAppSelect} color="primary" />}
              />
            </Grid>

            {app ? (
              <div>
                <Divider />
                <Grid container direction="row" alignItems="center" justify="center">
                  <Grid item xs={3}>
                    <FormControl style={{ width: '30px' }}>
                      <Input value={goals} onChange={this.onChange} name="goals" />
                      <FormHelperText id="weight-helper-text">Goals</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl style={{ width: '30px' }}>
                      <Input value={assists} onChange={this.onChange} name="assists" />

                      <FormHelperText id="weight-helper-text">Assists</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl>
                      <Checkbox checked={mvp} onChange={this.onMVPSelect} />
                      <FormHelperText style={{ textAlign: 'center' }} id="weight-helper-text">
                        MVP
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton type="submit" disabled={!allowSubmit}>
                      <Icon>check</Icon>
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            ) : null}
          </Card>
        </form>
      </FormContainer>
    );
  }
}

PlayerMatchForm.propTypes = {
  player: PropTypes.shape({}).isRequired,
  result: PropTypes.shape({}).isRequired,
  firestore: PropTypes.shape({}).isRequired,
};

export default firestoreConnect()(PlayerMatchForm);
