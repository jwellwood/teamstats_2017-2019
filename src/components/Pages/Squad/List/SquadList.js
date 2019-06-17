import React from 'react';
import PropTypes from 'prop-types';
// Components
import StatsHeader from '../../../layout/Stats/StatsHeader';
import BoxContainer from '../../../layout/hoc/BoxContainer';
import PlayerList from './PlayerList';

const SquadList = props => {
  const { auth, players, results } = props;
  const goalkeepers = players.filter(player => player.position === 'GK');
  const defenders = players.filter(player => player.position === 'DF');
  const midfielders = players.filter(player => player.position === 'MF');
  const forwards = players.filter(player => player.position === 'FW');

  const data = (title, position) => ({ title, position });
  const itemsToMap = [
    data('Goalkeepers', goalkeepers),
    data('Defenders', defenders),
    data('Midfielders', midfielders),
    data('Forwards', forwards),
  ];

  return (
    <BoxContainer>
      {itemsToMap.map(item => (
        <div key={Math.random()}>
          <StatsHeader title={item.title} />
          <PlayerList players={item.position} results={results} auth={auth} />
        </div>
      ))}
    </BoxContainer>
  );
};

SquadList.propTypes = {
  auth: PropTypes.bool.isRequired,
  players: PropTypes.instanceOf(Array),
  results: PropTypes.instanceOf(Array),
};

SquadList.defaultProps = { players: [], results: [] };

export default SquadList;
