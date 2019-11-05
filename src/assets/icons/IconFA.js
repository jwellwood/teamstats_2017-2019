import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconFA = ({ icon, size, color }) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      size={size || 'xs'}
      color={color || 'inherit'}
    />
  );
};

export default IconFA;
