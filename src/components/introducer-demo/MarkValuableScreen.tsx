import { Box, Typography, Avatar, Button, TextField, IconButton } from '@mui/material';
import { ArrowBack, Lock, Send, Star, Close, DoneAll } from '@mui/icons-material';
import { introMessage } from './mockData';
import { DemoNav } from './DemoNav';

const IncomingBubble = ({ initial, name, message, time }: { initial: string; name: string; message: string; time: string }) => (
  <Box sx={{ display: 'flex', gap: 1, mb: 1, maxWidth: '85%' }}>
    <Avatar sx={{ width: 20, height: 20, bgcolor: 'grey.300', color: 'text.secondary', fontSize: '0.5rem', mt: 0.5 }}>{initial}</Avatar>
    <Box>
      <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.55rem', color: 'text.secondary' }}>{name}</Typography>
      <Box sx={{ bgcolor: '#E9EAED', borderRadius: '12px 12px 12px 4px', px: 1.25, py: 0.75, mt: 0.25 }}>
        <Typography sx={{ fontSize: '0.8rem', lineHeight: 1.4, color: 'text.primary' }}>{message}</Typography>
        <Typography sx={{ fontSize: '0.55rem', color: 'text.disabled', textAlign: 'right' }}>{time}</Typography>
      </Box>
    </Box>
  </Box>
);

const OutgoingBubble = ({ message, time }: { message: string; time: string }) => (
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
    <Box sx={{ maxWidth: '78%', bgcolor: '#D4D7DC', borderRadius: '12px 12px 4px 12px', px: 1.25, py: 0.75 }}>
      <Typography sx={{ fontSize: '0.8rem', lineHeight: 1.4, color: 'text.primary' }}>{message}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.25 }}>
        <Typography sx={{ fontSize: '0.55rem', color: 'text.disabled' }}>{time}</Typography>
        <DoneAll sx={{ fontSize: 12, color: '#53bdeb' }} />
      </Box>
    </Box>
  </Box>
);

export const MarkValuableScreen = () => {
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
              Jonny, Sarah & Michael
            </Typography>
            <Lock sx={{ fontSize: 12, color: 'success.main' }} />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>
            Introduction group chat
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', ml: 'auto' }}>
          {['J', 'S', 'M'].map((initial, i) => (
            <Avatar
              key={initial}
              sx={{
                width: 22, height: 22, bgcolor: 'grey.300', color: 'text.secondary', fontSize: '0.55rem',
                border: '2px solid white',
                ml: i > 0 ? -0.75 : 0,
              }}
            >
              {initial}
            </Avatar>
          ))}
        </Box>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem', fontStyle: 'italic', textAlign: 'center', display: 'block', mb: 0.5 }}>
          Jonny introduced Sarah and Michael
        </Typography>

        <IncomingBubble
          initial="J" name="Jonny"
          message={introMessage}
          time="2:30"
        />
        <OutgoingBubble
          message="Thanks Jonny! Great to meet you Michael. I've been looking at sustainability frameworks for our tech projects."
          time="2:32"
        />
        <IncomingBubble
          initial="M" name="Michael"
          message="Nice to meet you too Sarah! That's right up my alley — happy to chat more about it."
          time="2:35"
        />
        <IncomingBubble
          initial="J" name="Jonny"
          message="Brilliant! I had a feeling you two would hit it off."
          time="2:37"
        />
        <OutgoingBubble
          message="Definitely! Michael, shall we set up a call this week?"
          time="2:38"
        />
        <IncomingBubble
          initial="M" name="Michael"
          message="Sounds great, I'll send you some times."
          time="2:40"
        />
      </Box>

      {/* Mark as valuable / Dismiss — same style as bow-out button */}
      <Box sx={{ px: 2, py: 0.75, borderTop: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <Button
          size="small"
          startIcon={<Close sx={{ fontSize: 14 }} />}
          sx={{ textTransform: 'none', fontSize: '0.65rem', color: 'text.secondary', '&:hover': { bgcolor: 'action.hover' } }}
        >
          Dismiss
        </Button>
        <Button
          size="small"
          startIcon={<Star sx={{ fontSize: 14 }} />}
          sx={{ textTransform: 'none', fontSize: '0.65rem', color: '#0066CC', '&:hover': { bgcolor: 'rgba(0,102,204,0.08)' } }}
        >
          Mark intro as valuable
        </Button>
      </Box>

      {/* Message input */}
      <Box sx={{ px: 2, py: 0.75, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0, display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Message"
          slotProps={{ input: { sx: { fontSize: '0.75rem' } } }}
        />
        <IconButton size="small" sx={{ color: 'text.disabled' }}>
          <Send sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
      <DemoNav active="chat" />
    </Box>
  );
};
