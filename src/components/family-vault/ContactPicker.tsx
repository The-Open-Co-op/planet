import { Avatar, Box, Checkbox, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import type { Contact } from '@/types/contact';
import { contactName, contactInitials } from './contacts';
import { FV_BLUE } from './familyVaultKit';

/**
 * The contact list used wherever the demo asks "who?" — same checkbox rows as
 * the Introducer demo's compose screen, without the introducing parts.
 */

export const ContactPicker = ({
  contacts,
  selectedIds,
  onToggle,
  maxHeight = 250,
}: {
  contacts: Contact[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  maxHeight?: number;
}) => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1.5,
      overflow: 'auto',
      maxHeight,
    }}
  >
    {contacts.map((c, i) => {
      const id = c['@id'] || '';
      const isSelected = selectedIds.includes(id);
      return (
        <Box
          key={id}
          onClick={() => onToggle(id)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 1.5,
            py: 1,
            cursor: 'pointer',
            borderBottom: i === contacts.length - 1 ? 'none' : '1px solid',
            borderColor: 'divider',
            bgcolor: isSelected ? 'action.selected' : 'transparent',
            '&:hover': { bgcolor: isSelected ? 'action.selected' : 'action.hover' },
          }}
        >
          <Checkbox size="small" checked={isSelected} sx={{ p: 0, '& .MuiSvgIcon-root': { fontSize: 20 } }} />
          <Avatar sx={{ width: 30, height: 30, bgcolor: 'grey.300', color: 'text.secondary', fontSize: '0.7rem' }}>
            {contactInitials(c)}
          </Avatar>
          <Typography variant="body2" noWrap sx={{ fontWeight: 600, fontSize: '0.85rem', flex: 1 }}>
            {contactName(c)}
          </Typography>
        </Box>
      );
    })}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 1.5,
        py: 1,
        cursor: 'pointer',
        color: FV_BLUE,
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      <Add sx={{ fontSize: 20 }} />
      <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
        New contact
      </Typography>
    </Box>
  </Box>
);
