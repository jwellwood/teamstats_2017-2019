import React from 'react';
import PropTypes from 'prop-types';
// Progress bar
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCircle = props => {
  let { percentageCompleted } = props;
  if (Number.isNaN(percentageCompleted)) {
    percentageCompleted = 0;
  }
  return (
    <CircularProgressbar
      percentage={percentageCompleted}
      text={`${percentageCompleted.toFixed(0)}%`}
      className={() => (percentageCompleted < 100 ? 'incomplete' : 'complete')}
      backgroundPadding={1}
      background
      strokeWidth={8}
      styles={{
        trail: { stroke: 'rgba(255, 160, 0)' },
        path: { stroke: 'rgba(76, 175, 80)' },
        text: { fill: '#fff', fontSize: '1rem', fontFamily: 'Righteous' },
        background: { fill: '#222' },
      }}
      initialAnimation
    />
  );
};

ProgressCircle.propTypes = { percentageCompleted: PropTypes.number.isRequired };

export default ProgressCircle;
