import React from 'react';
import PropTypes from 'prop-types';
import SwitchButton from '../../../../../layout/ui/SwitchButton';
import TableWrapper from '../../../../../layout/Table';
import columns from './Data';
import {
  getAllWins,
  getAllDraws,
  getAllLosses,
  getGoalsFor,
  getGoalsAgainst,
  perGame,
  getPointsPer,
} from '../../../../../../functions/Results/functions';
import IconFA from '../../../../../../assets/icons/IconFA';

const HomeAndAway = props => {
  const { homeResults, awayResults, checked, handleChange, value } = props;
  const totalPlayedHome = homeResults.length;
  const totalPlayedAway = awayResults.length;
  const homeWins = getAllWins(homeResults).length;
  const homeDraws = getAllDraws(homeResults).length;
  const homeLosses = getAllLosses(homeResults).length;
  const homeGoals = getGoalsFor(homeResults);
  const homeGoalsAgainst = getGoalsAgainst(homeResults);
  const homeGoalsPerGame = perGame(homeGoals, totalPlayedHome);
  const homeGoalsAgainstPerGame = perGame(homeGoalsAgainst, totalPlayedHome);

  const awayWins = getAllWins(awayResults).length;
  const awayDraws = getAllDraws(awayResults).length;
  const awayLosses = getAllLosses(awayResults).length;
  const awayGoals = getGoalsFor(awayResults);
  const awayGoalsAgainst = getGoalsAgainst(awayResults);
  const awayGoalsPerGame = perGame(awayGoals, totalPlayedAway);
  const awayGoalsAgainstPerGame = perGame(awayGoalsAgainst, totalPlayedAway);

  const goalDiffHome = homeGoals - homeGoalsAgainst;
  const goalDiffAway = awayGoals - awayGoalsAgainst;
  const goalDiffHomePerGame = perGame(goalDiffHome, totalPlayedHome);
  const goalDiffAwayPerGame = perGame(goalDiffAway, totalPlayedAway);
  const pointsHomePerGame = getPointsPer(homeWins, homeDraws, totalPlayedHome);
  const pointsAwayPerGame = getPointsPer(awayWins, awayDraws, totalPlayedAway);
  // Data to map
  let id = 0;
  const arrow = '-';
  // eslint-disable-next-line no-shadow
  function createData(statName, home, arrow, away) {
    id += 1;
    if (+home > +away) {
      // eslint-disable-next-line no-param-reassign
      arrow = <IconFA icon='arrow-left' color='#222' />;
    } else if (+home < +away) {
      // eslint-disable-next-line no-param-reassign
      arrow = <IconFA icon='arrow-right' />;
    }
    return { id, statName, home, arrow, away };
  }

  const data = [
    createData('Played', totalPlayedHome, arrow, totalPlayedAway),
    createData('Won', homeWins, arrow, awayWins),
    createData('Drawn', homeDraws, arrow, awayDraws),
    createData('Lost', homeLosses, arrow, awayLosses),
    createData('Scored', homeGoals, arrow, awayGoals),
    createData('Conceded', homeGoalsAgainst, arrow, awayGoalsAgainst),
    createData('Goal difference', goalDiffHome, arrow, goalDiffAway),
    createData(
      'Avg. Goals',
      homeGoalsPerGame,
      arrow,
      isNaN(awayGoalsPerGame) ? '-' : awayGoalsPerGame,
    ),
    createData(
      'Avg. Conceded',
      homeGoalsAgainstPerGame,
      arrow,
      isNaN(awayGoalsAgainstPerGame) ? '-' : awayGoalsAgainstPerGame,
    ),
    createData(
      'Avg. Difference',
      goalDiffHomePerGame,
      arrow,
      isNaN(goalDiffAwayPerGame) ? '-' : goalDiffAwayPerGame,
    ),
    createData(
      'Avg. Points',
      pointsHomePerGame,
      arrow,
      isNaN(pointsAwayPerGame) ? '-' : pointsAwayPerGame,
    ),
  ];

  return (
    <div>
      <SwitchButton
        checked={checked}
        handleChange={handleChange}
        value={value}
        label='Include forfeits'
      />
      <TableWrapper data={data} columns={columns} />
    </div>
  );
};
HomeAndAway.propTypes = {
  homeResults: PropTypes.instanceOf(Array).isRequired,
  awayResults: PropTypes.instanceOf(Array).isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default HomeAndAway;
