import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * The size of the icon. Can be a number (px) or string (em, rem, etc.)
   * @default "1em"
   */
  size?: number | string;

  /**
   * The color of the icon. Uses currentColor by default to inherit text color.
   * @default "currentColor"
   */
  color?: string;

  /**
   * The stroke width for outline icons
   * @default 2
   */
  strokeWidth?: number;

  /**
   * Whether the icon should spin/rotate
   * @default false
   */
  spin?: boolean;

  /**
   * Accessible label for the icon. If provided, the icon will be treated as semantic.
   * If not provided, the icon will be treated as decorative (aria-hidden="true").
   */
  'aria-label'?: string;
}

export type IconComponent = React.FC<IconProps>;
