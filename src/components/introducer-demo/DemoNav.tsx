import { Box, Typography } from '@mui/material';
import { Public, People, ChatBubble, Notifications } from '@mui/icons-material';

interface DemoNavProps {
  active?: 'home' | 'contacts' | 'chat' | 'alerts';
}

const navItems = [
  { key: 'home', label: 'Home', icon: Public },
  { key: 'contacts', label: 'Contacts', icon: People },
  { key: 'chat', label: 'Chat', icon: ChatBubble },
  { key: 'alerts', label: 'Alerts', icon: Notifications },
] as const;

export const DemoNav = ({ active }: DemoNavProps) => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTop: '1px solid',
    borderColor: 'divider',
    bgcolor: 'background.default',
    py: 0.75,
    flexShrink: 0,
  }}>
    {navItems.map((item) => {
      const Icon = item.icon;
      const isActive = item.key === active;
      return (
        <Box
          key={item.key}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: isActive ? 'primary.main' : 'text.secondary',
          }}
        >
          <Icon sx={{ fontSize: 20 }} />
          <Typography sx={{ fontSize: '0.55rem', mt: 0.25, fontWeight: isActive ? 600 : 400 }}>
            {item.label}
          </Typography>
        </Box>
      );
    })}
  </Box>
);
