import { useLocation, useNavigate } from 'react-router-dom';
import { 
  BottomNavigation as MuiBottomNavigation, 
  BottomNavigationAction, 
  Paper 
} from '@mui/material';
import {
  People,
  Apps,
  Notifications,
  Settings,
} from '@mui/icons-material';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Contacts', icon: <People />, path: '/contacts' },
    { label: 'Apps', icon: <Apps />, path: '/apps' },
    { label: 'Alerts', icon: <Notifications />, path: '/notifications' },
    { label: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const getCurrentValue = () => {
    const currentPath = location.pathname;
    
    // Default to contacts if on root
    if (currentPath === '/') return '/contacts';
    
    const activeItem = navigationItems.find(item => 
      item.path === currentPath || currentPath.startsWith(item.path)
    );
    return activeItem ? activeItem.path : '/contacts';
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        borderTop: 1,
        borderColor: 'divider',
      }} 
      elevation={3}
    >
      <MuiBottomNavigation
        value={getCurrentValue()}
        onChange={handleChange}
        showLabels
        sx={{
          '& .MuiBottomNavigationAction-root': {
            color: 'text.secondary',
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