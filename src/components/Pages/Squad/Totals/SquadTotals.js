import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// Components
import BoxContainer from '../../../layout/hoc/BoxContainer';
import BoxLinks from '../../../layout/Navs/BoxLinks';
// Table
import columns from './Data';
import TableWrapper from '../../../layout/Table';
import TeamStats from '../Stats/TeamStats';

const SquadTotals = props => {
  const { auth, players, results } = props;
  const totalPlayers = players.length;
  const data = [{ title: 'Total players', totalPlayers }];
  const TheadComponent = () => null;
  return (
    <BoxContainer>
      <Paper style={{ padding: '10px', background: '#222' }}>
        <Grid container justify="center" style={{ margin: '10px auto' }}>
          <TableWrapper data={data} columns={columns} noHeader={TheadComponent} />
        </Grid>
        <BoxLinks auth={auth} link="/players/addplayer">
          <TeamStats players={players} results={results} />
        </BoxLinks>
      </Paper>
    </BoxContainer>
  );
};

SquadTotals.propTypes = {
  auth: PropTypes.bool.isRequired,
  players: PropTypes.instanceOf(Array).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
};

export default SquadTotals;
