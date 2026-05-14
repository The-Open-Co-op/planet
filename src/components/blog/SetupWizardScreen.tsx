import { useState } from 'react';
import { Box, Typography, Avatar, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {
  Image as ImageIcon,
  CheckCircle,
  Public,
  FamilyRestroom,
  Favorite,
  Business,
  Groups,
} from '@mui/icons-material';
import { useTrustProfiles } from '@/hooks/useTrustProfiles';
import { jonny, blogBanner } from '@/mocks/blogDemo';

const ICON_MAP: Record<string, React.ElementType> = {
  Public,
  FamilyRestroom,
  Favorite,
  Business,
  Groups,
};

interface SetupWizardScreenProps {
  onContinue?: () => void;
}

export const SetupWizardScreen = ({ onContinue }: SetupWizardScreenProps) => {
  const [title, setTitle] = useState("Jonny's Field Notes");
  const [tagline, setTagline] = useState(jonny.tagline);
  const { activeProfiles } = useTrustProfiles();
  const publicProfile = activeProfiles.find((p) => p.name === 'Public') ?? activeProfiles[0];
  const [profileId, setProfileId] = useState<string>(publicProfile?.id ?? '');

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Set up your blog</Typography>
        <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>Step 1 of 1</Typography>
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

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, p: 1, borderRadius: 1.5, bgcolor: '#f5f7fa' }}>
          <Avatar src={jonny.avatar} sx={{ width: 36, height: 36 }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700 }}>
              Avatar from your PLANET profile
            </Typography>
            <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary' }}>
              Edit in PNM → Profile to update everywhere
            </Typography>
          </Box>
          <CheckCircle sx={{ fontSize: 16, color: '#2e7d32' }} />
        </Box>

        <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary', mb: 0.5 }}>
          Publish blog as
        </Typography>
        <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
          <InputLabel>Trust Profile</InputLabel>
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

        <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary', mb: 0.5 }}>
          Blog title
        </Typography>
        <TextField
          fullWidth
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 1.5 }}
        />

        <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'text.secondary', mb: 0.5 }}>
          Tagline
        </Typography>
        <TextField
          fullWidth
          size="small"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          sx={{ mb: 1.5 }}
        />

        <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: '#f5f7fa', mb: 1 }}>
          <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', mb: 0.25 }}>
            Your blog URL
          </Typography>
          <Typography sx={{ fontSize: '0.78rem', fontFamily: 'monospace', color: 'primary.main' }}>
            {jonny.agentName}/blog
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={onContinue}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            bgcolor: '#0066CC',
            '&:hover': { bgcolor: '#0052a3' },
          }}
        >
          Save & write your first post
        </Button>
      </Box>
    </Box>
  );
};
