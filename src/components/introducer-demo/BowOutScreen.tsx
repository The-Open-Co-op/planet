import { Box, Typography, Avatar, Card, Button, TextField, IconButton } from '@mui/material';
import { ArrowBack, Lock, Send, ExitToApp } from '@mui/icons-material';
import { personas } from './mockData';
import { DemoNav } from './DemoNav';

export const BowOutScreen = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{
        px: 2, pt: 1.5, pb: 1,
        display: 'flex', alignItems: 'center', gap: 1,
        borderBottom: '1px solid', borderColor: 'divider',
      }}>
        <ArrowBack sx={{ fontSize: 18, color: 'text.secondary' }} />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>
              Jonny, Marcus & Leila
            </Typography>
            <Lock sx={{ fontSize: 12, color: 'success.main' }} />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>
            Jonny's view
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', ml: 'auto' }}>
          {[personas.me, personas.marcus, personas.leila].map((p, i) => (
            <Avatar
              key={p.id}
              sx={{
                width: 22, height: 22, bgcolor: p.color, fontSize: '0.55rem',
                border: '2px solid white',
                ml: i > 0 ? -0.75 : 0,
              }}
            >
              {p.initial}
            </Avatar>
          ))}
        </Box>
      </Box>

      {/* Bow-out prompt */}
      <Card sx={{
        mx: 2, mt: 1.5, p: 1.5,
        bgcolor: '#F0FDF4',
        border: '1px solid',
        borderColor: 'success.light',
        borderRadius: 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <ExitToApp sx={{ fontSize: 18, color: 'success.main' }} />
          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'success.dark' }}>
            Both parties accepted!
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontSize: '0.7rem', mb: 1.5, lineHeight: 1.4 }}>
          Your introduction was accepted by all parties. You can stay in the chat or bow out gracefully.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            fullWidth
            sx={{ textTransform: 'none', fontSize: '0.7rem', color: 'text.secondary', borderColor: 'divider' }}
          >
            Dismiss
          </Button>
          <Button
            variant="contained"
            size="small"
            fullWidth
            startIcon={<ExitToApp sx={{ fontSize: 14 }} />}
            color="success"
            sx={{ textTransform: 'none', fontSize: '0.7rem', fontWeight: 600 }}
          >
            Bow out
          </Button>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem', mt: 1, display: 'block', textAlign: 'center' }}>
          Your Introducer credential stays in your wallet
        </Typography>
      </Card>

      {/* Messages (abbreviated) */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 1 }}>
        <Box sx={{ textAlign: 'center', my: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem', fontStyle: 'italic' }}>
            Jonny introduced Marcus and Leila
          </Typography>
        </Box>

        {/* Last couple messages */}
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Avatar sx={{ width: 20, height: 20, bgcolor: personas.marcus.color, fontSize: '0.5rem', mt: 0.5 }}>M</Avatar>
          <Box sx={{ bgcolor: 'grey.100', borderRadius: '0 8px 8px 8px', p: 1 }}>
            <Typography variant="body2" sx={{ fontSize: '0.65rem', lineHeight: 1.4 }}>
              This is really helpful, thanks for the intro Jonny!
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Avatar sx={{ width: 20, height: 20, bgcolor: personas.leila.color, fontSize: '0.5rem', mt: 0.5 }}>L</Avatar>
          <Box sx={{ bgcolor: 'grey.100', borderRadius: '0 8px 8px 8px', p: 1 }}>
            <Typography variant="body2" sx={{ fontSize: '0.65rem', lineHeight: 1.4 }}>
              Agreed! Marcus, shall we set up a call this week?
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Message input */}
      <Box sx={{ px: 2, py: 1, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0, display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type a message..."
          slotProps={{ input: { sx: { fontSize: '0.75rem' } } }}
        />
        <IconButton size="small" color="primary">
          <Send sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
      <DemoNav active="chat" />
    </Box>
  );
};
