export const getTotal = (array, type) => array.filter(a => a.resultIndicator === type).length;
export const getWins = array => array.filter(a => +a.teamScore > +a.opponentScore);
export const getDraws = array => array.filter(a => +a.teamScore === +a.opponentScore);
export const getLosses = array => array.filter(a => +a.teamScore < +a.opponentScore);
export const getPercentage = (stat, total) => ((stat * 100) / total).toFixed(1);
export const getAverage = (stat, total) => (stat / total).toFixed(1);
export const getPointsPer = (win, draw, total) => ((win * 3 + draw * 1) / total).toFixed(2);
export const getGoalsPer = (goals, totals) => (goals / totals.length).toFixed(2);
export const getDiff = (goalsFor, goalsAgainst) => goalsFor - goalsAgainst;

export const getMax = a => {
  const max = Math.max(...a);
  return max.toString();
};

export const getMin = a => {
  const min = Math.min(...a);
  return min.toString();
};
