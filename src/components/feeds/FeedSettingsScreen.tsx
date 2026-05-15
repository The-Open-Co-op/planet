import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { mayaFeeds } from '@/mocks/feedsDemo';
import type { ContentCategory, FeedConfig } from '@/mocks/feedsDemo';
import { FeedSelector } from './FeedSelector';
import { ContentMixSliders } from './ContentMixSliders';
import { FollowsList } from './FollowsList';
import { FollowOptionsDialog } from '@/components/blog/FollowOptionsDialog';

interface FeedSettingsScreenProps {
  onAddFollow?: () => void;
  onContinue?: () => void;
}

export const FeedSettingsScreen = ({ onAddFollow, onContinue }: FeedSettingsScreenProps) => {
  const [feeds, setFeeds] = useState<FeedConfig[]>(mayaFeeds);
  const [selectedId, setSelectedId] = useState<string>('friends');
  const [editingFollowId, setEditingFollowId] = useState<string | null>(null);

  const selected = feeds.find((f) => f.id === selectedId) ?? feeds[0];
  const editing = editingFollowId ? selected.follows.find((f) => f.id === editingFollowId) : null;

  const updateSelected = (next: Partial<FeedConfig>) => {
    setFeeds((prev) => prev.map((f) => (f.id === selected.id ? { ...f, ...next } : f)));
  };

  const handleMix = (cat: ContentCategory, v: number) => {
    const mix = selected.contentMix;
    const others = (Object.keys(mix) as ContentCategory[]).filter((c) => c !== cat);
    const totalOthers = 100 - v;
    const currentOthersTotal = others.reduce((sum, c) => sum + mix[c], 0);

    const next: Record<ContentCategory, number> = { ...mix };
    others.forEach((c) => {
      next[c] = currentOthersTotal > 0
        ? Math.round((mix[c] / currentOthersTotal) * totalOthers)
        : Math.round(totalOthers / others.length);
    });
    next[cat] = v;

    // Rounding can leave a 1-2 unit gap — push it onto the first other category.
    const total = (Object.values(next) as number[]).reduce((s, n) => s + n, 0);
    if (total !== 100) next[others[0]] += 100 - total;

    updateSelected({ contentMix: next });
  };

  const handleRemoveFollow = (id: string) => {
    updateSelected({ follows: selected.follows.filter((f) => f.id !== id) });
  };

  const handleRemoveHashtag = (followId: string, hashtag: string) => {
    updateSelected({
      follows: selected.follows.map((f) =>
        f.id === followId ? { ...f, hashtags: f.hashtags.filter((h) => h !== hashtag) } : f,
      ),
    });
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '1rem' }}>Feed Settings</Typography>
        <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
          Tune what shows up in each feed
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', px: 2, pb: 1.5 }}>
        <Box sx={{ mt: 0.75, mb: 1.5 }}>
          <FeedSelector
            feeds={feeds}
            selectedId={selectedId}
            onChange={setSelectedId}
            showAddOption
          />
        </Box>

        <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: 'text.secondary', letterSpacing: 0.5, mb: 0.5 }}>
          WHO YOU FOLLOW
        </Typography>
        <Box sx={{ p: 1.25, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', mb: 1.5 }}>
          <FollowsList
            follows={selected.follows}
            onRemove={handleRemoveFollow}
            onRemoveHashtag={handleRemoveHashtag}
            onEdit={setEditingFollowId}
          />
        </Box>

        <Box sx={{ mb: 1.5 }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<Add sx={{ fontSize: 14 }} />}
            onClick={() => onAddFollow?.()}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              borderColor: '#0066CC',
              color: '#0066CC',
              '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.08)' },
            }}
          >
            Find people, blogs & feeds to follow
          </Button>
        </Box>

        <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: 'text.secondary', letterSpacing: 0.5, mb: 0.5 }}>
          CONTENT MIX
        </Typography>
        <Box sx={{ p: 1.25, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', mb: 1.5 }}>
          <ContentMixSliders mix={selected.contentMix} onChange={handleMix} />
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
          Save feed
        </Button>
      </Box>

      <FollowOptionsDialog
        open={Boolean(editing)}
        onClose={() => setEditingFollowId(null)}
        authorName={editing?.name ?? ''}
        suggestedHashtags={['regenerative', 'energy', 'climate', 'cooperatives', 'governance']}
        initial={{
          all: (editing?.hashtags.length ?? 0) === 0,
          hashtags: editing?.hashtags ?? [],
        }}
        onSave={({ all, hashtags }) => {
          if (!editing) return;
          updateSelected({
            follows: selected.follows.map((f) =>
              f.id === editing.id ? { ...f, hashtags: all ? [] : hashtags } : f,
            ),
          });
        }}
      />
    </Box>
  );
};
