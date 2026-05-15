import { Avatar, Box } from '@mui/material';
import { Person, AccountCircle, Article, RssFeed } from '@mui/icons-material';
import type { FollowSourceType } from '@/mocks/feedsDemo';

interface SourceIconProps {
  type: FollowSourceType;
  avatar?: string;
  size?: number;
}

const TYPE_ICON: Record<FollowSourceType, React.ElementType> = {
  contact: Person,
  profile: AccountCircle,
  blog: Article,
  rss: RssFeed,
};

const TYPE_BG: Record<FollowSourceType, string> = {
  contact: '#0066CC',
  profile: '#8b5cf6',
  blog: '#0066CC',
  rss: '#f59e0b',
};

export const SourceIcon = ({ type, avatar, size = 28 }: SourceIconProps) => {
  if (avatar) {
    return <Avatar src={avatar} sx={{ width: size, height: size }} />;
  }
  const Icon = TYPE_ICON[type];
  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        bgcolor: TYPE_BG[type],
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Icon sx={{ fontSize: size * 0.55 }} />
    </Box>
  );
};

export const sourceTypeLabel = (type: FollowSourceType): string => {
  switch (type) {
    case 'contact': return 'Contact';
    case 'profile': return 'PLANET profile';
    case 'blog': return 'FP Blog';
    case 'rss': return 'RSS feed';
  }
};
