import { forwardRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  alpha,
} from '@mui/material';
import {
  VerifiedUser,
  Group,
  Message,
  Settings,
  Notifications,
  Person,
} from '@mui/icons-material';
import type { Notification } from '@/types/notification';
import { RCardSelectionModal } from '../RCardSelectionModal';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { useVRCs } from '@/hooks/useVRCs';

export interface NotificationsListProps {
  notifications: Notification[];
  isLoading: boolean;
  onMarkAsRead: (notificationId: string) => void;
  onAcceptVouch: (notificationId: string, rCardIds?: string[]) => void;
  onRejectVouch: (notificationId: string) => void;
  onAcceptConnection: (notificationId: string, selectedRCardId: string) => void;
  onRejectConnection: (notificationId: string) => void;
}

export const NotificationsList = forwardRef<HTMLDivElement, NotificationsListProps>(
  ({
    notifications,
    isLoading,
    onAcceptVouch,
    onRejectVouch,
    onAcceptConnection,
    onRejectConnection,
  }, ref) => {
    const navigate = useNavigate();
    const { getVouchById, getVouchStatus } = useVRCs();
    const [rCardModalOpen, setRCardModalOpen] = useState(false);
    const [pendingConnectionId, setPendingConnectionId] = useState<string | null>(null);
    const [pendingConnectionName, setPendingConnectionName] = useState<string | null>(null);
    const [modalType, setModalType] = useState<'connection' | 'vouch'>('connection');
    const [pendingNotificationId, setPendingNotificationId] = useState<string | null>(null);
    const [selectedVouchId, setSelectedVouchId] = useState<string | null>(null);

    const handleOpenRCardModal = (notificationId: string, contactName?: string, type: 'connection' | 'vouch' = 'connection') => {
      setPendingNotificationId(notificationId);
      setPendingConnectionName(contactName || null);
      setModalType(type);
      setRCardModalOpen(true);

      if (type === 'connection') {
        setPendingConnectionId(notificationId);
      }
    };

    const handleRCardSelect = (rCardIds: string[]) => {
      if (modalType === 'connection' && pendingConnectionId) {
        onAcceptConnection(pendingConnectionId, rCardIds[0]); // Connection still uses single selection
        setPendingConnectionId(null);
      } else if (modalType === 'vouch' && pendingNotificationId) {
        onAcceptVouch(pendingNotificationId, rCardIds);
      }
      setPendingNotificationId(null);
      setPendingConnectionName(null);
    };

    const handleNotificationClick = (notification: Notification) => {
      // Don't navigate for pending connection requests
      if (notification.type === 'connection' && notification.status === 'pending') {
        return;
      }

      // For vouch notifications, show vouch detail dialog
      if (notification.type === 'vouch' && notification.metadata?.vouchId) {
        setSelectedVouchId(notification.metadata.vouchId);
        return;
      }

      // For other types, navigate to contact
      if (notification.metadata?.contactId) {
        navigate(`/contacts/${notification.metadata.contactId}`, { state: { from: 'notifications' } });
      } else if (notification.fromUserId) {
        navigate(`/contacts/${notification.fromUserId}`, { state: { from: 'notifications' } });
      }
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

    if (isLoading) {
      return (
        <Box ref={ref} sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Loading notifications...
          </Typography>
        </Box>
      );
    }

    if (notifications.length === 0) {
      return (
        <Box ref={ref} sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No notifications yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You'll see notifications here when you receive vouches and other updates.
          </Typography>
        </Box>
      );
    }

    return (
      <>
        <Box ref={ref} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {notifications.map((notification) => {
            const getAcceptHandler = () => {
              if (notification.type === 'vouch') {
                return () => handleOpenRCardModal(notification.id, notification.fromUserName, 'vouch');
              } else if (notification.type === 'connection') {
                return () => handleOpenRCardModal(notification.id, notification.fromUserName, 'connection');
              }
              return undefined;
            };

            const getRejectHandler = () => {
              if (notification.type === 'vouch') {
                return () => onRejectVouch(notification.id);
              } else if (notification.type === 'connection') {
                return () => onRejectConnection(notification.id);
              }
              return undefined;
            };

            return (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => handleNotificationClick(notification)}
                onAccept={getAcceptHandler()}
                onReject={getRejectHandler()}
                getNotificationIcon={getNotificationIcon}
              />
            );
          })}
        </Box>

      {/* Vouch Detail Dialog */}
      {(() => {
        const vouch = selectedVouchId ? getVouchById(selectedVouchId) : null;
        const status = selectedVouchId ? getVouchStatus(selectedVouchId) : 'pending';
        return (
          <Dialog
            open={!!selectedVouchId}
            onClose={() => setSelectedVouchId(null)}
            maxWidth="xs"
            fullWidth
          >
            {vouch && (
              <>
                <DialogTitle sx={{ pb: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VerifiedUser fontSize="small" color="primary" />
                    {vouch.skill}
                  </Box>
                  <Chip
                    label={status}
                    size="small"
                    sx={{
                      mt: 0.5,
                      textTransform: 'capitalize',
                      bgcolor: status === 'accepted' ? alpha('#22c55e', 0.1) : status === 'rejected' ? alpha('#ef4444', 0.1) : alpha('#f59e0b', 0.1),
                      color: status === 'accepted' ? '#22c55e' : status === 'rejected' ? '#ef4444' : '#f59e0b',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                    }}
                  />
                </DialogTitle>
                <DialogContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">From</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Person fontSize="small" color="action" />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {vouch.fromUserName}
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">Level</Typography>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {vouch.level}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">Description</Typography>
                      <Typography variant="body2">
                        {vouch.description}
                      </Typography>
                    </Box>

                    {vouch.endorsementText && (
                      <Box>
                        <Typography variant="caption" color="text.secondary">Endorsement</Typography>
                        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                          "{vouch.endorsementText}"
                        </Typography>
                      </Box>
                    )}

                    <Box>
                      <Typography variant="caption" color="text.secondary">Date</Typography>
                      <Typography variant="body2">
                        {vouch.createdAt.toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setSelectedVouchId(null)}>Close</Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setSelectedVouchId(null);
                      navigate(`/contacts/${vouch.fromUserId}`, { state: { from: 'notifications' } });
                    }}
                  >
                    View Contact
                  </Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        );
      })()}

      {/* RCard Selection Modal */}
      <RCardSelectionModal
        open={rCardModalOpen}
        onClose={() => {
          setRCardModalOpen(false);
          setPendingConnectionId(null);
          setPendingConnectionName(null);
          setPendingNotificationId(null);
        }}
        onSelect={handleRCardSelect}
        contactName={pendingConnectionName || undefined}
        multiSelect={modalType !== 'connection'}
      />
    </>
  );
});

NotificationsList.displayName = 'NotificationsList';
