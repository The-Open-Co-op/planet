import { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress, Button } from '@mui/material';
import { OnboardingDemoProvider } from '@/components/demo/DemoContext';
import ContactListPage from '@/pages/ContactListPage';

/** Step 06 — Import progress then real Contacts UI */
interface ContactsOverviewScreenProps {
  onSetupProfiles?: () => void;
}

export const ContactsOverviewScreen = ({ onSetupProfiles }: ContactsOverviewScreenProps) => {
  const [phase, setPhase] = useState<'importing' | 'done'>('importing');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 18 + 8;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('done'), 400);
          return 100;
        }
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  if (phase === 'importing') {
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            Importing contacts...
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ width: '100%', height: 6, borderRadius: 3 }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            {Math.round(progress)}%
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <OnboardingDemoProvider connectedContactIds={['contact:1']} hideMe>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflow: 'auto', mb: -2 }}>
          <ContactListPage onboardingMode connectedContactIds={['contact:1']} />
        </Box>
        <DemoProfilesNav onSetupProfiles={onSetupProfiles} />
      </Box>
    </OnboardingDemoProvider>
  );
};

const DemoProfilesNav = ({ onSetupProfiles }: { onSetupProfiles?: () => void }) => {
  return (
    <Box sx={{ position: 'relative', flexShrink: 0 }}>
      <Box
        sx={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          mb: 0.5,
          px: 1.5,
          py: 0.75,
          bgcolor: '#0066CC',
          color: 'white',
          borderRadius: 1.5,
          whiteSpace: 'nowrap',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            border: '5px solid transparent',
            borderTopColor: '#0066CC',
          },
        }}
      >
        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600 }}>
          Set up your profiles to connect to contacts
        </Typography>
      </Box>
      <Box sx={{
        p: 1.5,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.default',
      }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={onSetupProfiles}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            borderColor: '#0066CC',
            color: '#0066CC',
            '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.1)' },
          }}
        >
          Set Up Your Profiles
        </Button>
      </Box>
    </Box>
  );
};
