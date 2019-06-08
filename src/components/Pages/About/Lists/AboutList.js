import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

const AboutList = props => {
  const { listItems, icon } = props;
  return (
    <List>
      <List dense>
        {listItems.map(item => (
          <ListItem key={item.id}>
            <ListItemIcon>
              <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={item.title} secondary={item.text} />
          </ListItem>
        ))}
      </List>
      <hr />
    </List>
  );
};

AboutList.propTypes = {
  listItems: PropTypes.instanceOf(Array).isRequired,
  icon: PropTypes.string.isRequired,
};

export default AboutList;
