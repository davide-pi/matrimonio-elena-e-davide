import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SpouseContactCard from '../components/SpouseContactCard';
import { Spouse } from '../config/WeddingInfo';

// Mock the WhatsApp icon component
vi.mock('../icons/WhatsApp', () => ({
  WhatsApp: ({ size, className }: { size: number; className: string }) => (
    <svg
      data-testid="whatsapp-icon"
      width={size}
      height={size}
      className={className}
    />
  ),
}));

describe('SpouseContactCard Component', () => {
  // Create a test spouse object
  const testSpouse = new Spouse('Test Person', '+39', '3466049340');

  beforeEach(() => {
    // Mock window.matchMedia for testing responsive design
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false, // Default to mobile view
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('renders the spouse name correctly', () => {
    render(<SpouseContactCard {...testSpouse} />);

    expect(screen.getByText('Test Person')).toBeInTheDocument();
  });
  it('renders the formatted phone number correctly', () => {
    render(<SpouseContactCard {...testSpouse} />);

    // Use getAllByText since the phone number appears multiple times (for desktop and mobile)
    expect(screen.getAllByText('+39 346 604 9340').length).toBeGreaterThan(0);
  });
  it('renders WhatsApp link for mobile view', () => {
    render(<SpouseContactCard {...testSpouse} />);

    // Fix the URL to match what's actually used in the component
    const whatsappLink = document.querySelector('a[href="https://wa.me/+393466049340"]');
    expect(whatsappLink).toBeInTheDocument();

    // Check if WhatsApp icon is present within the link
    const whatsappIcon = screen.getByTestId('whatsapp-icon');
    expect(whatsappIcon).toBeInTheDocument();
    expect(whatsappIcon.parentElement).toBe(whatsappLink);
  });

  it('renders phone link for mobile view', () => {
    render(<SpouseContactCard {...testSpouse} />);

    const phoneLink = document.querySelector('a[href="tel:+393466049340"]');
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveTextContent('+39 346 604 9340');
  });

  it('applies correct styling', () => {
    const { container } = render(<SpouseContactCard {...testSpouse} />);

    const cardContainer = container.firstChild;
    expect(cardContainer).toHaveClass('bg-white/75');
    expect(cardContainer).toHaveClass('rounded-lg');
    expect(cardContainer).toHaveClass('shadow-sm');
    expect(cardContainer).toHaveClass('hover:shadow-lg');

    // Check heading styling
    const heading = screen.getByText('Test Person');
    expect(heading).toHaveClass('font-semibold');
  });

  it('correctly applies responsive classes', () => {
    render(<SpouseContactCard {...testSpouse} />);

    // Phone icon should have hidden class for mobile
    const phoneIcon = document.querySelector('svg:not([data-testid="whatsapp-icon"])');
    expect(phoneIcon).toHaveClass('hidden');
    expect(phoneIcon).toHaveClass('md:inline');    // WhatsApp link should be visible on mobile only
    const whatsappLink = document.querySelector('a[href="https://wa.me/+393466049340"]');
    expect(whatsappLink).toHaveClass('inline');
    expect(whatsappLink).toHaveClass('md:hidden');

    // Phone number span should be hidden on mobile
    const phoneNumberSpan = document.querySelector('span.hidden');
    expect(phoneNumberSpan).toHaveTextContent('+39 346 604 9340');
    expect(phoneNumberSpan).toHaveClass('md:inline');
  });
});
