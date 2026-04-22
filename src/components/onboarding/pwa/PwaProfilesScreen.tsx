import { Box, Typography, Button } from '@mui/material';
import { Person } from '@mui/icons-material';
import { MeContactView } from '@/components/contacts/MeContactView/MeContactView';

interface PwaProfilesScreenProps {
  onDone?: () => void;
}

/** Step 06 (PWA) — Profile setup form, with optional vCard import. */
export const PwaProfilesScreen = ({ onDone }: PwaProfilesScreenProps) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{
        px: 2,
        pt: 1.5,
        pb: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
      }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          My Profiles
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<Person sx={{ fontSize: 16 }} />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 1.5,
            borderColor: '#0066CC',
            color: '#0066CC',
            fontSize: '0.7rem',
            py: 0.25,
            px: 1.25,
            '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.08)' },
          }}
        >
          Import My vCard
        </Button>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', p: 2, pt: 1 }}>
        <MeContactView contact={{ '@id': 'me', isMe: true } as any} />
      </Box>

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
          Continue
        </Button>
      </Box>
    </Box>
  );
};
