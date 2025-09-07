import React from 'react';
import { Icon } from '../../components/Icon';
import { IconProps } from '../../types';

/**
 * Home icon component
 */
export const IconHome: React.FC<IconProps> = props => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </Icon>
  );
};

export default IconHome;
