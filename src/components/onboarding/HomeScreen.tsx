import { Box, Typography } from '@mui/material';
import { Public, People, ChatBubble, Notifications } from '@mui/icons-material';
import AppsPage from '@/pages/AppsPage';

/** Static nav for demo */
const DemoNav = () => (
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
    {[
      { label: 'Home', icon: <Public sx={{ fontSize: 20, color: 'primary.main' }} />, active: true },
      { label: 'Contacts', icon: <People sx={{ fontSize: 20 }} /> },
      { label: 'Chat', icon: <ChatBubble sx={{ fontSize: 20 }} /> },
      { label: 'Alerts', icon: <Notifications sx={{ fontSize: 20 }} /> },
    ].map((item) => (
      <Box key={item.label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: item.active ? 'primary.main' : 'text.secondary' }}>
        {item.icon}
        <Typography sx={{ fontSize: '0.55rem', mt: 0.25, fontWeight: item.active ? 600 : 400 }}>{item.label}</Typography>
      </Box>
    ))}
  </Box>
);

/** Step 08 — Home screen */
export const HomeScreen = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <AppsPage />
      </Box>
      <DemoNav />
    </Box>
  );
};
