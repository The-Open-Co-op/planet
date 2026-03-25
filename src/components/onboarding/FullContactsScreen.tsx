import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Public, People, ChatBubble, Notifications } from '@mui/icons-material';
import { OnboardingDemoProvider } from '@/components/demo/DemoContext';
import ContactListPage from '@/pages/ContactListPage';
import ContactViewPage from '@/pages/ContactViewPage';
import { ChatView } from '@/components/chat/ChatView';
import { dataService } from '@/services/dataService';
import { chatStore } from '@/mocks/chat';
import type { AnnotationItem } from '@/components/demo/Annotation';

type AnnotationWithCategory = AnnotationItem & { category: 'ui' | 'protocol' };

interface FullContactsScreenProps {
  setDynamicAnnotations?: (annotations: AnnotationWithCategory[] | null) => void;
}

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
      { label: 'Home', icon: <Public sx={{ fontSize: 20 }} /> },
      { label: 'Contacts', icon: <People sx={{ fontSize: 20, color: 'primary.main' }} />, active: true },
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

/** Annotations for connected PLANET members */
const connectedMemberAnnotations: AnnotationWithCategory[] = [
  {
    side: 'right', top: 50, category: 'ui',
    title: 'Chat & Vouch',
    description: 'Connected members can chat via DIDComm and send Vouches.',
    tag: 'UX',
  },
  {
    side: 'left', top: 65, category: 'ui',
    title: 'Trust Profiles',
    description: 'Assign contacts to one or more Trust Profiles to control what they can see.',
    tag: 'UX',
  },
  {
    side: 'right', top: 80, category: 'protocol',
    title: 'Verifiable credentials',
    description: 'Vouches are issued as Verifiable Relationship Credentials, cryptographically signed by the issuer.',
    tag: 'Backend',
  },
];

/** Annotations for unconnected PLANET members */
const unconnectedMemberAnnotations: AnnotationWithCategory[] = [
  {
    side: 'right', top: 45, category: 'ui',
    title: 'Connect first',
    description: 'This contact is a PLANET member but not yet connected. Tap Connect and choose a Trust Profile to connect with.',
    tag: 'UX',
  },
  {
    side: 'left', top: 65, category: 'ui',
    title: 'Connection pending',
    description: 'After connecting, the request is pending until the other party accepts. Chat and Vouch become available once accepted.',
    tag: 'UX',
  },
  {
    side: 'right', top: 80, category: 'protocol',
    title: 'R-DID exchange',
    description: 'Accepting a connection request exchanges R-DIDs and establishes the DIDComm channel.',
    tag: 'Backend',
  },
];

/** Annotations for non-members */
const nonMemberAnnotations: AnnotationWithCategory[] = [
  {
    side: 'right', top: 42, category: 'ui',
    title: 'Contact info',
    description: "Tap the 'i' to reveal their PLANET status and connection details.",
    tag: 'UX',
  },
  {
    side: 'left', top: 55, category: 'ui',
    title: 'Invite to PLANET',
    description: 'This contact is not yet a PLANET member — Jonny can invite them to join.',
    tag: 'UX',
  },
];

/** Step 08 — Full Contacts with My Profiles visible */
export const FullContactsScreen = ({ setDynamicAnnotations }: FullContactsScreenProps) => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [chatContactId, setChatContactId] = useState<string | null>(null);

  // Update annotations when contact is selected/deselected
  useEffect(() => {
    if (selectedContactId === 'contact:me') {
      // My Profiles view — clear annotations
      setDynamicAnnotations?.([]);
      return;
    }
    if (selectedContactId) {
      dataService.getContact(selectedContactId).then(contact => {
        const isMember = contact?.planetStatus?.value === 'member';
        const isConnected = !!chatStore.getConversation(selectedContactId);
        if (isMember && isConnected) {
          setDynamicAnnotations?.(connectedMemberAnnotations);
        } else if (isMember) {
          setDynamicAnnotations?.(unconnectedMemberAnnotations);
        } else {
          setDynamicAnnotations?.(nonMemberAnnotations);
        }
      }).catch(() => {
        setDynamicAnnotations?.(nonMemberAnnotations);
      });
    } else {
      setDynamicAnnotations?.(null);
    }
  }, [selectedContactId, setDynamicAnnotations]);

  return (
    <OnboardingDemoProvider
      connectedContactIds={[]}
      hideMe={false}
      onContactClick={(id) => setSelectedContactId(id)}
      onChatClick={(id) => { setChatContactId(id); }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflow: 'auto', mb: (selectedContactId || chatContactId) ? 0 : -2 }}>
          {chatContactId ? (
            <ChatView
              contactId={chatContactId}
              onBack={() => { setChatContactId(null); setSelectedContactId(null); }}
            />
          ) : selectedContactId ? (
            <ContactViewPage
              contactId={selectedContactId}
              onBack={() => setSelectedContactId(null)}
            />
          ) : (
            <ContactListPage />
          )}
        </Box>
        <DemoNav />
      </Box>
    </OnboardingDemoProvider>
  );
};
