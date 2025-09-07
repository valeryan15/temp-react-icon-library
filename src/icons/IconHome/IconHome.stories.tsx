import { Meta, StoryObj } from '@storybook/react';
import { IconHome } from './IconHome';

const meta: Meta<typeof IconHome> = {
  title: 'Components/Icons/IconHome',
  component: IconHome,
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
type Story = StoryObj<typeof IconHome>;

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
    color: '#3B82F6',
  },
};

export const WithSpin: Story = {
  args: {
    spin: true,
  },
};

export const WithAriaLabel: Story = {
  args: {
    'aria-label': 'Home icon',
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
    color: '#8B5CF6',
    strokeWidth: 1.5,
  },
};
