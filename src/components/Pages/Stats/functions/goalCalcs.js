/* eslint-disable max-len */
export const getGoalsFor = (home, away) => {
  const getHomeGoals = home.map(result => +result.teamScore);
  const getAwayGoals = away.map(result => +result.teamScore);
  const goalsFor = getHomeGoals.concat(getAwayGoals);
  return goalsFor;
};

export const getGoalsAgainst = (home, away) => {
  const getOppHomeGoals = home.map(result => +result.opponentScore);
  const getOppAwayGoals = away.map(result => +result.opponentScore);
  const goalsAgainst = getOppHomeGoals.concat(getOppAwayGoals);
  return goalsAgainst;
};

export const getHomeAndAway = (home, away) => {
  const a = home.filter(result => result);
  const b = away.filter(result => result);
  const names = a.concat(b);
  return names;
};

export const getMostGoalsScored = (home, away, type) => {
  const mostScoredHome = Object.values(
    home.map(result => (result.teamScore.toString() === type && result.teamScore >= 1 && !result.forfeitedMatch
      ? result.opponentName
      : null)),
  );
  const mostScoredAway = Object.values(
    away.map(result => (result.teamScore.toString() === type && result.teamScore >= 1 && !result.forfeitedMatch
      ? result.opponentName
      : null)),
  );
  const mostScoredVs = getHomeAndAway(mostScoredHome, mostScoredAway);
  return mostScoredVs;
};

export const getMostGoalsConceded = (home, away, type) => {
  const mostConcededHome = Object.values(
    home.map(result => (result.opponentScore.toString() === type && result.opponentScore >= 1
      ? result.opponentName
      : null)),
  );
  const mostConcededAway = Object.values(
    away.map(result => (result.opponentScore.toString() === type && result.opponentScore >= 1
      ? result.opponentName
      : null)),
  );
  const mostConcededVs = getHomeAndAway(mostConcededHome, mostConcededAway);
  return mostConcededVs;
};

export const getFewestGoalsScored = (home, away, type) => {
  const fewestScoredHome = Object.values(
    home.map(result => (result.teamScore.toString() === type && !result.forfeitedMatch ? result.opponentName : null)),
  );
  const fewestScoredAway = Object.values(
    away.map(result => (result.teamScore.toString() === type && !result.forfeitedMatch ? result.opponentName : null)),
  );
  const fewestScoredVs = getHomeAndAway(fewestScoredHome, fewestScoredAway);
  return fewestScoredVs;
};

export const getCleanSheets = (home, away) => {
  const cleanSheetHome = Object.values(
    home.map(result => (parseInt(result.opponentScore, 10) === 0 ? result.opponentName : null)),
  );
  const cleanSheetAway = Object.values(
    away.map(result => (parseInt(result.opponentScore, 10) === 0 ? result.opponentName : null)),
  );
  const cleanSheetVs = getHomeAndAway(cleanSheetHome, cleanSheetAway);
  return cleanSheetVs;
};
