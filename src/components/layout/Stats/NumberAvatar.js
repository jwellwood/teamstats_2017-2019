import React from 'react';
import PropTypes from 'prop-types';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({ number: { background: '#333', fontSize: '13px', fontWeight: 'bold' } });

const NumberAvatar = props => {
  const { classes, children, background } = props;
  return (
    <Avatar className={classes.number} style={{ backgroundColor: background }}>
      {children}
    </Avatar>
  );
};

NumberAvatar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
  background: PropTypes.string,
};

NumberAvatar.defaultProps = { background: null };

export default withStyles(styles)(NumberAvatar);
