import { render, screen } from '@testing-library/react';
import SectionCard from '../components/SectionCard';
import { describe, expect, it } from 'vitest';

describe('SectionCard', () => {
  it('renders the title and children correctly', () => {
    render(
      <SectionCard id="test-section" title={<span>Test Title</span>}>
        <div>Test Content</div>
      </SectionCard>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies the correct id and classes', () => {
    const { container } = render(
      <SectionCard id="my-section" title="My Title">
        <div>Content</div>
      </SectionCard>
    );
    const section = container.querySelector('#my-section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('py-8');
    expect(section).toHaveClass('px-4');
    expect(section).toHaveClass('md:px-8');
  });
});
