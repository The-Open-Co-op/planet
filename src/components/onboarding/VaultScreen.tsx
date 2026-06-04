import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Public, People, ChatBubble, Notifications } from '@mui/icons-material';
import { AccountPage } from '@/components/account/AccountPage';
import AppsPage from '@/pages/AppsPage';
import ContactListPage from '@/pages/ContactListPage';
import { ConversationList } from '@/components/chat/ConversationList';
import { NotificationsPage } from '@/components/notifications/NotificationsPage';

type VaultView = 'vault' | 'home' | 'contacts' | 'chat' | 'alerts';

interface VaultScreenProps {
  reportStep?: (slug: string, title: string) => void;
}

/** Sub-view → feedback context. Slugs namespaced under the parent 'vault' step. */
const VIEW_FEEDBACK: Record<VaultView, { slug: string; title: string }> = {
  vault: { slug: 'vault', title: 'Vault' },
  home: { slug: 'vault:home', title: 'Vault → Home' },
  contacts: { slug: 'vault:contacts', title: 'Vault → Contacts' },
  chat: { slug: 'vault:chat', title: 'Vault → Chat' },
  alerts: { slug: 'vault:alerts', title: 'Vault → Alerts' },
};

/** Step 10 — Vault with navigable demo nav */
export const VaultScreen = ({ reportStep }: VaultScreenProps = {}) => {
  const [view, setView] = useState<VaultView>('vault');

  // Attach feedback to the sub-view, not just the parent 'vault' step.
  useEffect(() => {
    const ctx = VIEW_FEEDBACK[view];
    reportStep?.(ctx.slug, ctx.title);
  }, [view, reportStep]);

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
