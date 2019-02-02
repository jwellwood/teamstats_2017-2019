import React, { Component } from 'react';
import PropTypes from 'prop-types';
// MUI
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Overall from './Overview/Overall';
// Components
import Percentages from './Overview/Percentages';
import GoalStats from './Goals/GoalStats';
import HomeAway from './HomeAway/HomeAway';
import Container from '../../../hoc/Container';
// functions
import { getTotal } from '../functions/helpers';

class ResultsStats extends Component {
  state = { includeForfeits: true };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { results, teamName } = this.props;
    const { includeForfeits } = this.state;
    let filteredResults = results;
    if (!includeForfeits) {
      filteredResults = results.filter(result => !result.forfeitedMatch);
    }
    const matchTotals = {
      totalPlayed: filteredResults.length,
      totalWins: getTotal(filteredResults, 'W'),
      totalDraws: getTotal(filteredResults, 'D'),
      totalLosses: getTotal(filteredResults, 'L'),
    };

    // ================================================================================
    const homeResults = filteredResults.filter(result => result.homeTeamName === teamName);
    const awayResults = filteredResults.filter(result => result.awayTeamName === teamName);
    const getGoals = (a, b) => a + b;
    const myTeamHomeArray = homeResults.map(goals => +goals.homeTeamScore);
    const myTeamAwayArray = awayResults.map(goals => +goals.awayTeamScore);
    const homeTeamGoals = myTeamHomeArray.reduce(getGoals, 0);
    const awayTeamGoals = myTeamAwayArray.reduce(getGoals, 0);

    const opponentHomeResults = filteredResults.filter(result => result.homeTeamName !== teamName);
    const opponentAwayResults = filteredResults.filter(result => result.awayTeamName !== teamName);
    const opponentHomeArray = opponentHomeResults.map(goals => +goals.homeTeamScore);
    const opponentAwayArray = opponentAwayResults.map(goals => +goals.awayTeamScore);
    const opponentHomeGoals = opponentHomeArray.reduce(getGoals, 0);
    const opponentAwayGoals = opponentAwayArray.reduce(getGoals, 0);

    const goalsFor = homeTeamGoals + awayTeamGoals;
    const goalsAgainst = opponentHomeGoals + opponentAwayGoals;

    const goalTotals = {
      totalGoalsFor: goalsFor,
      totalGoalsAgainst: goalsAgainst,
      homeGoalsFor: homeTeamGoals,
      awayGoalsFor: awayTeamGoals,
      homeGoalsAgainst: opponentAwayGoals,
      awayGoalsAgainst: opponentHomeGoals,
    };

    // =================================================================================

    return (
      <Container>
        <div style={{ textAlign: 'left', paddingLeft: '10px' }}>
          <FormControlLabel
            control={(
              <Switch
                checked={includeForfeits}
                onChange={this.handleChange('includeForfeits')}
                value="includeForfeits"
              />
)}
            label="Show forfeited matches"
          />
        </div>

        <Overall matchTotals={matchTotals} goalTotals={goalTotals} />
        <Percentages matchTotals={matchTotals} />
        <GoalStats
          results={filteredResults}
          goalTotals={goalTotals}
          homeResults={homeResults}
          awayResults={awayResults}
        />
        <HomeAway goalTotals={goalTotals} homeResults={homeResults} awayResults={awayResults} />
      </Container>
    );
  }
}

ResultsStats.propTypes = {
  results: PropTypes.instanceOf(Array).isRequired,
  teamName: PropTypes.string,
};

ResultsStats.defaultProps = { teamName: '' };

export default ResultsStats;
