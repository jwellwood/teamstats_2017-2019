import React from 'react';

// get total number of players
export const getTotalPlayers = array => array.length;
// players per match
export const getAvgPlayers = (players, matches) => players / matches;
// get all apps
export const getTotalTeamApps = arr => arr.reduce((a, b) => a + +b.apps, 0);
export const targetTeamApps = arr => arr.reduce((a, b) => a + +b.targetApps, 0);
// get all goals
export const getTotalTeamGoals = arr => arr.reduce((a, b) => a + +b.goals, 0);
export const targetTeamGoals = arr => arr.reduce((a, b) => a + +b.targetGoals, 0);
// get all assists
export const getTotalTeamAssists = arr => arr.reduce((a, b) => a + +b.assists, 0);
export const targetTeamAssists = arr => arr.reduce((a, b) => a + +b.targetAssists, 0);
// get all owed
export const getTotalTeamOwed = arr => {
  const totalTeamOwed = arr.reduce((a, b) => a + parseFloat(b.balance.toString()), 0);
  return (
    <span style={totalTeamOwed > 0 ? { color: '#E74C3C' } : { color: '#28B463' }}>
      €{parseFloat(totalTeamOwed).toFixed(2)}
    </span>
  );
};
// get all positions
export const getPosition = (arr, type) => arr.filter(player => player.position === type).length;
// get most apps players
export const getMostAppsPlayer = array => {
  const mostAppNumber = arr => Math.max(...arr.map(a => +a.apps));
  return {
    player: array.filter(a => +a.apps === mostAppNumber(array)),
    value: mostAppNumber(array),
  };
};
// get most goals players
export const getMostGoalsPlayer = array => {
  const mostGoalsNumber = arr => Math.max(...arr.map(a => +a.goals));
  return {
    player: array.filter(a => +a.goals === mostGoalsNumber(array)),
    value: mostGoalsNumber(array),
  };
};
// get most assists players
export const getMostAssistsPlayer = array => {
  const mostAssistsNumber = arr => Math.max(...arr.map(a => +a.assists));
  return {
    player: array.filter(a => +a.assists === mostAssistsNumber(array)),
    value: mostAssistsNumber(array),
  };
};
// get most mvps players
export const getMostMvpPlayer = array => {
  const mostMvpNumber = arr => Math.max(...arr.map(a => +a.mvp));
  return {
    player: array.filter(a => +a.mvp === mostMvpNumber(array)),
    value: mostMvpNumber(array),
  };
};
// get most goals per match players
export const getBestGoalsPerGame = array => {
  const goalsPG = arr => Math.max(...arr.map(a => (+a.apps > 1 ? +a.goals / +a.apps : null)));
  return {
    player: array.filter(a => (+a.apps > 1 ? +a.goals / +a.apps : null) === goalsPG(array)),
    value: goalsPG(array).toFixed(2),
  };
};
// get most assists per match players
export const getBestAssistsPerGame = array => {
  const assistsPG = arr => Math.max(...arr.map(a => (+a.apps > 1 ? +a.assists / +a.apps : null)));
  return {
    player: array.filter(a => (+a.apps > 1 ? +a.assists / +a.apps : null) === assistsPG(array)),
    value: assistsPG(array).toFixed(2),
  };
};
