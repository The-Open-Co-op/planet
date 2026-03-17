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
  IconButton,
} from '@mui/material';
import {
  VerifiedUser,
  Group,
  Message,
  Settings,
  Notifications,
  Person,
  Close,
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
          return <VerifiedUser sx={{ fontSize: 18, color: '#0066CC' }} />;
        case 'connection':
          return <Group sx={{ fontSize: 18, color: '#059669' }} />;
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
            {vouch && (() => {
              const notif = notifications.find(
                n => n.type === 'vouch' && n.metadata?.vouchId === vouch.id
              );
              const isPending = status === 'pending';
              return (
                <>
                  <DialogTitle sx={{ pb: 0.5, pr: 5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <VerifiedUser fontSize="small" color="primary" />
                      {vouch.trustArea}
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
                    <IconButton
                      onClick={() => setSelectedVouchId(null)}
                      sx={{ position: 'absolute', top: 8, right: 8 }}
                      size="small"
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">From</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Person fontSize="small" color="action" />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {notif?.fromUserName || vouch.issuer}
                          </Typography>
                        </Box>
                      </Box>

                      {vouch.comment && (
                        <Box>
                          <Typography variant="caption" color="text.secondary">Comment</Typography>
                          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                            "{vouch.comment}"
                          </Typography>
                        </Box>
                      )}

                      <Box>
                        <Typography variant="caption" color="text.secondary">Date</Typography>
                        <Typography variant="body2">
                          {new Date(vouch.issuanceDate).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                        </Typography>
                      </Box>
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    {isPending && notif ? (
                      <>
                        <Button
                          size="small"
                          onClick={() => {
                            setSelectedVouchId(null);
                            onRejectVouch(notif.id);
                          }}
                          sx={{ color: 'text.secondary' }}
                        >
                          Reject
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            setSelectedVouchId(null);
                            handleOpenRCardModal(notif.id, notif.fromUserName, 'vouch');
                          }}
                        >
                          Accept
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedVouchId(null);
                          navigate(`/contacts/${vouch.issuer}`, { state: { from: 'notifications' } });
                        }}
                      >
                        View Contact
                      </Button>
                    )}
                  </DialogActions>
                </>
              );
            })()}
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
