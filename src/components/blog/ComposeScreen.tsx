import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Switch,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
} from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';
import { WysiwygMock } from './WysiwygMock';
import { draftPost } from '@/mocks/blogDemo';

interface ComposeScreenProps {
  onContinue?: () => void;
}

type Visibility = 'public' | 'members';

export const ComposeScreen = ({ onContinue }: ComposeScreenProps) => {
  const [visibility, setVisibility] = useState<Visibility>('members');
  const [title, setTitle] = useState(draftPost.title);
  const [subtitle, setSubtitle] = useState(draftPost.subtitle ?? '');
  const [commentsAllowed, setCommentsAllowed] = useState(true);
  const [discoverable, setDiscoverable] = useState(true);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>New post</Typography>
        <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
          Draft saves automatically
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', px: 2, pb: 1.5 }}>
        <TextField
          fullWidth
          size="small"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          slotProps={{
            input: { sx: { fontSize: '0.9rem' }, notched: true },
            inputLabel: {
              shrink: true,
              sx: {
                fontSize: '0.65rem',
                bgcolor: 'background.default',
                px: 0.5,
                top: 0,
                left: 0,
                transform: 'translate(12px, -50%) scale(1)',
                transformOrigin: 'left top',
              },
            },
          }}
          sx={{ mt: 0.75, mb: 1 }}
        />
        <TextField
          fullWidth
          size="small"
          label="Subtitle (optional)"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          slotProps={{
            input: { notched: true },
            inputLabel: {
              shrink: true,
              sx: {
                fontSize: '0.65rem',
                bgcolor: 'background.default',
                px: 0.5,
                top: 0,
                left: 0,
                transform: 'translate(12px, -50%) scale(1)',
                transformOrigin: 'left top',
              },
            },
          }}
          sx={{ mb: 1.25 }}
        />

        <Box
          sx={{
            height: 90,
            borderRadius: 1.5,
            backgroundImage: `url(${draftPost.featuredImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            mb: 1.25,
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
            <Typography sx={{ fontSize: '0.6rem' }}>Featured image</Typography>
          </Box>
        </Box>

        <WysiwygMock>
          {draftPost.body.map((para, i) => (
            <Typography
              key={i}
              sx={{ fontSize: '0.75rem', lineHeight: 1.55, mb: 1, color: 'text.primary' }}
            >
              {para}
            </Typography>
          ))}
        </WysiwygMock>

        <Box sx={{ mt: 1.25 }}>
          <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, color: 'text.secondary', mb: 0.5 }}>
            Hashtags
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {draftPost.hashtags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                size="small"
                sx={{ height: 22, fontSize: '0.68rem', bgcolor: 'rgba(0,102,204,0.08)', color: 'primary.main', fontWeight: 600 }}
              />
            ))}
            <Chip label="+ Add" size="small" variant="outlined" sx={{ height: 22, fontSize: '0.68rem' }} />
          </Box>
        </Box>

        <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, color: 'text.secondary', mb: 0.5, mt: 1.5 }}>
          Visibility
        </Typography>
        <Box sx={{ p: 1, borderRadius: 1.5, border: '1px solid', borderColor: 'divider' }}>
          <RadioGroup
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as Visibility)}
          >
            <FormControlLabel
              value="public"
              control={<Radio size="small" sx={{ p: 0.5, '&.Mui-checked': { color: '#0066CC' } }} />}
              label={<Typography sx={{ fontSize: '0.72rem' }}>Public</Typography>}
              labelPlacement="start"
              sx={{ display: 'flex', justifyContent: 'space-between', ml: 0, mr: 0, width: '100%' }}
            />
            <FormControlLabel
              value="members"
              control={<Radio size="small" sx={{ p: 0.5, '&.Mui-checked': { color: '#0066CC' } }} />}
              label={<Typography sx={{ fontSize: '0.72rem' }}>PLANET members only</Typography>}
              labelPlacement="start"
              sx={{ display: 'flex', justifyContent: 'space-between', ml: 0, mr: 0, width: '100%' }}
            />
          </RadioGroup>
          <Divider sx={{ my: 0.5 }} />
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={commentsAllowed}
                onChange={(e) => setCommentsAllowed(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#0066CC' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#0066CC' },
                }}
              />
            }
            label={<Typography sx={{ fontSize: '0.72rem' }}>Allow comments on this post</Typography>}
            labelPlacement="start"
            sx={{ display: 'flex', justifyContent: 'space-between', ml: 0, mr: 0, width: '100%' }}
          />
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={discoverable}
                onChange={(e) => setDiscoverable(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#0066CC' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#0066CC' },
                }}
              />
            }
            label={<Typography sx={{ fontSize: '0.72rem' }}>Make discoverable via Murmurations</Typography>}
            labelPlacement="start"
            sx={{ display: 'flex', justifyContent: 'space-between', ml: 0, mr: 0, width: '100%' }}
          />
        </Box>
      </Box>

      <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0, display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            flex: 1,
            borderColor: '#0066CC',
            color: '#0066CC',
            '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.08)' },
          }}
        >
          Save draft
        </Button>
        <Button
          variant="contained"
          onClick={onContinue}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            flex: 1.4,
            bgcolor: '#0066CC',
            '&:hover': { bgcolor: '#0052a3' },
          }}
        >
          Review & publish
        </Button>
      </Box>
    </Box>
  );
};
