import { Box, Typography, Avatar, Card, Button } from '@mui/material';
import { ArrowBack, Send } from '@mui/icons-material';
import { personas, introMessage } from './mockData';
import { DemoNav } from './DemoNav';

export const PreviewScreen = () => {
  const renderMessage = (text: string) => {
    const parts = text.split(/(@\w+)/g);
    return parts.map((part, i) =>
      part.startsWith('@') ? (
        <Box component="span" key={i} sx={{ color: 'primary.main', fontWeight: 600 }}>{part}</Box>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ px: 2, pt: 1.5, pb: 1, display: 'flex', alignItems: 'center', gap: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <ArrowBack sx={{ fontSize: 18, color: 'text.secondary' }} />
        <Typography variant="body1" sx={{ fontWeight: 700 }}>Preview Introduction</Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 1.5 }}>
        {/* From */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: personas.anya.color, fontSize: '0.7rem' }}>A</Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>From {personas.anya.name}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>to Marcus & Leila</Typography>
          </Box>
        </Box>

        {/* Profile cards */}
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 0.75, display: 'block' }}>
          Introducing
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {[personas.marcus, personas.leila].map((p) => (
            <Card key={p.id} sx={{ flex: 1, p: 1.5, textAlign: 'center', bgcolor: 'grey.50' }}>
              <Avatar sx={{ width: 32, height: 32, mx: 'auto', mb: 0.5, bgcolor: p.color, fontSize: '0.8rem' }}>{p.initial}</Avatar>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>{p.name}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>{p.role}, {p.org}</Typography>
            </Card>
          ))}
        </Box>

        {/* Message */}
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 0.75, display: 'block' }}>
          Message
        </Typography>
        <Card sx={{ p: 1.5, mb: 2, bgcolor: 'grey.50' }}>
          <Typography variant="body2" sx={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
            {renderMessage(introMessage)}
          </Typography>
        </Card>

        {/* Consent note */}
        <Card sx={{ p: 1.5, bgcolor: 'info.main', color: 'white', borderRadius: 2 }}>
          <Typography variant="caption" sx={{ fontSize: '0.65rem', lineHeight: 1.4 }}>
            Both parties will be asked to accept before a group chat opens. Declining is private.
          </Typography>
        </Card>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, flexShrink: 0, borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 1 }}>
        <Button variant="outlined" size="small" sx={{ flex: 1, textTransform: 'none' }}>
          Back to edit
        </Button>
        <Button variant="contained" size="small" startIcon={<Send sx={{ fontSize: 14 }} />} sx={{ flex: 1, textTransform: 'none', fontWeight: 600 }}>
          Send introduction
        </Button>
      </Box>
      <DemoNav active="home" />
    </Box>
  );
};
