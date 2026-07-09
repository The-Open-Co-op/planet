import { useState } from 'react';
import { Box } from '@mui/material';
import { DemoTabBar } from '@/components/onboarding/DemoTabBar';
import type { DemoTab } from '@/components/onboarding/DemoTabBar';
import { ConversationList } from '@/components/chat/ConversationList';
import { ChatView } from '@/components/chat/ChatView';

interface ChatsScreenProps {
  goToStep?: (slug: string) => void;
}

/** Standalone Chat step — the conversation list with the PNM bottom nav.
 *  Split out from the Home screen so feedback attaches to its own step.
 *  Tapping a conversation (or starting a New Chat) opens it in-frame. */
export const ChatsScreen = ({ goToStep }: ChatsScreenProps = {}) => {
  const [chatContactId, setChatContactId] = useState<string | null>(null);

  const handleTab = (t: DemoTab) => {
    // Already on Chat — return to the list if a conversation is open; else navigate.
    if (t === 'chat') { setChatContactId(null); return; }
    goToStep?.(t);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto', mb: chatContactId ? 0 : -2 }}>
        {chatContactId ? (
          <ChatView contactId={chatContactId} onBack={() => setChatContactId(null)} />
        ) : (
          <ConversationList onConversationClick={(id) => setChatContactId(id)} />
        )}
      </Box>
      <DemoTabBar active="chat" onSelect={handleTab} />
    </Box>
  );
};
