import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Menu,
  Snackbar,
} from '@mui/material';
import {
  Search,
  Settings,
  Add,
  Public,
  People,
  ChatBubble,
  Notifications,
  PersonAdd,
  Group,
  UploadFile,
  Schedule,
  CheckCircle,
} from '@mui/icons-material';

interface InviteContactsScreenProps {
  /** 'sent' = John pending, 'accepted' = John connected */
  state: 'sent' | 'accepted';
}

/** Steps 05 / 06 — Contacts with newly invited contact in pending or accepted state. */
export const InviteContactsScreen = ({ state }: InviteContactsScreenProps) => {
  const [relationship, setRelationship] = useState('all');
  const [addAnchor, setAddAnchor] = useState<HTMLElement | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const openAdd = (e: React.MouseEvent<HTMLElement>) => setAddAnchor(e.currentTarget);
  const closeAdd = () => setAddAnchor(null);
  const fireToast = (msg: string) => { setToast(msg); closeAdd(); };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{
        px: 2,
        pt: 1.5,
        pb: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Contacts
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton size="small" onClick={() => fireToast('Settings')} aria-label="Contact settings">
            <Settings sx={{ fontSize: 20 }} />
          </IconButton>
          <IconButton size="small" onClick={openAdd} aria-label="Add contact">
            <Add sx={{ fontSize: 22 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Search + Relationship filter */}
      <Box sx={{ px: 2, pb: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 18, color: 'text.disabled' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ flex: 1 }}
        />
        <FormControl size="small" sx={{ minWidth: 110 }}>
          <InputLabel shrink>Relationships</InputLabel>
          <Select
            value={relationship}
            label="Relationships"
            notched
            onChange={(e) => setRelationship(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="connected">Connected</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Contact card list */}
      <Box sx={{ px: 1.5, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        <ContactCard
          avatar={<Avatar src="/images/john-doe-colleauges.jpeg" sx={{ width: 44, height: 44 }}>JD</Avatar>}
          name="John Doe"
          subtitle="My Profiles"
        />
        <ContactCard
          avatar={<Avatar src="/images/sarah-mitchell.png" sx={{ width: 44, height: 44 }}>S</Avatar>}
          name="Sarah Mitchell"
          subtitle="Connected — your inviter"
        />
        {state === 'sent' ? (
          <ContactCard
            avatar={
              <Avatar sx={{ width: 44, height: 44, bgcolor: 'grey.300', color: 'text.secondary', fontSize: '0.9rem' }}>J</Avatar>
            }
            name="John"
            subtitle="Invited — awaiting connection"
            statusIcon={<Schedule sx={{ fontSize: 16, color: 'text.disabled' }} />}
            dimmed
          />
        ) : (
          <ContactCard
            avatar={
              <Avatar sx={{ width: 44, height: 44, bgcolor: 'primary.main', color: 'white', fontSize: '0.9rem' }}>J</Avatar>
            }
            name="John"
            subtitle="Connected — joined PLANET via your invite"
            statusIcon={<CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />}
          />
        )}
      </Box>

      {/* Empty-state prompt fills remaining space */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', px: 3, py: 2 }}>
        <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.5, maxWidth: 260 }}>
          {state === 'sent'
            ? 'When John joins PLANET and accepts the connection, your R-DIDs will be exchanged and the link will turn blue.'
            : 'You and John can now chat end-to-end encrypted, and you can vouch for each other.'}
        </Typography>
      </Box>

      {/* Invite CTA */}
      <Box sx={{ p: 1.5, bgcolor: 'background.default', flexShrink: 0 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<PersonAdd />}
          sx={{
            textTransform: 'none',
            fontWeight: 700,
            borderRadius: 2,
            borderColor: '#0066CC',
            color: '#0066CC',
            '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.08)' },
          }}
        >
          Invite someone you trust
        </Button>
      </Box>

      <DemoNav />

      <Menu anchorEl={addAnchor} open={Boolean(addAnchor)} onClose={closeAdd}>
        <MenuItem onClick={() => fireToast('Invite contact')}>
          <PersonAdd sx={{ fontSize: 18, mr: 1 }} />
          <Typography sx={{ fontSize: '0.85rem' }}>Invite someone</Typography>
        </MenuItem>
        <MenuItem onClick={() => fireToast('New group')}>
          <Group sx={{ fontSize: 18, mr: 1 }} />
          <Typography sx={{ fontSize: '0.85rem' }}>New group</Typography>
        </MenuItem>
        <MenuItem onClick={() => fireToast('Import vCard')}>
          <UploadFile sx={{ fontSize: 18, mr: 1 }} />
          <Typography sx={{ fontSize: '0.85rem' }}>Import vCard</Typography>
        </MenuItem>
      </Menu>

      <Snackbar
        open={Boolean(toast)}
        message={toast}
        autoHideDuration={1800}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

interface ContactCardProps {
  avatar: React.ReactNode;
  name: string;
  subtitle: string;
  statusIcon?: React.ReactNode;
  dimmed?: boolean;
}

const ContactCard = ({ avatar, name, subtitle, statusIcon, dimmed }: ContactCardProps) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    px: 1.5,
    py: 1,
    bgcolor: '#ffffff',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
    cursor: 'pointer',
    opacity: dimmed ? 0.55 : 1,
    transition: 'background-color 0.15s, opacity 0.2s',
    '&:hover': { bgcolor: 'action.hover' },
  }}>
    {avatar}
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography sx={{ fontWeight: 700, fontSize: '0.88rem' }}>{name}</Typography>
      <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>{subtitle}</Typography>
    </Box>
    {statusIcon}
  </Box>
);

const DemoNav = () => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTop: '1px solid',
    borderColor: 'divider',
    bgcolor: 'background.default',
    py: 0.75,
    flexShrink: 0,
  }}>
    {[
      { label: 'Home', icon: <Public sx={{ fontSize: 20 }} /> },
      { label: 'Contacts', icon: <People sx={{ fontSize: 20, color: 'primary.main' }} />, active: true },
      { label: 'Chat', icon: <ChatBubble sx={{ fontSize: 20 }} /> },
      { label: 'Alerts', icon: <Notifications sx={{ fontSize: 20 }} /> },
    ].map((item) => (
      <Box
        key={item.label}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: item.active ? 'primary.main' : 'text.secondary' }}
      >
        {item.icon}
        <Typography sx={{ fontSize: '0.55rem', mt: 0.25, fontWeight: item.active ? 600 : 400 }}>{item.label}</Typography>
      </Box>
    ))}
  </Box>
);
