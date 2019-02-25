import React, { Component } from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Components
import ValueBox from './ValueBox';

const styles = () => ({
  root: { width: '100%', margin: '1px auto' },
  heading: {
    textAlign: 'left',
    textTransform: 'uppercase',
    color: '#333',
    fontSize: '12px',
    fontWeight: 'bold',
  },
});

class StatExpansion extends Component {
  state = { expanded: null };

  handleChange = panel => (event, expanded) => {
    this.setState({ expanded: expanded ? panel : false });
  };

  render() {
    const { classes, title, value, children } = this.props;
    const { expanded } = this.state;
    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Typography className={classes.heading}>{title}</Typography>
              <ValueBox color={expanded ? 'win' : 'default'}>
                {value === -Infinity || value === '-Infinity' ? '...' : value}
              </ValueBox>
            </Grid>
          </ExpansionPanelSummary>
          {children}
        </ExpansionPanel>
      </div>
    );
  }
}

StatExpansion.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default withStyles(styles)(StatExpansion);
