import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
// MUI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// Components
import Container from '../../hoc/Container';
import PageHeader from '../../layout/Navs/PageHeader';
import ResultsStats from './Results';
import PlayerStats from './Squad';
// helpers
import { TabContainer } from '../../../helpers/transitions';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
});

class Stats extends React.Component {
  state = { value: 0 };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme, results, players, teamName } = this.props;
    const { value } = this.state;
    return (
      <Container>
        <PageHeader title="Stats" link="/" />
        <div className={classes.root}>
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
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer dir={theme.direction}>
              <PlayerStats players={players} results={results} />
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <ResultsStats results={results} teamName={teamName} />
            </TabContainer>
          </SwipeableViews>
        </div>
      </Container>
    );
  }
}

Stats.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  players: PropTypes.instanceOf(Array).isRequired,
  teamName: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(Stats);
