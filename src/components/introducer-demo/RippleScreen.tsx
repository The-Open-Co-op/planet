import { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Card, CardContent, alpha, useTheme } from '@mui/material';
import { Waves, VerifiedUser, Group } from '@mui/icons-material';
import { notificationService } from '@/services/notificationService';
import type { Notification } from '@/types/notification';
import { StandardPage } from '@/components/layout/StandardPage';
import { personas } from './mockData';
import { DemoNav } from './DemoNav';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'vouch': return <VerifiedUser sx={{ fontSize: 18, color: '#0066CC' }} />;
    case 'connection': return <Group sx={{ fontSize: 18, color: '#059669' }} />;
    default: return null;
  }
};

const RealNotificationCard = ({ notification }: { notification: Notification }) => {
  const theme = useTheme();
  return (
    <Card sx={{
      border: 1,
      borderColor: notification.type === 'vouch' ? '#0066CC' : notification.type === 'connection' ? '#059669' : 'divider',
      backgroundColor: notification.isRead ? 'background.paper' : alpha(theme.palette.primary.main, 0.02),
      position: 'relative',
    }}>
      <CardContent sx={{ p: '8px 12px', '&:last-child': { pb: 1.5 } }}>
        <Box sx={{ position: 'absolute', top: 8, right: 12, opacity: 0.5 }}>
          {getNotificationIcon(notification.type)}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, pr: 4 }}>
          <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
            {notification.fromUserName?.charAt(0)}
          </Avatar>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {notification.fromUserName}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mb: 0.5, pr: 4 }}>
          {notification.message}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">
            {notification.createdAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
          </Typography>
          {notification.isActionable && notification.status === 'pending' ? (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Box component="button" sx={{
                minWidth: 50, fontSize: '0.7rem', fontWeight: 500, py: 0.4, px: 1,
                border: '1px solid', borderColor: 'divider', borderRadius: '4px',
                bgcolor: 'transparent', color: 'text.secondary', cursor: 'pointer', fontFamily: 'inherit',
              }}>Decline</Box>
              <Box component="button" sx={{
                minWidth: 50, fontSize: '0.7rem', fontWeight: 600, py: 0.4, px: 1,
                border: '1px solid', borderColor: 'text.disabled', borderRadius: '4px',
                bgcolor: 'action.selected', color: 'text.primary', cursor: 'pointer', fontFamily: 'inherit',
              }}>Accept</Box>
            </Box>
          ) : (
            <Typography variant="caption" sx={{
              fontSize: '0.7rem', fontWeight: 600, textTransform: 'capitalize',
              color: notification.status === 'accepted' ? 'success.main' : notification.status === 'rejected' ? 'error.main' : 'text.secondary',
            }}>{notification.status}</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export const RippleScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    notificationService.getNotifications('current-user').then((data) => {
      const sorted = [...data].sort((a, b) => {
        if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
      setNotifications(sorted);
    });
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length + 1;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <StandardPage
          title="Alerts"
          actions={unreadCount > 0 ? (
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{unreadCount} new</Typography>
          ) : undefined}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {/* Ripple notification — top of the list */}
            <Card sx={{
              border: 1,
              borderColor: '#8B5CF6',
              backgroundColor: alpha('#8B5CF6', 0.03),
              position: 'relative',
            }}>
              <CardContent sx={{ p: '8px 12px', '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ position: 'absolute', top: 8, right: 12, opacity: 0.5 }}>
                  <Waves sx={{ fontSize: 18, color: '#8B5CF6' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, pr: 4 }}>
                  <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: 'grey.300', color: 'text.secondary' }}>S</Avatar>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {personas.sarah.name}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 0.5, pr: 4 }}>
                  Introduced {personas.michael.name} to {personas.emily.name} — a ripple from your introduction
                </Typography>
                <Typography variant="caption" color="text.secondary">Just now</Typography>
              </CardContent>
            </Card>

            {/* Real notifications */}
            {notifications.map((n) => (
              <RealNotificationCard key={n.id} notification={n} />
            ))}
          </Box>
        </StandardPage>
      </Box>

      <DemoNav active="alerts" />
    </Box>
  );
};
