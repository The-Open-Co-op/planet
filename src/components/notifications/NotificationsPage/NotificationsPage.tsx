import { useState, useEffect, forwardRef } from 'react';
import {
  Typography,
  Box,
  Button,
} from '@mui/material';
import { MarkEmailRead } from '@mui/icons-material';
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
      byType: { vouch: 0, praise: 0, connection: 0, group_invite: 0, message: 0, system: 0 }
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
          setNotifications(notificationData);
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

    const handleMarkAllAsRead = async () => {
      try {
        await notificationService.markAllAsRead('current-user');
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        setNotificationSummary(prev => ({ ...prev, unread: 0 }));
        
        // Dispatch custom event to update notification counter
        window.dispatchEvent(new CustomEvent('notifications-updated'));
      } catch (error) {
        console.error('Failed to mark all notifications as read:', error);
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

    const handleAcceptPraise = async (notificationId: string, rCardIds?: string[]) => {
      try {
        await notificationService.acceptPraise(notificationId, rCardIds);
        setNotifications(prev => 
          prev.map(n => n.id === notificationId ? { 
            ...n, 
            status: 'accepted', 
            isActionable: false,
            metadata: { ...n.metadata, rCardIds }
          } : n)
        );
        setNotificationSummary(prev => ({
          ...prev,
          pending: Math.max(0, prev.pending - 1),
          unread: Math.max(0, prev.unread - 1)
        }));
        
        // Dispatch custom event to update notification counter
        window.dispatchEvent(new CustomEvent('notifications-updated'));
      } catch (error) {
        console.error('Failed to accept praise:', error);
      }
    };

    const handleRejectPraise = async (notificationId: string) => {
      try {
        await notificationService.rejectPraise(notificationId);
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
        console.error('Failed to reject praise:', error);
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
          <Button
            variant="outlined"
            startIcon={<MarkEmailRead />}
            onClick={handleMarkAllAsRead}
          >
            Mark All Read
          </Button>
        ) : undefined}
      >
        <Box ref={ref} className={className}>
          {notificationSummary.unread > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              You have {notificationSummary.unread} unread notification{notificationSummary.unread !== 1 ? 's' : ''}
            </Typography>
          )}

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
              onAcceptPraise={handleAcceptPraise}
              onRejectPraise={handleRejectPraise}
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