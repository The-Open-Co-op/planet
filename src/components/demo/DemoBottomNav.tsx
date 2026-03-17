import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Public, People, ChatBubble, Notifications } from '@mui/icons-material';

const navItems = [
  { label: 'Home', icon: <Public sx={{ fontSize: 20 }} />, path: '/home' },
  { label: 'Contacts', icon: <People sx={{ fontSize: 20 }} />, path: '/contacts' },
  { label: 'Chat', icon: <ChatBubble sx={{ fontSize: 20 }} />, path: '/chat' },
  { label: 'Alerts', icon: <Notifications sx={{ fontSize: 20 }} />, path: '/notifications' },
];

/** Bottom nav for use inside DemoAppShell — not position:fixed */
export const DemoBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const activeItem = navItems.find(item =>
    item.path === currentPath || currentPath.startsWith(item.path)
  );
  const activeValue = activeItem?.path || '/home';

  return (
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
        const isActive = item.path === activeValue;
        return (
          <Box
            key={item.path}
            onClick={() => navigate(item.path)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: isActive ? 'primary.main' : 'text.secondary',
              cursor: 'pointer',
            }}
          >
            {item.icon}
            <Typography sx={{ fontSize: '0.55rem', mt: 0.25, fontWeight: isActive ? 600 : 400 }}>
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};
