import { Typography, Box, alpha, useTheme, Card, CardContent } from '@mui/material';
import type { Notification } from '@/types/notification';
import { formatDate } from '@/utils/dateHelpers';
import { useContactResolver } from '@/hooks/contacts/useContactResolver';
import { styleFor } from '../notificationStyle';

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  /** Optional override; by default each type gets its icon from notificationStyle. */
  getNotificationIcon?: (type: string) => React.ReactNode;
}

const ActionButton = ({
  label,
  primary,
  onClick,
}: {
  label: string;
  primary?: boolean;
  onClick: (e: React.MouseEvent) => void;
}) => (
  <Box
    component="button"
    onClick={onClick}
    sx={{
      minWidth: 50,
      fontSize: '0.68rem',
      fontWeight: 600,
      py: 0.2,
      px: 0.9,
      border: '1px solid',
      borderColor: primary ? 'text.disabled' : 'divider',
      borderRadius: '4px',
      bgcolor: primary ? 'action.selected' : 'transparent',
      color: primary ? 'text.primary' : 'text.secondary',
      cursor: 'pointer',
      fontFamily: 'inherit',
      '&:hover': { bgcolor: 'action.hover' },
    }}
  >
    {label}
  </Box>
);

/**
 * One alert. The kind of alert is carried by a coloured icon chip and a short
 * label rather than by the card border, so vouches, connections, records and
 * requests are told apart at a glance — the same way in every demo.
 */
export const NotificationItem = ({
  notification,
  onClick,
  onAccept,
  onReject,
  getNotificationIcon,
}: NotificationItemProps) => {
  const theme = useTheme();
  const kind = styleFor(notification.type);

  const shouldResolveContact = notification.type !== 'connection' || notification.status === 'accepted';
  const { name: resolvedName } = useContactResolver(
    shouldResolveContact ? notification.metadata?.contactId : undefined,
    notification.fromUserName,
    notification.fromUserAvatar
  );

  const isClickable = !(notification.type === 'connection' && notification.status === 'pending');
  const isPending = notification.isActionable && notification.status === 'pending';

  return (
    <Card
      sx={{
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        border: 1,
        borderColor: 'divider',
        ...(isClickable && {
          '&:hover': {
            borderColor: kind.color,
            boxShadow: theme.shadows[2],
            transform: 'translateY(-1px)',
          },
        }),
        position: 'relative',
        width: '100%',
        backgroundColor: notification.isRead ? 'background.paper' : alpha(kind.color, 0.04),
      }}
      onClick={isClickable ? onClick : undefined}
    >
      <CardContent sx={{ p: '8px 10px', '&:last-child': { pb: '8px' } }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* What kind of alert this is */}
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
              bgcolor: alpha(kind.color, 0.12),
              color: kind.color,
            }}
          >
            {getNotificationIcon ? getNotificationIcon(notification.type) : kind.icon}
          </Box>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 0.15 }}>
              <Typography
                sx={{
                  fontSize: '0.58rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  color: kind.color,
                  flexShrink: 0,
                }}
              >
                {kind.label}
              </Typography>
              {!notification.isRead && (
                <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: kind.color, flexShrink: 0 }} />
              )}
              <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', ml: 'auto', flexShrink: 0 }}>
                {formatDate(notification.createdAt, {
                  day: 'numeric',
                  month: 'short',
                  year: undefined,
                  hour: undefined,
                  minute: undefined,
                })}
              </Typography>
            </Box>

            {/* Name and message share a line to keep the card short. */}
            <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.35 }}>
              <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {resolvedName}
              </Box>{' '}
              {notification.message}
            </Typography>

            {isPending ? (
              <Box sx={{ display: 'flex', gap: 0.75, mt: 0.6, justifyContent: 'flex-end' }}>
                <ActionButton
                  label="Decline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onReject?.();
                  }}
                />
                <ActionButton
                  label="Accept"
                  primary
                  onClick={(e) => {
                    e.stopPropagation();
                    onAccept?.();
                  }}
                />
              </Box>
            ) : (
              notification.status !== 'pending' && (
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    mt: 0.25,
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    textAlign: 'right',
                    color:
                      notification.status === 'accepted'
                        ? 'success.main'
                        : notification.status === 'rejected'
                          ? 'error.main'
                          : 'text.secondary',
                  }}
                >
                  {notification.status}
                </Typography>
              )
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
