import { useState } from 'react';
import { Box, Typography, Button, Checkbox, FormControlLabel, Link } from '@mui/material';
import { Lock } from '@mui/icons-material';

interface WebWelcomeScreenProps {
  firstName?: string;
  inviterName?: string;
  onAgree?: () => void;
}

/** Step 02 — Web Welcome: planet site landing page that greets the invited user before PWA install. */
export const WebWelcomeScreen = ({
  firstName = 'Jonny',
  inviterName = 'Sarah',
  onAgree,
}: WebWelcomeScreenProps) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
      {/* Mobile Safari chrome — address bar */}
      <Box sx={{
        px: 1.25,
        py: 0.75,
        bgcolor: '#f2f2f7',
        borderBottom: '1px solid',
        borderColor: '#d1d1d6',
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
      }}>
        <Lock sx={{ fontSize: 11, color: '#8e8e93' }} />
        <Typography sx={{ fontSize: '0.7rem', color: '#3c3c43', flex: 1, textAlign: 'center', fontFamily: 'system-ui' }}>
          planetnetwork.app/j/x7k2m
        </Typography>
      </Box>

      {/* Web page content */}
      <Box sx={{
        flex: 1,
        overflow: 'auto',
        px: 2.5,
        py: 3,
        backgroundImage: 'url(/images/stars-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Planet wordmark */}
        <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 2, mb: 3 }}>
          PLANET
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', mb: 0.5 }}>
          Hi {firstName},
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', fontWeight: 500, mb: 2.5, lineHeight: 1.5 }}>
          {inviterName} has invited you to join PLANET — a new kind of network built on trust.
        </Typography>

        <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', lineHeight: 1.6, mb: 1.5 }}>
          PLANET is co-owned by members of The Open Co-op. Our members commit to placing people and planet over profit, cooperation over competition, and trust over control.
        </Typography>

        <Link
          href="https://docs.open.coop/planet/the-co-op"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#80BFFF', fontSize: '0.8rem', fontWeight: 500, mb: 2, textDecorationColor: '#80BFFF' }}
        >
          Read our full purpose and principles →
        </Link>

        {/* Agreement */}
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              sx={{ color: 'rgba(255,255,255,0.5)', '&.Mui-checked': { color: 'white' } }}
            />
          }
          label={
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, color: 'white' }}>
              Sounds good — I'm in
            </Typography>
          }
          sx={{ mx: 0, mb: 2 }}
        />

        <Box sx={{ flex: 1 }} />

        <Button
          variant="outlined"
          fullWidth
          size="large"
          disabled={!agreed}
          onClick={onAgree}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            borderColor: '#4DA6FF',
            color: '#4DA6FF',
            bgcolor: 'rgba(0,102,204,0.15)',
            '&:hover': { borderColor: '#80BFFF', bgcolor: 'rgba(0,102,204,0.25)' },
            '&.Mui-disabled': { borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.3)' },
          }}
        >
          Join PLANET
        </Button>
      </Box>
    </Box>
  );
};
