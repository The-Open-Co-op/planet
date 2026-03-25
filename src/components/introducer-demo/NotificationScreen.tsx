import { Box, Typography, Card, Avatar } from '@mui/material';
import { Handshake, PersonAdd, ThumbUp } from '@mui/icons-material';
import { personas } from './mockData';
import { DemoNav } from './DemoNav';

export const NotificationScreen = () => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ px: 2, pt: 1.5, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>Alerts</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
          Marcus's view — different notification types
        </Typography>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 1.5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {/* Connection request — standard */}
          <Card sx={{ p: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'grey.100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PersonAdd sx={{ fontSize: 16, color: 'text.secondary' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>Connection request</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
                  Emily Watson wants to connect
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>3h ago</Typography>
            </Box>
          </Card>

          {/* Vouch received — standard */}
          <Card sx={{ p: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'grey.100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ThumbUp sx={{ fontSize: 16, color: 'text.secondary' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>Vouch received</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
                  David Kim vouched for you
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>1d ago</Typography>
            </Box>
          </Card>

          {/* Introduction — distinct visual treatment */}
          <Card sx={{
            p: 1.5,
            border: '2px solid',
            borderColor: 'primary.main',
            bgcolor: 'primary.main',
            color: 'white',
            position: 'relative',
            overflow: 'visible',
          }}>
            {/* "New" badge */}
            <Box sx={{
              position: 'absolute',
              top: -8,
              right: 12,
              bgcolor: '#D97706',
              color: 'white',
              px: 1,
              py: 0.25,
              borderRadius: 1,
              fontSize: '0.55rem',
              fontWeight: 700,
            }}>
              NEW
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Handshake sx={{ fontSize: 18 }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>Introduction</Typography>
                <Typography variant="caption" sx={{ fontSize: '0.6rem', opacity: 0.8 }}>
                  from {personas.me.name}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ fontSize: '0.55rem', opacity: 0.7 }}>Just now</Typography>
            </Box>

            <Typography variant="body2" sx={{ fontSize: '0.7rem', mb: 1, lineHeight: 1.4 }}>
              Jonny wants to introduce you to <strong>Leila Chen</strong>
            </Typography>

            {/* Both parties shown side by side */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[personas.marcus, personas.leila].map((p) => (
                <Box key={p.id} sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 0.75, bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 1, p: 0.75 }}>
                  <Avatar sx={{ width: 24, height: 24, bgcolor: p.color, fontSize: '0.65rem' }}>{p.initial}</Avatar>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.6rem', lineHeight: 1.2 }}>{p.name}</Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.5rem', opacity: 0.7, display: 'block', lineHeight: 1.2 }}>{p.org}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Card>

          {/* Another standard notification */}
          <Card sx={{ p: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'grey.100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PersonAdd sx={{ fontSize: 16, color: 'text.secondary' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>Connection request</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
                  Sarah Ali wants to connect
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>2d ago</Typography>
            </Box>
          </Card>
        </Box>
      </Box>

      <DemoNav active="alerts" />
    </Box>
  );
};
