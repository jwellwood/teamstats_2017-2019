import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
// MUI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// Components
import PlayerTotals from './PlayerTotals';
import Targets from './Targets';
import PlayerStats from './PlayerStats';

// Container
const TabContainer = ({ children, dir }) => (
  <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
    {children}
  </Typography>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

// Styling
const styles = theme => ({ root: { backgroundColor: theme.palette.background.paper } });

// Component
class DetailsTabs extends React.Component {
  state = { value: 0 };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { value } = this.state;
    const {
      classes,
      theme,
      player,
      isAuthenticated,
      toggleBalanceForm,
      balanceForm,
      addAppButton,
      addGoalButton,
      addAssistButton,
      addMvpButton,
      removeAppButton,
      removeGoalButton,
      removeAssistButton,
      removeMvpButton,
      balanceReset,
    } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Targets" />
            <Tab label="Stats" />
            <Tab label="Totals" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Targets player={player} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <PlayerStats player={player} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <PlayerTotals
              player={player}
              isAuthenticated={isAuthenticated}
              toggleBalanceForm={toggleBalanceForm}
              balanceForm={balanceForm}
              addAppButton={addAppButton}
              addGoalButton={addGoalButton}
              addAssistButton={addAssistButton}
              addMvpButton={addMvpButton}
              removeAppButton={removeAppButton}
              removeGoalButton={removeGoalButton}
              removeAssistButton={removeAssistButton}
              removeMvpButton={removeMvpButton}
              balanceReset={balanceReset}
            />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

DetailsTabs.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  toggleBalanceForm: PropTypes.func.isRequired,
  addAppButton: PropTypes.func.isRequired,
  addGoalButton: PropTypes.func.isRequired,
  addAssistButton: PropTypes.func.isRequired,
  addMvpButton: PropTypes.func.isRequired,
  removeAppButton: PropTypes.func.isRequired,
  removeGoalButton: PropTypes.func.isRequired,
  removeAssistButton: PropTypes.func.isRequired,
  removeMvpButton: PropTypes.func.isRequired,
  balanceReset: PropTypes.func.isRequired,
  balanceForm: PropTypes.element,
};

DetailsTabs.defaultProps = { balanceForm: null };

export default withStyles(styles, { withTheme: true })(DetailsTabs);
