import { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { VerifiedUser, ChevronRight, ArrowBack } from '@mui/icons-material';
import { AccountPage } from '@/components/account/AccountPage';
import AppsPage from '@/pages/AppsPage';
import ContactListPage from '@/pages/ContactListPage';
import { ConversationList } from '@/components/chat/ConversationList';
import { NotificationsPage } from '@/components/notifications/NotificationsPage';
import { CredentialVault } from '@/components/trust-demo/CredentialVault';
import { SARAH_VAULT } from '@/components/trust-demo/trustDemoData';
import { DemoTabBar } from '@/components/onboarding/DemoTabBar';
import type { DemoTab } from '@/components/onboarding/DemoTabBar';

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

/** Entry row (under the Vault title) that opens the credentials screen. */
const MyCredentialsEntry = ({ onOpen }: { onOpen: () => void }) => (
  <Box
    onClick={onOpen}
    sx={{
      mb: 2,
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
        // Main vault — My Credentials sits under the "Vault" title, above settings.
        return (
          <Box sx={{ height: '100%', overflow: 'auto' }}>
            <AccountPage topContent={<MyCredentialsEntry onOpen={() => setView('credentials')} />} />
          </Box>
        );
    }
  };

  const activeTab: DemoTab = view === 'credentials' ? 'vault' : view;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto', mb: -2 }}>
        {renderView()}
      </Box>
      <DemoTabBar active={activeTab} onSelect={(t) => setView(t)} />
    </Box>
  );
};
