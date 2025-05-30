import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Footer from '../components/Footer';
import { BRIDE, GROOM } from '../config/WeddingInfo';

// Mock translation strings
const mockTranslation: Record<string, string> = {
  'app.date': '20 Settembre 2025'
};

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTranslation[key] || key,
  }),
}));

describe('Footer Component', () => {
  it('renders the names of the bride and groom', () => {
    render(<Footer />);

    // Check if bride and groom names are rendered
    const nameElement = screen.getByText(`${BRIDE.name} & ${GROOM.name}`);
    expect(nameElement).toBeInTheDocument();
  });

  it('renders the wedding date', () => {
    render(<Footer />);

    // Check if date is rendered
    expect(screen.getByText('20 Settembre 2025')).toBeInTheDocument();
  });
  it('displays a heart icon', () => {
    render(<Footer />);

    // Check if heart icon is present
    const heartIcon = document.querySelector('svg'); // Assuming Heart is the only svg in the Footer
    expect(heartIcon).toBeInTheDocument();
    expect(heartIcon).toHaveClass('text-sage-500');
  });

  it('applies proper styling to footer elements', () => {
    const { container } = render(<Footer />);

    // Check footer element has proper classes
    const footerElement = container.firstChild as HTMLElement;
    expect(footerElement.tagName.toLowerCase()).toBe('footer');
    expect(footerElement).toHaveClass('py-8');
    expect(footerElement).toHaveClass('text-center');
    expect(footerElement).toHaveClass('text-sage-600');

    // Check for name styling (should have cursive font)
    const nameElement = screen.getByText(`${BRIDE.name} & ${GROOM.name}`);
    expect(nameElement).toHaveClass('font-cursive');
  });

  it('renders decorative bullet points around the heart icon', () => {
    render(<Footer />);

    // Check if bullet points are rendered
    const bulletPoints = screen.getAllByText('•');
    expect(bulletPoints.length).toBe(2);

    // Check if heart icon is between bullet points using container structure
    const divWithHeartAndBullets = document.querySelector('.flex.justify-center.items-center');

    // Validate the structure: bullet -> heart -> bullet
    const childNodes = Array.from(divWithHeartAndBullets?.childNodes || []).filter(
      node => node.nodeType === Node.ELEMENT_NODE
    );

    expect(childNodes.length).toBe(3);
    expect(childNodes[0].textContent).toBe('•');
    // Middle child should be the heart icon (SVG)
    expect(childNodes[1].nodeName).toBe('svg');
    expect(childNodes[2].textContent).toBe('•');
  });
});
