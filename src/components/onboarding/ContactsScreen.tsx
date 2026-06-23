import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Public, People, ChatBubble, Notifications, ArrowBack } from '@mui/icons-material';
import { OnboardingDemoProvider } from '@/components/demo/DemoContext';
import ContactListPage from '@/pages/ContactListPage';
import ContactViewPage from '@/pages/ContactViewPage';
import CreateContactPage from '@/pages/CreateContactPage';
import { ImportScreen } from '@/components/onboarding/ImportScreen';
import { ChatView } from '@/components/chat/ChatView';

type SubView = 'create' | 'import' | null;

interface ContactsScreenProps {
  goToStep?: (slug: string) => void;
}

/** Bottom-nav targets — map each tab to a real PNM demo step where one exists. */
const NAV_ITEMS = [
  { label: 'Home', icon: <Public sx={{ fontSize: 20 }} />, target: 'home' },
  { label: 'Contacts', icon: <People sx={{ fontSize: 20 }} />, target: 'contacts' },
  { label: 'Chat', icon: <ChatBubble sx={{ fontSize: 20 }} />, target: 'chat' },
  { label: 'Alerts', icon: <Notifications sx={{ fontSize: 20 }} />, target: 'alerts' },
];

/** Standalone Contacts step — the full contacts list with the PNM bottom nav.
 *  Split out from the Home screen so feedback attaches to its own step.
 *  Tapping a contact opens its detail in-frame (not a full-page route). */
export const ContactsScreen = ({ goToStep }: ContactsScreenProps = {}) => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [chatContactId, setChatContactId] = useState<string | null>(null);
  const [subView, setSubView] = useState<SubView>(null);

  const clearDetail = () => { setSelectedContactId(null); setChatContactId(null); setSubView(null); };

  const hasDetail = Boolean(selectedContactId || chatContactId || subView);

  return (
    <OnboardingDemoProvider
      connectedContactIds={[]}
      hideMe={false}
      onContactClick={(id) => setSelectedContactId(id)}
      onChatClick={(id) => setChatContactId(id)}
      onAddContact={() => setSubView('create')}
      onImport={() => setSubView('import')}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflow: 'auto', mb: hasDetail ? 0 : -2 }}>
          {chatContactId ? (
            <ChatView contactId={chatContactId} onBack={clearDetail} />
          ) : selectedContactId ? (
            <ContactViewPage contactId={selectedContactId} onBack={() => setSelectedContactId(null)} />
          ) : subView === 'create' ? (
            <CreateContactPage
              onBack={() => setSubView(null)}
              onSaved={(id) => { setSubView(null); setSelectedContactId(id); }}
            />
          ) : subView === 'import' ? (
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ px: 1, pt: 1 }}>
                <IconButton size="small" onClick={() => setSubView(null)}>
                  <ArrowBack sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
              <Box sx={{ flex: 1, overflow: 'auto' }}>
                <ImportScreen onImport={() => setSubView(null)} />
              </Box>
            </Box>
          ) : (
            <ContactListPage />
          )}
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
          {NAV_ITEMS.map((item) => {
            const active = item.label === 'Contacts';
            return (
              <Box
                key={item.label}
                onClick={() => {
                  if (active) {
                    // Already on Contacts — return to the list if a detail is open.
                    clearDetail();
                    return;
                  }
                  goToStep?.(item.target);
                }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: active ? 'primary.main' : 'text.secondary',
                  cursor: 'pointer',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {item.icon}
                <Typography sx={{ fontSize: '0.55rem', mt: 0.25, fontWeight: active ? 600 : 400 }}>
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </OnboardingDemoProvider>
  );
};
