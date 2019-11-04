import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Typography from '@material-ui/core/Typography';
// Components
import StatsHeader from '../../../layout/Stats/StatsHeader';
import TableWrapper from '../../../layout/Table';
// Data
import columns from './Data';

const TopPlayers = props => {
  const { playerStats, results } = props;
  const totalTeamGoals = results
    .map(result => +result.teamScore)
    .reduce((a, b) => a + b, 0);

  const matchStatsPlayer = [];
  // Per Match
  if (playerStats) {
    playerStats.map(player => {
      const playerMatches = [];

      // eslint-disable-next-line max-len
      results.map(result =>
        result.matchPlayers.map(p =>
          p.id === player.id ? playerMatches.push(result) : null,
        ),
      );
      let newMatchPlayerStats = {};
      if (playerMatches) {
        const wonMatches = playerMatches.filter(
          match => +match.teamScore > +match.opponentScore,
        ).length;
        const totalApps = playerMatches.length;
        const winPercentage = ((wonMatches / totalApps) * 100).toFixed(1);
        const teamGoals = playerMatches
          .map(match => +match.teamScore)
          .reduce((a, b) => a + b, 0);
        const teamConc = playerMatches
          .map(match => +match.opponentScore)
          .reduce((a, b) => a + b, 0);
        const averageScored = (teamGoals / totalApps).toFixed(2);
        const averageConc = (teamConc / totalApps).toFixed(2);
        const avgScore = (averageScored - averageConc).toFixed(2);

        newMatchPlayerStats = {
          id: player.id,
          name: player.name,
          winPercentage,
          avgScore,
        };
      }
      return matchStatsPlayer.push(newMatchPlayerStats);
    });
  }

  // Helper Functions p = player
  const getTopValue = (array, statType) => {
    const type = array.map(statType);
    const most = Math.max(...type);
    return most;
  };

  const topPlayer = array =>
    array.map(p => (
      <Typography
        key={p.id}
        variant='caption'
        style={{ color: '#2ECC71', fontWeight: 'bold' }}
      >
        {p.name}
      </Typography>
    ));

  // Goals
  const mostGoals = getTopValue(playerStats, p => +p.goals);
  const topScorerList = playerStats.filter(p => p.goals === mostGoals);
  const topScorer = topPlayer(topScorerList);
  // Assists
  const mostAssists = getTopValue(playerStats, p => +p.assists);
  const topAssistList = playerStats.filter(p => p.assists === mostAssists);
  const topAssister = topPlayer(topAssistList);
  // MVP
  const mostMvps = getTopValue(playerStats, p => +p.mvp);
  const topMvpList = playerStats.filter(p => p.mvp === mostMvps);
  const topMvp = topPlayer(topMvpList);
  // Overall Contribution
  const mostOverall = getTopValue(playerStats, p => +p.goals + +p.assists);
  const topContributionList = playerStats.filter(
    p => +p.goals + +p.assists === mostOverall,
  );
  const topContributionPercentage = (
    (+mostOverall * 100) /
    +totalTeamGoals
  ).toFixed(1);
  const topContributor = topPlayer(topContributionList);
  // Goals per game
  const mostGoalsPerGame = getTopValue(playerStats, p => p.goals / p.apps);
  const topGoalsPerGameList = playerStats.filter(
    p => p.goals / p.apps === mostGoalsPerGame,
  );
  const topGoalsPerGamePlayer = topPlayer(topGoalsPerGameList);
  // Assists per game
  const mostAssistsPerGame = getTopValue(playerStats, p => p.assists / p.apps);
  const topAssistPerGameList = playerStats.filter(
    p => p.assists / p.apps === mostAssistsPerGame,
  );
  const topAssistsPerGamePlayer = topPlayer(topAssistPerGameList);
  // Best win %
  const bestWinPercentage = getTopValue(
    matchStatsPlayer,
    p => +p.winPercentage,
  );
  const topWinPercentageList = matchStatsPlayer.filter(
    p => +p.winPercentage === bestWinPercentage,
  );
  const topWinPercentagePlayer = topPlayer(topWinPercentageList);
  // Best Avg Score %
  const bestGoalDiff = getTopValue(matchStatsPlayer, p => +p.avgScore);
  const topGoalDiffList = matchStatsPlayer.filter(
    p => +p.avgScore === bestGoalDiff,
  );
  const topGoalDiffPlayer = topPlayer(topGoalDiffList);

  let id = 0;
  const createData = (description, name, value, tag) => {
    id += 1;
    return { id, description, name, value, tag };
  };

  const listItems = [
    createData('Top Scorer', topScorer, mostGoals),
    createData('Most Assists', topAssister, mostAssists),
    createData('Most MVPs', topMvp, mostMvps),
    createData(
      'Goals / game',
      topGoalsPerGamePlayer,
      mostGoalsPerGame.toFixed(2),
    ),
    createData('Assists / game', topAssistsPerGamePlayer, mostAssistsPerGame),
    createData('Win %', topWinPercentagePlayer, bestWinPercentage),
    createData('Goal difference', topGoalDiffPlayer, bestGoalDiff),
    createData('Contribution %', topContributor, topContributionPercentage),
  ];

  const data = listItems.map(item => ({
    description: (
      <Typography variant='caption' style={{ color: '#eee' }}>
        {item.description}
      </Typography>
    ),
    name: item.name,
    value: (
      <Typography
        color='secondary'
        style={{ textAlign: 'center', fontWeight: 'bold' }}
      >
        {item.value}{' '}
        <span style={{ color: '#ccc', fontSize: '9px' }}>{item.tag}</span>
      </Typography>
    ),
  }));
  const TheadComponent = () => null;
  return (
    <div>
      <StatsHeader title='Leaderboard' />
      <TableWrapper data={data} columns={columns} noHeader={TheadComponent} />
    </div>
  );
};

TopPlayers.propTypes = {
  playerStats: PropTypes.instanceOf(Array).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

export default TopPlayers;
