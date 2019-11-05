import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// Components
import PlayerImage from './PlayerImage';
import PlayerStats from './PlayerStats';
import BoxContainer from '../../../../layout/hoc/BoxContainer';
import Targets from './Modals/Targets';
import Stats from './Modals/Stats';
import Graph from './Modals/Graph';
import styles from './styles';

const MainCard = props => {
  const { classes, player, playerStats, playerImage } = props;

  return (
    <BoxContainer>
      <ExpansionPanel>
        <ExpansionPanelSummary
          className={classes.root}
          aria-controls='panel-content'
          id='panel-header'
        >
          <Grid
            container
            direction='row'
            alignItems='center'
            style={{ padding: 0 }}
          >
            <Grid item xs={7} style={{ background: ' #333' }}>
              <PlayerImage
                number={player.number}
                name={player.name}
                position={player.position}
                image={playerImage}
                captain={player.captain}
              />
            </Grid>
            <Grid item xs={5}>
              <PlayerStats player={player} playerStats={playerStats} />
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          style={{ padding: '1px', margin: '0px auto', background: '#333' }}
        >
          <Grid
            container
            direction='row'
            justify='center'
            alignContent='center'
          >
            <Grid item xs={4}>
              <Targets {...props} />
            </Grid>
            <Grid item xs={4}>
              <Stats {...props} />
            </Grid>
            <Grid item xs={4}>
              <Graph {...props} />
            </Grid>
          </Grid>
          {player.balance !== 0 ? (
            <Typography
              variant='caption'
              style={{ textAlign: 'right', padding: '3px' }}
            >
              <span
                style={{ color: player.balance < 0 ? '#2ECC71' : '#E74C3C' }}
              >
                €{parseFloat(player.balance).toFixed(2)}
              </span>
            </Typography>
          ) : null}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </BoxContainer>
  );
};

MainCard.propTypes = {
  player: PropTypes.shape({}).isRequired,
  playerStats: PropTypes.shape({}).isRequired,
  playerImage: PropTypes.string.isRequired,
  classes: PropTypes.shape({}).isRequired,
  auth: PropTypes.bool.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  players: PropTypes.instanceOf(Array).isRequired,
  playerMatches: PropTypes.instanceOf(Array).isRequired,
  playerMatchStats: PropTypes.instanceOf(Array).isRequired,
};

export default withStyles(styles)(MainCard);
