import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

// Components
import { Typography } from '@material-ui/core';
import StatsHeader from '../../../../layout/Stats/StatsHeader';
import BoxContainer from '../../../../layout/hoc/BoxContainer';

// helpers
import columns from './Data';
import Percentages from './Percentages';

const IndividualStats = props => {
  const {
    totalTeamGoals,
    playerStats,
    playerMatches,
    playerMatchStats,
    player,
    results,
    playerImage,
  } = props;
  const { apps, goals, assists, mvp } = playerStats;

  const numberOfMatches = playerMatches.length;
  const goalsPG = (goals / apps).toFixed(2);
  const assistsPG = (assists / apps).toFixed(2);
  const mvpPG = (mvp / apps).toFixed(2);
  let goalContribution = ((goals + assists) * 100) / totalTeamGoals;
  if (totalTeamGoals === 0) {
    goalContribution = 0;
  }
  const overallContribution = goalContribution.toFixed(1);
  const teamGoals = playerMatches.map(match => +match.teamScore).reduce((a, b) => a + b, 0);
  const teamConc = playerMatches.map(match => +match.opponentScore).reduce((a, b) => a + b, 0);
  const averageScored = (teamGoals / numberOfMatches).toFixed(2);
  const averageConc = (teamConc / numberOfMatches).toFixed(2);
  const avgScore = (averageScored - averageConc).toFixed(2);
  const goalsScored = playerMatchStats.map(match => +match.matchGoals);
  const assistsMade = playerMatchStats.map(match => +match.matchAssists);
  const mostScored = Math.max(...goalsScored);
  const mostAssisted = Math.max(...assistsMade);
  const matchesScoredIn = playerMatchStats.filter(match => match.matchGoals > 0);
  const matchesAssistedIn = playerMatchStats.filter(match => match.matchAssists > 0);
  const matchesStatIn = playerMatchStats.filter(
    match => match.matchGoals > 0 || match.matchAssists > 0,
  );
  const scoredIn = ((matchesScoredIn.length / numberOfMatches) * 100).toFixed(1);
  const assistedIn = ((matchesAssistedIn.length / numberOfMatches) * 100).toFixed(1);
  const goalOrAssistIn = ((matchesStatIn.length / numberOfMatches) * 100).toFixed(1);

  let id = 0;
  const createData = (description, value, tag) => {
    id += 1;
    return { id, description, value, tag };
  };

  const listItems = [
    createData('Goals / game', goalsPG),
    createData('Assists / game', assistsPG),
    createData('MVP Total', mvp),
    createData('MVP / game', mvpPG),
    createData('Avg team scored', averageScored),
    createData('Avg team conceded', averageConc),
    createData('Most goals', mostScored),
    createData('Most assists', mostAssisted),
    createData('Scored in %', scoredIn, '%'),
    createData('Assisted in %', assistedIn, '%'),
    createData('Scored or assisted in %', goalOrAssistIn, '%'),
    createData('Overall goal / assist %', overallContribution, '%'),
  ];

  const data = listItems.map(item => ({
    name: (
      <Typography variant="caption" style={{ color: '#eee' }}>
        {item.description}
      </Typography>
    ),
    value: (
      <Typography color="secondary" style={{ textAlign: 'center', fontWeight: 'bold' }}>
        {item.value} <span style={{ color: '#ccc', fontSize: '9px' }}>{item.tag}</span>
      </Typography>
    ),
  }));
  const TheadComponent = () => null;
  return (
    <BoxContainer>
      <StatsHeader title="Stats" />
      <Percentages
        player={player}
        results={results}
        playerImage={playerImage}
        totalTeamGoals={totalTeamGoals}
        playerMatches={playerMatches}
        playerMatchStats={playerMatchStats}
        avgScore={avgScore}
      />
      <ReactTable
        data={data}
        columns={columns}
        showPagination={false}
        minRows={1}
        className="-striped"
        TheadComponent={TheadComponent}
        getTdProps={() => ({
          style: {
            fontFamily: 'Varela Round',
            fontSize: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        })}
      />
    </BoxContainer>
  );
};

IndividualStats.propTypes = {
  playerStats: PropTypes.shape({}).isRequired,
  playerMatches: PropTypes.instanceOf(Array).isRequired,
  playerMatchStats: PropTypes.instanceOf(Array).isRequired,
  totalTeamGoals: PropTypes.number.isRequired,
};

export default IndividualStats;
