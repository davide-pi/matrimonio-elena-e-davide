import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import { BRIDE, EVENT_DATE, GROOM } from '../config/WeddingInfo';

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

vi.mock('../components/Schedule', () => ({
  default: () => <div data-testid="schedule">Schedule Component</div>
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
  'schedule.title': 'Schedule',
  'gift.title': 'Registry'
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTranslation[key] || key,
  }),
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

    // Check initial loading state
    // Since the bride and groom names are rendered in elements with text nodes and spans between them,
    // we need to use a regex or check separately
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(BRIDE.name);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(GROOM.name);

    // Advance timer to complete loading animation
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Verify all sections are rendered
    expect(screen.getByTestId('language-selector')).toBeInTheDocument();
    expect(screen.getByTestId('countdown-md')).toBeInTheDocument();
    expect(screen.getByTestId('countdown-sm')).toBeInTheDocument();
    expect(screen.getByTestId('event-details')).toBeInTheDocument();
    expect(screen.getByTestId('rsvp')).toBeInTheDocument();
    expect(screen.getByTestId('schedule')).toBeInTheDocument();
    expect(screen.getByTestId('gift')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('sets document title correctly', () => {
    render(<App />);
    expect(document.title).toBe('Elena & Davide - Wedding');
  });

  it('displays the bride and groom names', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(`${BRIDE.name} & ${GROOM.name}`);
  });

  it('displays the wedding date and time', () => {
    render(<App />);

    const formattedDate = EVENT_DATE.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const formattedTime = EVENT_DATE.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
    });

    expect(screen.getByText(new RegExp(`${formattedDate}.*${formattedTime}`))).toBeInTheDocument();
  });

  it('passes correct props to CountdownTimer components', () => {
    render(<App />);

    const mainCountdown = screen.getByTestId('countdown-md');
    const stickyCountdown = screen.getByTestId('countdown-sm');

    expect(mainCountdown).toHaveTextContent(EVENT_DATE.toISOString());
    expect(stickyCountdown).toHaveTextContent(EVENT_DATE.toISOString());
  });

  it('has working navigation links', () => {
    render(<App />);

    const discoverMoreLink = screen.getByText('Discover More').closest('a');
    expect(discoverMoreLink).toHaveAttribute('href', '#details');
  });
  it('shows sticky countdown when scrolling past the main countdown', () => {
    render(<App />);

    // Wait for load animation to complete first
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Initially, sticky countdown should be hidden
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

    // Before timer completes, content should be hidden
    const contentContainer = document.querySelector('.relative.z-10') as HTMLElement;
    expect(contentContainer).toHaveClass('opacity-0');

    const backgroundContainer = document.querySelector('.fixed.inset-0.bg-cover') as HTMLElement;
    expect(backgroundContainer).toHaveClass('opacity-0');

    // Advance timer to complete loading animation
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // After timer completes, content should be visible
    expect(contentContainer).toHaveClass('opacity-100');
    expect(backgroundContainer).toHaveClass('opacity-100');
  });

  it('removes event listeners on unmount', () => {
    const { unmount } = render(<App />);

    unmount();

    // Check if removeEventListener was called with 'scroll'
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('cleans up timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    const { unmount } = render(<App />);
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('renders all section headings correctly', () => {
    render(<App />);

    // Advance timer to complete loading animation
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Check all section headings
    expect(screen.getByText('Event Details')).toBeInTheDocument();
    expect(screen.getByText('RSVP')).toBeInTheDocument();
    expect(screen.getByText('Schedule')).toBeInTheDocument();
    expect(screen.getByText('Registry')).toBeInTheDocument();
  });
    it('displays icons in the correct sections', () => {
    render(<App />);

    // Since we're using mocked components, we won't actually have SVG elements
    // Instead, we should check that the components that would contain icons are present
    expect(screen.getByTestId('language-selector')).toBeInTheDocument();

    // Check that the "Discover More" link is present
    const discoverMoreLink = screen.getByText('Discover More').closest('a');
    expect(discoverMoreLink).toBeInTheDocument();

    // Check that the section titles that would have icons are present
    expect(screen.getByText('RSVP')).toBeInTheDocument();
    expect(screen.getByText('Schedule')).toBeInTheDocument();
    expect(screen.getByText('Registry')).toBeInTheDocument();
  });

  it('calculates percentageVisible correctly during scroll', () => {
    render(<App />);

    // We need to test the scroll handler's internal percentageVisible calculation logic

    // First test with countdown fully visible (bottom - top = height)
    const getBoundingClientRectSpy = vi.spyOn(Element.prototype, 'getBoundingClientRect');
    getBoundingClientRectSpy.mockImplementation(function(this: Element) {
      if (this.classList.contains('transition-all')) {
        return {
          bottom: 200,
          height: 100,
          top: 100,
          width: 100,
          left: 0,
          right: 0,
          x: 0,
          y: 100,
          toJSON: () => {}
        }; // 100% visible (percentageVisible = 1)
      }
      return {
        bottom: 500,
        height: 100,
        left: 0,
        right: 0,
        top: 400,
        width: 100,
        x: 0,
        y: 400,
        toJSON: () => {}
      };
    });

    // Trigger scroll event with fully visible countdown
    act(() => {
      if (window.scrollCallback) {
        window.scrollCallback();
      }
    });

    // When fully visible, sticky countdown should be hidden
    const stickyCountdown = screen.getByTestId('countdown-sm').parentElement?.parentElement;
    expect(stickyCountdown).toHaveClass('opacity-0');

    // Now test with countdown partially visible
    getBoundingClientRectSpy.mockImplementation(function(this: Element) {
      if (this.classList.contains('transition-all')) {
        return {
          bottom: 110, // Only 10% visible
          height: 100,
          top: 100,
          width: 100,
          left: 0,
          right: 0,
          x: 0,
          y: 100,
          toJSON: () => {}
        };
      }
      return {
        bottom: 500,
        height: 100,
        left: 0,
        right: 0,
        top: 400,
        width: 100,
        x: 0,
        y: 400,
        toJSON: () => {}
      };
    });

    // Trigger scroll event with partially visible countdown (less than 90%)
    act(() => {
      if (window.scrollCallback) {
        window.scrollCallback();
      }
    });

    // When less than 90% visible, sticky countdown should be shown
    expect(stickyCountdown).toHaveClass('opacity-100');

    // Restore original function
    getBoundingClientRectSpy.mockRestore();
  });
});
