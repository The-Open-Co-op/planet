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
  FamilyRestroom,
  Favorite,
  Business,
  Groups,
  PersonOutline,
} from '@mui/icons-material';
import { useInviteDraft } from '@/hooks/useInviteDraft';
import { useTrustProfiles } from '@/hooks/useTrustProfiles';

const ICON_MAP: Record<string, React.ElementType> = {
  Public,
  FamilyRestroom,
  Favorite,
  Business,
  Groups,
  PersonOutline,
};

interface InviteContactsScreenProps {
  /** 'sent' = Mike pending, 'accepted' = Mike connected */
  state: 'sent' | 'accepted';
}

/** Steps 05 / 06 — Contacts with newly invited contact in pending or accepted state. */
export const InviteContactsScreen = ({ state }: InviteContactsScreenProps) => {
  const [relationship, setRelationship] = useState('all');
  const [addAnchor, setAddAnchor] = useState<HTMLElement | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Which Trust Profile Jonny invited Mike from (chosen on the "Invite as" step).
  const { selectedProfileName } = useInviteDraft();
  const { activeProfiles } = useTrustProfiles();
  const inviteProfile = activeProfiles.find((p) => p.name === selectedProfileName);
  const InviteIcon = ICON_MAP[inviteProfile?.icon || 'Public'] ?? Public;
  const inviteColor = inviteProfile?.color || '#6b7280';

  const inviteChip = (
    <Box sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 0.375,
      px: 0.625,
      py: 0.125,
      borderRadius: 1,
      border: '1px solid',
      borderColor: inviteColor,
      bgcolor: `${inviteColor}14`,
      flexShrink: 0,
    }}>
      <InviteIcon sx={{ fontSize: 12, color: inviteColor }} />
      <Typography sx={{ fontSize: '0.6rem', fontWeight: 600, color: inviteColor, whiteSpace: 'nowrap' }}>
        Invited as {inviteProfile?.name ?? selectedProfileName}
      </Typography>
    </Box>
  );

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
              <Avatar sx={{ width: 44, height: 44, bgcolor: 'grey.300', color: 'text.secondary', fontSize: '0.9rem' }}>M</Avatar>
            }
            name="Mike"
            subtitle="Invited — awaiting connection"
            statusIcon={<Schedule sx={{ fontSize: 16, color: 'text.disabled' }} />}
            nameChip={inviteChip}
            dimmed
          />
        ) : (
          <ContactCard
            avatar={
              <Avatar sx={{ width: 44, height: 44, bgcolor: 'primary.main', color: 'white', fontSize: '0.9rem' }}>M</Avatar>
            }
            name="Mike"
            subtitle="Connected — from your invite"
            nameChip={inviteChip}
          />
        )}
      </Box>

      {/* Spacer fills remaining space */}
      <Box sx={{ flex: 1 }} />

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
  nameChip?: React.ReactNode;
  dimmed?: boolean;
}

const ContactCard = ({ avatar, name, subtitle, statusIcon, nameChip, dimmed }: ContactCardProps) => (
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.88rem' }}>{name}</Typography>
        {nameChip}
      </Box>
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
