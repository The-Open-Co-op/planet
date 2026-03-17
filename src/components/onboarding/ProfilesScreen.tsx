import { Box, Typography, Button } from '@mui/material';
import { MeContactView } from '@/components/contacts/MeContactView/MeContactView';

interface ProfilesScreenProps {
  onDone?: () => void;
}

/** Step 07 — My Profiles */
export const ProfilesScreen = ({ onDone }: ProfilesScreenProps) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          My Profiles
        </Typography>
      </Box>

      {/* Real MeContactView */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2, pt: 1 }}>
        <MeContactView contact={{ '@id': 'me', isMe: true } as any} />
      </Box>

      {/* Done button */}
      <Box sx={{
        p: 1.5,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.default',
        flexShrink: 0,
      }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={onDone}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            borderColor: '#0066CC',
            color: '#0066CC',
            '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.1)' },
          }}
        >
          Done? Invite and Vouch for Contacts
        </Button>
      </Box>
    </Box>
  );
};
