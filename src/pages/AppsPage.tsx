import { Box, Typography, alpha, useTheme, SvgIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  People,
  Lock,
  Apps,
} from '@mui/icons-material';
import type { SvgIconComponent } from '@mui/icons-material';

// Contact import icon from custom SVG
const ContactImportIcon: SvgIconComponent = ((props: React.ComponentProps<typeof SvgIcon>) => (
  <SvgIcon {...props} viewBox="919 499 82 82">
    <path d="M957.27,499.22c-20.99,0-38,17.01-38,38,0,7.01,1.91,13.58,5.22,19.22,1.73-4.26,5.13-8.01,9.56-10.88,6.12-3.95,14.26-6.34,23.22-6.34s17.1,2.39,23.22,6.34c2.52,1.63,4.67,3.55,6.41,5.69.13,0,.25-.03.38-.03,1.75,0,3.42.29,5,.81,1.93-4.56,3-9.56,3-14.81,0-20.99-17.01-38-38-38h0ZM957.27,506.22c7.71,0,14,6.29,14,14s-6.29,14-14,14-14-6.29-14-14,6.29-14,14-14ZM957.27,510.22c-5.55,0-10,4.45-10,10s4.45,10,10,10,10-4.45,10-10-4.45-10-10-10ZM957.27,543.22c-8.24,0-15.66,2.22-21.03,5.69-4.95,3.2-8.1,7.38-8.84,11.78,6.96,8.85,17.75,14.53,29.88,14.53,5.26,0,10.26-1.07,14.81-3-.52-1.58-.81-3.25-.81-5,0-7.07,4.6-13.08,10.97-15.19-1.14-1.12-2.45-2.16-3.94-3.12-5.37-3.47-12.79-5.69-21.03-5.69ZM987.27,553.22c-7.73,0-14,6.27-14,14s6.27,14,14,14,14-6.27,14-14-6.27-14-14-14ZM987.27,558.22c.58,0,1.07.27,1.44.66,1.66,1.48,3.31,3.34,4.97,4.94.8.8.78,2.03,0,2.81-.78.78-2.03.78-2.81,0l-1.59-1.59v9.19c0,1.1-.9,2-2,2s-2-.9-2-2v-9.19l-1.59,1.59c-.78.78-2.03.78-2.81,0-.78-.78-.8-2.01,0-2.81,1.63-1.64,3.33-3.42,4.97-4.94.37-.39.86-.66,1.44-.66h0Z" />
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
  { label: 'Import', icon: ContactImportIcon, path: '/import' },
  { label: 'Vault', icon: Lock, path: '/settings' },
  { label: 'Apps', icon: Apps, path: '/apps' },
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
            ? alpha('#ffffff', 0.1)
            : alpha('#ffffff', 0.2),
          backdropFilter: 'blur(8px)',
          border: '1px solid',
          borderColor: app.comingSoon
            ? alpha('#ffffff', 0.15)
            : alpha('#ffffff', 0.3),
        }}
      >
        <Icon
          sx={{
            fontSize: 32,
            color: app.comingSoon ? alpha('#ffffff', 0.4) : '#ffffff',
          }}
        />
      </Box>
      <Typography
        variant="caption"
        sx={{
          color: app.comingSoon ? alpha('#ffffff', 0.4) : '#ffffff',
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
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      p: 2,
      backgroundImage: 'url(/images/planet-billboard-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
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
