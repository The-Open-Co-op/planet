import { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, TextField, Avatar } from '@mui/material';
import { ArrowBack, Add, Mail } from '@mui/icons-material';
import { BlogHeader } from './BlogHeader';
import { JoinPlanetDialog } from './JoinPlanetDialog';
import { ContactFormDialog } from './ContactFormDialog';
import { PostListItem } from './PostListItem';
import { PostBody } from './PostBody';
import { jonny, jonnyEmail, blogBanner, existingPosts, draftPost } from '@/mocks/blogDemo';

interface VisitorReadScreenProps {
  asMember?: boolean;
  reportStep?: (slug: string, title: string) => void;
}

export const VisitorReadScreen = ({
  asMember = false,
  reportStep,
}: VisitorReadScreenProps) => {
  const [view, setView] = useState<'listing' | 'post'>('listing');
  const [showCommentJoin, setShowCommentJoin] = useState(false);
  const [showLockedJoin, setShowLockedJoin] = useState(false);
  const [showFollowJoin, setShowFollowJoin] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Attach feedback to the sub-view (listing vs reading a post).
  useEffect(() => {
    if (view === 'post') {
      reportStep?.('visitor-read:post', 'Visitor → Reading a post');
    } else {
      reportStep?.('visitor-read', 'A visitor lands on the blog');
    }
  }, [view, reportStep]);

  const newestPost = { ...draftPost, signedAt: '2026-05-14T09:30:00Z' };
  const allPosts = [newestPost, ...existingPosts];

  if (view === 'post') {
    const followAction = !asMember ? (
      <Button
        size="small"
        variant="outlined"
        startIcon={<Add sx={{ fontSize: 12 }} />}
        onClick={() => setShowFollowJoin(true)}
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
        Follow
      </Button>
    ) : undefined;

    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default', overflow: 'auto' }}>
        <Box sx={{ px: 1, pt: 1, flexShrink: 0 }}>
          <IconButton size="small" onClick={() => setView('listing')}>
            <ArrowBack sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <PostBody post={existingPosts[0]} author={jonny} actions={followAction} />
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, mb: 1 }}>
            Comments
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <Avatar sx={{ width: 28, height: 28, bgcolor: 'grey.300', fontSize: '0.7rem' }}>?</Avatar>
            <TextField
              fullWidth
              size="small"
              placeholder={asMember ? 'Add a comment…' : 'Join PLANET to comment…'}
              multiline
              minRows={2}
              onClick={!asMember ? () => setShowCommentJoin(true) : undefined}
              slotProps={{ input: { readOnly: !asMember, sx: { fontSize: '0.72rem' } } }}
            />
          </Box>
        </Box>
        <JoinPlanetDialog
          open={showCommentJoin}
          onClose={() => setShowCommentJoin(false)}
          reason="comment"
        />
        <JoinPlanetDialog
          open={showFollowJoin}
          onClose={() => setShowFollowJoin(false)}
          reason="follow"
          followContext={{ authorName: jonny.name }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default', overflow: 'auto' }}>
      <BlogHeader author={jonny} banner={blogBanner} title="Jonny's Field Notes" tagline={jonny.tagline} />

      {!asMember && (
        <Box sx={{ px: 2, pb: 1.5, display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<Add sx={{ fontSize: 14 }} />}
            onClick={() => setShowFollowJoin(true)}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              flex: 1,
              borderColor: '#0066CC',
              color: '#0066CC',
              '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.08)' },
            }}
          >
            Follow
          </Button>
          <Button
            size="small"
            variant="outlined"
            startIcon={<Mail sx={{ fontSize: 14 }} />}
            onClick={() => setShowContact(true)}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              flex: 1,
              borderColor: '#0066CC',
              color: '#0066CC',
              '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.08)' },
            }}
          >
            Contact
          </Button>
        </Box>
      )}

      <Box>
        {allPosts.map((post) => (
          <PostListItem
            key={post.id}
            post={post}
            locked={!asMember && post.visibility === 'members'}
            onClick={() => {
              if (!asMember && post.visibility === 'members') {
                setShowLockedJoin(true);
                return;
              }
              setView('post');
            }}
          />
        ))}
      </Box>
      <JoinPlanetDialog
        open={showLockedJoin}
        onClose={() => setShowLockedJoin(false)}
        reason="read"
      />
      <JoinPlanetDialog
        open={showFollowJoin}
        onClose={() => setShowFollowJoin(false)}
        reason="follow"
        followContext={{ authorName: jonny.name, hashtag: 'regenerative' }}
      />
      <ContactFormDialog
        open={showContact}
        onClose={() => setShowContact(false)}
        authorName={jonny.name}
        authorEmail={jonnyEmail}
      />
    </Box>
  );
};
