import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  ArrowBack,
  Public,
  FamilyRestroom,
  Favorite,
  Business,
  Groups,
  PersonOutline,
  Home,
  LocationOn,
} from '@mui/icons-material';
import { ProfileInformation } from '@/components/account/AccountPage/ProfileInformation';
import { useTrustProfiles } from '@/hooks/useTrustProfiles';
import { useInviteDraft } from '@/hooks/useInviteDraft';

const ICON_MAP: Record<string, React.ElementType> = {
  Public,
  FamilyRestroom,
  Favorite,
  Business,
  Groups,
  PersonOutline,
  Home,
  LocationOn,
};

interface InviteAsScreenProps {
  onContinue?: () => void;
}

/**
 * Invite Flow — "Invite as:" step.
 * Jonny picks which of his Trust Profiles the new PLANET member will see,
 * with a read-only preview of that profile's details (no sharing settings).
 */
export const InviteAsScreen = ({ onContinue }: InviteAsScreenProps) => {
  const { activeProfiles } = useTrustProfiles();
  const { setSelectedProfileName } = useInviteDraft();
  const publicProfile = activeProfiles.find((p) => p.name === 'Public') ?? activeProfiles[0];
  const [profileId, setProfileId] = useState<string>(publicProfile?.id ?? '');
  const selected = activeProfiles.find((p) => p.id === profileId) ?? activeProfiles[0];

  // Share the choice with later screens (e.g. the share-sheet OG preview).
  useEffect(() => {
    if (selected?.name) setSelectedProfileName(selected.name);
  }, [selected?.name, setSelectedProfileName]);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* App header */}
      <Box sx={{ px: 1.5, pt: 1.5, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton size="small" aria-label="Back">
          <ArrowBack sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
          Invite to PLANET
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', px: 2, pb: 1.5 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.25 }}>
          Invite as:
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 1.5, lineHeight: 1.5 }}>
          Choose which of your profiles to invite as.
        </Typography>

        {/* Profile picker + read-only preview, boxed together */}
        <Box sx={{ border: '1px solid #D4D7DC', borderRadius: '8px' }}>
          <FormControl fullWidth size="small">
            <InputLabel sx={{ bgcolor: 'background.default', px: 0.5 }}>Trust Profile</InputLabel>
            <Select
              value={selected?.id || ''}
              label="Trust Profile"
              onChange={(e) => setProfileId(e.target.value)}
              sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
            >
              {activeProfiles.map((p) => {
                const Icon = ICON_MAP[p.icon || 'Public'] ?? Public;
                const color = p.color || '#6b7280';
                return (
                  <MenuItem key={p.id} value={p.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ color, display: 'flex' }}>
                        <Icon sx={{ fontSize: 18 }} />
                      </Box>
                      <Typography sx={{ color, fontWeight: 500 }}>
                        {p.name}
                      </Typography>
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {selected && (
            <Box sx={{ borderTop: '1px solid #D4D7DC' }}>
              <ProfileInformation cardName={selected.name} isEditing={false} readOnly />
            </Box>
          )}
        </Box>
      </Box>

      {/* CTA */}
      <Box sx={{ p: 1.5, bgcolor: 'background.default', flexShrink: 0 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={onContinue}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            borderColor: '#0066CC',
            color: '#0066CC',
            '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.08)' },
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};
