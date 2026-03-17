import {
  Typography,
  Box,
  alpha,
  useTheme,
  Avatar,
  Card,
  CardContent,
} from '@mui/material';
import type { Notification } from '@/types/notification';
import { formatDate } from "@/utils/dateHelpers";
import { useContactResolver } from '@/hooks/contacts/useContactResolver';

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  getNotificationIcon: (type: string) => React.ReactNode;
}

export const NotificationItem = ({
  notification,
  onClick,
  onAccept,
  onReject,
  getNotificationIcon
}: NotificationItemProps) => {
  const theme = useTheme();

  const shouldResolveContact = notification.type !== 'connection' || notification.status === 'accepted';
  const { name: resolvedName, avatar: resolvedAvatar } = useContactResolver(
    shouldResolveContact ? notification.metadata?.contactId : undefined,
    notification.fromUserName,
    notification.fromUserAvatar
  );

  const isClickable = !(notification.type === 'connection' && notification.status === 'pending');

  return (
    <Card
      sx={{
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        border: 1,
        borderColor: 'divider',
        ...(isClickable && {
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: theme.shadows[2],
            transform: 'translateY(-1px)',
          },
        }),
        position: 'relative',
        width: '100%',
        backgroundColor: notification.isRead ? 'background.paper' : alpha(theme.palette.primary.main, 0.02),
      }}
      onClick={isClickable ? onClick : undefined}
    >
      <CardContent sx={{
        p: { xs: '8px 12px', md: 1.5 },
        '&:last-child': { pb: 1.5 }
      }}>
        {/* Icon - top right */}
        <Box sx={{ position: 'absolute', top: 8, right: 12, opacity: 0.5 }}>
          {getNotificationIcon(notification.type)}
        </Box>

        {/* Avatar + Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, pr: 4 }}>
          <Avatar
            src={resolvedAvatar}
            alt={resolvedName}
            sx={{ width: 24, height: 24, fontSize: '0.75rem', flexShrink: 0 }}
          >
            {resolvedName?.charAt(0)}
          </Avatar>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {resolvedName}
          </Typography>
        </Box>

        {/* Message */}
        <Typography variant="body2" sx={{ mb: 0.5, pr: 4 }}>
          {notification.message}
        </Typography>

        {/* Date + Buttons */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Typography variant="caption" color="text.secondary">
            {formatDate(notification.createdAt, {day: "numeric", month: "short", year: undefined, hour: undefined, minute: undefined})}
          </Typography>

          {notification.isActionable && notification.status === 'pending' ? (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Box
                component="button"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onReject?.();
                }}
                sx={{
                  minWidth: 50,
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  py: 0.4,
                  px: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '4px',
                  bgcolor: 'transparent',
                  color: 'text.secondary',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  '&:hover': { bgcolor: 'action.hover', borderColor: 'text.disabled' },
                }}
              >
                Decline
              </Box>
              <Box
                component="button"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onAccept?.();
                }}
                sx={{
                  minWidth: 50,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  py: 0.4,
                  px: 1,
                  border: '1px solid',
                  borderColor: 'text.disabled',
                  borderRadius: '4px',
                  bgcolor: 'action.selected',
                  color: 'text.primary',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                Accept
              </Box>
            </Box>
          ) : (
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                color: notification.status === 'accepted'
                  ? 'success.main'
                  : notification.status === 'rejected'
                  ? 'error.main'
                  : 'text.secondary'
              }}
            >
              {notification.status}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
