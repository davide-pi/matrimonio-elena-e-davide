import { act, cleanup, render, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CountdownTimer from '../components/CountdownTimer';

describe('CountdownTimer Component', () => {
  beforeEach(() => {
    // Use vi.useFakeTimers to mock Date and timers
    vi.useFakeTimers();
    // Set the mock date to 2025-05-27T12:00:00Z
    vi.setSystemTime(new Date('2025-05-27T12:00:00Z'));
  });

  afterEach(() => {
    // Restore the real timers
    vi.useRealTimers();
    vi.restoreAllMocks();
    cleanup();
  });

  it('renders with default size correctly', () => {
    const futureDate = new Date('2025-07-27T14:06:13Z'); // 31 days in the future
    const { container } = render(<CountdownTimer targetDate={futureDate} />);    // Get all countdown items
    const countdownItems = container.querySelectorAll('.flex.flex-col.items-center.animate-pulse');

    // Check each item has the correct value
    expect(within(countdownItems[0] as HTMLElement).getByText('61')).toBeInTheDocument(); // days
    expect(within(countdownItems[1] as HTMLElement).getByText('2')).toBeInTheDocument(); // hours
    expect(within(countdownItems[2] as HTMLElement).getByText('6')).toBeInTheDocument(); // minutes
    expect(within(countdownItems[3] as HTMLElement).getByText('13')).toBeInTheDocument(); // seconds

    // Check labels are rendered
    expect(within(countdownItems[0] as HTMLElement).getByText('Days')).toBeInTheDocument();
    expect(within(countdownItems[1] as HTMLElement).getByText('Hours')).toBeInTheDocument();
    expect(within(countdownItems[2] as HTMLElement).getByText('Minutes')).toBeInTheDocument();
    expect(within(countdownItems[3] as HTMLElement).getByText('Seconds')).toBeInTheDocument();

    // Check main container has the correct scale class for default size
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.className).toContain('scale-100');
  });

  it('renders with small size correctly', () => {
    const futureDate = new Date('2025-06-27T12:00:00Z');
    const { container } = render(<CountdownTimer targetDate={futureDate} size="sm" />);

    // Check main container has the small scale class
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.className).toContain('scale-75');
  });

  it('renders with large size correctly', () => {
    const futureDate = new Date('2025-06-27T12:00:00Z');
    const { container } = render(<CountdownTimer targetDate={futureDate} size="lg" />);

    // Check main container has the large scale class
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.className).toContain('scale-110');
  });

  it('calculates time difference correctly', () => {
    // Test for various scenarios
    const testCases = [
      {
        futureDate: new Date('2025-05-27T12:00:31Z'),
        expected: { days: 0, hours: 0, minutes: 0, seconds: 31 }
      },
      {
        futureDate: new Date('2025-05-27T13:30:00Z'),
        expected: { days: 0, hours: 1, minutes: 30, seconds: 0 }
      },
      {
        futureDate: new Date('2025-06-27T12:00:00Z'),
        expected: { days: 31, hours: 0, minutes: 0, seconds: 0 }
      }
    ];

    for (const { futureDate, expected } of testCases) {
      cleanup();
      const { container } = render(<CountdownTimer targetDate={futureDate} />);      // Get all countdown items
      const countdownItems = container.querySelectorAll('.flex.flex-col.items-center.animate-pulse');

      // Check each item has the correct value
      expect(within(countdownItems[0] as HTMLElement).getByText(expected.days.toString())).toBeInTheDocument();
      expect(within(countdownItems[1] as HTMLElement).getByText(expected.hours.toString())).toBeInTheDocument();
      expect(within(countdownItems[2] as HTMLElement).getByText(expected.minutes.toString())).toBeInTheDocument();
      expect(within(countdownItems[3] as HTMLElement).getByText(expected.seconds.toString())).toBeInTheDocument();
    }
  });

  it('handles past dates correctly', () => {
    const pastDate = new Date('2025-04-27T12:00:00Z'); // 30 days in the past
    const { container } = render(<CountdownTimer targetDate={pastDate} />);    // Get all countdown items
    const countdownItems = container.querySelectorAll('.flex.flex-col.items-center.animate-pulse');

    // Check each item has the correct value
    expect(within(countdownItems[0] as HTMLElement).getByText('30')).toBeInTheDocument(); // days
    expect(within(countdownItems[1] as HTMLElement).getByText('0')).toBeInTheDocument(); // hours
    expect(within(countdownItems[2] as HTMLElement).getByText('0')).toBeInTheDocument(); // minutes
    expect(within(countdownItems[3] as HTMLElement).getByText('0')).toBeInTheDocument(); // seconds
  });

  it('updates time every second', () => {
    // Create a future date for the countdown
    const futureDate = new Date('2025-05-27T12:00:10Z'); // 10 seconds in the future

    const { container } = render(<CountdownTimer targetDate={futureDate} />);    // Get all countdown items
    let countdownItems = container.querySelectorAll('.flex.flex-col.items-center.animate-pulse');
    expect(within(countdownItems[3] as HTMLElement).getByText('10')).toBeInTheDocument(); // Initial 10 seconds

    // Advance time by 1 second and update component
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    countdownItems = container.querySelectorAll('.flex.flex-col.items-center.animate-pulse');
    expect(within(countdownItems[3] as HTMLElement).getByText('9')).toBeInTheDocument(); // 9 seconds after 1 second passed

    // Advance time by another 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    countdownItems = container.querySelectorAll('.flex.flex-col.items-center.animate-pulse');
    expect(within(countdownItems[3] as HTMLElement).getByText('4')).toBeInTheDocument(); // 4 seconds after 6 seconds passed
  });

  it('clears interval on unmount', () => {
    // Spy on clearInterval
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

    const futureDate = new Date('2025-06-27T12:00:00Z');
    const { unmount } = render(<CountdownTimer targetDate={futureDate} />);

    // Unmount the component
    unmount();

    // Check if clearInterval was called
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('applies correct CSS classes based on size prop', () => {
    const futureDate = new Date('2025-06-27T12:00:00Z');

    // Test small size
    const { rerender, container } = render(
      <CountdownTimer targetDate={futureDate} size="sm" />
    );

    // Get the main container for small size
    const smallMainDiv = container.firstChild as HTMLElement;
    expect(smallMainDiv.className).toContain('scale-75');

    // Test default (medium) size
    rerender(<CountdownTimer targetDate={futureDate} />);
    const mediumMainDiv = container.firstChild as HTMLElement;
    expect(mediumMainDiv.className).toContain('scale-100');

    // Test large size
    rerender(<CountdownTimer targetDate={futureDate} size="lg" />);
    const largeMainDiv = container.firstChild as HTMLElement;
    expect(largeMainDiv.className).toContain('scale-110');
  });
});
