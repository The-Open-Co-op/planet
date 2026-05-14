import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Chip,
  Switch,
  FormControlLabel,
  TextField,
  IconButton,
} from '@mui/material';
import { Add, Close } from '@mui/icons-material';

export interface FollowSelection {
  /** Follow every post from the author */
  all: boolean;
  /** Hashtags Maya wants to follow */
  hashtags: string[];
}

interface FollowOptionsDialogProps {
  open: boolean;
  onClose: () => void;
  authorName: string;
  /** Hashtag suggestions from the author's posts */
  suggestedHashtags: string[];
  /** Current saved selection (used to seed state when reopening) */
  initial: FollowSelection;
  onSave: (selection: FollowSelection) => void;
}

export const FollowOptionsDialog = ({
  open,
  onClose,
  authorName,
  suggestedHashtags,
  initial,
  onSave,
}: FollowOptionsDialogProps) => {
  const [all, setAll] = useState(initial.all);
  const [tags, setTags] = useState<string[]>(initial.hashtags);
  const [adding, setAdding] = useState(false);
  const [draftTag, setDraftTag] = useState('');

  useEffect(() => {
    if (open) {
      setAll(initial.all);
      setTags(initial.hashtags);
      setAdding(false);
      setDraftTag('');
    }
  }, [open, initial]);

  const toggleTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const commitNewTag = () => {
    const trimmed = draftTag.trim().replace(/^#/, '');
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setDraftTag('');
    setAdding(false);
  };

  const handleSave = () => {
    onSave({ all, hashtags: tags });
    onClose();
  };

  const allKnown = Array.from(new Set([...suggestedHashtags, ...tags]));

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 2, m: 2, maxWidth: 320 } }}>
      <DialogContent sx={{ p: 2.5, textAlign: 'center' }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: '#0066CC',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 1.25,
          }}
        >
          <Add sx={{ fontSize: 28 }} />
        </Box>
        <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', mb: 0.5 }}>
          Follow {authorName}
        </Typography>
        <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mb: 1.5, lineHeight: 1.5 }}>
          Pick everything, specific topics, or add your own.
        </Typography>

        <Box sx={{ textAlign: 'left', mb: 1.25 }}>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={all}
                onChange={(e) => setAll(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: '#0066CC' },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#0066CC' },
                }}
              />
            }
            label={<Typography sx={{ fontSize: '0.78rem' }}>All posts</Typography>}
            labelPlacement="start"
            sx={{ display: 'flex', justifyContent: 'space-between', ml: 0, mr: 0, width: '100%' }}
          />
        </Box>

        <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: 'text.secondary', textAlign: 'left', mb: 0.5 }}>
          Or pick topics
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1, justifyContent: 'flex-start' }}>
          {allKnown.map((tag) => {
            const selected = tags.includes(tag);
            return (
              <Chip
                key={tag}
                label={`#${tag}`}
                size="small"
                onClick={() => toggleTag(tag)}
                sx={{
                  height: 22,
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  bgcolor: selected ? '#0066CC' : 'rgba(0,102,204,0.08)',
                  color: selected ? '#fff' : '#0066CC',
                  '&:hover': { bgcolor: selected ? '#0052a3' : 'rgba(0,102,204,0.16)' },
                }}
              />
            );
          })}
          {!adding ? (
            <Chip
              icon={<Add sx={{ fontSize: 12 }} />}
              label="Add"
              size="small"
              variant="outlined"
              onClick={() => setAdding(true)}
              sx={{
                height: 22,
                fontSize: '0.68rem',
                fontWeight: 600,
                borderColor: '#0066CC',
                color: '#0066CC',
                '& .MuiChip-icon': { color: '#0066CC' },
              }}
            />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
              <TextField
                size="small"
                placeholder="hashtag"
                value={draftTag}
                onChange={(e) => setDraftTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    commitNewTag();
                  }
                }}
                autoFocus
                slotProps={{
                  input: {
                    sx: { fontSize: '0.7rem', height: 22, py: 0 },
                  },
                }}
                sx={{ width: 90, '& .MuiOutlinedInput-root': { height: 22, py: 0 } }}
              />
              <IconButton size="small" onClick={commitNewTag} sx={{ p: 0.25, color: '#0066CC' }}>
                <Add sx={{ fontSize: 14 }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => {
                  setAdding(false);
                  setDraftTag('');
                }}
                sx={{ p: 0.25 }}
              >
                <Close sx={{ fontSize: 12 }} />
              </IconButton>
            </Box>
          )}
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={handleSave}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            mb: 0.75,
            bgcolor: '#0066CC',
            '&:hover': { bgcolor: '#0052a3' },
          }}
        >
          Save
        </Button>
        <Button
          fullWidth
          variant="text"
          size="small"
          onClick={onClose}
          sx={{ textTransform: 'none', fontSize: '0.72rem' }}
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};
