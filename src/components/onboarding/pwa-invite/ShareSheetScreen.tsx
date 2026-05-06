import { Box, Typography, Avatar, IconButton } from '@mui/material';
import { ArrowBack, Mail, Sms, ContentCopy, MoreHoriz, Chat } from '@mui/icons-material';

interface ShareSheetScreenProps {
  onSelect?: () => void;
}

interface Channel {
  id: string;
  label: string;
  icon: React.ReactNode;
  bg: string;
  color: string;
}

const CHANNELS: Channel[] = [
  { id: 'whatsapp', label: 'WhatsApp', icon: <Chat />, bg: '#25D366', color: 'white' },
  { id: 'imessage', label: 'Messages', icon: <Sms />, bg: '#34C759', color: 'white' },
  { id: 'signal', label: 'Signal', icon: <Chat />, bg: '#3A76F0', color: 'white' },
  { id: 'mail', label: 'Mail', icon: <Mail />, bg: '#1976d2', color: 'white' },
  { id: 'copy', label: 'Copy link', icon: <ContentCopy />, bg: '#e0e0e0', color: '#222' },
  { id: 'more', label: 'More', icon: <MoreHoriz />, bg: '#e0e0e0', color: '#222' },
];

/** Step 03 — Share sheet: generated link + faux native share sheet. */
export const ShareSheetScreen = ({ onSelect }: ShareSheetScreenProps) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default', position: 'relative' }}>
      {/* App header */}
      <Box sx={{
        px: 1.5,
        pt: 1.5,
        pb: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}>
        <IconButton size="small" aria-label="Back">
          <ArrowBack sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
          Invite Mike
        </Typography>
      </Box>

      {/* Generated link card with OG preview */}
      <Box sx={{ px: 2, pb: 2 }}>
        <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: 'primary.main', letterSpacing: 1, mb: 0.75 }}>
          PERSONALISED LINK
        </Typography>
        <Box sx={{
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'white',
        }}>
          {/* OG image area */}
          <Box sx={{ position: 'relative' }}>
            <Box
              component="img"
              src="/images/planet-og.jpg"
              alt=""
              sx={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }}
            />
            <Avatar
              src="/images/john-doe-colleauges.jpeg"
              sx={{
                position: 'absolute',
                bottom: -22,
                left: 14,
                width: 52,
                height: 52,
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            />
          </Box>
          <Box sx={{ p: 1.25, pt: 3.25 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#111', lineHeight: 1.3 }}>
              Jonny invited you to connect on PLANET
            </Typography>
            <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', mt: 0.25 }}>
              planetnetwork.app/j/x7k2m
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', mt: 1.25, lineHeight: 1.5 }}>
          Tap a channel below — your phone will open the chosen app with the link prefilled.
        </Typography>
      </Box>

      <Box sx={{ flex: 1 }} />

      {/* Faux native share sheet */}
      <Box sx={{
        bgcolor: '#f4f4f7',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        boxShadow: '0 -8px 24px rgba(0,0,0,0.08)',
        flexShrink: 0,
      }}>
        {/* Sheet handle */}
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 0.875, pb: 0.5 }}>
          <Box sx={{ width: 36, height: 4, borderRadius: 2, bgcolor: '#c5c5c8' }} />
        </Box>

        <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, textAlign: 'center', color: '#222', mb: 1 }}>
          Share invite link
        </Typography>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          px: 1.5,
          pb: 1.5,
        }}>
          {CHANNELS.map((c) => (
            <Box
              key={c.id}
              onClick={onSelect}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.5,
                py: 0.875,
                cursor: 'pointer',
                borderRadius: 1.5,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
              }}
            >
              <Box sx={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                bgcolor: c.bg,
                color: c.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& svg': { fontSize: 22 },
              }}>
                {c.icon}
              </Box>
              <Typography sx={{ fontSize: '0.65rem', color: '#222' }}>{c.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
