import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

const PlayedSelect = props => {
  const { player, added, app, onAppSelect } = props;
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Typography style={{ fontWeight: 'bold', color: added ? '#2ECC71' : '#E74C3C' }}>
        {player.name}
      </Typography>
      <FormControlLabel control={<Switch checked={app} onChange={onAppSelect} color="primary" />} />
    </Grid>
  );
};

PlayedSelect.propTypes = {
  player: PropTypes.shape({}).isRequired,
  onAppSelect: PropTypes.func.isRequired,
  added: PropTypes.bool.isRequired,
  app: PropTypes.bool.isRequired,
};

export default PlayedSelect;
