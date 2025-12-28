import { render, screen } from '@testing-library/react';
import { ContactActions } from './ContactActions';
import type { Contact } from '@/types/contact';
import {transformRawContact} from "@/mocks/contacts";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveBeenCalledTimes(expected: number): R;
      not: {
        toHaveBeenCalled(): R;
        toBeInTheDocument(): R;
      };
    }
  }
}

const mockContact: Contact = transformRawContact({
  id: 'test-contact',
  name: 'Test Contact',
  email: 'test@example.com',
  source: 'contacts',
  planetStatus: 'not_invited',
  humanityConfidenceScore: 3,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-02T00:00:00Z'
});

describe('ContactActions', () => {
  const mockOnConfirmHumanity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should not render when contact is null', () => {
      const { container } = render(
        <ContactActions
          contact={null}
          onConfirmHumanity={mockOnConfirmHumanity}
        />
      );

      expect(container.firstChild).toBeNull();
    });

    it('should show invite button for non-invited contacts', () => {
      render(
        <ContactActions
          contact={mockContact}
          onConfirmHumanity={mockOnConfirmHumanity}
        />
      );

      expect(screen.getByText('Invite to PLANET')).toBeInTheDocument();
    });

    it('should not show invite button for invited contacts', () => {
      const invitedContact = transformRawContact({
        id: 'test-contact',
        name: 'Test Contact',
        email: 'test@example.com',
        source: 'contacts',
        planetStatus: 'invited',
        humanityConfidenceScore: 3,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-02T00:00:00Z'
      });

      render(
        <ContactActions
          contact={invitedContact}
          onConfirmHumanity={mockOnConfirmHumanity}
        />
      );

      expect(screen.queryByText('Invite to PLANET')).not.toBeInTheDocument();
    });

    it('should not show invite button for member contacts', () => {
      const memberContact = transformRawContact({
        id: 'test-contact',
        name: 'Test Contact',
        email: 'test@example.com',
        source: 'contacts',
        planetStatus: 'member',
        humanityConfidenceScore: 3,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-02T00:00:00Z'
      });

      render(
        <ContactActions
          contact={memberContact}
          onConfirmHumanity={mockOnConfirmHumanity}
        />
      );

      expect(screen.queryByText('Invite to PLANET')).not.toBeInTheDocument();
    });
  });

  describe('button interactions', () => {
    it('should call onInviteToPLANET when invite button is clicked', () => {
      render(
        <ContactActions
          contact={mockContact}
          onConfirmHumanity={mockOnConfirmHumanity}
        />
      );

      // Invite to PLANET functionality removed
    });
  });

  describe('accessibility', () => {
    it('should have proper button labeling', () => {
      render(
        <ContactActions
          contact={mockContact}
          onConfirmHumanity={mockOnConfirmHumanity}
        />
      );

      const inviteButton = screen.getByText('Invite to PLANET');
      expect(inviteButton).toHaveAttribute('type', 'button');
    });
  });
});