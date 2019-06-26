import React from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import columns from './Data';
import {
  getAllWins,
  getAllDraws,
  getAllLosses,
  getGoalsFor,
  getGoalsAgainst,
  perGame,
  getPointsPer,
} from '../../../../../functions/Results/functions';
import SwitchButton from '../../../../layout/ui/SwitchButton';

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
      arrow = <i style={{ color: '#222' }} className="fas fa-arrow-left" />;
    } else if (+home < +away) {
      // eslint-disable-next-line no-param-reassign
      arrow = <i className="fas fa-arrow-right" />;
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
    createData('Avg. Goals', homeGoalsPerGame, arrow, awayGoalsPerGame),
    createData('Avg. Conceded', homeGoalsAgainstPerGame, arrow, awayGoalsAgainstPerGame),
    createData('Avg. Difference', goalDiffHomePerGame, arrow, goalDiffAwayPerGame),
    createData('Avg. Points', pointsHomePerGame, arrow, pointsAwayPerGame),
  ];

  return (
    <div>
      <SwitchButton
        checked={checked}
        handleChange={handleChange}
        value={value}
        label="Include forfeits"
      />
      <div>
        <ReactTable
          data={data}
          columns={columns}
          showPagination={false}
          minRows={1}
          className="-striped"
          getTheadThProps={() => ({ style: { backgroundColor: '#333', color: '#fff' } })}
          getTheadGroupThProps={() => ({
            style: {
              backgroundColor: '#333',
              color: '#fff',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              textAlign: 'left',
            },
          })}
          getTdProps={() => ({
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            },
          })}
        />
      </div>
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
