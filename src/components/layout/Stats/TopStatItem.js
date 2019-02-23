import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ValueBox from './ValueBox';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class TopStatItem extends React.Component {
  state = { open: true };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { open } = this.state;
    const { classes, title, value, data } = this.props;

    return (
      <List dense className={classes.root}>
        <ListItem button onClick={this.handleClick}>
          <ListItemText>
            <Typography
              style={{
                textAlign: 'left',
                textTransform: 'uppercase',
                color: '#333',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              {title}
            </Typography>
          </ListItemText>
          <ValueBox>{value === -Infinity || value === '-Infinity' ? '...' : value}</ValueBox>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {data.map(item => (
            <List key={Math.random()} dense>
              <ListItem style={{ color: 'green' }} button>
                {item.name}
              </ListItem>
            </List>
          ))}
        </Collapse>
      </List>
    );
  }
}

TopStatItem.propTypes = { classes: PropTypes.shape({}).isRequired };

export default withStyles(styles)(TopStatItem);
