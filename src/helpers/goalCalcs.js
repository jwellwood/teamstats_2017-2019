export const getGoalsFor = (home, away) => {
  const getHomeGoals = home.map(result => +result.homeTeamScore);
  const getAwayGoals = away.map(result => +result.awayTeamScore);
  const goalsFor = getHomeGoals.concat(getAwayGoals);
  return goalsFor;
};

export const getGoalsAgainst = (home, away) => {
  const getOppHomeGoals = home.map(result => +result.awayTeamScore);
  const getOppAwayGoals = away.map(result => +result.homeTeamScore);
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
    home.map(result => (result.homeTeamScore.toString() === type
      && result.homeTeamScore >= 1
      && !result.forfeitedMatch
      ? result.awayTeamName
      : null)),
  );
  const mostScoredAway = Object.values(
    away.map(result => (result.awayTeamScore.toString() === type
      && result.awayTeamScore >= 1
      && !result.forfeitedMatch
      ? result.homeTeamName
      : null)),
  );
  const mostScoredVs = getHomeAndAway(mostScoredHome, mostScoredAway);
  return mostScoredVs;
};

export const getMostGoalsConceded = (home, away, type) => {
  const mostConcededHome = Object.values(
    home.map(result => (result.awayTeamScore.toString() === type && result.awayTeamScore >= 1
      ? result.awayTeamName
      : null)),
  );
  const mostConcededAway = Object.values(
    away.map(result => (result.homeTeamScore.toString() === type && result.homeTeamScore >= 1
      ? result.homeTeamName
      : null)),
  );
  const mostConcededVs = getHomeAndAway(mostConcededHome, mostConcededAway);
  return mostConcededVs;
};

export const getFewestGoalsScored = (home, away, type) => {
  const fewestScoredHome = Object.values(
    home.map(result => (result.homeTeamScore.toString() === type && !result.forfeitedMatch
      ? result.awayTeamName
      : null)),
  );
  const fewestScoredAway = Object.values(
    away.map(result => (result.awayTeamScore.toString() === type && !result.forfeitedMatch
      ? result.homeTeamName
      : null)),
  );
  const fewestScoredVs = getHomeAndAway(fewestScoredHome, fewestScoredAway);
  return fewestScoredVs;
};

export const getCleanSheets = (home, away) => {
  const cleanSheetHome = Object.values(
    home.map(result => (parseInt(result.awayTeamScore, 10) === 0 ? result.awayTeamName : null)),
  );
  const cleanSheetAway = Object.values(
    away.map(result => (parseInt(result.homeTeamScore, 10) === 0 ? result.homeTeamName : null)),
  );
  const cleanSheetVs = getHomeAndAway(cleanSheetHome, cleanSheetAway);
  return cleanSheetVs;
};
