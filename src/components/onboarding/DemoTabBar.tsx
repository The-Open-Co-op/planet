import { Box, Typography } from '@mui/material';
import {
  Public,
  People,
  ChatBubble,
  Notifications,
  Lock,
} from '@mui/icons-material';
import type { ReactNode } from 'react';

export type DemoTab = 'home' | 'contacts' | 'chat' | 'alerts' | 'vault';

/** Canonical bottom-nav order — Vault last. Shared by every demo screen so
 *  the nav is identical everywhere and can't drift. */
const ITEMS: { key: DemoTab; label: string; icon: ReactNode }[] = [
  { key: 'home', label: 'Home', icon: <Public sx={{ fontSize: 20 }} /> },
  { key: 'contacts', label: 'Contacts', icon: <People sx={{ fontSize: 20 }} /> },
  { key: 'chat', label: 'Chat', icon: <ChatBubble sx={{ fontSize: 20 }} /> },
  { key: 'alerts', label: 'Alerts', icon: <Notifications sx={{ fontSize: 20 }} /> },
  { key: 'vault', label: 'Vault', icon: <Lock sx={{ fontSize: 20 }} /> },
];

interface DemoTabBarProps {
  /** Which tab is highlighted. Omit to highlight none (e.g. the App Store). */
  active?: DemoTab;
  /** If provided, tabs are clickable (interactive shells). Omit for static screens. */
  onSelect?: (tab: DemoTab) => void;
  /** Colour for the active tab. Defaults to the app's primary. */
  activeColor?: string;
  /** Unread counts shown as a badge on a tab, e.g. { alerts: 2 }. */
  badges?: Partial<Record<DemoTab, number>>;
}

export const DemoTabBar = ({
  active,
  onSelect,
  activeColor = 'primary.main',
  badges,
}: DemoTabBarProps) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderTop: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.default',
      py: 0.75,
      flexShrink: 0,
    }}
  >
    {ITEMS.map((item) => {
      const isActive = item.key === active;
      return (
        <Box
          key={item.key}
          onClick={onSelect ? () => onSelect(item.key) : undefined}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: isActive ? activeColor : 'text.secondary',
            cursor: onSelect ? 'pointer' : 'default',
            '&:hover': onSelect ? { color: activeColor } : undefined,
          }}
        >
          <Box sx={{ position: 'relative', display: 'flex' }}>
            {item.icon}
            {!!badges?.[item.key] && (
              <Box
                sx={{
                  position: 'absolute',
                  top: -4,
                  right: -7,
                  minWidth: 14,
                  height: 14,
                  px: '3px',
                  borderRadius: 7,
                  bgcolor: '#D32F2F',
                  color: '#fff',
                  fontSize: '0.55rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                }}
              >
                {badges[item.key]}
              </Box>
            )}
          </Box>
          <Typography sx={{ fontSize: '0.55rem', mt: 0.25, fontWeight: isActive ? 600 : 400 }}>
            {item.label}
          </Typography>
        </Box>
      );
    })}
  </Box>
);
