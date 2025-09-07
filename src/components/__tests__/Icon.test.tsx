import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from '../Icon';

describe('Icon', () => {
  it('renders with default props', () => {
    render(
      <Icon>
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );

    const svg = screen.getByTestId('icon-component');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('width', '1em');
    expect(svg).toHaveAttribute('height', '1em');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with custom size', () => {
    render(
      <Icon size={24}>
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );

    const svg = screen.getByTestId('icon-component');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  it('renders with custom color', () => {
    render(
      <Icon color="red">
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );

    const svg = screen.getByTestId('icon-component');
    expect(svg).toHaveAttribute('stroke', 'red');
  });

  it('renders with custom className', () => {
    render(
      <Icon className="custom-icon">
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );

    const svg = screen.getByTestId('icon-component');
    expect(svg).toHaveClass('custom-icon');
  });

  it('renders with aria-label and proper accessibility attributes', () => {
    render(
      <Icon aria-label="Test icon">
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );

    const svg = screen.getByTestId('icon-component');
    expect(svg).toBeInTheDocument();
    expect(svg).not.toHaveAttribute('aria-hidden');
    expect(svg).toHaveAttribute('role', 'img');

    const title = screen.getByText('Test icon');
    expect(title).toBeInTheDocument();
  });

  it('renders with spin animation', () => {
    render(
      <Icon spin>
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );

    const svg = screen.getByTestId('icon-component');
    expect(svg).toHaveStyle({ animation: 'icon-spin 1s linear infinite' });
  });

  it('renders with custom strokeWidth', () => {
    render(
      <Icon strokeWidth={4}>
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );

    const svg = screen.getByTestId('icon-component');
    expect(svg).toHaveAttribute('stroke-width', '4');
  });

  it('passes through additional SVG props', () => {
    render(
      <Icon data-testid="custom-icon" onClick={() => {}}>
        <circle cx="12" cy="12" r="10" />
      </Icon>
    );

    const svg = screen.getByTestId('custom-icon');
    expect(svg).toBeInTheDocument();
  });
});
