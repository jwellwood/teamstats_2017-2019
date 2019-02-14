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
// functions
import { getTotal } from '../functions/helpers';

class ResultsStats extends Component {
  state = { includeForfeits: true };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { results } = this.props;
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

    const getGoals = arr => arr.reduce((a, b) => a + b, 0);
    const goalsForArray = filteredResults.map(result => +result.teamScore);
    const goalsAgainstArray = filteredResults.map(result => +result.opponentScore);
    const goalsFor = getGoals(goalsForArray);
    const goalsAgainst = getGoals(goalsAgainstArray);

    const homeResults = filteredResults.filter(result => result.homeOrAway === 'home');
    const awayResults = filteredResults.filter(result => result.homeOrAway === 'away');

    const homeGoalsForArray = homeResults.map(res => +res.teamScore);
    const awayGoalsForArray = awayResults.map(res => +res.teamScore);
    const homeGoalsFor = getGoals(homeGoalsForArray);
    const awayGoalsFor = getGoals(awayGoalsForArray);

    const homeGoalsAgainstArray = homeResults.map(res => +res.opponentScore);
    const awayGoalsAgainstArray = awayResults.map(res => +res.opponentScore);
    const homeGoalsAgainst = getGoals(homeGoalsAgainstArray);
    const awayGoalsAgainst = getGoals(awayGoalsAgainstArray);

    const goalTotals = {
      totalGoalsFor: goalsFor,
      totalGoalsAgainst: goalsAgainst,
      homeGoalsFor,
      awayGoalsFor,
      homeGoalsAgainst,
      awayGoalsAgainst,
    };

    // =================================================================================

    return (
      <div>
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
        <GoalStats results={filteredResults} homeResults={homeResults} awayResults={awayResults} />
        <HomeAway goalTotals={goalTotals} homeResults={homeResults} awayResults={awayResults} />
      </div>
    );
  }
}

ResultsStats.propTypes = { results: PropTypes.instanceOf(Array).isRequired };

export default ResultsStats;
