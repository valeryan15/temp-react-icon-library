import React from 'react';
import { Icon } from '../../components/Icon';
import { IconProps } from '../../types';

/**
 * Star icon component
 */
export const IconStar: React.FC<IconProps> = props => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </Icon>
  );
};

export default IconStar;
