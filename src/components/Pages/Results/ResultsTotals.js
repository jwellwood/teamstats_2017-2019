import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import MoreStatsModal from '../../layout/Stats/MoreStatsModal';
import StatsAvatar from '../../layout/Stats/StatsAvatar';
import ResultsStats from './ResultsStats/ResultsStats';
import BoxContainer from '../../hoc/BoxContainer';

const ResultsTotals = props => {
  const { results, teamName } = props;
  const homeResults = results.filter(result => result.homeTeamName === teamName);
  const awayResults = results.filter(result => result.awayTeamName === teamName);
  const getGoals = (a, b) => a + b;
  const myTeamHomeArray = homeResults.map(goals => +goals.homeTeamScore);
  const myTeamAwayArray = awayResults.map(goals => +goals.awayTeamScore);
  const homeTeamGoals = myTeamHomeArray.reduce(getGoals, 0);
  const awayTeamGoals = myTeamAwayArray.reduce(getGoals, 0);

  const opponentHomeResults = results.filter(result => result.homeTeamName !== teamName);
  const opponentAwayResults = results.filter(result => result.awayTeamName !== teamName);
  const opponentHomeArray = opponentHomeResults.map(goals => +goals.homeTeamScore);
  const opponentAwayArray = opponentAwayResults.map(goals => +goals.awayTeamScore);
  const opponentHomeGoals = opponentHomeArray.reduce(getGoals, 0);
  const opponentAwayGoals = opponentAwayArray.reduce(getGoals, 0);

  const goalsFor = homeTeamGoals + awayTeamGoals;
  const goalsAgainst = opponentHomeGoals + opponentAwayGoals;

  const matchTotals = {
    totalPlayed: results.length,
    totalWins: results.filter(result => result.resultIndicator === 'W').length,
    totalDraws: results.filter(result => result.resultIndicator === 'D').length,
    totalLoss: results.filter(result => result.resultIndicator === 'L').length,
  };
  const goalTotals = {
    totalGoalsFor: goalsFor,
    totalGoalsAgainst: goalsAgainst,
    homeGoalsFor: homeTeamGoals,
    awayGoalsFor: awayTeamGoals,
    homeGoalsAgainst: opponentAwayGoals,
    awayGoalsAgainst: opponentHomeGoals,
  };
  // Data to map
  let id = 0;
  const createData = (icon, value, title, color) => {
    id += 1;
    return { id, icon, value, title, color };
  };

  const colors = {
    win: '#58D68D',
    draw: '#F39C12',
    lose: '#E74C3C',
  };

  const listItems = [
    createData(<i className="fas fa-list" />, matchTotals.totalPlayed, 'TOTAL MATCHES', ''),
    createData(<i className="fas fa-plus" />, goalsFor, 'GOALS FOR', ''),
    createData(<i className="fas fa-minus" />, goalsAgainst, 'GOALS AGAINST', ''),
    createData(null, matchTotals.totalWins, 'WIN', colors.win),
    createData(null, matchTotals.totalDraws, 'DRAW', colors.draw),
    createData(null, matchTotals.totalLoss, 'LOSE', colors.lose),
  ];

  return (
    <BoxContainer>
      <Paper style={{ padding: '10px' }}>
        <StatsAvatar itemsToMap={listItems} />
        <MoreStatsModal title="Results" link="results/addresult" icon="add_box">
          <ResultsStats
            results={results}
            matchTotals={matchTotals}
            goalTotals={goalTotals}
            homeResults={homeResults}
            awayResults={awayResults}
          />
        </MoreStatsModal>
      </Paper>
    </BoxContainer>
  );
};

ResultsTotals.propTypes = {
  results: PropTypes.instanceOf(Array).isRequired,
  teamName: PropTypes.string.isRequired,
};

export default ResultsTotals;
