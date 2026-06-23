import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Public, People, ChatBubble, Notifications } from '@mui/icons-material';
import { ConversationList } from '@/components/chat/ConversationList';
import { ChatView } from '@/components/chat/ChatView';

interface ChatsScreenProps {
  goToStep?: (slug: string) => void;
}

/** Bottom-nav targets — map each tab to a real PNM demo step where one exists. */
const NAV_ITEMS = [
  { label: 'Home', icon: <Public sx={{ fontSize: 20 }} />, target: 'home' },
  { label: 'Contacts', icon: <People sx={{ fontSize: 20 }} />, target: 'contacts' },
  { label: 'Chat', icon: <ChatBubble sx={{ fontSize: 20 }} />, target: 'chat' },
  { label: 'Alerts', icon: <Notifications sx={{ fontSize: 20 }} />, target: 'alerts' },
];

/** Standalone Chat step — the conversation list with the PNM bottom nav.
 *  Split out from the Home screen so feedback attaches to its own step.
 *  Tapping a conversation (or starting a New Chat) opens it in-frame. */
export const ChatsScreen = ({ goToStep }: ChatsScreenProps = {}) => {
  const [chatContactId, setChatContactId] = useState<string | null>(null);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto', mb: chatContactId ? 0 : -2 }}>
        {chatContactId ? (
          <ChatView contactId={chatContactId} onBack={() => setChatContactId(null)} />
        ) : (
          <ConversationList onConversationClick={(id) => setChatContactId(id)} />
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
          const active = item.label === 'Chat';
          return (
            <Box
              key={item.label}
              onClick={() => {
                if (active) {
                  // Already on Chat — return to the list if a conversation is open.
                  setChatContactId(null);
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
  );
};
