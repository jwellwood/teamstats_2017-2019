import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';

// styling
const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
});

// Component
class AppMenu extends React.Component {
  state = { anchorEl: null };

  handleClick = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    // data to map
    let id = 0;
    const createData = (icon, text, link) => {
      id += 1;
      return { id, icon, text, link };
    };

    const listItems = [
      createData('home', 'Home', '/'),
      createData('people', 'Squad', '/players'),
      createData('play_circle_filled', 'Results', '/results'),
      createData('bar_chart', 'Stats', '/stats'),
      createData('help_outline', 'About', '/about'),
    ];

    const { anchorEl } = this.state;
    const { isAuthenticated, classes } = this.props;
    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          <Icon>view_list</Icon>
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClick={this.handleClose}
          disableAutoFocusItem
        >
          {listItems.map(item => (
            <div key={item.id}>
              <NavLink to={item.link} style={{ textDecoration: 'none' }}>
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon>
                    <Icon>{item.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText variant="inset" primary={item.text} />
                </MenuItem>
              </NavLink>
            </div>
          ))}

          {isAuthenticated ? (
            <div>
              <Divider />
              <NavLink to="/settings" style={{ textDecoration: 'none' }}>
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon>
                    <Icon>settings</Icon>
                  </ListItemIcon>
                  <ListItemText variant="inset" primary="Settings" />
                </MenuItem>
              </NavLink>
            </div>
          ) : null}
        </Menu>
      </div>
    );
  }
}

AppMenu.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default withStyles(styles)(AppMenu);
