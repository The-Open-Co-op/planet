import { Box, Typography, Chip, IconButton } from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import { SourceIcon } from './SourceIcon';
import type { FollowEntry } from '@/mocks/feedsDemo';

interface FollowsListProps {
  follows: FollowEntry[];
  onRemove: (id: string) => void;
  onRemoveHashtag: (followId: string, hashtag: string) => void;
  onEdit: (id: string) => void;
}

export const FollowsList = ({ follows, onRemove, onRemoveHashtag, onEdit }: FollowsListProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    {follows.map((f, i) => (
      <Box
        key={f.id}
        sx={{
          py: 1,
          borderTop: i > 0 ? '1px solid' : 'none',
          borderColor: 'divider',
          display: 'flex',
          gap: 1,
          alignItems: 'flex-start',
        }}
      >
        <SourceIcon type={f.type} avatar={f.avatar} size={32} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, lineHeight: 1.2 }}>
            {f.name}
          </Typography>
          {f.hashtags.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.25, mt: 0.5 }}>
              {f.hashtags.map((tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  size="small"
                  onDelete={() => onRemoveHashtag(f.id, tag)}
                  deleteIcon={<Close sx={{ fontSize: 10 }} />}
                  sx={{
                    height: 18,
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    bgcolor: 'rgba(0,102,204,0.08)',
                    color: '#0066CC',
                    '& .MuiChip-deleteIcon': { color: '#0066CC', '&:hover': { color: '#0052a3' } },
                  }}
                />
              ))}
            </Box>
          ) : (
            <Typography sx={{ fontSize: '0.6rem', color: 'text.disabled', mt: 0.25, fontStyle: 'italic' }}>
              All posts
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, flexShrink: 0 }}>
          <IconButton
            size="small"
            onClick={() => onEdit(f.id)}
            sx={{ p: 0.25, color: '#0066CC' }}
            aria-label={`Edit ${f.name}`}
          >
            <Edit sx={{ fontSize: 13 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onRemove(f.id)}
            sx={{ p: 0.25, color: 'text.disabled' }}
            aria-label={`Unfollow ${f.name}`}
          >
            <Close sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>
      </Box>
    ))}
  </Box>
);
