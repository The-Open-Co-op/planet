import { useState } from 'react';
import { Box, Typography, Card, Button, CircularProgress } from '@mui/material';
import {
  CalendarMonth,
  Folder,
  Article,
  Handshake,
  CheckCircle,
  Public,
  People,
  ChatBubble,
  Notifications,
} from '@mui/icons-material';
import { StandardPage } from '@/components/layout/StandardPage';

interface InstallScreenProps {
  onContinue?: () => void;
}

type BlogState = 'idle' | 'installing' | 'installed';

const appStoreItems = [
  { name: 'Calendar', icon: CalendarMonth, description: 'Share calendars with contacts in your trust network' },
  { name: 'Files', icon: Folder, description: 'Encrypted file sharing and storage' },
  { name: 'Blog', icon: Article, description: 'Publish and share posts that readers can verify as your content' },
  { name: 'Introducer', icon: Handshake, description: 'Introduce contacts to each other and earn trust' },
];

export const InstallScreen = ({ onContinue }: InstallScreenProps) => {
  const [blogState, setBlogState] = useState<BlogState>('idle');

  const handleInstall = () => {
    setBlogState('installing');
    setTimeout(() => setBlogState('installed'), 1100);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <StandardPage title="Apps">
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            Install apps to extend your PLANET experience
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {appStoreItems.map((app) => {
              const Icon = app.icon;
              const isBlog = app.name === 'Blog';
              return (
                <Card
                  key={app.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.5,
                    border: isBlog ? '1px solid #0066CC' : undefined,
                  }}
                >
                  <Box sx={{ display: 'flex', flexShrink: 0 }}>
                    <Icon sx={{ fontSize: 40, color: isBlog ? 'primary.main' : 'text.secondary' }} />
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                      {app.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3, display: 'block' }}>
                      {app.description}
                    </Typography>
                  </Box>
                  {isBlog ? (
                    blogState === 'idle' ? (
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ flexShrink: 0, borderColor: '#0066CC', color: '#0066CC', '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.08)' } }}
                        onClick={handleInstall}
                      >
                        Install
                      </Button>
                    ) : blogState === 'installing' ? (
                      <Button
                        variant="outlined"
                        size="small"
                        disabled
                        startIcon={<CircularProgress size={12} thickness={5} />}
                        sx={{ flexShrink: 0 }}
                      >
                        Installing
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<CheckCircle sx={{ fontSize: 14 }} />}
                        sx={{ flexShrink: 0, bgcolor: '#0066CC', '&:hover': { bgcolor: '#0052a3' } }}
                        onClick={onContinue}
                      >
                        Set up
                      </Button>
                    )
                  ) : (
                    <Button variant="outlined" size="small" sx={{ flexShrink: 0 }}>
                      Install
                    </Button>
                  )}
                </Card>
              );
            })}
          </Box>
        </StandardPage>
      </Box>
      <DemoNav />
    </Box>
  );
};

const DemoNav = () => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTop: '1px solid',
    borderColor: 'divider',
    bgcolor: 'background.default',
    py: 0.75,
    flexShrink: 0,
  }}>
    {[
      { label: 'Home', icon: <Public sx={{ fontSize: 20 }} /> },
      { label: 'Contacts', icon: <People sx={{ fontSize: 20 }} /> },
      { label: 'Chat', icon: <ChatBubble sx={{ fontSize: 20 }} /> },
      { label: 'Alerts', icon: <Notifications sx={{ fontSize: 20 }} /> },
    ].map((item) => (
      <Box key={item.label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'text.secondary' }}>
        {item.icon}
        <Typography sx={{ fontSize: '0.55rem', mt: 0.25 }}>{item.label}</Typography>
      </Box>
    ))}
  </Box>
);
