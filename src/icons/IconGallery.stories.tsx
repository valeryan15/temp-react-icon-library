import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { IconStar } from './IconStar/IconStar';
import { IconArrowRight } from './IconArrowRight/IconArrowRight';
import { IconHome } from './IconHome/IconHome';
import { IconSearch } from './IconSearch/IconSearch';
// start-past-import
// end-past-import

const meta: Meta = {
  title: 'Components/Icons/Gallery',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

const IconGrid = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '1rem',
      padding: '1rem',
    }}
  >
    {children}
  </div>
);

const IconCard = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div
    style={{
      textAlign: 'center',
      padding: '1rem',
      border: '1px solid #eee',
      borderRadius: '4px',
    }}
  >
    <div
      style={{
        marginBottom: '0.5rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
    <div style={{ fontSize: '0.8rem', color: '#666' }}>{title}</div>
  </div>
);

export const Gallery: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h1>Icon Gallery</h1>
      <p>Browse all available icons in the library</p>

      <h2 style={{ marginTop: '2rem' }}>Default Size (1em)</h2>
      <IconGrid>
        <IconCard title="IconStar">
          <IconStar />
        </IconCard>
        <IconCard title="IconArrowRight">
          <IconArrowRight />
        </IconCard>
        <IconCard title="IconHome">
          <IconHome />
        </IconCard>
        <IconCard title="IconSearch">
          <IconSearch />
        </IconCard>
        {/* start-past-default */}
        {/* end-past-default */}
      </IconGrid>

      <h2 style={{ marginTop: '2rem' }}>Large Size (2em)</h2>
      <IconGrid>
        <IconCard title="IconStar">
          <IconStar size="2em" />
        </IconCard>
        <IconCard title="IconArrowRight">
          <IconArrowRight size="2em" />
        </IconCard>
        <IconCard title="IconHome">
          <IconHome size="2em" />
        </IconCard>
        <IconCard title="IconSearch">
          <IconSearch size="2em" />
        </IconCard>
        {/* start-past-size */}
        {/* end-past-size */}
      </IconGrid>

      <h2 style={{ marginTop: '2rem' }}>Colored Icons</h2>
      <IconGrid>
        <IconCard title="Gold Star">
          <IconStar size="2em" color="#FFD700" />
        </IconCard>
        <IconCard title="Blue Arrow">
          <IconArrowRight size="2em" color="#3B82F6" />
        </IconCard>
        <IconCard title="Green Home">
          <IconHome size="2em" color="#10B981" />
        </IconCard>
        <IconCard title="Red Search">
          <IconSearch size="2em" color="#EF4444" />
        </IconCard>
        {/* start-past-color */}
        {/* end-past-color */}
      </IconGrid>

      <h2 style={{ marginTop: '2rem' }}>Animated Icons</h2>
      <IconGrid>
        <IconCard title="Spinning Star">
          <IconStar size="2em" spin />
        </IconCard>
        <IconCard title="Spinning Arrow">
          <IconArrowRight size="2em" spin />
        </IconCard>
        <IconCard title="Spinning Home">
          <IconHome size="2em" spin />
        </IconCard>
        <IconCard title="Spinning Search">
          <IconSearch size="2em" spin />
        </IconCard>
      </IconGrid>
    </div>
  ),
};
