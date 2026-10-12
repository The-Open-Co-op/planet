import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, alpha } from '@mui/material';
import { Waves } from '@mui/icons-material';
import { notificationService } from '@/services/notificationService';
import type { Notification } from '@/types/notification';
import { NotificationItem } from '@/components/notifications/NotificationItem/NotificationItem';
import { StandardPage } from '@/components/layout/StandardPage';
import { personas } from './mockData';
import { DemoNav } from './DemoNav';


/** Ripple VECs get their own colour, alongside the shared alert kinds. */
const RIPPLE = '#8B5CF6';

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
            {/* Laid out like every other alert: kind chip, label row, one line of text. */}
            <Card sx={{ border: 1, borderColor: 'divider', backgroundColor: alpha(RIPPLE, 0.04) }}>
              <CardContent sx={{ p: '8px 10px', '&:last-child': { pb: '8px' } }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      mt: '1px',
                      borderRadius: '50%',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(RIPPLE, 0.12),
                      color: RIPPLE,
                    }}
                  >
                    <Waves sx={{ fontSize: 16 }} />
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 0.15 }}>
                      <Typography
                        sx={{ fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.06em', color: RIPPLE }}
                      >
                        RIPPLE
                      </Typography>
                      <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: RIPPLE }} />
                      <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', ml: 'auto' }}>
                        Just now
                      </Typography>
                    </Box>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.35 }}>
                      <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        {personas.sarah.name}
                      </Box>{' '}
                      introduced {personas.michael.name} to {personas.emily.name} — a ripple from your
                      introduction
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Real notifications */}
            {notifications.map((n) => (
              <NotificationItem key={n.id} notification={n} onClick={() => undefined} />
            ))}
          </Box>
        </StandardPage>
      </Box>

      <DemoNav active="alerts" />
    </Box>
  );
};
