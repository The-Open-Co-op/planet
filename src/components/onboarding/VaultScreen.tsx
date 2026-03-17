import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Public, People, ChatBubble, Notifications } from '@mui/icons-material';
import { AccountPage } from '@/components/account/AccountPage';
import AppsPage from '@/pages/AppsPage';
import ContactListPage from '@/pages/ContactListPage';
import { ConversationList } from '@/components/chat/ConversationList';
import { NotificationsPage } from '@/components/notifications/NotificationsPage';

type VaultView = 'vault' | 'home' | 'contacts' | 'chat' | 'alerts';

interface VaultScreenProps {
  onNavigate?: (slug: string) => void;
}

/** Step 10 — Vault with navigable demo nav */
export const VaultScreen = ({ onNavigate }: VaultScreenProps) => {
  const [view, setView] = useState<VaultView>('vault');

  const navItems = [
    { label: 'Home', icon: <Public sx={{ fontSize: 20 }} />, target: 'home' as VaultView },
    { label: 'Contacts', icon: <People sx={{ fontSize: 20 }} />, target: 'contacts' as VaultView },
    { label: 'Chat', icon: <ChatBubble sx={{ fontSize: 20 }} />, target: 'chat' as VaultView },
    { label: 'Alerts', icon: <Notifications sx={{ fontSize: 20 }} />, target: 'alerts' as VaultView },
  ];

  const renderView = () => {
    switch (view) {
      case 'home': return <AppsPage />;
      case 'contacts': return <ContactListPage />;
      case 'chat': return <ConversationList />;
      case 'alerts': return <NotificationsPage />;
      default: return <AccountPage />;
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto', mb: -2 }}>
        {renderView()}
      </Box>
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
        {navItems.map((item) => (
          <Box
            key={item.label}
            onClick={() => setView(item.target)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: view === item.target ? 'primary.main' : 'text.secondary',
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {item.icon}
            <Typography sx={{ fontSize: '0.55rem', mt: 0.25, fontWeight: view === item.target ? 600 : 400 }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
