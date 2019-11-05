import React, { Component } from 'react';
import PropTypes from 'prop-types';
// MUI
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconFA from '../../../assets/icons/IconFA';

const styles = () => ({
  root: {
    background: '#333',
    color: 'white',
  },
  tabs: { margin: 'auto', color: '#eee', height: 15, width: '100%' },
});

class SecondaryTabs extends Component {
  state = { value: 0 };

  handleSwipe = (event, value) => {
    this.setState({ value });
  };

  handleSwipeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { children, classes, tabTitles } = this.props;
    const { value } = this.state;
    return (
      <div>
        <AppBar
          classes={{ root: classes.root }}
          color='primary'
          position='static'
        >
          <Tabs
            value={value}
            onChange={this.handleSwipe}
            indicatorColor='primary'
            variant='fullWidth'
            classes={{ root: classes.tabs }}
          >
            {tabTitles.map(title => (
              <Tab
                key={title.id}
                classes={{ labelContainer: classes.labelContainer }}
                label={<IconFA icon={title.icon} size='sm' />}
              />
            ))}
          </Tabs>
        </AppBar>
        <SwipeableViews index={value} onChangeIndex={this.handleSwipeIndex}>
          {children}
        </SwipeableViews>
      </div>
    );
  }
}

SecondaryTabs.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
  tabTitles: PropTypes.instanceOf(Array).isRequired,
};

export default withStyles(styles)(SecondaryTabs);
