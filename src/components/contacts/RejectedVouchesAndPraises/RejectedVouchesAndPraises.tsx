import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  alpha,
  useTheme,
  Button,
  Chip,
  Tooltip
} from '@mui/material';
import {
  VerifiedUser,
  Cancel,
  RestoreFromTrash,
  Schedule
} from '@mui/icons-material';
import { resolveFrom } from '@/utils/contactUtils';
import { notificationService } from '@/services/notificationService';
import { RCardSelectionModal } from '@/components/notifications/RCardSelectionModal';
import type { Contact } from '@/types/contact';
import type { Notification } from '@/types/notification';
import {formatDate} from "@/utils/dateHelpers";
import type {SocialContact} from '@/.ldo/contact.typings';

export interface RejectedVouchesAndPraisesProps {
  contact?: Contact;
  onAcceptanceChanged?: () => void;
}

export const RejectedVouchesAndPraises = ({ contact, onAcceptanceChanged }: RejectedVouchesAndPraisesProps) => {
  const theme = useTheme();
  const [rejectedNotifications, setRejectedNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rCardModalOpen, setRCardModalOpen] = useState(false);
  const [pendingNotificationId, setPendingNotificationId] = useState<string | null>(null);

  useEffect(() => {
    const loadRejectedNotifications = async () => {
      if (!contact) return;

      setIsLoading(true);
      try {
        const contactId = contact['@id'] || '';
        const rejected = await notificationService.getRejectedNotificationsByContact(contactId);
        setRejectedNotifications(rejected);
      } catch (error) {
        console.error('Failed to load rejected notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRejectedNotifications();
  }, [contact]);

  const handleAcceptRejected = (notificationId: string) => {
    setPendingNotificationId(notificationId);
    setRCardModalOpen(true);
  };

  const handleRCardSelect = async (rCardIds: string[]) => {
    if (!pendingNotificationId) return;

    try {
      await notificationService.reverseRejectionAndAccept(pendingNotificationId, rCardIds);

      // Remove from rejected list and update state
      setRejectedNotifications(prev =>
        prev.filter(n => n.id !== pendingNotificationId)
      );

      // Notify parent component that data has changed
      if (onAcceptanceChanged) {
        onAcceptanceChanged();
      }
    } catch (error) {
      console.error('Failed to accept rejected notification:', error);
    }

    setPendingNotificationId(null);
    setRCardModalOpen(false);
  };

  if (!contact || isLoading) {
    return null;
  }

  if (rejectedNotifications.length === 0) {
    return null;
  }

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Cancel sx={{ color: 'error.main', fontSize: 20 }} />
          Rejected from {resolveFrom(contact as SocialContact, 'name')?.value?.split(' ')[0] || 'Contact'}
        </Typography>

        <Card variant="outlined" sx={{ borderColor: alpha(theme.palette.error.main, 0.3) }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              These vouches were previously rejected. You can still accept them if you change your mind.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {rejectedNotifications.map((notification) => (
                <Box
                  key={notification.id}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    p: 2,
                    bgcolor: alpha(theme.palette.error.main, 0.04),
                    borderRadius: 2,
                    border: 1,
                    borderColor: alpha(theme.palette.error.main, 0.2)
                  }}
                >
                  <VerifiedUser sx={{ color: 'error.main', fontSize: 20, mt: 0.5, flexShrink: 0 }} />

                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Skill Vouch
                        {notification.message.includes('vouched for your') &&
                          ` - ${notification.message.split('vouched for your ')[1]?.split(' skills')[0] || 'Skills'}`}
                      </Typography>
                      <Chip
                        label="Rejected"
                        size="small"
                        color="error"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem', height: 20 }}
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      "{notification.message}"
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Schedule sx={{ fontSize: 12 }} />
                        Rejected {formatDate(notification.updatedAt, {month: "short"})}
                      </Typography>

                      <Tooltip title="Accept this vouch">
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<RestoreFromTrash />}
                          onClick={() => handleAcceptRejected(notification.id)}
                          sx={{
                            fontSize: '0.75rem',
                            py: 0.5,
                            px: 1,
                            borderColor: 'success.main',
                            color: 'success.main',
                            '&:hover': {
                              borderColor: 'success.main',
                              bgcolor: alpha(theme.palette.success.main, 0.08)
                            }
                          }}
                        >
                          Accept
                        </Button>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* RCard Selection Modal */}
      <RCardSelectionModal
        open={rCardModalOpen}
        onClose={() => {
          setRCardModalOpen(false);
          setPendingNotificationId(null);
        }}
        onSelect={handleRCardSelect}
        contactName={resolveFrom(contact as SocialContact, 'name')?.value || undefined}
        multiSelect={true}
      />
    </>
  );
};
