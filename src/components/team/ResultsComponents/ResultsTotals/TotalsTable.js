import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MoreStatsModal from '../../../layout/Stats/MoreStatsModal';
import StatsAvatar from '../../../layout/Stats/StatsAvatar';

const styles = () => ({
  root: { padding: '5px' },
  item: { margin: '5px auto' },
  value: { fontWeight: 'bold' },
  statsKey: { fontSize: '10px', color: '#aaa', margin: '0 auto' },
});

const TotalsTable = props => {
  const { classes, values } = props;

  // Data to map
  let id = 0;
  const createData = (icon, value, title, color) => {
    id += 1;
    return { id, icon, value, title, color };
  };

  const colors = {
    win: '#58D68D',
    draw: '#F39C12',
    lose: '#E74C3C',
  };

  const listItems = [
    createData(<i className="fas fa-list" />, values.totalMatches, 'TOTAL MATCHES', ''),
    createData(<i className="fas fa-plus" />, values.getGoalsFor(), 'GOALS FOR', ''),
    createData(<i className="fas fa-minus" />, values.getGoalsAgainst(), 'GOALS AGAINST', ''),
    createData(null, values.totalWins, 'WIN', colors.win),
    createData(null, values.totalDraws, 'DRAW', colors.draw),
    createData(null, values.totalLoss, 'LOSE', colors.lose),
  ];

  return (
    <Paper className={classes.root}>
      <StatsAvatar itemsToMap={listItems} />
      <div style={{ textAlign: 'right' }}>
        <MoreStatsModal title="Results">Coming soon</MoreStatsModal>
      </div>
    </Paper>
  );
};

TotalsTable.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  values: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(TotalsTable);
