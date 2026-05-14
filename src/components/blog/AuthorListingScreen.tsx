import { useState } from 'react';
import { Box, Typography, IconButton, Chip, Avatar, TextField } from '@mui/material';
import { Edit, Delete, Settings, Lock, Send } from '@mui/icons-material';
import { BlogHeader } from './BlogHeader';
import { jonny, blogBanner, existingPosts, draftPost, maya, seededComments } from '@/mocks/blogDemo';
import type { BlogPost } from '@/mocks/blogDemo';

interface AuthorListingScreenProps {
  onOpenSettings?: () => void;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

export const AuthorListingScreen = ({ onOpenSettings }: AuthorListingScreenProps) => {
  const newestPost: BlogPost = { ...draftPost, signedAt: '2026-05-14T09:30:00Z' };
  const allPosts: BlogPost[] = [newestPost, ...existingPosts];
  const [reply, setReply] = useState('');
  const [replied, setReplied] = useState(false);
  const comment = seededComments[0];

  const handleReply = () => {
    if (!reply.trim()) return;
    setReplied(true);
    setReply('');
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default', overflow: 'auto' }}>
      <Box sx={{ position: 'relative' }}>
        <BlogHeader author={jonny} banner={blogBanner} title="Jonny's Field Notes" tagline={jonny.tagline} />
        <IconButton
          size="small"
          onClick={onOpenSettings}
          sx={{
            position: 'absolute',
            top: 6,
            right: 8,
            bgcolor: 'rgba(255,255,255,0.9)',
            '&:hover': { bgcolor: 'white' },
          }}
          aria-label="Blog settings"
        >
          <Settings sx={{ fontSize: 18, color: '#0066CC' }} />
        </IconButton>
      </Box>

      <Box sx={{ px: 2, pt: 1.5, pb: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700 }}>
          Your posts ({allPosts.length})
        </Typography>
        <Chip
          label="Author view"
          size="small"
          sx={{ height: 18, fontSize: '0.58rem', bgcolor: 'rgba(0,102,204,0.08)', color: '#0066CC', fontWeight: 700 }}
        />
      </Box>

      <Box>
        {allPosts.map((post) => (
          <Box
            key={post.id}
            sx={{
              px: 2,
              py: 1.25,
              borderTop: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              gap: 1.25,
              alignItems: 'flex-start',
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 1.5,
                backgroundImage: `url(${post.featuredImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flexShrink: 0,
              }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', lineHeight: 1.2, mb: 0.25 }}>
                {post.title}
              </Typography>
              {post.subtitle && (
                <Typography
                  sx={{
                    fontSize: '0.68rem',
                    color: 'text.primary',
                    fontStyle: 'italic',
                    mb: 0.25,
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {post.subtitle}
                </Typography>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                <Typography sx={{ fontSize: '0.6rem', color: 'text.disabled' }}>
                  {formatDate(post.date)}
                </Typography>
                {post.visibility === 'members' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.2 }}>
                    <Lock sx={{ fontSize: 11, color: 'text.disabled' }} />
                    <Typography sx={{ fontSize: '0.6rem', color: 'text.disabled' }}>
                      Members
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flexShrink: 0 }}>
              <IconButton
                size="small"
                sx={{
                  p: 0.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
                aria-label={`Edit ${post.title}`}
              >
                <Edit sx={{ fontSize: 13, color: '#0066CC' }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  p: 0.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
                aria-label={`Delete ${post.title}`}
              >
                <Delete sx={{ fontSize: 13, color: 'text.secondary' }} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 1.5 }} />
      <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700 }}>
          Latest comments
        </Typography>
      </Box>

      <Box sx={{ px: 2, pb: 2 }}>
        <Box sx={{ p: 1.25, borderRadius: 1.5, border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <Avatar src={comment.authorAvatar} sx={{ width: 28, height: 28 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75, flexWrap: 'wrap' }}>
                <Typography sx={{ fontSize: '0.72rem', fontWeight: 700 }}>{comment.authorName}</Typography>
                <Typography sx={{ fontSize: '0.6rem', color: 'text.disabled' }}>
                  {formatTime(comment.date)}
                </Typography>
                <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>
                  on "{newestPost.title}"
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '0.72rem', lineHeight: 1.5, mb: 0.5 }}>
                {comment.body}
              </Typography>
              <IconButton size="small" sx={{ p: 0.25 }} aria-label="Delete comment">
                <Delete sx={{ fontSize: 13, color: 'text.disabled' }} />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'flex-end', mt: 1, pl: 4.5 }}>
            <Avatar src={jonny.avatar} sx={{ width: 24, height: 24 }} />
            <TextField
              fullWidth
              size="small"
              placeholder={`Reply to ${comment.authorName.split(' ')[0]}…`}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              multiline
              maxRows={3}
              slotProps={{ input: { sx: { fontSize: '0.72rem' } } }}
            />
            <IconButton
              size="small"
              onClick={handleReply}
              sx={{ bgcolor: '#0066CC', color: '#fff', '&:hover': { bgcolor: '#0052a3' } }}
            >
              <Send sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>

          {replied && (
            <Box sx={{ mt: 1, p: 0.75, borderRadius: 1, bgcolor: 'rgba(46,125,50,0.08)' }}>
              <Typography sx={{ fontSize: '0.65rem', color: '#2e7d32', fontWeight: 600, textAlign: 'center' }}>
                Reply signed and sent — {maya.name.split(' ')[0]} will be notified
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
