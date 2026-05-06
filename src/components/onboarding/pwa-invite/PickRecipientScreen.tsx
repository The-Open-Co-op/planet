import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
  IconButton,
} from '@mui/material';
import { ArrowBack, Search } from '@mui/icons-material';
import type { AnnotationItem } from '@/components/demo/Annotation';

type AnnotationWithCategory = AnnotationItem & { category: 'ui' | 'protocol' };

const sharedBackend: AnnotationWithCategory = {
  side: 'right', top: 30, category: 'protocol',
  title: 'Token + OG image generated',
  description: 'On Continue, the client asks the server for a single-use invite token bound to the chosen first name. Server returns a short URL (planetnetwork.app/j/xxx) and a custom OG image personalised with Jonny\'s avatar and the recipient\'s name. Token expires after 7 days.',
  tag: 'Backend',
};

const iosPickerAnnotations: AnnotationWithCategory[] = [
  sharedBackend,
  {
    side: 'left', top: 30, category: 'ui',
    title: 'iPhone — type the first name',
    description: 'Safari does not expose a Contact Picker API by default, so we keep it simple — just a first name to personalise the welcome message. The actual contact info is implicit in whichever channel the user shares through next.',
    tag: 'UX',
  },
  {
    side: 'left', top: 75, category: 'ui',
    title: 'Privacy by default',
    description: 'PLANET never reads the user\'s phonebook. Nothing leaves the device until they tap Share.',
    tag: 'UX',
  },
];

const androidPickerAnnotations: AnnotationWithCategory[] = [
  sharedBackend,
  {
    side: 'left', top: 30, category: 'ui',
    title: 'Android — Contact Picker API',
    description: 'navigator.contacts.select() opens the OS contact picker. The user picks one contact; PLANET only receives the field(s) it asked for (here: name).',
    tag: 'UX',
  },
  {
    side: 'left', top: 75, category: 'ui',
    title: 'Privacy by default',
    description: 'PLANET never reads the full phonebook — only the single contact the user picks. Nothing else leaves the device.',
    tag: 'UX',
  },
];

export const iosPickerDefaultAnnotations = iosPickerAnnotations;

interface PickRecipientScreenProps {
  onContinue?: () => void;
  setDynamicAnnotations?: (annotations: AnnotationWithCategory[] | null) => void;
}

type Platform = 'ios' | 'android';

const ANDROID_CONTACTS = [
  { id: 'c1', name: 'Alexander Petrov', initials: 'AP' },
  { id: 'c2', name: 'Amanda Foster', initials: 'AF' },
  { id: 'c3', name: 'Brad Wilson', initials: 'BW' },
  { id: 'c4', name: 'John Smith', initials: 'J', highlight: true },
  { id: 'c5', name: 'Kevin Yang', initials: 'KY' },
  { id: 'c6', name: 'Maya Chen', initials: 'MC' },
];

export const PickRecipientScreen = ({ onContinue, setDynamicAnnotations }: PickRecipientScreenProps) => {
  const [platform, setPlatform] = useState<Platform>('ios');
  const [name, setName] = useState('John');
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) setPlatform('android');
    else if (/iphone|ipad|ipod/i.test(ua)) setPlatform('ios');
  }, []);

  useEffect(() => {
    if (!setDynamicAnnotations) return;
    setDynamicAnnotations(platform === 'android' ? androidPickerAnnotations : null);
  }, [platform, setDynamicAnnotations]);

  const canContinue = platform === 'ios' ? name.trim().length >= 1 : Boolean(picked);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* App header */}
      <Box sx={{
        px: 1.5,
        pt: 1.5,
        pb: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}>
        <IconButton size="small" aria-label="Back">
          <ArrowBack sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
          Invite to PLANET
        </Typography>
      </Box>

      {/* Platform toggle */}
      <Box sx={{ px: 2, pb: 1.5 }}>
        <ToggleButtonGroup
          value={platform}
          exclusive
          size="small"
          onChange={(_, v) => v && setPlatform(v)}
          sx={{
            '& .MuiToggleButton-root': {
              textTransform: 'none',
              fontSize: '0.7rem',
              fontWeight: 600,
              py: 0.25,
              px: 1.25,
              color: '#0066CC',
              borderColor: '#0066CC',
              '&.Mui-selected': { bgcolor: 'rgba(0,102,204,0.12)', color: '#0066CC' },
            },
          }}
        >
          <ToggleButton value="ios">iPhone</ToggleButton>
          <ToggleButton value="android">Android</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', px: 2 }}>
        {platform === 'ios' ? (
          <IosForm name={name} onChange={setName} />
        ) : (
          <AndroidPicker pickedId={picked} onPick={setPicked} />
        )}
      </Box>

      {/* CTA */}
      <Box sx={{ p: 1.5, bgcolor: 'background.default', flexShrink: 0 }}>
        <Button
          variant="outlined"
          fullWidth
          disabled={!canContinue}
          onClick={onContinue}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            borderColor: '#0066CC',
            color: '#0066CC',
            '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.08)' },
            '&.Mui-disabled': { borderColor: 'divider', color: 'text.disabled' },
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

const IosForm = ({ name, onChange }: { name: string; onChange: (v: string) => void }) => (
  <Box>
    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.25 }}>
      Who are you inviting?
    </Typography>
    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 2, lineHeight: 1.5 }}>
      We'll personalise the invite message with their first name.
    </Typography>
    <TextField
      fullWidth
      size="small"
      label="First name"
      value={name}
      onChange={(e) => onChange(e.target.value)}
      autoFocus
    />
    <Typography sx={{ fontSize: '0.7rem', color: 'text.disabled', mt: 1.25, lineHeight: 1.5 }}>
      You'll send the link via WhatsApp, iMessage, email — whatever you normally use to talk to them.
    </Typography>
  </Box>
);

const AndroidPicker = ({ pickedId, onPick }: { pickedId: string | null; onPick: (id: string) => void }) => (
  <Box>
    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.25 }}>
      Pick a contact
    </Typography>
    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 1.5, lineHeight: 1.5 }}>
      Choose who you'd like to invite — only the name is shared with PLANET.
    </Typography>

    {/* Faux Android contact picker */}
    <Box sx={{
      bgcolor: 'white',
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'hidden',
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 1.25,
        py: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'rgba(0,0,0,0.02)',
      }}>
        <Search sx={{ fontSize: 16, color: 'text.disabled' }} />
        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
          Search contacts
        </Typography>
      </Box>
      {ANDROID_CONTACTS.map((c) => {
        const isPicked = pickedId === c.id;
        return (
          <Box
            key={c.id}
            onClick={() => onPick(c.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              px: 1.25,
              py: 0.875,
              borderBottom: '1px solid',
              borderColor: 'divider',
              cursor: 'pointer',
              bgcolor: isPicked ? 'rgba(0,102,204,0.08)' : 'transparent',
              '&:hover': { bgcolor: isPicked ? 'rgba(0,102,204,0.12)' : 'action.hover' },
              '&:last-child': { borderBottom: 'none' },
            }}
          >
            <Avatar sx={{
              width: 32,
              height: 32,
              fontSize: '0.7rem',
              bgcolor: isPicked ? '#0066CC' : 'grey.300',
              color: isPicked ? 'white' : 'text.secondary',
            }}>
              {c.initials}
            </Avatar>
            <Typography sx={{ fontSize: '0.82rem', fontWeight: isPicked ? 600 : 400, flex: 1 }}>
              {c.name}
            </Typography>
            {isPicked && (
              <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: 'primary.main', letterSpacing: 0.5 }}>
                SELECTED
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  </Box>
);
