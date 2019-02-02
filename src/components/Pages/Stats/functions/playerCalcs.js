export const totalTeamApps = arr => arr.reduce((a, b) => a + +b.apps, 0);
export const targetTeamApps = arr => arr.reduce((a, b) => a + +b.targetApps, 0);

export const totalTeamGoals = arr => arr.reduce((a, b) => a + +b.goals, 0);
export const targetTeamGoals = arr => arr.reduce((a, b) => a + +b.targetGoals, 0);

export const totalTeamAssists = arr => arr.reduce((a, b) => a + +b.assists, 0);
export const targetTeamAssists = arr => arr.reduce((a, b) => a + +b.targetAssists, 0);

export const getPosition = (arr, type) => {
  const position = arr.filter(player => player.position === type);
  const total = position.length;
  return total;
};

const getPlayerName = a => a.map(b => b.name);

export const getMostApps = arr => {
  const totalApps = arr.map(player => player.apps);
  const mostAppsValue = Math.max(...totalApps);
  const mostAppsPlayers = Object.values(
    arr.filter(player => (player.apps === mostAppsValue ? player.name : null)),
  );
  return { name: getPlayerName(mostAppsPlayers), value: mostAppsValue };
};

export const getMostGoals = arr => {
  const totalGoals = arr.map(player => player.goals);
  const mostGoalsValue = Math.max(...totalGoals);
  const mostGoalsPlayers = Object.values(
    arr.filter(player => (player.goals === mostGoalsValue ? player.name : null)),
  );
  return { name: getPlayerName(mostGoalsPlayers), value: mostGoalsValue };
};

export const getMostAssists = arr => {
  const totalAssists = arr.map(player => player.assists);
  const mostAssistsValue = Math.max(...totalAssists);
  const mostAssistsPlayers = Object.values(
    arr.filter(player => (player.assists === mostAssistsValue ? player.name : null)),
  );
  return { name: getPlayerName(mostAssistsPlayers), value: mostAssistsValue };
};

export const getMostMVP = arr => {
  const totalMVP = arr.map(player => player.mvp);
  const mostMVPValue = Math.max(...totalMVP);
  const mostMVPPlayers = Object.values(
    arr.filter(player => (player.mvp === mostMVPValue ? player.name : null)),
  );
  return { name: getPlayerName(mostMVPPlayers), value: mostMVPValue };
};

export const getBestGoalPerGame = arr => {
  const goalsPerMatch = arr.map(a => (a.apps > 1 ? a.goals / a.apps : null));
  const goalsPerMatchValue = Math.max(...goalsPerMatch);
  const goalsPerMatchPlayers = Object.values(
    arr.filter(a => (a.goals / a.apps === goalsPerMatchValue && a.apps > 1 ? a.name : null)),
  );
  return { name: getPlayerName(goalsPerMatchPlayers), value: goalsPerMatchValue };
};

export const getBestAssistPerGame = arr => {
  const assistsPerMatch = arr.map(a => (a.apps > 1 ? a.assists / a.apps : null));
  const assistsPerMatchValue = Math.max(...assistsPerMatch);
  const assistsPerMatchPlayers = Object.values(
    arr.filter(a => (a.assists / a.apps === assistsPerMatchValue && a.apps > 1 ? a.name : null)),
  );
  return { name: getPlayerName(assistsPerMatchPlayers), value: assistsPerMatchValue };
};
