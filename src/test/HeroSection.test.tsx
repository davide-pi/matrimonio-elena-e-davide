import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HeroSection from '../components/HeroSection';

// Mock translation and config
vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  initReactI18next: { type: '3rdParty', init: () => {} },
}));
vi.mock('../config/WeddingInfo', () => ({
  BRIDE: { name: 'Elena' },
  GROOM: { name: 'Davide' },
  EVENT_DATE: new Date('2025-09-20T16:30:00'),
}));
vi.mock('../components/CountdownTimer', () => ({
  default: () => <div>CountdownTimer</div>,
}));

describe('HeroSection', () => {
  const countdownRef = { current: null };

  it('renders bride and groom names', () => {
    render(<HeroSection countdownRef={countdownRef} showStickyCountdown={false} />);
    // Use regex matcher to find the names even if split by whitespace or elements
    expect(screen.getByText(/Elena/i)).toBeInTheDocument();
    expect(screen.getByText(/Davide/i)).toBeInTheDocument();
  });

  it('renders the announcement and discover more button', () => {
    render(<HeroSection countdownRef={countdownRef} showStickyCountdown={false} />);
    expect(screen.getByText('app.announcement')).toBeInTheDocument();
    expect(screen.getByText('app.discoverMore')).toBeInTheDocument();
  });

  it('renders the CountdownTimer component', () => {
    render(<HeroSection countdownRef={countdownRef} showStickyCountdown={false} />);
    expect(screen.getAllByText('CountdownTimer').length).toBeGreaterThan(0);
  });
});
