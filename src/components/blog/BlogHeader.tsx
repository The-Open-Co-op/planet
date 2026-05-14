import { Box, Typography, Avatar } from '@mui/material';
import { VerifiedBadge } from './VerifiedBadge';
import type { BlogPersona } from '@/mocks/blogDemo';

interface BlogHeaderProps {
  author: BlogPersona;
  banner: string;
  title: string;
  tagline: string;
}

export const BlogHeader = ({ author, banner, title, tagline }: BlogHeaderProps) => (
  <Box sx={{ flexShrink: 0 }}>
    <Box
      sx={{
        height: 90,
        bgcolor: '#1C2025',
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    />
    <Box sx={{ px: 2, pt: 0, pb: 1.5 }}>
      <Avatar
        src={author.avatar}
        sx={{
          width: 56,
          height: 56,
          border: '3px solid white',
          mt: '-28px',
          mb: 0.5,
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
        <Typography sx={{ fontWeight: 800, fontSize: '1rem' }}>{title}</Typography>
        <VerifiedBadge agentName={author.agentName} />
      </Box>
      <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mb: 0.5 }}>
        {tagline}
      </Typography>
      <Typography sx={{ fontSize: '0.68rem', color: 'primary.main', fontFamily: 'monospace' }}>
        {author.agentName}/blog
      </Typography>
    </Box>
  </Box>
);
