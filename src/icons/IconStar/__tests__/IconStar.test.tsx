import React from 'react';
import { render, screen } from '@testing-library/react';
import { IconStar } from '../IconStar';

describe('IconStar', () => {
  it('renders correctly', () => {
    render(<IconStar />);

    const svg = screen.getByTestId('icon-component');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');

    const polygon = svg.querySelector('polygon');
    expect(polygon).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    render(<IconStar size={32} color="gold" aria-label="Star rating" />);

    const svg = screen.getByTestId('icon-component');
    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
    expect(svg).toHaveAttribute('stroke', 'gold');
    expect(svg).toHaveAttribute('role', 'img');

    const title = screen.getByText('Star rating');
    expect(title).toBeInTheDocument();
  });

  it('renders with spin animation', () => {
    render(<IconStar spin />);

    const svg = screen.getByTestId('icon-component');
    expect(svg).toHaveStyle({ animation: 'icon-spin 1s linear infinite' });
  });
});
