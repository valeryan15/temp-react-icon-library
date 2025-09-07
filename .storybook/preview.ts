import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      description: {
        component: 'Icon components for React applications',
      },
    },
    options: {
      storySort: {
        order: ['Components', ['Icons', ['Gallery', 'IconStar', 'IconArrowRight', 'IconHome', 'IconSearch']]],
      },
    },
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

export default preview;
