import React from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
// import { playerColumns } from '../../Data';

const ReferenceTable = props => {
  const { players, results } = props;
  const gamesWithoutForfeits = results.filter(res => !res.forfeitedMatch);
  const totalPlayed = gamesWithoutForfeits.length;
  const totalScoredArray = gamesWithoutForfeits.map(res => +res.teamScore);
  const totalScored = totalScoredArray.reduce((a, b) => a + b, 0);
  const totalAssistsArray = players.map(player => player.assists);
  const totalAssists = totalAssistsArray.reduce((a, b) => a + b, 0);

  const data = players.map(player => ({
    name: player.name,
    apps: +player.apps,
    goals: +player.goals,
    assists: +player.assists,
    mvp: +player.mvp,

    percentApps: ((+player.apps * 100) / +totalPlayed).toFixed(0),
    appTarget: +player.targetApps,
    percentAppTarget: ((+player.apps * 100) / +player.targetApps).toFixed(2),

    goalsPerGame: (+player.goals / +player.apps).toFixed(2),
    percentGoals: ((+player.goals * 100) / +totalScored).toFixed(2),
    goalTarget: player.targetGoals,
    percentGoalTarget: ((+player.goals * 100) / +player.targetGoals).toFixed(2),

    percentAssists: ((+player.assists * 100) / +totalAssists).toFixed(2),
    assistsPerGame: (+player.assists / +player.apps).toFixed(2),
    assistTarget: player.targetAssists,
    percentAssistTarget: ((+player.assists * 100) / +player.targetAssists).toFixed(2),

    mvpPerGame: (+player.mvp / +player.apps).toFixed(2),
    goalContribution: (((+player.goals + +player.assists) * 100) / totalScored).toFixed(2),
    balance: player.balance,
  }));

  return (
    <div>
      <ReactTable
        data={data}
        columns={playerColumns}
        showPagination={false}
        minRows={1}
        className="-striped"
        getTheadThProps={() => ({ style: { backgroundColor: '#222', color: '#fff' } })}
        getTheadGroupThProps={() => ({
          style: {
            backgroundColor: '#9a0007',
            color: '#fff',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            textAlign: 'left',
            fontSize: '12px',
          },
        })}
        getTdProps={() => ({
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        })}
        defaultSortDesc
      />
    </div>
  );
};

ReferenceTable.propTypes = {
  results: PropTypes.instanceOf(Array).isRequired,
  players: PropTypes.instanceOf(Array).isRequired,
};

export default ReferenceTable;
