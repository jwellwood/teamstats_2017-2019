export const getTotalPlayers = array => array.length;
export const getAvgPlayers = (array, players) => array / players;
export const getTotalTeamApps = arr => arr.reduce((a, b) => a + +b.apps, 0);
export const targetTeamApps = arr => arr.reduce((a, b) => a + +b.targetApps, 0);

export const getTotalTeamGoals = arr => arr.reduce((a, b) => a + +b.goals, 0);
export const targetTeamGoals = arr => arr.reduce((a, b) => a + +b.targetGoals, 0);

export const getTotalTeamAssists = arr => arr.reduce((a, b) => a + +b.assists, 0);
export const targetTeamAssists = arr => arr.reduce((a, b) => a + +b.targetAssists, 0);
