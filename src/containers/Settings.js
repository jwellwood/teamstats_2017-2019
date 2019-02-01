import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import Container from '../components/hoc/Container';
import { setAllowRegistration } from '../actions/settingsActions';
import PageHeader from '../components/layout/Navs/PageHeader';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '400px',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
});

class Settings extends Component {
  onAllowRegistrationChange = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };

  render() {
    const { classes, settings } = this.props;
    const { allowRegistration } = settings;
    return (
      <Container>
        <PageHeader title="Settings" icon="fas fa-cog" link="/" />
        <div className={classes.root}>
          <List>
            <ListItem>
              <Avatar>
                <Icon>how_to_reg</Icon>
              </Avatar>
              <ListItemText primary="Allow Registration" />
              <form>
                <Checkbox
                  name="allowRegistration"
                  checked={!!allowRegistration}
                  onChange={this.onAllowRegistrationChange}
                />
              </form>
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </div>
      </Container>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  // auth: PropTypes.shape({}).isRequired,
  settings: PropTypes.shape({}).isRequired,
  setAllowRegistration: PropTypes.func.isRequired,
};

export default compose(
  connect(
    // eslint-disable-next-line no-unused-vars
    (state, props) => ({
      auth: state.firebase.auth,
      settings: state.settings,
    }),
    { setAllowRegistration },
  ),
  withStyles(styles),
)(Settings);
