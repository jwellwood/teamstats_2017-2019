import React from 'react';
import PropTypes from 'prop-types';

// Components
import BoxContainer from '../../../layout/hoc/BoxContainer';
import StatsWrapper from '../../../layout/Stats/StatsWrapper';
// table
import TopPlayers from './TopPlayers';
import TeamTargets from './TeamTargets';
import OtherStats from './OtherStats';

const TeamStats = props => {
  const { players, results } = props;
  const playerStats = [];
  if (players) {
    players.map(player => {
      const playerMatches = [];
      // eslint-disable-next-line max-len
      results.map(result => result.matchPlayers.map(pl => (pl.id === player.id ? playerMatches.push(result) : null)));

      const playerMatchStats = playerMatches.map(match => {
        const stats = match.matchPlayers.filter(pl => pl.id === player.id);
        return stats[0];
      });
      let newPlayerStats = {};
      if (playerMatchStats) {
        const newId = playerMatchStats.map(p => p.id);
        const newName = playerMatchStats.map(p => p.name);
        const id = newId[0];
        const name = newName[0];
        const apps = playerMatchStats.length;
        const goals = playerMatchStats.map(p => p.matchGoals).reduce((a, b) => a + b, 0);
        const assists = playerMatchStats.map(p => p.matchAssists).reduce((a, b) => a + b, 0);
        const mvp = playerMatchStats.map(p => p.matchMvp).reduce((a, b) => a + b, 0);
        newPlayerStats = {
          id,
          name,
          apps,
          goals,
          assists,
          mvp,
        };
      }
      return playerStats.push(newPlayerStats);
    });
  }

  return (
    <StatsWrapper>
      <BoxContainer>
        <TopPlayers playerStats={playerStats} results={results} />
        <TeamTargets playerStats={playerStats} players={players} />
        <OtherStats playerStats={playerStats} players={players} results={results} />
      </BoxContainer>
    </StatsWrapper>
  );
};

TeamStats.propTypes = {
  players: PropTypes.instanceOf(Array).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

export default TeamStats;
