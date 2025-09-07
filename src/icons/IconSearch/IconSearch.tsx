import React from 'react';
import { Icon } from '../../components/Icon';
import { IconProps } from '../../types';

/**
 * Search icon component
 */
export const IconSearch: React.FC<IconProps> = props => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </Icon>
  );
};

export default IconSearch;
