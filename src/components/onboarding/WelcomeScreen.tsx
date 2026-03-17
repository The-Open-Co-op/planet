import { useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

interface WelcomeScreenProps {
  firstName?: string;
  inviterName?: string;
  onConnect?: (name: string) => void;
}

/** Step 03 — Welcome: The only onboarding screen */
export const WelcomeScreen = ({
  firstName = 'Jonny',
  inviterName = 'Sarah',
  onConnect,
}: WelcomeScreenProps) => {
  const [name, setName] = useState(firstName);
  const [agreed, setAgreed] = useState(false);

  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      p: 3,
      backgroundImage: 'url(/images/stars-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/* Greeting */}
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5, color: 'white' }}>
        Hi {name || ''},
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500, mb: 3, lineHeight: 1.5, fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)' }}>
        Welcome to PLANET — a new kind of network built on trust.
      </Typography>

      {/* Values statement */}
      <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 1, color: 'rgba(255,255,255,0.75)' }}>
        PLANET is co-owned by members of The Open Co-op. Our members commit to placing people and planet over profit, cooperation over competition and trust over control.
      </Typography>

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
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'white' }}>
            Sounds good — I'm in
          </Typography>
        }
        sx={{ mx: 0 }}
      />

      {/* Spacer */}
      <Box sx={{ flex: 1 }} />

      {/* Name field */}
      <TextField
        fullWidth
        size="small"
        label="Preferred first name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            color: 'white',
            bgcolor: 'rgba(255,255,255,0.08)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' },
            '&.Mui-focused': { bgcolor: 'rgba(255,255,255,0.08)' },
            '& fieldset': { borderColor: 'rgba(255,255,255,0.25)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
            '&.Mui-focused fieldset': { borderColor: 'white' },
            '& input': { bgcolor: 'transparent' },
            '& input:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px rgba(0,0,0,0.9) inset',
              WebkitTextFillColor: 'white',
            },
          },
          '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
          '& .MuiInputLabel-root.Mui-focused': { color: 'white' },
        }}
      />

      {/* Connect button */}
      <Button
        variant="outlined"
        fullWidth
        size="large"
        disabled={!name.trim() || !agreed}
        onClick={() => onConnect?.(name)}
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
        Connect with {inviterName}
      </Button>
    </Box>
  );
};
