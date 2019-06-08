import React from 'react';
import PropTypes from 'prop-types';
// Components
import MatchDetails from './Sections/MatchDetails';
import MatchStats from './Sections/MatchStats';
import MatchReport from './Sections/MatchReport';
import PageHeader from '../../../layout/Navs/PageHeader';
import BoxContainer from '../../../layout/hoc/BoxContainer';

const ResultPage = props => {
  const { result, teamName } = props;
  return (
    <BoxContainer>
      <PageHeader title={result.opponentName} link="/results" />
      <MatchDetails result={result} teamName={teamName} />
      <MatchStats result={result} />
      <MatchReport result={result} />
    </BoxContainer>
  );
};

ResultPage.propTypes = {
  result: PropTypes.shape({}).isRequired,
  teamName: PropTypes.string.isRequired,
};

export default ResultPage;
