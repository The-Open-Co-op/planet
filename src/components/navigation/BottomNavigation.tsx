import { useLocation, useNavigate } from 'react-router-dom';
import { 
  BottomNavigation as MuiBottomNavigation, 
  BottomNavigationAction, 
  Paper 
} from '@mui/material';
import {
  Public,
  People,
  ChatBubble,
  Notifications,
} from '@mui/icons-material';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Home', icon: <Public />, path: '/home' },
    { label: 'Contacts', icon: <People />, path: '/contacts' },
    { label: 'Chat', icon: <ChatBubble />, path: '/chat' },
    { label: 'Alerts', icon: <Notifications />, path: '/notifications' },
  ];

  const getCurrentValue = () => {
    const currentPath = location.pathname;

    if (currentPath === '/') return '/home';

    const activeItem = navigationItems.find(item =>
      item.path === currentPath || currentPath.startsWith(item.path)
    );
    return activeItem ? activeItem.path : '/home';
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <Paper
      square
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.default',
        borderRadius: 0,
      }}
      elevation={0}
    >
      <MuiBottomNavigation
        value={getCurrentValue()}
        onChange={handleChange}
        showLabels
        sx={{
          bgcolor: 'transparent',
          '& .MuiBottomNavigationAction-root': {
            color: 'text.secondary',
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.65rem',
              '&.Mui-selected': {
                fontSize: '0.65rem',
              },
            },
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
        }}
      >
        {navigationItems.map((item) => (
          <BottomNavigationAction
            key={item.path}
            label={item.label}
            value={item.path}
            icon={item.icon}
          />
        ))}
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNavigation;