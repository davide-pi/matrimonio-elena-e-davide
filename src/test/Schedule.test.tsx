import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Schedule from '../components/Schedule';
import { EVENT_DATE, SCHEDULE } from '../config/WeddingInfo';

// Mock translation strings
const mockTranslation: Record<string, string> = {
  'schedule.funnyPhrase.firstLine': 'Il programma della giornata è top secret… sarà rivelato solo il giorno stesso!',
  'schedule.funnyPhrase.secondLine': 'Un po\' di suspense rende tutto più romantico, no?',
  'schedule.1630': 'Inizio cerimonia',
  'schedule.1630.desc': 'Inizio della cerimonia presso l\'agriturismo.',
  'schedule.1730': 'Aperitivo',
  'schedule.1730.desc': 'Aperitivo a buffet in giardino.',
  'schedule.1900': 'Cena',
  'schedule.1900.desc': 'Cena conviviale con piatti tipici.',
  'schedule.2200': 'Taglio della torta',
  'schedule.2200.desc': 'Il momento più dolce della serata!',
  'schedule.2230': 'Festa & Balli',
  'schedule.2230.desc': 'Musica, balli e divertimento fino a tardi.',
};

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTranslation[key] || key,
  }),
}));

describe('Schedule Component', () => {
  beforeEach(() => {
    // Reset the mocked Date
    vi.useRealTimers();
  });

  it('shows funny phrase when not yet event day', () => {
    // Set current time to before the visibility window
    const visibilityThreshold = new Date(EVENT_DATE);
    visibilityThreshold.setMinutes(visibilityThreshold.getMinutes() - SCHEDULE.visibilityBeforeEventDateInMinutes);

    // Set current time to 1 hour before the visibility threshold
    const beforeEventTime = new Date(visibilityThreshold);
    beforeEventTime.setHours(beforeEventTime.getHours() - 1);

    vi.useFakeTimers();
    vi.setSystemTime(beforeEventTime);

    render(<Schedule />);

    // Check funny phrases are displayed
    expect(screen.getByText('Il programma della giornata è top secret… sarà rivelato solo il giorno stesso!')).toBeInTheDocument();
    expect(screen.getByText('Un po\' di suspense rende tutto più romantico, no?')).toBeInTheDocument();

    // Check schedule items are not displayed
    expect(screen.queryByText('Inizio cerimonia')).not.toBeInTheDocument();
  });

  it('shows schedule when it is event day', () => {
    // Set current time to after the visibility window
    const visibilityThreshold = new Date(EVENT_DATE);
    visibilityThreshold.setMinutes(visibilityThreshold.getMinutes() - SCHEDULE.visibilityBeforeEventDateInMinutes);

    // Set current time to 1 hour after the visibility threshold
    const duringEventTime = new Date(visibilityThreshold);
    duringEventTime.setHours(duringEventTime.getHours() + 1);

    vi.useFakeTimers();
    vi.setSystemTime(duringEventTime);

    render(<Schedule />);

    // Check schedule items are displayed
    expect(screen.getByText('Inizio cerimonia')).toBeInTheDocument();
    expect(screen.getByText('Aperitivo')).toBeInTheDocument();
    expect(screen.getByText('Cena')).toBeInTheDocument();
    expect(screen.getByText('Taglio della torta')).toBeInTheDocument();
    expect(screen.getByText('Festa & Balli')).toBeInTheDocument();

    // Check descriptions are displayed
    expect(screen.getByText('Inizio della cerimonia presso l\'agriturismo.')).toBeInTheDocument();
  });

  it('marks past events as "greyed out"', () => {
    // Set current time to after one of the schedule items
    const eventTime = new Date(EVENT_DATE);
    eventTime.setHours(18, 30, 0); // 18:30, which is after the first two events (16:30 and 17:30)

    vi.useFakeTimers();
    vi.setSystemTime(eventTime);

    const { container } = render(<Schedule />);

    // Get all list items
    const listItems = container.querySelectorAll('li');

    // The first two items (16:30 and 17:30) should have the opacity-60 class
    expect(listItems[0]).toHaveClass('opacity-60');
    expect(listItems[0]).toHaveClass('grayscale');
    expect(listItems[1]).toHaveClass('opacity-60');
    expect(listItems[1]).toHaveClass('grayscale');

    // The remaining items should not have these classes
    expect(listItems[2]).not.toHaveClass('opacity-60');
    expect(listItems[2]).not.toHaveClass('grayscale');
  });

  it('properly formats the schedule times', () => {
    // Set current time to visibility threshold to display schedule
    const visibilityThreshold = new Date(EVENT_DATE);
    visibilityThreshold.setMinutes(visibilityThreshold.getMinutes() - SCHEDULE.visibilityBeforeEventDateInMinutes);

    vi.useFakeTimers();
    vi.setSystemTime(visibilityThreshold);

    render(<Schedule />);

    // Check if the times are displayed correctly
    SCHEDULE.items.forEach(item => {
      expect(screen.getByText(item.time)).toBeInTheDocument();
    });
  });

  it('applies proper styling to elements', () => {
    // Set current time to visibility threshold to display schedule
    const visibilityThreshold = new Date(EVENT_DATE);
    visibilityThreshold.setMinutes(visibilityThreshold.getMinutes() - SCHEDULE.visibilityBeforeEventDateInMinutes);

    vi.useFakeTimers();
    vi.setSystemTime(visibilityThreshold);

    const { container } = render(<Schedule />);

    // Check main container styling
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('bg-beige-50/25');
    expect(mainContainer).toHaveClass('rounded-xl');
    expect(mainContainer).toHaveClass('shadow-md');

    // Check for timeline border
    const timeline = container.querySelector('ol');
    expect(timeline).toHaveClass('border-l');
    expect(timeline).toHaveClass('border-sage-200');

    // Check for sparkle icons in each event
    const sparkles = container.querySelectorAll('.text-sage-500');
    expect(sparkles.length).toBe(SCHEDULE.items.length);
  });
});
