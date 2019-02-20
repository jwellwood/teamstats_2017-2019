import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import Overall from './Overview/Overall';
import Percentages from './Overview/Percentages';
import GoalStats from './Goals/GoalStats';
// functions
import {
  getResultsWithoutForfeits,
  getAllWins,
  getAllDraws,
  getAllLosses,
  getGoalsFor,
  getGoalsAgainst,
  getAllHomeMatches,
  getAllAwayMatches,
} from '../../../../functions/Results/functions';
import HomeAndAway from './HomeAway/HomeAndAway';

class ResultsStats extends Component {
  state = { includeForfeits: true };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { results } = this.props;
    const { includeForfeits } = this.state;
    const teamResults = !includeForfeits ? getResultsWithoutForfeits(results) : results;
    const homeResults = getAllHomeMatches(teamResults);
    const awayResults = getAllAwayMatches(teamResults);
    const totalMatches = teamResults.length;
    const totalWins = getAllWins(teamResults).length;
    const totalDraws = getAllDraws(teamResults).length;
    const totalLosses = getAllLosses(teamResults).length;
    const totalGoalsFor = getGoalsFor(teamResults);
    const totalGoalsAgainst = getGoalsAgainst(teamResults);

    const matchTotals = {
      totalMatches,
      totalWins,
      totalDraws,
      totalLosses,
      totalGoalsFor,
      totalGoalsAgainst,
    };

    return (
      <div>
        <Overall
          matchTotals={matchTotals}
          handleChange={this.handleChange('includeForfeits')}
          checked={includeForfeits}
          value="includeforfeits"
        />
        <Percentages
          matchTotals={matchTotals}
          handleChange={this.handleChange('includeForfeits')}
          checked={includeForfeits}
          value="includeforfeits"
        />
        <GoalStats
          results={teamResults}
          homeResults={homeResults}
          awayResults={awayResults}
          handleChange={this.handleChange('includeForfeits')}
          checked={includeForfeits}
          value="includeforfeits"
        />
        <HomeAndAway
          homeResults={homeResults}
          awayResults={awayResults}
          handleChange={this.handleChange('includeForfeits')}
          checked={includeForfeits}
          value="includeforfeits"
        />
      </div>
    );
  }
}

ResultsStats.propTypes = { results: PropTypes.instanceOf(Array).isRequired };

export default ResultsStats;
