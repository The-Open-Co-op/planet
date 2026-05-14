import { useState } from 'react';
import { Box, Typography, Button, TextField, Avatar, IconButton } from '@mui/material';
import { ArrowBack, CheckCircle, Add, Send } from '@mui/icons-material';
import { PostBody } from './PostBody';
import { FollowOptionsDialog, type FollowSelection } from './FollowOptionsDialog';
import { jonny, maya, draftPost, existingPosts, seededComments } from '@/mocks/blogDemo';
import type { BlogComment } from '@/mocks/blogDemo';

interface MemberEngageScreenProps {
  onContinue?: () => void;
}

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

export const MemberEngageScreen = ({ onContinue }: MemberEngageScreenProps) => {
  const [follow, setFollow] = useState<FollowSelection>({ all: false, hashtags: [] });
  const [showFollow, setShowFollow] = useState(false);
  const [comments, setComments] = useState<BlogComment[]>(seededComments);
  const [newComment, setNewComment] = useState('');

  const post = { ...draftPost, signedAt: '2026-05-14T09:30:00Z' };

  const hashtagOptions = Array.from(
    new Set([...draftPost.hashtags, ...existingPosts.flatMap((p) => p.hashtags)]),
  );

  const isFollowing = follow.all || follow.hashtags.length > 0;
  const followLabel = !isFollowing
    ? 'Follow'
    : follow.all
    ? 'Following all'
    : follow.hashtags.length === 1
    ? `Following #${follow.hashtags[0]}`
    : `Following ${follow.hashtags.length} topics`;

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: `c-${prev.length + 1}`,
        authorName: maya.name,
        authorAvatar: maya.avatar,
        date: new Date().toISOString(),
        body: newComment,
      },
    ]);
    setNewComment('');
  };

  const followButton = (
    <Button
      size="small"
      variant="outlined"
      startIcon={
        isFollowing ? <CheckCircle sx={{ fontSize: 12 }} /> : <Add sx={{ fontSize: 12 }} />
      }
      onClick={() => setShowFollow(true)}
      sx={{
        textTransform: 'none',
        fontWeight: 700,
        borderRadius: 10,
        py: 0.1,
        px: 1,
        minWidth: 0,
        fontSize: '0.65rem',
        borderColor: '#0066CC',
        color: '#0066CC',
        '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.08)' },
      }}
    >
      {followLabel}
    </Button>
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default', overflow: 'auto' }}>
      <Box sx={{ px: 1, pt: 1, flexShrink: 0 }}>
        <IconButton size="small" disabled>
          <ArrowBack sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <PostBody post={post} author={jonny} actions={followButton} />

      <Box sx={{ px: 2, mb: 1 }}>
        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, mb: 1 }}>
          Comments ({comments.length})
        </Typography>
        {comments.map((c) => (
          <Box key={c.id} sx={{ display: 'flex', gap: 1, mb: 1.25 }}>
            <Avatar src={c.authorAvatar} sx={{ width: 28, height: 28 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75 }}>
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 700 }}>{c.authorName}</Typography>
                <Typography sx={{ fontSize: '0.62rem', color: 'text.disabled' }}>{formatTime(c.date)}</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.72rem', color: 'text.primary', lineHeight: 1.5 }}>
                {c.body}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ px: 2, pb: 2, display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        <Avatar src={maya.avatar} sx={{ width: 28, height: 28 }} />
        <TextField
          fullWidth
          size="small"
          placeholder="Add a comment as Maya…"
          multiline
          maxRows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          slotProps={{ input: { sx: { fontSize: '0.72rem' } } }}
        />
        <IconButton size="small" onClick={handleAddComment} sx={{ bgcolor: '#0066CC', color: '#fff', '&:hover': { bgcolor: '#0052a3' } }}>
          <Send sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>

      {comments.length > seededComments.length && (
        <Box sx={{ px: 2, pb: 2 }}>
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
            See Jonny's view of the comment
          </Button>
        </Box>
      )}

      <FollowOptionsDialog
        open={showFollow}
        onClose={() => setShowFollow(false)}
        authorName={jonny.name}
        suggestedHashtags={hashtagOptions}
        initial={follow}
        onSave={setFollow}
      />
    </Box>
  );
};
