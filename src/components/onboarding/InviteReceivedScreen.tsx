import { Box, Typography, Avatar } from '@mui/material';
import { Videocam, Phone, ChevronLeft, Add, CameraAlt, Mic, SmsOutlined } from '@mui/icons-material';

/** Step 01 — Invite Received: What Jonny sees in WhatsApp */
export const InviteReceivedScreen = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#efeae2' }}>
      {/* WhatsApp header */}
      <Box sx={{
        px: 1, py: 0.75,
        bgcolor: '#075e54',
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
      }}>
        <ChevronLeft sx={{ fontSize: 24, color: 'white' }} />
        <Avatar
          src="/images/sarah-mitchell.png"
          sx={{ width: 30, height: 30 }}
        >
          S
        </Avatar>
        <Typography sx={{ fontWeight: 600, color: 'white', flex: 1, fontSize: '0.9rem' }}>
          Sarah Mitchell
        </Typography>
        <Videocam sx={{ fontSize: 20, color: 'white' }} />
        <Phone sx={{ fontSize: 18, color: 'white', ml: 1 }} />
      </Box>

      {/* Chat area */}
      <Box sx={{ flex: 1, p: 1.5, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 0.75 }}>
        {/* Message bubble */}
        <Box sx={{
          alignSelf: 'flex-start',
          bgcolor: 'white',
          borderRadius: '10px 10px 10px 3px',
          p: 1,
          maxWidth: '88%',
          boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
        }}>
          <Typography sx={{ fontSize: '0.8rem', color: '#111', mb: 0.75, lineHeight: 1.4 }}>
            Hey Jonny, I've joined PLANET — a user-owned decentralised trust network with secure messaging and other trust-based apps that doesn't exploit your data. It's invite-only, so this link is just for you because I trust you. Join me →
          </Typography>

          {/* OG link preview */}
          <Box sx={{
            borderRadius: '6px',
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
          }}>
            {/* OG image with Sarah's photo */}
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src="/images/planet-og.jpg"
                alt="PLANET"
                sx={{
                  width: '100%',
                  height: 90,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <Avatar
                src="/images/sarah-mitchell.png"
                sx={{
                  position: 'absolute',
                  bottom: -18,
                  left: 10,
                  width: 44,
                  height: 44,
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                S
              </Avatar>
            </Box>
            <Box sx={{ p: 0.75, pt: 2, bgcolor: '#f0f0f0' }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.7rem', color: '#111', lineHeight: 1.3 }}>
                Sarah invited you to connect on PLANET
              </Typography>
              <Typography sx={{ fontSize: '0.6rem', color: '#8696a0' }}>
                planetnetwork.app
              </Typography>
            </Box>
          </Box>

          {/* Link text + timestamp */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mt: 0.5 }}>
            <Typography sx={{ fontSize: '0.7rem', color: '#027eb5', textDecoration: 'underline' }}>
              planetnetwork.app/j/x7k2m
            </Typography>
            <Typography sx={{ fontSize: '0.55rem', color: '#8696a0', ml: 1 }}>
              10:32
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* WhatsApp input bar */}
      <Box sx={{ px: 0.75, pb: 0.75, pt: 0.5, display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Add sx={{ fontSize: 26, color: '#8696a0' }} />
        <Box sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'white',
          borderRadius: '18px',
          px: 1,
          py: 0.5,
          minHeight: 34,
        }}>
          <Box sx={{ flex: 1 }} />
          <SmsOutlined sx={{ fontSize: 20, color: '#8696a0' }} />
        </Box>
        <CameraAlt sx={{ fontSize: 22, color: '#8696a0' }} />
        <Mic sx={{ fontSize: 22, color: '#8696a0' }} />
      </Box>
    </Box>
  );
};
