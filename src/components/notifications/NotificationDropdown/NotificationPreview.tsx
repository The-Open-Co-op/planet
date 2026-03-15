import { forwardRef } from 'react';
import {
  Box,
  Typography,
  List,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import { 
  MarkEmailRead,
  VerifiedUser,
  Group,
  Message,
  Settings,
  Notifications,
} from '@mui/icons-material';
import type { Notification, NotificationSummary } from '@/types/notification';
import { NotificationItem } from '../NotificationItem/NotificationItem';

export interface NotificationPreviewProps {
  notifications: Notification[];
  summary: NotificationSummary;
  filter: 'all' | 'pending' | 'unread';
  onMarkAllAsRead: () => void;
  onFilterChange: (filter: 'all' | 'pending' | 'unread') => void;
}

export const NotificationPreview = forwardRef<HTMLDivElement, NotificationPreviewProps>(
  ({ 
    notifications,
    summary,
    filter,
    onMarkAllAsRead,
    onFilterChange,
  }, ref) => {
    const filteredNotifications = notifications.filter(notification => {
      switch (filter) {
        case 'pending':
          return notification.status === 'pending' && notification.isActionable;
        case 'unread':
          return !notification.isRead;
        default:
          return true;
      }
    });

    const getFilterChipColor = (filterType: string) => {
      return filter === filterType ? 'primary' : 'default';
    };

    const getNotificationIcon = (type: string) => {
      switch (type) {
        case 'vouch':
          return <VerifiedUser sx={{ fontSize: 20, color: 'primary.main' }} />;
        case 'connection':
          return <Group sx={{ fontSize: 20, color: 'info.main' }} />;
        case 'message':
          return <Message sx={{ fontSize: 20, color: 'info.main' }} />;
        case 'system':
          return <Settings sx={{ fontSize: 20, color: 'warning.main' }} />;
        default:
          return <Notifications sx={{ fontSize: 20 }} />;
      }
    };

    return (
      <Box ref={ref}>
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
            {summary.unread > 0 && (
              <Button
                size="small"
                startIcon={<MarkEmailRead />}
                onClick={onMarkAllAsRead}
                sx={{ textTransform: 'none' }}
              >
                Mark all read
              </Button>
            )}
          </Box>

          {/* Summary Stats */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip
              size="small"
              label={`${summary.total} Total`}
              sx={{ fontSize: '0.75rem' }}
            />
            {summary.unread > 0 && (
              <Chip
                size="small"
                label={`${summary.unread} Unread`}
                color="error"
                sx={{ fontSize: '0.75rem' }}
              />
            )}
            {summary.pending > 0 && (
              <Chip
                size="small"
                label={`${summary.pending} Pending`}
                color="warning"
                sx={{ fontSize: '0.75rem' }}
              />
            )}
          </Box>

          {/* Filter Chips */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              size="small"
              label="All"
              onClick={() => onFilterChange('all')}
              color={getFilterChipColor('all')}
              variant={filter === 'all' ? 'filled' : 'outlined'}
              sx={{ fontSize: '0.75rem', cursor: 'pointer' }}
            />
            <Chip
              size="small"
              label="Pending"
              onClick={() => onFilterChange('pending')}
              color={getFilterChipColor('pending')}
              variant={filter === 'pending' ? 'filled' : 'outlined'}
              sx={{ fontSize: '0.75rem', cursor: 'pointer' }}
            />
            <Chip
              size="small"
              label="Unread"
              onClick={() => onFilterChange('unread')}
              color={getFilterChipColor('unread')}
              variant={filter === 'unread' ? 'filled' : 'outlined'}
              sx={{ fontSize: '0.75rem', cursor: 'pointer' }}
            />
          </Box>
        </Box>

        {/* Notification List */}
        <Box sx={{ maxHeight: 400, overflow: 'auto', overflowX: 'hidden' }}>
          {filteredNotifications.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {filter === 'all' 
                  ? 'No notifications yet'
                  : filter === 'pending'
                  ? 'No pending notifications'
                  : 'No unread notifications'
                }
              </Typography>
            </Box>
          ) : (
            <List sx={{ p: 0 }}>
              {filteredNotifications.map((notification, index) => (
                <Box key={notification.id}>
                  <NotificationItem
                    notification={notification}
                    onClick={() => {}}
                    getNotificationIcon={getNotificationIcon}
                  />
                  {index < filteredNotifications.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
        </Box>
      </Box>
    );
  }
);

NotificationPreview.displayName = 'NotificationPreview';