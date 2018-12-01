import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

// Styling
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '400px',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
  },
});

const PlayerTotals = props => {
  const {
    classes,
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
  } = props;
  const { apps, goals, assists, mvp, balance } = player;

  // Data to map
  let id = 0;
  const createData = (icon, total, text, btnL, btnLSymbol, btnR, btnRSymbol) => {
    id += 1;
    return {
      id,
      icon,
      total,
      text,
      btnL,
      btnLSymbol,
      btnR,
      btnRSymbol,
    };
  };
  const listItems = [
    createData(
      <i className="fas fa-check" />,
      apps,
      'Appearances',
      removeAppButton,
      'remove',
      addAppButton,
      'add',
    ),
    createData(
      <i className="fas fa-futbol" />,
      goals,
      'Goals',
      removeGoalButton,
      'remove',
      addGoalButton,
      'add',
    ),
    createData(
      <i className="fas fa-key" />,
      assists,
      'Assists',
      removeAssistButton,
      'remove',
      addAssistButton,
      'add',
    ),
    createData(
      <i className="far fa-star" />,
      mvp,
      'MVP',
      removeMvpButton,
      'remove',
      addMvpButton,
      'add',
    ),
    createData(
      <i className="fas fa-dollar-sign" />,
      <span style={balance > 0 ? { color: '#E74C3C' } : { color: '#28B463' }}>
        €{parseFloat(balance).toFixed(2)}
      </span>,
      'Total owed',
      balanceReset,
      'replay',
      toggleBalanceForm,
      'edit',
    ),
  ];

  return (
    <List className={classes.root}>
      {listItems.map(item => {
        let minusButton = <IconButton disabled />;
        let plusButton = <IconButton disabled />;
        if (isAuthenticated) {
          plusButton = (
            <IconButton color="primary" onClick={item.btnR}>
              <Icon>{item.btnRSymbol}</Icon>
            </IconButton>
          );
          if (item.total !== 0) {
            minusButton = (
              <IconButton onClick={item.btnL}>
                <Icon>{item.btnLSymbol}</Icon>
              </IconButton>
            );
          }
        }

        return (
          <div key={item.id}>
            <ListItem>
              <Avatar>{item.icon}</Avatar>
              <ListItemText primary={item.total} secondary={item.text} />
              {minusButton} {plusButton}
            </ListItem>
            <Divider inset component="li" />
          </div>
        );
      })}

      {balanceForm}
    </List>
  );
};

PlayerTotals.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  player: PropTypes.shape({}).isRequired,
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

PlayerTotals.defaultProps = { balanceForm: null };

export default withStyles(styles)(PlayerTotals);
