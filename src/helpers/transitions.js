import React from 'react';
import Slide from '@material-ui/core/Slide';

export const MoreStatsTransition = props => (
  <Slide
    direction="up"
    {...props}
    timeout={{
      enter: 500,
      exit: 300,
    }}
  />
);

export const PlayerStatsTransition = props => (
  <Slide
    direction="left"
    {...props}
    timeout={{
      enter: 500,
      exit: 300,
    }}
  />
);
