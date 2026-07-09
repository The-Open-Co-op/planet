import { Box } from '@mui/material';
import { ChatView } from '@/components/chat/ChatView';
import { DemoTabBar } from '@/components/onboarding/DemoTabBar';

/** Step 09 — Chat with emoji reactions / micro-VRCs */
export const EmojiVRCScreen = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <ChatView contactId="contact:1" onBack={null} />
      </Box>
      <DemoTabBar active="chat" />
    </Box>
  );
};
