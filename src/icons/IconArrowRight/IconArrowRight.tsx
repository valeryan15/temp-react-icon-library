import React from 'react';
import { Icon } from '../../components/Icon';
import { IconProps } from '../../types';

/**
 * Arrow Right icon component
 */
export const IconArrowRight: React.FC<IconProps> = props => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12,5 19,12 12,19" />
    </Icon>
  );
};

export default IconArrowRight;
