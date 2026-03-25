import { useState } from 'react';
import { Box, Typography, Card, Chip, IconButton, TextField, Avatar } from '@mui/material';
import { Handshake, Add, Star, CheckCircle, Waves, ExitToApp, ArrowBack, Lock, Send } from '@mui/icons-material';
import { introductionHistory, personas } from './mockData';
import type { IntroductionSummary } from './mockData';
import { DemoNav } from './DemoNav';

const statusConfig: Record<string, { label: string; iconColor: string; icon?: React.ReactNode }> = {
  valuable: { label: 'Valuable', iconColor: '#D97706', icon: <Star sx={{ fontSize: 12 }} /> },
  accepted: { label: 'Accepted', iconColor: '#059669', icon: <CheckCircle sx={{ fontSize: 12 }} /> },
  pending: { label: 'Pending', iconColor: '#D97706' },
  declined: { label: 'Declined', iconColor: '#6B7280' },
};

const DoubleArrow = () => (
  <svg width="14" height="8" viewBox="0 0 14 8" style={{ flexShrink: 0 }}>
    <line x1="3" y1="4" x2="11" y2="4" stroke="#999" strokeWidth="1.2" />
    <polyline points="3,1.5 0.5,4 3,6.5" fill="none" stroke="#999" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
    <polyline points="11,1.5 13.5,4 11,6.5" fill="none" stroke="#999" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

/** Inline chat view shown when a card is tapped */
const InlineChatView = ({ intro, onBack }: { intro: IntroductionSummary; onBack: () => void }) => {
  const introducer = intro.introducedBy || 'Jonny';
  const isMyIntro = !intro.introducedBy;
  // Only include the introducer in the participant list if it's the user's own intro
  const participants = isMyIntro
    ? [introducer, ...intro.parties.map(n => n.split(' ')[0])]
    : intro.parties.map(n => n.split(' ')[0]);
  const title = participants.join(', ');
  const colors = ['#7C3AED', '#0891B2', '#059669', '#D97706', '#6366F1'];
  const initials = isMyIntro
    ? ['J', ...intro.parties.map(n => n[0])]
    : intro.parties.map(n => n[0]);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{
        px: 2, pt: 1.5, pb: 1,
        display: 'flex', alignItems: 'center', gap: 1,
        borderBottom: '1px solid', borderColor: 'divider',
      }}>
        <ArrowBack sx={{ fontSize: 18, color: 'text.secondary', cursor: 'pointer' }} onClick={onBack} />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>{title}</Typography>
            <Lock sx={{ fontSize: 12, color: 'success.main' }} />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.55rem' }}>
            Introduction group chat
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          {initials.map((initial, i) => (
            <Avatar key={i} sx={{
              width: 22, height: 22, bgcolor: colors[i % colors.length], fontSize: '0.55rem',
              border: '2px solid white', ml: i > 0 ? -0.75 : 0,
            }}>{initial}</Avatar>
          ))}
        </Box>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 1.5 }}>
        <Box sx={{ textAlign: 'center', my: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem', fontStyle: 'italic' }}>
            {introducer} introduced {intro.parties.join(' and ')}
          </Typography>
        </Box>

        {/* First party message */}
        <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
          <Avatar sx={{ width: 20, height: 22, bgcolor: colors[isMyIntro ? 1 : 0], fontSize: '0.5rem', mt: 0.5 }}>{intro.parties[0][0]}</Avatar>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.6rem' }}>{intro.parties[0].split(' ')[0]}</Typography>
            <Box sx={{ bgcolor: 'grey.100', borderRadius: '0 8px 8px 8px', p: 1, mt: 0.25 }}>
              <Typography variant="body2" sx={{ fontSize: '0.65rem', lineHeight: 1.4 }}>
                Thanks for the intro! Great to meet you {intro.parties[1]?.split(' ')[0] || 'all'}.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Second party message */}
        {intro.parties[1] && (
          <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
            <Avatar sx={{ width: 20, height: 22, bgcolor: colors[isMyIntro ? 2 : 1], fontSize: '0.5rem', mt: 0.5 }}>{intro.parties[1][0]}</Avatar>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.6rem' }}>{intro.parties[1].split(' ')[0]}</Typography>
              <Box sx={{ bgcolor: 'grey.100', borderRadius: '0 8px 8px 8px', p: 1, mt: 0.25 }}>
                <Typography variant="body2" sx={{ fontSize: '0.65rem', lineHeight: 1.4 }}>
                  Likewise! Looking forward to chatting.
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Box sx={{ px: 2, py: 1, borderTop: '1px solid', borderColor: 'divider', flexShrink: 0, display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField fullWidth size="small" placeholder="Type a message..." slotProps={{ input: { sx: { fontSize: '0.75rem' } } }} />
        <IconButton size="small" color="primary"><Send sx={{ fontSize: 18 }} /></IconButton>
      </Box>
      <DemoNav active="chat" />
    </Box>
  );
};

export const DashboardScreen = () => {
  const [openIntro, setOpenIntro] = useState<IntroductionSummary | null>(null);

  if (openIntro) {
    return <InlineChatView intro={openIntro} onBack={() => setOpenIntro(null)} />;
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ px: 2, pt: 1.5, pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Handshake sx={{ fontSize: 22, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Introducer</Typography>
        </Box>
        <IconButton size="small" sx={{
          bgcolor: 'primary.main',
          color: '#fff',
          width: 28,
          height: 28,
          transition: 'all 0.2s',
          '&:hover': { bgcolor: 'primary.dark', transform: 'scale(1.15)', boxShadow: 2 },
          '& .MuiSvgIcon-root': { color: '#fff' },
        }}>
          <Add sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'flex', gap: 2, px: 2, pb: 1.5, justifyContent: 'space-between' }}>
        {[
          { label: 'Intros', value: '5', icon: <Handshake sx={{ fontSize: 14 }} /> },
          { label: 'Accepted', value: '2', icon: <CheckCircle sx={{ fontSize: 14, color: '#059669' }} /> },
          { label: 'Valuable', value: '1', icon: <Star sx={{ fontSize: 14, color: '#D97706' }} /> },
          { label: 'Ripples', value: '1', icon: <Waves sx={{ fontSize: 14, color: '#3B82F6' }} /> },
        ].map((stat) => (
          <Box key={stat.label} sx={{ textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem', display: 'block', mb: 0.25 }}>
              {stat.label}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
              {stat.icon}
              <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '1rem' }}>{stat.value}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Introductions list */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {introductionHistory.map((intro) => {
            const config = statusConfig[intro.status];
            const canOpenChat = intro.status !== 'declined' && intro.status !== 'pending' && !intro.bowedOut;
            return (
              <Card
                key={intro.id}
                onClick={canOpenChat ? () => setOpenIntro(intro) : undefined}
                sx={{
                  p: 1.5,
                  cursor: canOpenChat ? 'pointer' : 'default',
                  transition: 'all 0.15s',
                  ...(canOpenChat && {
                    '&:hover': { borderColor: 'primary.main', boxShadow: 1 },
                  }),
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                  {intro.parties.map((name, i) => (
                    <Box key={i} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
                      {i > 0 && <DoubleArrow />}
                      <Typography variant="body2" noWrap sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        {name}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                    {intro.date}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                    {intro.bowedOut && (
                      <Chip
                        icon={<ExitToApp sx={{ fontSize: 12, color: '#6B7280 !important' }} />}
                        label="Bowed out"
                        size="small"
                        variant="outlined"
                        sx={{ height: 22, borderColor: '#E5E7EB', color: '#6B7280', '& .MuiChip-label': { px: 0.75, fontSize: '0.65rem' } }}
                      />
                    )}
                    {intro.isRipple && (
                      <Chip
                        icon={<Waves sx={{ fontSize: 12, color: '#3B82F6 !important' }} />}
                        label="Ripple"
                        size="small"
                        variant="outlined"
                        sx={{ height: 22, borderColor: '#E5E7EB', color: '#6B7280', '& .MuiChip-label': { px: 0.75, fontSize: '0.65rem' } }}
                      />
                    )}
                    <Chip
                      icon={config.icon}
                      label={config.label}
                      size="small"
                      variant="outlined"
                      sx={{ height: 22, borderColor: '#E5E7EB', color: '#6B7280', '& .MuiChip-icon': { color: config.iconColor }, '& .MuiChip-label': { px: 0.75, fontSize: '0.55rem' } }}
                    />
                  </Box>
                </Box>
              </Card>
            );
          })}
        </Box>
      </Box>

      <DemoNav active="home" />
    </Box>
  );
};
