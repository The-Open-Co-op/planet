import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Button,
} from '@mui/material';
import {
  Image as ImageIcon,
  Public,
  FamilyRestroom,
  Favorite,
  Business,
  Groups,
} from '@mui/icons-material';
import { useTrustProfiles } from '@/hooks/useTrustProfiles';
import { blogBanner } from '@/mocks/blogDemo';

const ICON_MAP: Record<string, React.ElementType> = {
  Public,
  FamilyRestroom,
  Favorite,
  Business,
  Groups,
};

type Visibility = 'public' | 'members' | 'draft';

export const BlogSettingsScreen = () => {
  const [title, setTitle] = useState("Jonny's Field Notes");
  const [tagline, setTagline] = useState('Notes from the regenerative edge');
  const [defaultVisibility, setDefaultVisibility] = useState<Visibility>('public');
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [contactFormEnabled, setContactFormEnabled] = useState(true);
  const { activeProfiles } = useTrustProfiles();
  const publicProfile = activeProfiles.find((p) => p.name === 'Public') ?? activeProfiles[0];
  const [profileId, setProfileId] = useState<string>(publicProfile?.id ?? '');

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Blog settings</Typography>
        <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
          Identity, profile, and moderation
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', px: 2, pb: 1.5 }}>
        <Box
          sx={{
            height: 70,
            borderRadius: 1.5,
            backgroundImage: `url(${blogBanner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            mb: 1,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: 6,
              right: 6,
              bgcolor: 'rgba(0,0,0,0.6)',
              color: '#fff',
              borderRadius: 1,
              px: 0.75,
              py: 0.25,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <ImageIcon sx={{ fontSize: 12 }} />
            <Typography sx={{ fontSize: '0.6rem' }}>Change banner</Typography>
          </Box>
        </Box>

        <TextField
          fullWidth
          size="small"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
              sx: { fontSize: '0.65rem', bgcolor: 'background.default', px: 0.5, top: 0, transform: 'translate(12px, -50%) scale(1)' },
            },
            input: { notched: true },
          }}
          sx={{ mt: 0.75, mb: 1.25 }}
        />
        <TextField
          fullWidth
          size="small"
          label="Tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true,
              sx: { fontSize: '0.65rem', bgcolor: 'background.default', px: 0.5, top: 0, transform: 'translate(12px, -50%) scale(1)' },
            },
            input: { notched: true },
          }}
          sx={{ mb: 1.25 }}
        />

        <FormControl fullWidth size="small" sx={{ mb: 1.25 }}>
          <InputLabel sx={{ bgcolor: 'background.default', px: 0.5 }}>Trust Profile</InputLabel>
          <Select
            value={profileId}
            label="Trust Profile"
            onChange={(e) => setProfileId(e.target.value)}
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
                    <Typography sx={{ color, fontWeight: 500, fontSize: '0.85rem' }}>
                      {p.name}
                    </Typography>
                  </Box>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
          <InputLabel sx={{ bgcolor: 'background.default', px: 0.5 }}>Default visibility for new posts</InputLabel>
          <Select
            value={defaultVisibility}
            label="Default visibility for new posts"
            onChange={(e) => setDefaultVisibility(e.target.value as Visibility)}
          >
            <MenuItem value="public">Public</MenuItem>
            <MenuItem value="members">PLANET Members only</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ p: 1.25, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', mb: 1.25 }}>
          <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, mb: 1, color: '#0066CC' }}>
            Moderation
          </Typography>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={commentsEnabled}
                onChange={(e) => setCommentsEnabled(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#0066CC' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#0066CC' },
                }}
              />
            }
            label={<Typography sx={{ fontSize: '0.72rem' }}>Allow comments across the blog</Typography>}
            labelPlacement="start"
            sx={{ display: 'flex', justifyContent: 'space-between', ml: 0, mr: 0, mb: 1 }}
          />
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={contactFormEnabled}
                onChange={(e) => setContactFormEnabled(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#0066CC' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#0066CC' },
                }}
              />
            }
            label={<Typography sx={{ fontSize: '0.72rem' }}>Show contact form on profile</Typography>}
            labelPlacement="start"
            sx={{ display: 'flex', justifyContent: 'space-between', ml: 0, mr: 0 }}
          />
        </Box>
      </Box>

      <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            bgcolor: '#0066CC',
            '&:hover': { bgcolor: '#0052a3' },
          }}
        >
          Save changes
        </Button>
      </Box>
    </Box>
  );
};
