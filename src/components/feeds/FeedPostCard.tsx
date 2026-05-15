import { Box, Typography } from '@mui/material';
import { Verified } from '@mui/icons-material';
import { SourceIcon } from './SourceIcon';
import type { FeedPost } from '@/mocks/feedsDemo';

interface FeedPostCardProps {
  post: FeedPost;
}

const formatRelative = (iso: string) => {
  const ms = Date.now() - new Date(iso).getTime();
  const hrs = ms / 3_600_000;
  if (hrs < 24) return `${Math.max(1, Math.round(hrs))}h ago`;
  const days = hrs / 24;
  if (days < 7) return `${Math.round(days)}d ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const CATEGORY_COLOR: Record<string, string> = {
  News: '#ef4444',
  Events: '#10b981',
  Recommendations: '#8b5cf6',
  Opportunities: '#f59e0b',
};

export const FeedPostCard = ({ post }: FeedPostCardProps) => {
  const isPlanet = post.sourceType !== 'rss';
  return (
    <Box
      sx={{
        py: 1.25,
        px: 2,
        borderBottom: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        gap: 1,
      }}
    >
      <SourceIcon type={post.sourceType} avatar={post.sourceAvatar} size={32} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25, flexWrap: 'wrap' }}>
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 700 }}>{post.sourceName}</Typography>
          {isPlanet && <Verified sx={{ fontSize: 12, color: '#2e7d32' }} />}
          <Typography sx={{ fontSize: '0.6rem', color: 'text.disabled' }}>
            · {formatRelative(post.date)}
          </Typography>
          {post.category !== 'Recommendations' && (
            <Typography
              sx={{
                fontSize: '0.58rem',
                fontWeight: 700,
                color: CATEGORY_COLOR[post.category] || '#0066CC',
                bgcolor: `${CATEGORY_COLOR[post.category]}1a`,
                px: 0.5,
                py: 0.1,
                borderRadius: 8,
                ml: 'auto',
              }}
            >
              {post.category}
            </Typography>
          )}
        </Box>
        <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.25, mb: 0.25 }}>
          {post.title}
        </Typography>
        {post.image && (
          <Box
            sx={{
              height: 100,
              borderRadius: 1,
              backgroundImage: `url(${post.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              my: 0.5,
            }}
          />
        )}
        <Typography
          sx={{
            fontSize: '0.7rem',
            color: 'text.secondary',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </Typography>
        {post.hashtags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, flexWrap: 'wrap' }}>
            {post.hashtags.map((tag) => (
              <Typography
                key={tag}
                sx={{ fontSize: '0.6rem', color: '#0066CC', fontWeight: 600 }}
              >
                #{tag}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};
