import { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, alpha, useTheme } from '@mui/material';
import { Handshake, Close } from '@mui/icons-material';
import { NotificationItem } from '@/components/notifications/NotificationItem/NotificationItem';
import { notificationService } from '@/services/notificationService';
import type { Notification } from '@/types/notification';
import { StandardPage } from '@/components/layout/StandardPage';
import { personas, introMessage } from './mockData';
import { DemoNav } from './DemoNav';


export const ReceiveScreen = () => {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
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

  const unreadCount = notifications.filter(n => !n.isRead).length + 1; // +1 for the intro

  const renderMessage = (text: string) => {
    const parts = text.split(/(@\w+)/g);
    return parts.map((part, i) =>
      part.startsWith('@') ? (
        <Box component="span" key={i} sx={{ color: 'primary.main', fontWeight: 600 }}>{part}</Box>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

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
            {/* Introduction notification — first in the list */}
            <Card
              onClick={() => setModalOpen(true)}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: 1,
                borderColor: '#7C3AED',
                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                '&:hover': { borderColor: 'primary.main', boxShadow: theme.shadows[2], transform: 'none' },
                position: 'relative',
              }}
            >
              <CardContent sx={{ p: '8px 12px', '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ position: 'absolute', top: 8, right: 12, opacity: 0.5 }}>
                  <Handshake sx={{ fontSize: 18, color: '#7C3AED' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, pr: 4 }}>
                  <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: 'grey.300', color: 'text.secondary' }}>J</Avatar>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{personas.me.name}</Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 0.5, pr: 4 }}>
                  Wants to introduce you to {personas.michael.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">Just now</Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Box component="button" onClick={(e: React.MouseEvent) => e.stopPropagation()} sx={{
                      minWidth: 50, fontSize: '0.7rem', fontWeight: 500, py: 0.4, px: 1,
                      border: '1px solid', borderColor: 'divider', borderRadius: '4px',
                      bgcolor: 'transparent', color: 'text.secondary', cursor: 'pointer', fontFamily: 'inherit',
                    }}>Decline</Box>
                    <Box component="button" onClick={(e: React.MouseEvent) => e.stopPropagation()} sx={{
                      minWidth: 50, fontSize: '0.7rem', fontWeight: 600, py: 0.4, px: 1,
                      border: '1px solid', borderColor: 'text.disabled', borderRadius: '4px',
                      bgcolor: 'action.selected', color: 'text.primary', cursor: 'pointer', fontFamily: 'inherit',
                    }}>Accept</Box>
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

      {/* Introduction detail modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 6 }}>
          <Handshake sx={{ color: '#7C3AED' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Introduction</Typography>
          <IconButton onClick={() => setModalOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }} size="small">
            <Close sx={{ fontSize: 18 }} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.300', color: 'text.secondary', fontSize: '0.8rem' }}>J</Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{personas.me.name}</Typography>
              <Typography variant="caption" color="text.secondary">wants to introduce you to</Typography>
            </Box>
          </Box>
          <Card sx={{ p: 1.5, mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'grey.300', color: 'text.secondary', fontSize: '0.85rem' }}>MC</Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{personas.michael.name}</Typography>
              <Typography variant="caption" color="text.secondary">{personas.michael.role}, {personas.michael.org}</Typography>
            </Box>
          </Card>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
            {personas.me.name} says:
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', lineHeight: 1.5, mb: 1 }}>
            {renderMessage(introMessage)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Accepting shares your profile with {personas.michael.name} and opens a group chat.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" size="small" onClick={() => setModalOpen(false)} sx={{ textTransform: 'none' }}>
            Decline
          </Button>
          <Button variant="contained" size="small" onClick={() => setModalOpen(false)} sx={{ textTransform: 'none', fontWeight: 600 }}>
            Accept
          </Button>
        </DialogActions>
      </Dialog>

      <DemoNav active="alerts" />
    </Box>
  );
};
