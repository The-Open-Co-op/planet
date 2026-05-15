import { useMemo, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { FeedSelector } from './FeedSelector';
import { FeedPostCard } from './FeedPostCard';
import { mayaFeeds, feedPostsByFeedId } from '@/mocks/feedsDemo';

interface FeedViewScreenProps {
  onEdit?: () => void;
}

export const FeedViewScreen = ({ onEdit }: FeedViewScreenProps) => {
  const [selectedId, setSelectedId] = useState<string>('friends');
  const posts = feedPostsByFeedId[selectedId] ?? [];

  const feedsWithSuffix = useMemo(
    () => mayaFeeds.map((f) => ({ ...f, name: `${f.name} Feed` })),
    [],
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ px: 2, pt: 1.5, pb: 1, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <FeedSelector
            feeds={feedsWithSuffix}
            selectedId={selectedId}
            onChange={setSelectedId}
            label="Viewing"
          />
        </Box>
        <IconButton
          size="small"
          onClick={onEdit}
          aria-label="Edit feed settings"
          sx={{ border: '1px solid', borderColor: '#0066CC', color: '#0066CC', borderRadius: 1.5, p: 0.5 }}
        >
          <Settings sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {posts.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
              No posts in this feed yet.
            </Typography>
          </Box>
        ) : (
          posts.map((post) => <FeedPostCard key={post.id} post={post} />)
        )}
      </Box>
    </Box>
  );
};
