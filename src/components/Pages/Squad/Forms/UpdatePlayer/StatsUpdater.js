import React from 'react';
import PropTypes from 'prop-types';
// MUI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
// Components
import BoxContainer from '../../../../layout/hoc/BoxContainer';

const StatsUpdater = props => {
  const { player, toggleBalanceForm, balanceForm, balanceReset } = props;
  const { balance } = player;

  return (
    <BoxContainer>
      <List>
        <ListItem>
          <Avatar>
            <i className="fas fa-dollar-sign" />
          </Avatar>
          <ListItemText
            primary={(
              <span style={balance > 0 ? { color: '#E74C3C' } : { color: '#28B463' }}>
                €{parseFloat(balance).toFixed(2)}
              </span>
)}
            secondary="Total owed"
          />
          <IconButton onClick={balanceReset}>
            <Icon>replay</Icon>
          </IconButton>{' '}
          <IconButton color="primary" onClick={toggleBalanceForm}>
            <Icon>edit</Icon>
          </IconButton>
        </ListItem>
        <Divider />
      </List>
      {balanceForm}
    </BoxContainer>
  );
};

StatsUpdater.propTypes = {
  player: PropTypes.shape({}).isRequired,
  toggleBalanceForm: PropTypes.func.isRequired,
  balanceReset: PropTypes.func.isRequired,
  balanceForm: PropTypes.element,
};

StatsUpdater.defaultProps = { balanceForm: null };

export default StatsUpdater;
