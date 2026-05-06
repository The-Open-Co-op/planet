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
  description: 'On Continue, the client asks the server for a single-use invite token bound to the chosen first name. Server returns a short URL (planetnetwork.app/j/xxx) and a custom OG image personalised with Jonny\'s avatar — so the invitee instantly recognises someone they trust. Token expires after 7 days.',
  tag: 'Backend',
};

const iosPickerAnnotations: AnnotationWithCategory[] = [
  sharedBackend,
  {
    side: 'left', top: 30, category: 'ui',
    title: 'iPhone — type the first name',
    description: 'iOS does not expose a Contact Picker API by default, so we capture a first name to personalise the welcome message.',
    tag: 'UX',
  },
];

const androidPickerAnnotations: AnnotationWithCategory[] = [
  sharedBackend,
  {
    side: 'left', top: 30, category: 'ui',
    title: 'Android — Contact Picker API',
    description: 'The browser opens the device\'s native contact picker. The user picks one contact; PLANET only receives the field(s) it asked for (here: name).',
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
  { id: 'c1', name: 'Aisha Rahman', initials: 'AR' },
  { id: 'c2', name: 'Andre Beaumont', initials: 'AB' },
  { id: 'c3', name: 'Beatriz Salgado', initials: 'BS' },
  { id: 'c4', name: 'Caoimhe O\'Donnell', initials: 'CO' },
  { id: 'c5', name: 'Daniel Ofori', initials: 'DO' },
  { id: 'c6', name: 'Eleni Vasilakis', initials: 'EV' },
  { id: 'c7', name: 'Felix Brandt', initials: 'FB' },
  { id: 'c8', name: 'Greg Hollis', initials: 'GH' },
  { id: 'c9', name: 'Hannah Lindqvist', initials: 'HL' },
  { id: 'c10', name: 'Helena Kowalski', initials: 'HK' },
  { id: 'c11', name: 'Ibrahim Diallo', initials: 'ID' },
  { id: 'c12', name: 'Jasmine Acharya', initials: 'JA' },
  { id: 'c13', name: 'Kenji Watanabe', initials: 'KW' },
  { id: 'c14', name: 'Lara Castellanos', initials: 'LC' },
  { id: 'c15', name: 'Mei Chen', initials: 'MC' },
  { id: 'c16', name: 'Mike Smith', initials: 'M', highlight: true },
  { id: 'c17', name: 'Nadia Haddad', initials: 'NH' },
  { id: 'c18', name: 'Oluwaseun Ade', initials: 'OA' },
  { id: 'c19', name: 'Priya Ramaswamy', initials: 'PR' },
  { id: 'c20', name: 'Rafael Moreno', initials: 'RM' },
  { id: 'c21', name: 'Rosa Schreiner', initials: 'RS' },
  { id: 'c22', name: 'Samira Khoury', initials: 'SK' },
  { id: 'c23', name: 'Tariq Bashir', initials: 'TB' },
  { id: 'c24', name: 'Tomoko Hayashi', initials: 'TH' },
  { id: 'c25', name: 'Viktor Novak', initials: 'VN' },
  { id: 'c26', name: 'Wren Cavendish', initials: 'WC' },
  { id: 'c27', name: 'Yusuf Demir', initials: 'YD' },
  { id: 'c28', name: 'Zara Whitfield', initials: 'ZW' },
];

export const PickRecipientScreen = ({ onContinue, setDynamicAnnotations }: PickRecipientScreenProps) => {
  const [platform, setPlatform] = useState<Platform>('ios');
  const [name, setName] = useState('Mike');
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

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {platform === 'ios' ? (
          <Box sx={{ px: 2 }}>
            <IosForm name={name} onChange={setName} />
          </Box>
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
  </Box>
);

const AndroidPicker = ({ pickedId, onPick }: { pickedId: string | null; onPick: (id: string) => void }) => (
  <Box>
    {/* Faux Android contact picker */}
    <Box sx={{
      bgcolor: 'white',
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
          Search phone contacts
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
