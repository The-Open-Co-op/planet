import { Box, Typography, Avatar, Button, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';

/** Step 01 — Invite Sent: Existing user sends invite from their contacts */
export const InviteSentScreen = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Invite to PLANET
        </Typography>
      </Box>

      {/* Contact selected */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: '#7c3aed' }}>A</Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Jonny</Typography>
            <Typography variant="caption" color="text.secondary">From your contacts</Typography>
          </Box>
        </Box>

        {/* Channel selection */}
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Send via
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {['WhatsApp', 'iMessage', 'Email'].map((channel, i) => (
            <Box
              key={channel}
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                border: '1px solid',
                borderColor: i === 0 ? 'primary.main' : 'divider',
                bgcolor: i === 0 ? 'primary.main' : 'transparent',
                color: i === 0 ? 'white' : 'text.primary',
                fontSize: '0.75rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {channel}
            </Box>
          ))}
        </Box>

        {/* Message preview */}
        <TextField
          fullWidth
          multiline
          rows={3}
          size="small"
          value="Hey Jonny, I'm using PLANET for private, decentralised networking. Join me → planetnetwork.app/j/x7k2m"
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          startIcon={<Send />}
          sx={{ textTransform: 'none' }}
        >
          Send Invite
        </Button>
      </Box>

      {/* Link info */}
      <Box sx={{ px: 2, mt: 'auto', pb: 3 }}>
        <Box sx={{ p: 1.5, bgcolor: 'action.hover', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4 }}>
            Single-use link expires in 7 days. Only Jonny can use it.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
