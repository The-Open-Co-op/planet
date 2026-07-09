import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { DemoTabBar } from '@/components/onboarding/DemoTabBar';
import type { DemoTab } from '@/components/onboarding/DemoTabBar';
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

/** Standalone Contacts step — the full contacts list with the PNM bottom nav.
 *  Split out from the Home screen so feedback attaches to its own step.
 *  Tapping a contact opens its detail in-frame (not a full-page route). */
export const ContactsScreen = ({ goToStep }: ContactsScreenProps = {}) => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [chatContactId, setChatContactId] = useState<string | null>(null);
  const [subView, setSubView] = useState<SubView>(null);

  const clearDetail = () => { setSelectedContactId(null); setChatContactId(null); setSubView(null); };

  const handleTab = (t: DemoTab) => {
    // Already on Contacts — return to the list if a detail is open; else navigate.
    if (t === 'contacts') { clearDetail(); return; }
    goToStep?.(t);
  };

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
        <DemoTabBar active="contacts" onSelect={handleTab} />
      </Box>
    </OnboardingDemoProvider>
  );
};
