import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { WhatsApp } from '../icons/WhatsApp';

describe('WhatsAppIcon Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<WhatsApp />);
    expect(container).toBeDefined();
  });

  it('should render an SVG element', () => {
    const { container } = render(<WhatsApp />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toBeDefined();
    expect(svgElement?.getAttribute('viewBox')).toBe('0 0 24 24');
  });

  it('should have the correct class name', () => {
    const { container } = render(<WhatsApp className="icon-class" />);
    const svgElement = container.querySelector('svg');
    expect(svgElement?.classList.contains('icon-class')).toBe(true);
  });
});
