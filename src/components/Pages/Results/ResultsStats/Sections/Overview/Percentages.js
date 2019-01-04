import React from 'react';
import PropTypes from 'prop-types';
// Components
import StatsHeader from '../../../../../layout/Stats/StatsHeader';

import { colors } from '../../../../../../assets/styles/colors';
import TotalPieChart from './TotalPieChart';
import { getPercentage } from '../../../../../../helpers/calcs';

const Percentages = props => {
  const { matchTotals } = props;
  const { totalPlayed, totalWins, totalDraws, totalLoss } = matchTotals;
  const winPercentage = getPercentage(totalWins, totalPlayed);
  const drawPercentage = getPercentage(totalDraws, totalPlayed);
  const lossPercentage = getPercentage(totalLoss, totalPlayed);

  // League
  // const leagueMatches = results.filter(result => result.matchType === 'League');
  // const totalLeagueMatches = leagueMatches.length;
  // const leagueWins = leagueMatches.filter(result => result.resultIndicator === 'W').length;
  // const leagueDraws = leagueMatches.filter(result => result.resultIndicator === 'D').length;
  // const leagueDefeats = leagueMatches.filter(result => result.resultIndicator === 'L').length;
  // const winPercentageLeague = ((leagueWins * 100) / totalLeagueMatches).toFixed(1);
  // const drawPercentageLeague = ((leagueDraws * 100) / totalLeagueMatches).toFixed(1);
  // const lossPercentageLeague = ((leagueDefeats * 100) / totalLeagueMatches).toFixed(1);

  let id = 0;
  const createData = (icon, value, title, color) => {
    id += 1;
    return { id, icon, value, title, color };
  };

  const listItems = [
    createData(totalWins, `${winPercentage}%`, '', colors.win),
    createData(totalDraws, `${drawPercentage}%`, '', colors.draw),
    createData(totalLoss, `${lossPercentage}%`, '', colors.lose),
  ];
  // const listItemsLeague = [
  //   createData(leagueWins, `${winPercentageLeague}%`, '', colors.win),
  //   createData(leagueDraws, `${drawPercentageLeague}%`, '', colors.draw),
  //   createData(leagueDefeats, `${lossPercentageLeague}%`, '', colors.lose),
  // ];

  const data = {
    labels: ['Win', 'Draw', 'Defeat'],
    datasets: [
      {
        data: [winPercentage, drawPercentage, lossPercentage],
        backgroundColor: [colors.win, colors.draw, colors.lose],
      },
    ],
  };

  // const leagueData = {
  //   labels: ['Win', 'Draw', 'Defeat'],
  //   datasets: [
  //     {
  //       data: [winPercentageLeague, drawPercentageLeague, lossPercentageLeague],
  //       backgroundColor: [colors.win, colors.draw, colors.lose],
  //     },
  //   ],
  // };

  return (
    <div>
      <StatsHeader title="Overview" />
      <TotalPieChart
        data={data}
        title="Total Matches"
        itemsToMap={listItems}
        totalPlayed={totalPlayed}
      />
    </div>
  );
};

Percentages.propTypes = { matchTotals: PropTypes.shape({}).isRequired };

export default Percentages;
