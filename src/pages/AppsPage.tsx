import { Box, Typography, alpha, useTheme, SvgIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  People,
  ChatBubble,
  CalendarMonth,
  Folder,
  ShoppingBag,
  Healing,
  School,
  AccountBalance,
} from '@mui/icons-material';
import type { SvgIconComponent } from '@mui/icons-material';

// Contact card icon: person on left, 3 lines on right, rounded rectangle, no clip
const ContactCardIcon: SvgIconComponent = ((props: React.ComponentProps<typeof SvgIcon>) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM9 13c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-3 4c0-1.33 2-2 3-2s3 .67 3 2H6zm12-1h-4v-1.5h4V16zm0-3h-4v-1.5h4V13zm0-3h-4V8.5h4V10z" />
  </SvgIcon>
)) as SvgIconComponent;

interface AppItem {
  label: string;
  icon: SvgIconComponent;
  path?: string;
  comingSoon?: boolean;
}

const apps: AppItem[] = [
  { label: 'Contacts', icon: People, path: '/contacts' },
  { label: 'Import', icon: ContactCardIcon, path: '/import' },
  { label: 'Messages', icon: ChatBubble, comingSoon: true },
  { label: 'Calendar', icon: CalendarMonth, comingSoon: true },
  { label: 'Files', icon: Folder, comingSoon: true },
  { label: 'Marketplace', icon: ShoppingBag, comingSoon: true },
  { label: 'Health', icon: Healing, comingSoon: true },
  { label: 'Learning', icon: School, comingSoon: true },
  { label: 'Finance', icon: AccountBalance, comingSoon: true },
];

const AppIcon = ({ app }: { app: AppItem }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = () => {
    if (app.path) {
      navigate(app.path);
    }
  };

  const Icon = app.icon;

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        cursor: app.comingSoon ? 'default' : 'pointer',
        opacity: app.comingSoon ? 0.4 : 1,
        transition: 'transform 0.15s ease',
        '&:active': app.comingSoon ? {} : { transform: 'scale(0.95)' },
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: app.comingSoon
            ? alpha(theme.palette.text.secondary, 0.08)
            : alpha(theme.palette.primary.main, 0.12),
          border: '1px solid',
          borderColor: app.comingSoon
            ? alpha(theme.palette.text.secondary, 0.12)
            : alpha(theme.palette.primary.main, 0.2),
        }}
      >
        <Icon
          sx={{
            fontSize: 32,
            color: app.comingSoon ? 'text.disabled' : 'primary.main',
          }}
        />
      </Box>
      <Typography
        variant="caption"
        sx={{
          color: app.comingSoon ? 'text.disabled' : 'text.primary',
          fontWeight: 500,
          fontSize: '0.7rem',
          textAlign: 'center',
        }}
      >
        {app.label}
      </Typography>
    </Box>
  );
};

const AppsPage = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 3,
          pt: 2,
          px: 1,
          justifyItems: 'center',
        }}
      >
        {apps.map((app) => (
          <AppIcon key={app.label} app={app} />
        ))}
      </Box>
    </Box>
  );
};

export default AppsPage;
