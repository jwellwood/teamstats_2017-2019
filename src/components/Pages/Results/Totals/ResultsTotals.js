import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import StatsAvatar from '../../../layout/Stats/StatsAvatar';
import BoxContainer from '../../../layout/hoc/BoxContainer';
import { colors } from '../../../../assets/styles/colors';
import BoxLinks from '../../../layout/Navs/BoxLinks';

const ResultsTotals = props => {
  const { results } = props;
  const getGoals = arr => arr.reduce((a, b) => a + b, 0);
  const goalsForArray = results.map(result => +result.teamScore);
  const goalsAgainstArray = results.map(result => +result.opponentScore);
  const goalsFor = getGoals(goalsForArray);
  const goalsAgainst = getGoals(goalsAgainstArray);
  const played = results.length;
  const wins = results.filter(res => (+res.teamScore > +res.opponentScore ? res : null)).length;
  const draws = results.filter(res => (+res.teamScore === +res.opponentScore ? res : null)).length;
  const loss = results.filter(res => (+res.teamScore < +res.opponentScore ? res : null)).length;
  // Data to map
  let id = 0;
  const createData = (icon, value, title, color) => {
    id += 1;
    return { id, icon, value, title, color };
  };

  const listItems = [
    createData(<i className="fas fa-list" />, played, 'TOTAL MATCHES', ''),
    createData(<i className="fas fa-plus" />, goalsFor, 'GOALS FOR', ''),
    createData(<i className="fas fa-minus" />, goalsAgainst, 'GOALS AGAINST', ''),
    createData(null, wins, 'WIN', colors.win),
    createData(null, draws, 'DRAW', colors.draw),
    createData(null, loss, 'LOSE', colors.lose),
  ];

  return (
    <BoxContainer>
      <Paper style={{ padding: '10px', background: '#333' }}>
        <StatsAvatar itemsToMap={listItems} />
        <hr />
        <BoxLinks link="/results/addresult" />
      </Paper>
    </BoxContainer>
  );
};

ResultsTotals.propTypes = { results: PropTypes.instanceOf(Array).isRequired };

export default ResultsTotals;
