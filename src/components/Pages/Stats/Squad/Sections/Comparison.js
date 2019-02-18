import React from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import StatsHeader from '../../../../layout/Stats/StatsHeader';

const Comparison = props => {
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
  const columns = [
    {
      Header: '',
      accessor: 'name',
      style: { backgroundColor: '#d32f2f', color: '#fff', fontWeight: 'bold' },
    },
    {
      Header: 'Apps',
      columns: [
        {
          Header: <i className="far fa-check-square" />,
          id: 'apps',
          accessor: a => Number(a.apps),
          width: 30,
          resizable: false,
          style: { fontWeight: 'bold' },
        },
        {
          Header: <div style={{ color: '#bbb' }}>%</div>,
          id: 'percentApps',
          accessor: a => Number(a.percentApps),
          width: 35,
          resizable: false,
          style: { opacity: '0.5', fontSize: '0.65rem', verticalAlign: 'center' },
        },
        {
          Header: <i style={{ color: '#FFC300' }} className="fas fa-bullseye" />,
          id: 'appTarget',
          accessor: a => Number(a.appTarget),
          width: 45,
          resizable: false,
          style: { opacity: '0.5', fontSize: '0.65rem' },
        },
        {
          Header: <div style={{ color: '#FFC300' }}>%</div>,
          id: 'percentAppTarget',
          accessor: a => Number(a.percentAppTarget),
          width: 45,
          resizable: false,
          style: { opacity: '0.5', fontSize: '0.65rem' },
        },
      ],
    },
    {
      Header: 'Goals',
      columns: [
        {
          Header: <i className="fas fa-futbol" />,
          id: 'goals',
          accessor: a => Number(a.goals),
          width: 30,
          resizable: false,
          style: { fontWeight: 'bold' },
        },
        {
          Header: <div style={{ color: '#bbb' }}>Av</div>,
          id: 'goalsPerGame',
          accessor: a => Number(a.goalsPerGame),
          width: 45,
          resizable: false,
          style: { opacity: '0.5', fontSize: '0.65rem' },
        },
        {
          Header: <div style={{ color: '#bbb' }}>%</div>,
          id: 'percentGoals',
          accessor: a => Number(a.percentGoals),
          width: 45,
          resizable: false,
          style: { opacity: '0.5', fontSize: '0.65rem' },
        },
        {
          Header: <i style={{ color: '#FFC300' }} className="fas fa-bullseye" />,
          id: 'goalTarget',
          accessor: a => Number(a.goalTarget),
          width: 45,
          resizable: false,
          style: { opacity: '0.5', fontSize: '0.65rem' },
        },
        {
          Header: <div style={{ color: '#FFC300' }}>%</div>,
          id: 'percentGoalTarget',
          accessor: a => Number(a.percentGoalTarget),
          width: 45,
          resizable: false,
          style: { opacity: '0.5', fontSize: '0.65rem' },
        },
      ],
    },
    {
      Header: 'Assists',
      columns: [
        {
          Header: <i className="fas fa-key" />,
          id: 'assists',
          accessor: a => Number(a.assists),
          width: 30,
          resizable: false,
          style: { fontWeight: 'bold' },
        },
        {
          Header: <div style={{ color: '#bbb' }}>Av</div>,
          id: 'assistsPerGame',
          accessor: a => Number(a.assistsPerGame),
          width: 45,
          resizable: false,
          style: { opacity: '0.5', fontSize: '0.65rem' },
        },
        {
          Header: <div style={{ color: '#bbb' }}>%</div>,
          id: 'percentAssists',
          accessor: a => Number(a.percentAssists),
          width: 45,
          resizable: false,
          style: { opacity: '0.5', fontSize: '0.65rem' },
        },
        {
          Header: <i style={{ color: '#FFC300' }} className="fas fa-bullseye" />,
          id: 'assistTarget',
          accessor: a => Number(a.assistTarget),
          width: 45,
          resizable: false,
          style: { opacity: '0.5', fontSize: '0.65rem' },
        },
        {
          Header: <div style={{ color: '#FFC300' }}>%</div>,
          id: 'percentAssistTarget',
          accessor: a => Number(a.percentAssistTarget),
          width: 45,
          resizable: false,
          style: { opacity: '0.5', fontSize: '0.65rem' },
        },
      ],
    },
    {
      Header: 'MVP',
      columns: [
        {
          Header: <i className="fas fa-medal" />,
          id: 'mvp',
          accessor: a => Number(a.mvp),
          width: 30,
          resizable: false,
          style: { fontWeight: 'bold' },
        },
        {
          Header: <div style={{ color: '#bbb' }}>Av</div>,
          id: 'mvpPerGame',
          accessor: a => Number(a.mvpPerGame),
          width: 45,
          resizable: false,
          style: { opacity: '0.5', fontSize: '0.65rem' },
        },
      ],
    },
    {
      Header: 'Other',
      columns: [
        {
          Header: '% Inv.',
          id: 'goalContribution',
          accessor: a => Number(a.goalContribution),
          width: 45,
          resizable: false,
          style: { opacity: '0.5', fontSize: '0.65rem' },
        },
        {
          Header: '$',
          id: 'balance',
          accessor: a => parseFloat(a.balance).toFixed(2),
          width: 45,
          resizable: false,
          style: { opacity: '0.5', fontSize: '0.65rem' },
        },
      ],
    },
  ];
  return (
    <div>
      <StatsHeader title="Reference" />
      <div style={{ margin: '10px' }}>
        <ReactTable
          data={data}
          columns={columns}
          showPagination={false}
          minRows={1}
          className="-striped"
          getTheadThProps={() => ({ style: { backgroundColor: '#d32f2f', color: '#fff' } })}
          getTheadGroupThProps={() => ({
            style: {
              backgroundColor: '#9a0007',
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
          defaultSortDesc
        />
      </div>
    </div>
  );
};

Comparison.propTypes = {
  results: PropTypes.instanceOf(Array).isRequired,
  players: PropTypes.instanceOf(Array).isRequired,
};

export default Comparison;
