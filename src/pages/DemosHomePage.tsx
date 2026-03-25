import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, Button, useMediaQuery } from '@mui/material';
import { DesktopWindows, PhoneIphone, Handshake, Apps } from '@mui/icons-material';

interface DemoCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  parentSlug: string;
  stepCount: number;
}

const isInIframe = () => {
  try { return window.self !== window.top; } catch { return true; }
};

const DemoCard = ({ title, subtitle, description, icon, path, parentSlug, stepCount }: DemoCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isInIframe()) {
      // Navigate the parent frame to the collab-site demo URL (with DemoClient + feedback)
      window.top?.location.assign(`/demo/${parentSlug}`);
    } else {
      navigate(path);
    }
  };

  return (
    <Card
      sx={{
        flex: 1,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 },
      }}
      onClick={handleClick}
    >
      <Box sx={{ mb: 2 }}>
        {icon}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        {subtitle}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, flex: 1, lineHeight: 1.6 }}>
        {description}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">
          {stepCount} screens
        </Typography>
        <Button variant="contained" size="small" sx={{ textTransform: 'none', fontWeight: 600 }}>
          View Demo
        </Button>
      </Box>
    </Card>
  );
};

const DemosHomePage = () => {
  const isMobile = useMediaQuery('(max-width:900px)');

  if (isMobile) {
    return (
      <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#FAFBFC',
        px: 4,
        textAlign: 'center',
        gap: 3,
      }}>
        <DesktopWindows sx={{ fontSize: 64, color: 'text.secondary' }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Best viewed on desktop
        </Typography>
        <Typography variant="body1" color="text.secondary">
          These interactive demos require a larger screen. Please open them on a desktop or laptop browser.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#FAFBFC',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: 6,
      px: 4,
    }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
        PLANET Demos
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 5, maxWidth: 500, textAlign: 'center' }}>
        Interactive walkthroughs of PLANET features.
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, maxWidth: 1100, width: '100%' }}>
        <DemoCard
          title="Onboarding"
          subtitle="Invite to first connections"
          description="See how a new member joins PLANET — from receiving an invite link through to setting up their identity, importing contacts, and building trust profiles."
          icon={<PhoneIphone sx={{ fontSize: 40, color: 'primary.main' }} />}
          path="/demo/onboarding/invite"
          parentSlug="planet-onboarding"
          stepCount={10}
        />
        <DemoCard
          title="Main PNM"
          subtitle="Core app features"
          description="Explore the main Personal Network Manager — chat reactions, group chats, the encrypted vault, app store, and alerts."
          icon={<Apps sx={{ fontSize: 40, color: 'primary.main' }} />}
          path="/demo/pnm/home"
          parentSlug="planet-pnm"
          stepCount={7}
        />
        <DemoCard
          title="Introducer"
          subtitle="A PLANET app"
          description="The Introducer is an app that runs within PLANET. Follow an introduction from compose to completion — consent, group chat, bow out gracefully, mark as valuable, and see ripple effects."
          icon={<Handshake sx={{ fontSize: 40, color: 'primary.main' }} />}
          path="/demo/introducer/dashboard"
          parentSlug="planet-introducer"
          stepCount={7}
        />
      </Box>
    </Box>
  );
};

export default DemosHomePage;
