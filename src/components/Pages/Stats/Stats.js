import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// Components
import ResultsStats from './Results';
import PlayerStats from './Squad';
// helpers
import { TabContainer } from '../../../helpers/transitions';

class Stats extends React.Component {
  state = { value: 0 };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { results, players, teamName } = this.props;
    const { value } = this.state;
    return (
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            centered
          >
            <Tab fullWidth label="Players" />
            <Tab fullWidth label="Results" />
          </Tabs>
        </AppBar>
        <SwipeableViews index={value} onChangeIndex={this.handleChangeIndex}>
          <TabContainer>
            <PlayerStats players={players} results={results} />
          </TabContainer>
          <TabContainer>
            <ResultsStats results={results} teamName={teamName} />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

Stats.propTypes = {
  results: PropTypes.instanceOf(Array).isRequired,
  players: PropTypes.instanceOf(Array).isRequired,
  teamName: PropTypes.string,
};

Stats.defaultProps = { teamName: '' };

export default Stats;
