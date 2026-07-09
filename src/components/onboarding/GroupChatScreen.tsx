import { Box, Typography, Avatar, TextField, Button, IconButton } from '@mui/material';
import { Groups, PhotoCamera, ArrowBack } from '@mui/icons-material';
import { DemoTabBar } from '@/components/onboarding/DemoTabBar';

const selectedMembers = [
  { name: 'Sarah Mitchell', org: 'Tech Ventures Inc', initial: 'S' },
  { name: 'Michael Chen', org: 'Green Finance Initiative', initial: 'M' },
];

/** Step 11 — Group Chat creation with 2 members pre-selected */
export const GroupChatScreen = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ px: 2, pt: 1.5, pb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <ArrowBack sx={{ fontSize: 20, color: 'text.secondary' }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          New Group
        </Typography>
      </Box>

      {/* Group photo */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2, gap: 0.5 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar sx={{ width: 72, height: 72, bgcolor: '#0066CC' }}>
            <Groups sx={{ fontSize: 32, color: 'white' }} />
          </Avatar>
          <IconButton
            size="small"
            sx={{
              position: 'absolute', bottom: -2, right: -2,
              bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
              width: 24, height: 24,
            }}
          >
            <PhotoCamera sx={{ fontSize: 13 }} />
          </IconButton>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Add photo (optional)
        </Typography>
      </Box>

      {/* Group name */}
      <Box sx={{ px: 2, mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          label="Group name"
          autoFocus
        />
      </Box>

      {/* Selected members */}
      <Typography variant="caption" color="text.secondary" sx={{ px: 2, mb: 1, fontWeight: 600 }}>
        {selectedMembers.length} members selected
      </Typography>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {selectedMembers.map((member) => (
          <Box
            key={member.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 2,
              py: 1,
            }}
          >
            <Avatar sx={{ width: 40, height: 40, bgcolor: 'grey.300', color: 'text.primary', fontWeight: 600 }}>
              {member.initial}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {member.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {member.org}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Create button */}
      <Box sx={{ p: 1.5, flexShrink: 0 }}>
        <Button
          variant="outlined"
          fullWidth
          disabled
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            borderColor: '#0066CC',
            color: '#0066CC',
            '&.Mui-disabled': { borderColor: 'divider', color: 'text.disabled' },
          }}
        >
          Create Group
        </Button>
      </Box>

      <DemoTabBar active="chat" />
    </Box>
  );
};
