import { Box, Typography, Avatar } from '@mui/material';
import type { ReactNode } from 'react';
import { VerifiedBadge } from './VerifiedBadge';
import type { BlogPost, BlogPersona } from '@/mocks/blogDemo';

interface PostBodyProps {
  post: BlogPost;
  author: BlogPersona;
  /** Optional element rendered next to the verified badge */
  actions?: ReactNode;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export const PostBody = ({ post, author, actions }: PostBodyProps) => (
  <Box sx={{ pb: 2 }}>
    <Box
      sx={{
        height: 140,
        backgroundImage: `url(${post.featuredImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    <Box sx={{ px: 2, pt: 2 }}>
      <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.25, mb: 0.5 }}>
        {post.title}
      </Typography>
      {post.subtitle && (
        <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', mb: 1.25 }}>
          {post.subtitle}
        </Typography>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
        <Avatar src={author.avatar} sx={{ width: 24, height: 24 }} />
        <Typography sx={{ fontSize: '0.72rem', fontWeight: 600 }}>{author.name}</Typography>
        <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary' }}>
          {formatDate(post.date)}
        </Typography>
        <VerifiedBadge agentName={author.agentName} signedAt={post.signedAt} />
        {actions}
      </Box>
      {post.body.map((para, i) => (
        <Typography
          key={i}
          sx={{ fontSize: '0.8rem', lineHeight: 1.6, mb: 1.25, color: 'text.primary' }}
        >
          {para}
        </Typography>
      ))}
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1.5 }}>
        {post.hashtags.map((tag) => (
          <Typography
            key={tag}
            sx={{
              fontSize: '0.7rem',
              color: 'primary.main',
              fontWeight: 600,
              bgcolor: 'rgba(0,102,204,0.08)',
              px: 0.75,
              py: 0.25,
              borderRadius: 10,
            }}
          >
            #{tag}
          </Typography>
        ))}
      </Box>
    </Box>
  </Box>
);
