import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

// Mock all child components
vi.mock('../components/CountdownTimer', () => ({
  default: ({ targetDate, size }: { targetDate: Date; size: string }) => (
    <div data-testid={`countdown-${size}`}>Countdown: {targetDate.toISOString()}</div>
  )
}));

vi.mock('../components/EventDetails', () => ({
  default: () => <div data-testid="event-details">Event Details Component</div>
}));

vi.mock('../components/LanguageSelector', () => ({
  default: () => <div data-testid="language-selector">Language Selector Component</div>
}));

vi.mock('../components/RSVP', () => ({
  default: () => <div data-testid="rsvp">RSVP Component</div>
}));

vi.mock('../components/Gift', () => ({
  default: () => <div data-testid="gift">Gift Component</div>
}));

vi.mock('../components/Footer', () => ({
  default: () => <div data-testid="footer">Footer Component</div>
}));

// Mock i18next
const mockTranslation: Record<string, string> = {
  'app.title': 'Elena & Davide - Wedding',
  'app.announcement': 'We are getting married!',
  'app.discoverMore': 'Discover More',
  'details.title': 'Event Details',
  'rsvp.title': 'RSVP',
  'gift.title': 'Registry'
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTranslation[key] || key,
  }),
  initReactI18next: { type: '3rdParty', init: () => {} },
}));

// Mock Element.getBoundingClientRect for scroll handling tests
Element.prototype.getBoundingClientRect = vi.fn(() => ({
  bottom: 500,
  height: 100,
  left: 0,
  right: 0,
  top: 400,
  width: 100,
  x: 0,
  y: 400,
  toJSON: () => {}
}));

// Mock setTimeout and window event listeners
vi.useFakeTimers();

// Add scrollCallback to Window interface
declare global {
  interface Window {
    scrollCallback: (() => void) | null;
  }
}

describe('App Component', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    vi.clearAllTimers();

    // Reset document.title
    document.title = '';

    // Initialize scrollCallback
    window.scrollCallback = null;

    // Mock the scroll event listener
    window.addEventListener = vi.fn().mockImplementation((event, callback) => {
      if (event === 'scroll') {
        window.scrollCallback = callback;
      }
    });

    window.removeEventListener = vi.fn().mockImplementation((event, callback) => {
      if (event === 'scroll' && window.scrollCallback === callback) {
        window.scrollCallback = null;
      }
    });
  });

  it('renders correctly with all sections', () => {
    render(<App />);
    act(() => { vi.advanceTimersByTime(300); });
    expect(screen.getByTestId('language-selector')).toBeInTheDocument();
    expect(screen.getByTestId('countdown-md')).toBeInTheDocument();
    expect(screen.getByTestId('countdown-sm')).toBeInTheDocument();
    expect(screen.getByTestId('event-details')).toBeInTheDocument();
    expect(screen.getByTestId('rsvp')).toBeInTheDocument();
    expect(screen.getByTestId('gift')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('sets document title correctly', () => {
    render(<App />);
    expect(document.title).toBe('Elena & Davide - Wedding');
  });

  it('has working navigation links', () => {
    render(<App />);
    const discoverMoreLink = screen.getByText('Discover More').closest('a');
    expect(discoverMoreLink).toHaveAttribute('href', '#details');
  });

  it('shows sticky countdown when scrolling past the main countdown', () => {
    render(<App />);
    act(() => { vi.advanceTimersByTime(300); });
    const stickyCountdownContainer = screen.getByTestId('countdown-sm').parentElement?.parentElement;
    expect(stickyCountdownContainer).toHaveClass('opacity-0');

    // Store original getBoundingClientRect to restore it later
    const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

    // First spy on the function to see when it's called
    const getBoundingClientRectSpy = vi.spyOn(Element.prototype, 'getBoundingClientRect');
      // Then mock its implementation to simulate countdown out of view
    getBoundingClientRectSpy.mockImplementation(function(this: Element) {
      // Check if this is the countdown container
      if (this.classList.contains('transition-all')) {
        return {
          bottom: 10, // Almost out of view
          height: 100,
          top: -90,
          width: 100,
          left: 0,
          right: 0,
          x: 0,
          y: -90,
          toJSON: () => {}
        };
      }
      // Return default values for other elements
      return originalGetBoundingClientRect.apply(this);
    });

    // Trigger scroll event
    act(() => {
      if (window.scrollCallback) {
        window.scrollCallback();
      }
    });

    // Now the sticky countdown should be visible
    expect(stickyCountdownContainer).toHaveClass('opacity-100');

    // Restore original function
    getBoundingClientRectSpy.mockRestore();
  });

  it('handles loading animations correctly', () => {
    render(<App />);
    const contentContainer = screen.getByTestId('content-container');
    expect(contentContainer).not.toBeNull();
    expect(contentContainer).toHaveClass('opacity-0');
    const backgroundContainer = document.querySelector('.fixed.inset-0.bg-cover') as HTMLElement;
    expect(backgroundContainer).not.toBeNull();
    expect(backgroundContainer).toHaveClass('opacity-0');
    act(() => { vi.advanceTimersByTime(300); });
    expect(contentContainer).toHaveClass('opacity-100');
    expect(backgroundContainer).toHaveClass('opacity-100');
  });

  it('removes event listeners on unmount', () => {
    const { unmount } = render(<App />);
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('cleans up timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
    const { unmount } = render(<App />);
    unmount();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
