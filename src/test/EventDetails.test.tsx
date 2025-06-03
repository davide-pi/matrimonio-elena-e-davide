import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import EventDetails from '../components/EventDetails';

// Mock modules before importing components that use them
vi.mock('add-to-calendar-button', () => ({
  atcb_action: vi.fn(),
}));

// Mock translation data
const mockTranslation: Record<string, string> = {
  'details.date': 'Data',
  'app.date': '20 Settembre 2025',
  'details.time': 'Orario',
  'details.ceremony.line1': 'Cerimonia e ricevimento',
  'details.ceremony.line2': 'avranno luogo alle ore 16:30',
  'details.location': 'Luogo',
  'details.venue': 'Agriturismo "La Rondanina"',
  'details.address': 'Via Sandrone 231',
  'details.city': 'Castelnuovo Fogliani (PC)',
  'details.viewMap': 'Visualizza su Google Maps',
  'details.addToCalendar': 'Aggiungi al calendario',
  'calendar.name': 'Matrimonio Elena e Davide',
  'calendar.description': 'Cerimonia e festeggiamenti presso L\'Agriturismo "La Rondanina".\n\nPer indicazioni: https://maps.app.goo.gl/dXv5HdSq86oLbJQo8',
  'calendar.location': 'Agriturismo La Rondina, Via Sandrone, 231, Castelnuovo Fogliani PC'
};

// Mock the useTranslation hook
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTranslation[key] || key,
  }),
}));

describe('EventDetails Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders event date information correctly', () => {
    render(<EventDetails />);

    // Check if date section is rendered
    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('20 Settembre 2025')).toBeInTheDocument();
  });

  it('renders event time information correctly', () => {
    render(<EventDetails />);

    // Check if time section is rendered
    expect(screen.getByText('Orario')).toBeInTheDocument();
    expect(screen.getByText('Cerimonia e ricevimento')).toBeInTheDocument();
    expect(screen.getByText('avranno luogo alle ore 16:30')).toBeInTheDocument();
  });

  it('renders location information correctly', () => {
    render(<EventDetails />);

    // Check if location section is rendered
    expect(screen.getByText('Luogo')).toBeInTheDocument();
    expect(screen.getByText('Agriturismo "La Rondanina"')).toBeInTheDocument();
    expect(screen.getByText('Via Sandrone, 231')).toBeInTheDocument();
    expect(screen.getByText('Castelnuovo Fogliani (PC)')).toBeInTheDocument();
  });

  it('renders Google Maps link correctly', () => {
    render(<EventDetails />);

    // Check if the Google Maps link is correct
    const mapLink = screen.getByText('Visualizza su Google Maps');
    expect(mapLink).toBeInTheDocument();
    expect(mapLink).toHaveAttribute('href', 'https://maps.app.goo.gl/dXv5HdSq86oLbJQo8');
    expect(mapLink).toHaveAttribute('target', '_blank');
    expect(mapLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Google Maps iframe correctly', () => {
    render(<EventDetails />);

    // Check if the Google Maps iframe is rendered
    const iframe = screen.getByTitle('Agriturismo "La Rondanina"');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('google.com/maps/embed'));
  });

  it('renders Add to Calendar button', () => {
    render(<EventDetails />);

    // Check if the Add to Calendar button is rendered
    const calendarButton = screen.getByText('Aggiungi al calendario');
    expect(calendarButton).toBeInTheDocument();
  });  it('renders a button that would call calendar action', () => {
    render(<EventDetails />);

    // Just verify the button is there with the correct text
    const calendarButton = screen.getByText('Aggiungi al calendario');
    expect(calendarButton).toBeInTheDocument();
    expect(calendarButton.tagName.toLowerCase()).toBe('button');
    expect(calendarButton).toHaveAttribute('type', 'button');
  });

  it('renders all calendar related elements and icons correctly', () => {
    render(<EventDetails />);

    // Check for the presence of icons
    const icons = document.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThanOrEqual(4); // Calendar, Clock, MapPin, and CalendarPlus2

    // Check for the main calendar button in the bottom
    const calendarButton = screen.getByRole('button', { name: /aggiungi al calendario/i });
    expect(calendarButton).toBeInTheDocument();
    expect(calendarButton).toHaveClass('bg-white/75');
  });

  it('renders component with correct layout structure', () => {
    const { container } = render(<EventDetails />);

    // Check for two-column grid on larger screens
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('md:grid-cols-2');

    // Check for the main container with proper styling
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('bg-beige-50/25');
    expect(mainContainer).toHaveClass('rounded-xl');
    expect(mainContainer).toHaveClass('shadow-md');
  });
});
