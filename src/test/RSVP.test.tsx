import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RSVP from '../components/RSVP';
import { BRIDE, GROOM } from '../config/WeddingInfo';

// Mock the translations
const mockTranslation: Record<string, string> = {
  'rsvp.deadline.line1': 'Saremo felici di condividere questo giorno speciale con voi.',
  'rsvp.deadline.line2': 'Vi preghiamo di confermare la vostra partecipazione entro il',
  'rsvp.deadlineDate': '31 Agosto 2025',
  'rsvp.contact': 'Contattateci per tutti i dettagli',
  'rsvp.dietary': 'Nel confermare la vostra presenza, vi preghiamo di comunicarci eventuali allergie o intolleranze alimentari.'
};

// Mock SpouseContactCard component
vi.mock('../components/SpouseContactCard', () => ({
  default: ({ name, formattedPhone }: { name: string; formattedPhone: string }) => (
    <div data-testid={`spouse-card-${name}`}>
      <span>{name}</span>
      <span>{formattedPhone}</span>
    </div>
  )
}));

// Mock the useTranslation hook
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => mockTranslation[key] || key,
  }),
}));

describe('RSVP Component', () => {
  it('renders the RSVP section correctly', () => {
    render(<RSVP />);

    // Check if the component renders the main texts
    expect(screen.getByText('Saremo felici di condividere questo giorno speciale con voi.')).toBeInTheDocument();
    expect(screen.getByText('Vi preghiamo di confermare la vostra partecipazione entro il')).toBeInTheDocument();
    expect(screen.getByText('31 Agosto 2025')).toBeInTheDocument();
    expect(screen.getByText('Contattateci per tutti i dettagli')).toBeInTheDocument();
    expect(screen.getByText('Nel confermare la vostra presenza, vi preghiamo di comunicarci eventuali allergie o intolleranze alimentari.')).toBeInTheDocument();
  });

  it('renders the Calendar icon', () => {
    render(<RSVP />);

    // Check if the calendar icon is rendered
    const calendarIcon = document.querySelector('svg');
    expect(calendarIcon).toBeInTheDocument();
  });

  it('renders spouse contact cards for both bride and groom', () => {
    render(<RSVP />);

    // Check if both spouse cards are rendered
    expect(screen.getByTestId(`spouse-card-${BRIDE.name}`)).toBeInTheDocument();
    expect(screen.getByTestId(`spouse-card-${GROOM.name}`)).toBeInTheDocument();
  });

  it('passes correct props to SpouseContactCard components', () => {
    render(<RSVP />);

    // Check if bride's contact card contains correct information
    const brideCard = screen.getByTestId(`spouse-card-${BRIDE.name}`);
    expect(brideCard).toHaveTextContent(BRIDE.name);
    expect(brideCard).toHaveTextContent(BRIDE.formattedPhone);

    // Check if groom's contact card contains correct information
    const groomCard = screen.getByTestId(`spouse-card-${GROOM.name}`);
    expect(groomCard).toHaveTextContent(GROOM.name);
    expect(groomCard).toHaveTextContent(GROOM.formattedPhone);
  });

  it('has the correct responsive layout', () => {
    const { container } = render(<RSVP />);

    // Check for the main container with proper styling
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('bg-beige-50/25');
    expect(mainContainer).toHaveClass('rounded-xl');
    expect(mainContainer).toHaveClass('shadow-md');

    // Check for the grid container for spouse cards
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('md:grid-cols-2');
  });
});
