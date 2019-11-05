import React from 'react';
import PropTypes from 'prop-types';
import ModalWrapper from './ModalWrapper';
import IndividualStats from '../../Sections/IndividualStats';

const Stats = props => {
  const {
    auth,
    player,
    results,
    playerImage,
    playerStats,
    playerMatches,
    playerMatchStats,
  } = props;
  const totalTeamGoals = results.reduce(
    (totalGoals, a) => totalGoals + +a.teamScore,
    0,
  );
  return (
    <div>
      <ModalWrapper
        auth={auth}
        player={player}
        playerImage={playerImage}
        icon='list-ul'
      >
        <IndividualStats
          player={player}
          results={results}
          playerImage={playerImage}
          totalTeamGoals={totalTeamGoals}
          playerMatches={playerMatches}
          playerMatchStats={playerMatchStats}
          playerStats={playerStats}
        />
      </ModalWrapper>
    </div>
  );
};

Stats.propTypes = {
  auth: PropTypes.bool.isRequired,
  player: PropTypes.shape({}).isRequired,
  playerStats: PropTypes.shape({}).isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  playerImage: PropTypes.string.isRequired,
  playerMatches: PropTypes.instanceOf(Array).isRequired,
  playerMatchStats: PropTypes.instanceOf(Array).isRequired,
};

export default Stats;
