import { Box, Typography, Card, Button } from '@mui/material';
import {
  CalendarMonth,
  Folder,
  Article,
  Handshake,
} from '@mui/icons-material';
import { StandardPage } from '@/components/layout/StandardPage';

const appStoreItems = [
  {
    name: 'Calendar',
    icon: CalendarMonth,
    description: 'Share calendars with contacts in your trust network',
  },
  {
    name: 'Files',
    icon: Folder,
    description: 'Encrypted file sharing and storage',
  },
  {
    name: 'Blog',
    icon: Article,
    description: 'Publish and share posts that readers can verify as your content',
  },
  {
    name: 'Introducer',
    icon: Handshake,
    description: 'Introduce contacts to each other and earn trust',
  },
];

const AppStorePage = () => {
  return (
    <StandardPage title="Apps">
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        Install apps to extend your PLANET experience
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {appStoreItems.map((app) => {
          const Icon = app.icon;
          return (
            <Card
              key={app.name}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
              }}
            >
              <Box sx={{ display: 'flex', flexShrink: 0 }}>
                <Icon sx={{ fontSize: 40, color: 'text.secondary' }} />
              </Box>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                  {app.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3, display: 'block' }}>
                  {app.description}
                </Typography>
              </Box>
              <Button variant="outlined" size="small" sx={{ flexShrink: 0 }}>
                Install
              </Button>
            </Card>
          );
        })}
      </Box>
    </StandardPage>
  );
};

export default AppStorePage;
