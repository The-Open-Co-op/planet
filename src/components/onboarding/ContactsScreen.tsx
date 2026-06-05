import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Public, People, ChatBubble, Notifications } from '@mui/icons-material';
import { OnboardingDemoProvider } from '@/components/demo/DemoContext';
import ContactListPage from '@/pages/ContactListPage';
import ContactViewPage from '@/pages/ContactViewPage';
import { ChatView } from '@/components/chat/ChatView';

interface ContactsScreenProps {
  goToStep?: (slug: string) => void;
}

/** Bottom-nav targets — map each tab to a real PNM demo step where one exists. */
const NAV_ITEMS = [
  { label: 'Home', icon: <Public sx={{ fontSize: 20 }} />, target: 'home' },
  { label: 'Contacts', icon: <People sx={{ fontSize: 20 }} />, target: 'contacts' },
  { label: 'Chat', icon: <ChatBubble sx={{ fontSize: 20 }} />, target: 'reactions' },
  { label: 'Alerts', icon: <Notifications sx={{ fontSize: 20 }} />, target: 'alerts' },
];

/** Standalone Contacts step — the full contacts list with the PNM bottom nav.
 *  Split out from the Home screen so feedback attaches to its own step.
 *  Tapping a contact opens its detail in-frame (not a full-page route). */
export const ContactsScreen = ({ goToStep }: ContactsScreenProps = {}) => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [chatContactId, setChatContactId] = useState<string | null>(null);

  const clearDetail = () => { setSelectedContactId(null); setChatContactId(null); };

  return (
    <OnboardingDemoProvider
      connectedContactIds={[]}
      hideMe={false}
      onContactClick={(id) => setSelectedContactId(id)}
      onChatClick={(id) => setChatContactId(id)}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflow: 'auto', mb: (selectedContactId || chatContactId) ? 0 : -2 }}>
          {chatContactId ? (
            <ChatView contactId={chatContactId} onBack={clearDetail} />
          ) : selectedContactId ? (
            <ContactViewPage contactId={selectedContactId} onBack={() => setSelectedContactId(null)} />
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
