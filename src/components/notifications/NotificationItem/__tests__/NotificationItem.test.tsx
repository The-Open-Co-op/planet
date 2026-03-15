import { render, screen } from '@testing-library/react';
import { NotificationItem } from '../NotificationItem';
import type { Notification } from '@/types/notification';
import React from 'react';
import { VerifiedUser } from '@mui/icons-material';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
    }
  }
}

const mockNotification: Notification = {
  id: 'notif-1',
  type: 'vouch',
  title: 'New vouch from John',
  message: 'John vouched for your professional skills',
  fromUserName: 'John Doe',
  fromUserAvatar: '/john.jpg',
  targetUserId: 'current-user',
  isRead: false,
  isActionable: true,
  status: 'pending',
  createdAt: new Date('2024-01-01T10:00:00.000Z'),
  updatedAt: new Date('2024-01-01T10:00:00.000Z'),
  metadata: { vouchId: 'vouch-123' }
};

const getNotificationIcon = (type: string): React.ReactNode => {
  switch (type) {
    case 'vouch':
      return <VerifiedUser data-testid="VerifiedUserIcon" />;
    default:
      return null;
  }
};

const defaultProps = {
  notification: mockNotification,
  onClick: jest.fn(),
  getNotificationIcon,
};

describe('NotificationItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders notification content', () => {
    render(<NotificationItem {...defaultProps} />);
    expect(screen.getByText('John vouched for your professional skills')).toBeInTheDocument();
  });

  it('renders user avatar with fallback', () => {
    render(<NotificationItem {...defaultProps} />);
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
  });

  it('renders user avatar with initials when no image', () => {
    const notificationWithoutAvatar = {
      ...mockNotification,
      fromUserAvatar: undefined
    };
    render(<NotificationItem {...defaultProps} notification={notificationWithoutAvatar} />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('shows vouch icon for vouch notifications', () => {
    render(<NotificationItem {...defaultProps} />);
    expect(screen.getByTestId('VerifiedUserIcon')).toBeInTheDocument();
  });

  it('renders status text correctly', () => {
    render(<NotificationItem {...defaultProps} />);
    // For pending actionable notifications, we show Accept/Reject buttons instead of status text
    expect(screen.getByText('Accept')).toBeInTheDocument();
    expect(screen.getByText('Reject')).toBeInTheDocument();
  });

  it('renders accepted status', () => {
    const acceptedNotification = {
      ...mockNotification,
      status: 'accepted' as const,
      isActionable: false
    };
    render(<NotificationItem {...defaultProps} notification={acceptedNotification} />);
    expect(screen.getByText('accepted')).toBeInTheDocument();
  });

  it('renders rejected status', () => {
    const rejectedNotification = {
      ...mockNotification,
      status: 'rejected' as const,
      isActionable: false
    };
    render(<NotificationItem {...defaultProps} notification={rejectedNotification} />);
    expect(screen.getByText('rejected')).toBeInTheDocument();
  });

  it('renders completed status', () => {
    const completedNotification = {
      ...mockNotification,
      status: 'completed' as const,
      isActionable: false
    };
    render(<NotificationItem {...defaultProps} notification={completedNotification} />);
    expect(screen.getByText('completed')).toBeInTheDocument();
  });

  it('renders notification actions for pending actionable notifications', () => {
    render(<NotificationItem {...defaultProps} />);
    expect(screen.getByText('Accept')).toBeInTheDocument();
    expect(screen.getByText('Reject')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    render(<NotificationItem {...defaultProps} />);
    const card = screen.getByRole('button', { hidden: true });
    card.click();
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick for pending connection requests', () => {
    const connectionNotification = {
      ...mockNotification,
      type: 'connection' as const,
      status: 'pending' as const
    };
    const { container } = render(<NotificationItem {...defaultProps} notification={connectionNotification} />);
    const card = container.querySelector('.MuiCard-root');
    expect(card).toBeInTheDocument();
    if (card && card instanceof HTMLElement) {
      card.click();
    }
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it('handles notifications without titles gracefully', () => {
    const notificationWithoutTitle = {
      ...mockNotification,
      title: ''
    };
    render(<NotificationItem {...defaultProps} notification={notificationWithoutTitle} />);
    expect(screen.getByText('John vouched for your professional skills')).toBeInTheDocument();
  });

  it('displays formatted date', () => {
    render(<NotificationItem {...defaultProps} />);
    expect(screen.getByText('1 Jan')).toBeInTheDocument();
  });
});
