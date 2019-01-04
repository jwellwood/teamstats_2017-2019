import React from 'react';
import Slide from '@material-ui/core/Slide';

export const modalDown = props => (
  <Slide
    direction="down"
    {...props}
    timeout={{
      enter: 700,
      exit: 300,
    }}
  />
);

export const modalLeft = props => (
  <Slide
    direction="left"
    {...props}
    timeout={{
      enter: 500,
      exit: 300,
    }}
  />
);
