import { Box, Typography, Chip } from '@mui/material';
import { Lock } from '@mui/icons-material';
import type { BlogPost } from '@/mocks/blogDemo';

interface PostListItemProps {
  post: BlogPost;
  locked?: boolean;
  onClick?: () => void;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export const PostListItem = ({ post, locked, onClick }: PostListItemProps) => (
  <Box
    onClick={onClick}
    sx={{
      px: 2,
      py: 1.5,
      borderTop: '1px solid',
      borderColor: 'divider',
      cursor: onClick ? 'pointer' : 'default',
      display: 'flex',
      gap: 1.25,
      '&:hover': onClick ? { bgcolor: 'action.hover' } : undefined,
    }}
  >
    <Box
      sx={{
        width: 64,
        height: 64,
        borderRadius: 1.5,
        backgroundImage: `url(${post.featuredImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {locked && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.55)',
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lock sx={{ color: 'white', fontSize: 22 }} />
        </Box>
      )}
    </Box>
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.2 }}>
          {post.title}
        </Typography>
      </Box>
      {post.subtitle && (
        <Typography
          sx={{
            fontSize: '0.7rem',
            color: 'text.primary',
            mb: 0.25,
            fontStyle: 'italic',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.subtitle}
        </Typography>
      )}
      <Typography
        sx={{
          fontSize: '0.7rem',
          color: 'text.secondary',
          mb: 0.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {post.excerpt}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
        <Typography sx={{ fontSize: '0.62rem', color: 'text.disabled' }}>
          {formatDate(post.date)}
        </Typography>
        {locked && (
          <Chip
            label="Members only"
            size="small"
            sx={{ height: 16, fontSize: '0.55rem', bgcolor: 'rgba(0,0,0,0.08)' }}
          />
        )}
        {post.hashtags.slice(0, 2).map((tag) => (
          <Typography
            key={tag}
            sx={{ fontSize: '0.62rem', color: 'primary.main', fontWeight: 600 }}
          >
            #{tag}
          </Typography>
        ))}
      </Box>
    </Box>
  </Box>
);
