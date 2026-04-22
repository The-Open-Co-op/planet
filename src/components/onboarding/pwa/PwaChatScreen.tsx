import { Box, Button } from '@mui/material';
import { ChatView } from '@/components/chat/ChatView';

interface PwaChatScreenProps {
  onNext?: () => void;
}

/** Step 04 (PWA) — Chat lands first; CTA routes to recovery/secure-account, not import. */
export const PwaChatScreen = ({ onNext }: PwaChatScreenProps) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <ChatView contactId="contact:1" onBack={null} />
      </Box>
      <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.default', flexShrink: 0 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={onNext}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            borderColor: '#0066CC',
            color: '#0066CC',
            '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.1)' },
          }}
        >
          Secure your account
        </Button>
      </Box>
    </Box>
  );
};
