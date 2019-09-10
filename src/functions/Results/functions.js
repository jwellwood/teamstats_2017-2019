export const getResultsWithoutForfeits = array =>
  array.filter(a => !a.forfeitedMatch);
export const getAllForfeits = array => array.filter(a => a.forfeitedMatch);
// Home or Away
export const getAllHomeMatches = array =>
  array.filter(a => a.homeOrAway === 'home');
export const getAllAwayMatches = array =>
  array.filter(a => a.homeOrAway === 'away');
// Results
export const getAllWins = array =>
  array.filter(a => +a.teamScore > +a.opponentScore);
export const getAllDraws = array =>
  array.filter(a => +a.teamScore === +a.opponentScore);
export const getAllLosses = array =>
  array.filter(a => +a.teamScore < +a.opponentScore);
// Match Types
export const getAllLeagueMatches = array =>
  array.filter(a => a.matchType === 'League');
export const getAllCupMatches = array =>
  array.filter(a => a.matchType === 'Cup');
export const getAllTournamentMatches = array =>
  array.filter(a => a.matchType === 'Tournament');
export const getAllFriendlyMatches = array =>
  array.filter(a => a.matchType === 'Friendly');
// Avg and percentage
export const perGame = (total, matches) => (total / matches).toFixed(2);

export const getPointsPer = (win, draw, total) =>
  ((win * 3 + draw * 1) / total).toFixed(2);
export const getPercentage = (stat, total) => ((stat * 100) / total).toFixed(1);
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

// *****************************************************************//
// ***************************Goals*********************************//
// *****************************************************************//
// Scored
export const getMostGoalsScored = array => {
  const mostScoredNumber = arr => Math.max(...arr.map(a => +a.teamScore));
  return {
    match: array.filter(a => +a.teamScore === mostScoredNumber(array)),
    value: mostScoredNumber(array),
  };
};

export const getFewestGoalsScored = array => {
  const fewestScoredNumber = arr => Math.min(...arr.map(a => +a.teamScore));
  return {
    match: array.filter(a => +a.teamScore === fewestScoredNumber(array)),
    value: fewestScoredNumber(array),
  };
};

// Conceded
export const getMostGoalsConceded = array => {
  const mostConcededNumber = arr => Math.max(...arr.map(a => +a.opponentScore));
  return {
    match: array.filter(a => +a.opponentScore === mostConcededNumber(array)),
    value: mostConcededNumber(array),
  };
};

export const getFewestGoalsConceded = array => {
  const removeCleanSheets = array.filter(a => +a.opponentScore !== 0);
  const fewestConcededNumber = arr =>
    Math.min(...arr.map(a => +a.opponentScore));
  return {
    match: array.filter(
      a => +a.opponentScore === fewestConcededNumber(removeCleanSheets),
    ),
    value: fewestConcededNumber(removeCleanSheets),
  };
};

export const getCleanSheets = array =>
  array.filter(a => +a.opponentScore === 0);

// Margins

export const getBiggestWinningMargin = array => {
  const getWins = array.filter(a => +a.teamScore > +a.opponentScore);
  const biggestMarginNumber = arr =>
    Math.max(...arr.map(a => +a.teamScore - +a.opponentScore));
  return {
    match: array.filter(
      a => +a.teamScore - +a.opponentScore === biggestMarginNumber(getWins),
    ),
    value: biggestMarginNumber(getWins),
  };
};

export const getBiggestLosingMargin = array => {
  const getLosses = array.filter(a => +a.teamScore < +a.opponentScore);
  const biggestMarginNumber = arr =>
    Math.max(...arr.map(a => +a.opponentScore - +a.teamScore));
  return {
    match: array.filter(
      a => +a.opponentScore - +a.teamScore === biggestMarginNumber(getLosses),
    ),
    value: biggestMarginNumber(getLosses),
  };
};
