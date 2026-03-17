import { Box, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

/** Step 05 — Install & Open: Deferred deep link resolves, DID generation begins */
export const InstallOpenScreen = () => {
  const [stage, setStage] = useState<'resolving' | 'generating' | 'ready'>('resolving');

  useEffect(() => {
    const t1 = setTimeout(() => setStage('generating'), 1200);
    const t2 = setTimeout(() => setStage('ready'), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#0F1114',
      color: 'white',
    }}>
      <Box sx={{
        width: 80,
        height: 80,
        borderRadius: '20px',
        bgcolor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 3,
      }}>
        <Typography sx={{ fontWeight: 800, fontSize: '2rem', color: 'white' }}>P</Typography>
      </Box>

      <CircularProgress
        size={24}
        sx={{
          color: stage === 'ready' ? 'success.main' : 'grey.500',
          mb: 2,
        }}
      />

      <Typography variant="body2" sx={{ color: 'grey.400', textAlign: 'center', px: 4 }}>
        {stage === 'resolving' && 'Resolving invite...'}
        {stage === 'generating' && 'Generating your identity...'}
        {stage === 'ready' && 'Ready'}
      </Typography>

      {/* Background status indicators */}
      <Box sx={{ position: 'absolute', bottom: 40, left: 0, right: 0, px: 3 }}>
        {[
          { label: 'Invite context', done: stage !== 'resolving' },
          { label: 'DID keypair', done: stage === 'ready' },
        ].map((item) => (
          <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, justifyContent: 'center' }}>
            <Box sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: item.done ? 'success.main' : 'grey.700',
              transition: 'background-color 0.3s',
            }} />
            <Typography variant="caption" sx={{ color: item.done ? 'grey.400' : 'grey.600', fontSize: '0.65rem' }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
