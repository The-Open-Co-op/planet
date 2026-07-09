import { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import {
  Public,
  People,
  ChatBubble,
  Notifications,
  AccountBalanceWallet,
  VerifiedUser,
  ChevronRight,
  ArrowBack,
} from '@mui/icons-material';
import { AccountPage } from '@/components/account/AccountPage';
import AppsPage from '@/pages/AppsPage';
import ContactListPage from '@/pages/ContactListPage';
import { ConversationList } from '@/components/chat/ConversationList';
import { NotificationsPage } from '@/components/notifications/NotificationsPage';
import { CredentialVault } from '@/components/trust-demo/CredentialVault';
import { SARAH_VAULT } from '@/components/trust-demo/trustDemoData';

type VaultView = 'vault' | 'credentials' | 'home' | 'contacts' | 'chat' | 'alerts';

interface VaultScreenProps {
  reportStep?: (slug: string, title: string) => void;
  /** Which view to open on. Defaults to the main vault. */
  initialView?: VaultView;
}

/** Sub-view → feedback context. Slugs namespaced under the parent 'vault' step. */
const VIEW_FEEDBACK: Record<VaultView, { slug: string; title: string }> = {
  vault: { slug: 'vault', title: 'Vault' },
  credentials: { slug: 'vault:credentials', title: 'Vault → My Credentials' },
  home: { slug: 'vault:home', title: 'Vault → Home' },
  contacts: { slug: 'vault:contacts', title: 'Vault → Contacts' },
  chat: { slug: 'vault:chat', title: 'Vault → Chat' },
  alerts: { slug: 'vault:alerts', title: 'Vault → Alerts' },
};

/** Entry row inside the main vault that opens the credentials screen. */
const MyCredentialsEntry = ({ onOpen }: { onOpen: () => void }) => (
  <Box
    onClick={onOpen}
    sx={{
      m: 1.5,
      p: 1.75,
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      borderRadius: 2.5,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      cursor: 'pointer',
      '&:hover': { borderColor: 'grey.300', boxShadow: 1 },
    }}
  >
    <VerifiedUser sx={{ color: '#0066CC' }} />
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography sx={{ fontWeight: 700, lineHeight: 1.3 }}>My Credentials</Typography>
      <Typography variant="caption" color="text.secondary">
        {SARAH_VAULT.length} verifiable credentials
      </Typography>
    </Box>
    <ChevronRight sx={{ color: 'text.secondary' }} />
  </Box>
);

/** Main PNM vault — identity, credentials and settings. Lands on the vault. */
export const VaultScreen = ({ reportStep, initialView = 'vault' }: VaultScreenProps = {}) => {
  const [view, setView] = useState<VaultView>(initialView);

  // Attach feedback to the sub-view, not just the parent 'vault' step.
  useEffect(() => {
    const ctx = VIEW_FEEDBACK[view];
    reportStep?.(ctx.slug, ctx.title);
  }, [view, reportStep]);

  const navItems = [
    { label: 'Vault', icon: <AccountBalanceWallet sx={{ fontSize: 20 }} />, target: 'vault' as VaultView },
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
      case 'credentials':
        return (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1, py: 0.5, flexShrink: 0 }}>
              <IconButton size="small" onClick={() => setView('vault')} aria-label="Back to vault">
                <ArrowBack sx={{ fontSize: 18 }} />
              </IconButton>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Vault
              </Typography>
            </Box>
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <CredentialVault
                title="My Credentials"
                caption="Verifiable credentials, held only by you"
              />
            </Box>
          </Box>
        );
      default:
        // Main vault — the credentials entry sits alongside identity & settings.
        return (
          <Box sx={{ height: '100%', overflow: 'auto' }}>
            <MyCredentialsEntry onOpen={() => setView('credentials')} />
            <AccountPage />
          </Box>
        );
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
              color: view === item.target || (item.target === 'vault' && view === 'credentials')
                ? 'primary.main'
                : 'text.secondary',
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
