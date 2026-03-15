import { useState, forwardRef } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  Box,
  Button,
} from '@mui/material';
import {
  NotificationsNone,
  Notifications,
} from '@mui/icons-material';
import type { Notification, NotificationSummary } from '@/types/notification';
import { NotificationPreview } from './NotificationPreview';

export interface NotificationDropdownProps {
  notifications: Notification[];
  summary: NotificationSummary;
  onMarkAllAsRead: () => void;
}

export const NotificationDropdown = forwardRef<HTMLDivElement, NotificationDropdownProps>(
  ({
    notifications,
    summary,
    onMarkAllAsRead,
  }, ref) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [filter, setFilter] = useState<'all' | 'pending' | 'unread'>('all');
    
    const isOpen = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleFilterChange = (newFilter: 'all' | 'pending' | 'unread') => {
      setFilter(newFilter);
    };

    return (
      <Box ref={ref}>
        <IconButton
          size="large"
          color="inherit"
          onClick={handleClick}
          aria-label="notifications"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-haspopup="true"
        >
          <Badge badgeContent={summary.unread} color="error">
            {summary.unread > 0 ? <Notifications /> : <NotificationsNone />}
          </Badge>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
          onClick={(e) => e.stopPropagation()}
          PaperProps={{
            elevation: 8,
            sx: {
              width: 400,
              maxWidth: '90vw',
              maxHeight: '80vh',
              mt: 1.5,
              borderRadius: 2,
              border: 1,
              borderColor: 'divider',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 20,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                border: 1,
                borderColor: 'divider',
                borderBottom: 0,
                borderRight: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box>
            <NotificationPreview
              notifications={notifications}
              summary={summary}
              filter={filter}
              onMarkAllAsRead={onMarkAllAsRead}
              onFilterChange={handleFilterChange}
            />

            {/* Footer */}
            {summary.total > 0 && (
              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleClose}
                  sx={{ textTransform: 'none' }}
                >
                  View All Notifications
                </Button>
              </Box>
            )}
          </Box>
        </Menu>
      </Box>
    );
  }
);

NotificationDropdown.displayName = 'NotificationDropdown';