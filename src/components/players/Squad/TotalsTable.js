import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// Components
import PlayersOverview from '../TeamPlayers/PlayersOverview';
import MoreStatsModal from '../../layout/Stats/MoreStatsModal';
import StatsAvatar from '../../layout/Stats/StatsAvatar';

const styles = () => ({
  root: { padding: '5px' },
  item: { margin: '5px auto' },
  value: { fontWeight: 'bold' },
  statsKey: { fontSize: '10px', color: '#aaa', margin: '0 auto' },
});

const TotalsTable = props => {
  const {
    classes,
    players,
    totalPlayers,
    playersPerMatch,
    Apps,
    Goals,
    Assists,
    Money,
    MVP,
    mvpPerGame,
    // totalMatches,
  } = props;

  // Data to map
  let id = 0;
  const createData = (icon, value, title) => {
    id += 1;
    return { id, icon, value, title };
  };

  const listItems = [
    createData(<i className="fas fa-users" />, totalPlayers, 'TOTAL PLAYERS'),
    createData(<i className="fas fa-futbol" />, Goals.totalTeamGoals, 'GOALS SCORED'),
    createData(
      <i className="fas fa-dollar-sign" />,
      <span style={Money.totalTeamOwed > 0 ? { color: '#E74C3C' } : { color: '#28B463' }}>
        €{parseFloat(Money.totalTeamOwed).toFixed(2)}
      </span>,
      'OWED',
      null,
    ),
  ];

  return (
    <Paper className={classes.root}>
      <StatsAvatar itemsToMap={listItems} />
      <MoreStatsModal title="Squad" link="/players/addplayer" icon="person_add">
        <PlayersOverview
          totalPlayers={totalPlayers}
          playersPerMatch={playersPerMatch}
          mvpPerGame={mvpPerGame}
          Apps={Apps}
          Goals={Goals}
          Assists={Assists}
          Money={Money}
          MVP={MVP}
          players={players}
          // totalMatches={totalMatches}
        />
      </MoreStatsModal>
    </Paper>
  );
};

TotalsTable.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  players: PropTypes.instanceOf(Array).isRequired,
  Apps: PropTypes.shape({}).isRequired,
  Goals: PropTypes.shape({}).isRequired,
  Assists: PropTypes.shape({}).isRequired,
  MVP: PropTypes.shape({}).isRequired,
  Money: PropTypes.shape({}).isRequired,
  totalPlayers: PropTypes.number.isRequired,
  // totalMatches: PropTypes.number.isRequired,
  playersPerMatch: PropTypes.number.isRequired,
  mvpPerGame: PropTypes.number.isRequired,
};

export default withStyles(styles)(TotalsTable);
