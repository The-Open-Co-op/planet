import {
  Box,
  Typography,
  Avatar,
  IconButton,
  InputBase,
} from '@mui/material';
import {
  Videocam,
  Phone,
  ChevronLeft,
  Add,
  Send,
  Backspace,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { useInviteDraft } from '@/hooks/useInviteDraft';
import { getCardSpecificProfile } from '@/components/account/AccountPage/ProfileInformation';

interface ComposeMessageScreenProps {
  onSend?: () => void;
}

const KEY_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

/**
 * Step 05 — Compose & edit: Jonny's own WhatsApp thread with Mike, where the
 * default invite message (and its link preview) sit inside the composer so he
 * can edit before sending. Edits flow through to the delivered message via
 * useInviteDraft.
 */
export const ComposeMessageScreen = ({ onSend }: ComposeMessageScreenProps) => {
  const { selectedProfileName, message, setMessage } = useInviteDraft();
  const inviteProfile = getCardSpecificProfile(selectedProfileName);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#efeae2' }}>
      {/* WhatsApp header — Jonny is composing TO Mike */}
      <Box sx={{
        px: 1, py: 0.75,
        bgcolor: '#075e54',
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        flexShrink: 0,
      }}>
        <ChevronLeft sx={{ fontSize: 24, color: 'white' }} />
        <Avatar sx={{ width: 30, height: 30, bgcolor: '#cfd8dc', color: '#37474f', fontSize: '0.8rem' }}>
          M
        </Avatar>
        <Typography sx={{ fontWeight: 600, color: 'white', flex: 1, fontSize: '0.9rem' }}>
          Mike Smith
        </Typography>
        <Videocam sx={{ fontSize: 20, color: 'white' }} />
        <Phone sx={{ fontSize: 18, color: 'white', ml: 1 }} />
      </Box>

      {/* Chat area — empty: the message isn't sent yet, it's still a draft */}
      <Box sx={{ flex: 1, minHeight: 0 }} />

      {/* Composer — message + link preview live INSIDE the input field */}
      <Box sx={{ px: 0.75, pb: 0.5, pt: 0.5, display: 'flex', alignItems: 'flex-end', gap: 0.5, flexShrink: 0 }}>
        <Add sx={{ fontSize: 26, color: '#8696a0', mb: 0.5 }} />

        <Box sx={{
          flex: 1,
          bgcolor: 'white',
          borderRadius: '18px',
          px: 1.25,
          py: 0.75,
          maxHeight: 400,
          overflowY: 'auto',
          boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
        }}>
          {/* Editable message text */}
          <InputBase
            multiline
            fullWidth
            autoFocus
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ fontSize: '0.8rem', color: '#111', lineHeight: 1.4, p: 0 }}
          />

          {/* Inline link preview, attached to the draft just like a real composer */}
          <Box sx={{
            mt: 0.75,
            borderRadius: '6px',
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
          }}>
            <Box sx={{ position: 'relative' }}>
              <Box
                component="img"
                src="/images/planet-og.jpg"
                alt="PLANET"
                sx={{ width: '100%', height: 84, objectFit: 'cover', display: 'block' }}
              />
              <Avatar
                src={inviteProfile.avatar}
                sx={{
                  position: 'absolute',
                  bottom: -16,
                  left: 10,
                  width: 40,
                  height: 40,
                  border: '2px solid white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              />
            </Box>
            <Box sx={{ p: 0.75, pt: 1.75, bgcolor: '#f0f0f0' }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.68rem', color: '#111', lineHeight: 1.3 }}>
                {inviteProfile.name} invited you to connect on PLANET
              </Typography>
              <Typography sx={{ fontSize: '0.6rem', color: '#8696a0' }}>
                planetnetwork.app
              </Typography>
            </Box>
          </Box>
        </Box>

        <IconButton
          onClick={onSend}
          aria-label="Send"
          sx={{ bgcolor: '#075e54', color: 'white', mb: 0.25, '&:hover': { bgcolor: '#064a42' } }}
        >
          <Send sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Faux on-screen keyboard — makes it obvious the message is being typed */}
      <Box sx={{ bgcolor: '#d1d5db', px: 0.5, pt: 0.75, pb: 1, flexShrink: 0 }}>
        {KEY_ROWS.map((row, i) => (
          <Box key={i} sx={{ display: 'flex', justifyContent: 'center', gap: '4px', mb: '5px', px: i === 1 ? 1.5 : 0 }}>
            {i === 2 && <KeyCap wide icon={<KeyboardArrowUp sx={{ fontSize: 16 }} />} />}
            {row.map((k) => <KeyCap key={k} label={k} />)}
            {i === 2 && <KeyCap wide icon={<Backspace sx={{ fontSize: 15 }} />} />}
          </Box>
        ))}
        {/* Bottom row */}
        <Box sx={{ display: 'flex', gap: '4px', px: 0.25 }}>
          <KeyCap label="123" flexGrow={1.4} dark />
          <KeyCap label="space" flexGrow={5} />
          <KeyCap label="return" flexGrow={1.8} dark />
        </Box>
      </Box>
    </Box>
  );
};

interface KeyCapProps {
  label?: string;
  icon?: React.ReactNode;
  wide?: boolean;
  dark?: boolean;
  flexGrow?: number;
}

const KeyCap = ({ label, icon, wide, dark, flexGrow }: KeyCapProps) => (
  <Box sx={{
    flex: flexGrow ? `${flexGrow} 1 0` : '1 1 0',
    minWidth: wide ? 34 : 0,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: dark ? '#aab1ba' : 'white',
    color: '#1a1a1a',
    borderRadius: '5px',
    fontSize: '0.78rem',
    fontWeight: 500,
    boxShadow: '0 1px 0 rgba(0,0,0,0.25)',
  }}>
    {icon ?? label}
  </Box>
);
