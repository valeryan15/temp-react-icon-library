import { Meta, StoryObj } from '@storybook/react';
import { IconStar } from './IconStar';

const meta: Meta<typeof IconStar> = {
  title: 'Components/Icons/IconStar',
  component: IconStar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'text' },
      description: 'Size of the icon (number for px, string for em/rem/etc)',
      defaultValue: '1em',
    },
    color: {
      control: { type: 'color' },
      description: 'Color of the icon',
      defaultValue: 'currentColor',
    },
    strokeWidth: {
      control: { type: 'number', min: 0.5, max: 5, step: 0.5 },
      description: 'Stroke width for outline icons',
      defaultValue: 2,
    },
    spin: {
      control: { type: 'boolean' },
      description: 'Whether the icon should spin',
      defaultValue: false,
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessible label for the icon',
    },
    className: {
      control: { type: 'text' },
      description: 'CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconStar>;

export const Default: Story = {
  args: {},
};

export const CustomSize: Story = {
  args: {
    size: 32,
  },
};

export const CustomColor: Story = {
  args: {
    color: '#FFD700',
  },
};

export const WithSpin: Story = {
  args: {
    spin: true,
  },
};

export const WithAriaLabel: Story = {
  args: {
    'aria-label': 'Star icon',
  },
};

export const ThickStroke: Story = {
  args: {
    strokeWidth: 3,
  },
};

export const LargeCustom: Story = {
  args: {
    size: 48,
    color: '#FF6B6B',
    strokeWidth: 1.5,
  },
};
