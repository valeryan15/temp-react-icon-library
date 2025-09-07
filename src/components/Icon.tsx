import React from 'react';
import { IconProps } from '../types';

/**
 * Base Icon component that provides common functionality for all icons
 */
export const Icon: React.FC<
  IconProps & { children: React.ReactNode; viewBox?: string }
> = ({
  size = '1em',
  color = 'currentColor',
  strokeWidth = 2,
  spin = false,
  className,
  style,
  children,
  viewBox = '0 0 24 24',
  'aria-label': ariaLabel,
  ...restProps
}) => {
  const spinStyle: React.CSSProperties = spin
    ? {
        animation: 'icon-spin 1s linear infinite',
        ...style,
      }
    : style || {};

  return (
    <>
      {spin && (
        <style>
          {`
            @keyframes icon-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      )}
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={spinStyle}
        aria-hidden={ariaLabel ? undefined : 'true'}
        role={ariaLabel ? 'img' : undefined}
        data-testid="icon-component"
        {...restProps}
      >
        {ariaLabel && <title>{ariaLabel}</title>}
        {children}
      </svg>
    </>
  );
};

export default Icon;
