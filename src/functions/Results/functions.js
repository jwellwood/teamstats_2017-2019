export const getResultsWithoutForfeits = array => array.filter(a => !a.forfeitedMatch);
export const getAllForfeits = array => array.filter(a => a.forfeitedMatch);
// Home or Away
export const getAllHomeMatches = array => array.filter(a => a.homeOrAway === 'home');
export const getAllAwayMatches = array => array.filter(a => a.homeOrAway === 'away');
// Results
export const getAllWins = array => array.filter(a => +a.teamScore > +a.opponentScore);
export const getAllDraws = array => array.filter(a => +a.teamScore === +a.opponentScore);
export const getAllLosses = array => array.filter(a => +a.teamScore < +a.opponentScore);
// Match Types
export const getAllLeagueMatches = array => array.filter(a => a.matchType === 'League');
export const getAllCupMatches = array => array.filter(a => a.matchType === 'Cup');
export const getAllTournamentMatches = array => array.filter(a => a.matchType === 'Tournament');
export const getAllFriendlyMatches = array => array.filter(a => a.matchType === 'Friendly');
// Goals
const getGoals = arr => arr.reduce((a, b) => a + b, 0);
export const getGoalsFor = array => {
  const goalsFor = array.map(a => +a.teamScore);
  return getGoals(goalsFor);
};

export const getGoalsAgainst = array => {
  const goalsAgainst = array.map(a => +a.opponentScore);
  return getGoals(goalsAgainst);
};

export const perGame = (total, matches) => (total / matches).toFixed(2);
// Points

export const getPointsPer = (win, draw, total) => ((win * 3 + draw * 1) / total).toFixed(2);
