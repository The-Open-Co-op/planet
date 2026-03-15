import { useState, useEffect, forwardRef } from 'react';
import {
  Typography,
  Box,
} from '@mui/material';
import { StandardPage } from '@/components/layout/StandardPage';
import { notificationService } from '@/services/notificationService';
import type { Notification, NotificationSummary } from '@/types/notification';
import { NotificationsList } from './NotificationsList';

export interface NotificationsPageProps {
  className?: string;
}

export const NotificationsPage = forwardRef<HTMLDivElement, NotificationsPageProps>(
  ({ className }, ref) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [notificationSummary, setNotificationSummary] = useState<NotificationSummary>({
      total: 0,
      unread: 0,
      pending: 0,
      byType: { vouch: 0, connection: 0, system: 0 }
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const loadNotifications = async () => {
        setIsLoading(true);
        try {
          const [notificationData, summaryData] = await Promise.all([
            notificationService.getNotifications('current-user'),
            notificationService.getNotificationSummary('current-user')
          ]);
          const sorted = [...notificationData].sort((a, b) => {
            // Unread first, then by date descending
            if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
            return b.createdAt.getTime() - a.createdAt.getTime();
          });
          setNotifications(sorted);
          setNotificationSummary(summaryData);
        } catch (error) {
          console.error('Failed to load notifications:', error);
        } finally {
          setIsLoading(false);
        }
      };

      loadNotifications();
    }, []);

    const handleMarkAsRead = async (notificationId: string) => {
      try {
        await notificationService.markAsRead(notificationId);
        setNotifications(prev =>
          prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
        );
        setNotificationSummary(prev => ({
          ...prev,
          unread: Math.max(0, prev.unread - 1)
        }));

        // Dispatch custom event to update notification counter
        window.dispatchEvent(new CustomEvent('notifications-updated'));
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    };


    const handleAcceptVouch = async (notificationId: string, rCardIds?: string[]) => {
      try {
        // Find the notification to check if it was unread
        const notification = notifications.find(n => n.id === notificationId);
        const wasUnread = notification && !notification.isRead;

        await notificationService.acceptVouch(notificationId, rCardIds);
        setNotifications(prev =>
          prev.map(n => n.id === notificationId ? {
            ...n,
            status: 'accepted',
            isActionable: false,
            isRead: true,
            metadata: { ...n.metadata, rCardIds }
          } : n)
        );
        setNotificationSummary(prev => ({
          ...prev,
          pending: Math.max(0, prev.pending - 1),
          unread: wasUnread ? Math.max(0, prev.unread - 1) : prev.unread
        }));

        // Dispatch custom event to update notification counter
        window.dispatchEvent(new CustomEvent('notifications-updated'));
      } catch (error) {
        console.error('Failed to accept vouch:', error);
      }
    };

    const handleRejectVouch = async (notificationId: string) => {
      try {
        await notificationService.rejectVouch(notificationId);
        setNotifications(prev =>
          prev.map(n => n.id === notificationId ? { ...n, status: 'rejected', isActionable: false } : n)
        );
        setNotificationSummary(prev => ({
          ...prev,
          pending: Math.max(0, prev.pending - 1),
          unread: Math.max(0, prev.unread - 1)
        }));

        // Dispatch custom event to update notification counter
        window.dispatchEvent(new CustomEvent('notifications-updated'));
      } catch (error) {
        console.error('Failed to reject vouch:', error);
      }
    };

    const handleAcceptConnection = async (notificationId: string, selectedRCardId: string) => {
      try {
        await notificationService.acceptConnection(notificationId, selectedRCardId);
        setNotifications(prev =>
          prev.map(n => n.id === notificationId ? { ...n, status: 'accepted', isActionable: false } : n)
        );
        setNotificationSummary(prev => ({
          ...prev,
          pending: Math.max(0, prev.pending - 1),
          unread: Math.max(0, prev.unread - 1)
        }));

        // Dispatch custom event to update notification counter
        window.dispatchEvent(new CustomEvent('notifications-updated'));
      } catch (error) {
        console.error('Failed to accept connection:', error);
      }
    };

    const handleRejectConnection = async (notificationId: string) => {
      try {
        await notificationService.rejectConnection(notificationId);
        setNotifications(prev =>
          prev.map(n => n.id === notificationId ? { ...n, status: 'rejected', isActionable: false } : n)
        );
        setNotificationSummary(prev => ({
          ...prev,
          pending: Math.max(0, prev.pending - 1),
          unread: Math.max(0, prev.unread - 1)
        }));

        // Dispatch custom event to update notification counter
        window.dispatchEvent(new CustomEvent('notifications-updated'));
      } catch (error) {
        console.error('Failed to reject connection:', error);
      }
    };

    return (
      <StandardPage
        title="Alerts"
        actions={notificationSummary.unread > 0 ? (
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {notificationSummary.unread} new
          </Typography>
        ) : undefined}
      >
        <Box ref={ref} className={className}>

        {/* Notifications List */}
        <Box sx={{
          width: '100%',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>
          <Box sx={{ p: { xs: 0, md: 0 } }}>
            <NotificationsList
              notifications={notifications}
              isLoading={isLoading}
              onMarkAsRead={handleMarkAsRead}
              onAcceptVouch={handleAcceptVouch}
              onRejectVouch={handleRejectVouch}
              onAcceptConnection={handleAcceptConnection}
              onRejectConnection={handleRejectConnection}
            />
          </Box>
        </Box>
        </Box>
      </StandardPage>
    );
  }
);

NotificationsPage.displayName = 'NotificationsPage';
