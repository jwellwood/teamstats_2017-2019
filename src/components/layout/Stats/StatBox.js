import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// helpers
import { colors, positionColor } from '../../../assets/styles/colors';
import formatDate from '../../../helpers/date';
import StatExpansion from './StatExpansion';

const styles = () => ({
  fixture: {
    padding: '2px 10px',
    width: '100%',
    maxWidth: '300px',
    margin: 'auto',
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '13px',
    textDecoration: 'none',
  },
  secondRow: {
    color: '#ccc',
    fontSize: '12px',
  },
});

const StatBox = props => {
  const { classes, title, data, value, type } = props;

  let dataToDisplay = null;
  dataToDisplay = data.map(item => (
    <ExpansionPanelDetails key={item.id}>
      <Paper component={Link} to={`${type}`} className={classes.fixture}>
        <Grid
          className={classes.firstRow}
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <div style={{ fontFamily: 'Righteous', fontSize: '1.1rem' }}>
            {type === 'results' ? item.opponentName : item.name}
          </div>
          {type === 'results' ? (
            <div
              style={{
                fontWeight: 'bold',
                color: +item.teamScore > +item.opponentScore ? colors.win : colors.lose,
              }}
            >
              {item.homeOrAway === 'home' ? item.teamScore : item.opponentScore} -{' '}
              {item.homeOrAway === 'away' ? item.teamScore : item.opponentScore}
            </div>
          ) : (
            <div style={{ fontWeight: 'bold', color: positionColor(item.position) }}>
              {item.position}
            </div>
          )}
        </Grid>
        <Grid
          className={classes.secondRow}
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>{type === 'results' ? item.matchType : `#${item.number}`}</Grid>
          <Grid item>
            {type === 'results' ? formatDate(item.date) : `${item.apps} matches played`}
          </Grid>
        </Grid>
      </Paper>
    </ExpansionPanelDetails>
  ));

  return (
    <StatExpansion title={title} value={value}>
      {dataToDisplay}
    </StatExpansion>
  );
};

StatBox.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string.isRequired,
};

export default withStyles(styles)(StatBox);
