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
  
  // Resolve contact information - skip for new connections as they won't be in contacts yet
  const shouldResolveContact = notification.type !== 'connection' || notification.status === 'accepted';
  const { name: resolvedName, avatar: resolvedAvatar } = useContactResolver(
    shouldResolveContact ? notification.metadata?.contactId : undefined,
    notification.fromUserName,
    notification.fromUserAvatar
  );

  // Determine if this notification should be clickable
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
        p: { xs: '8px 16px', md: 1.5 },
        '&:last-child': {
          pb: 1.5
        }
      }}>
        {/* Line 1: Avatar + Person + (Message + Icon on desktop only) */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          width: '100%',
          mb: { xs: 0.5, md: 1 }
        }}>
          <Avatar
            src={resolvedAvatar}
            alt={resolvedName}
            sx={{ width: 24, height: 24, fontSize: '0.75rem', flexShrink: 0 }}
          >
            {resolvedName?.charAt(0)}
          </Avatar>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, flexShrink: 0 }}>
            {resolvedName}
          </Typography>
          {/* Message and Icon - only visible on desktop */}
          <Typography variant="body2" sx={{ 
            flex: 1, 
            minWidth: 0, 
            mx: 1,
            display: { xs: 'none', md: 'block' }
          }}>
            {notification.message}
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {getNotificationIcon(notification.type)}
          </Box>
        </Box>

        {/* Line 2: Message + Icon (mobile only) */}
        <Box sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          gap: 1,
          width: '100%',
          mb: 0.5
        }}>
          <Typography variant="body2" sx={{ flex: 1, minWidth: 0 }}>
            {notification.message}
          </Typography>
          {getNotificationIcon(notification.type)}
        </Box>

        {/* Line 3 (mobile) / Line 2 (desktop): Date (left) + Buttons (right) */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          {/* Date - left aligned */}
          <Typography variant="caption" color="text.secondary">
            {formatDate(notification.createdAt, {day: "numeric", month: "short", year: undefined, hour: undefined, minute: undefined})}
          </Typography>
          
          {/* Buttons or Status - right aligned */}
          {notification.isActionable && notification.status === 'pending' ? (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReject?.();
                }}
                style={{
                  minWidth: 50,
                  fontSize: '0.7rem',
                  padding: '3px 6px',
                  border: '1px solid',
                  borderColor: theme.palette.grey[400],
                  borderRadius: 4,
                  backgroundColor: 'transparent',
                  color: theme.palette.text.primary,
                  cursor: 'pointer'
                }}
              >
                Reject
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept?.();
                }}
                style={{
                  minWidth: 50,
                  fontSize: '0.7rem',
                  padding: '3px 6px',
                  border: 'none',
                  borderRadius: 4,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  cursor: 'pointer'
                }}
              >
                Accept
              </button>
            </Box>
          ) : (
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.75rem',
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