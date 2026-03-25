import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Avatar, Card, Button, Checkbox } from '@mui/material';
import { ArrowBack, Search, Send } from '@mui/icons-material';
import { introMessage } from './mockData';
import { dataService } from '@/services/dataService';
import type { Contact } from '@/types/contact';
import type { SocialContact } from '@/.ldo/contact.typings';
import { resolveFrom } from '@/utils/contactUtils';
import { DemoNav } from './DemoNav';

const KEYBOARD_ROWS = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m'],
];

export const ComposeScreen = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showKeyboard, setShowKeyboard] = useState(false);

  useEffect(() => {
    dataService.getContacts().then((data) => {
      // Filter out "me" contact and sort alphabetically
      const others = data
        .filter(c => !c.isMe && (c['@id'] || '') !== 'me' && resolveFrom(c as unknown as SocialContact, 'name')?.value)
        .sort((a, b) => {
          const preSelected = new Set(['contact:1', 'contact:2']);
          const aSelected = preSelected.has(a['@id'] || '') ? 0 : 1;
          const bSelected = preSelected.has(b['@id'] || '') ? 0 : 1;
          if (aSelected !== bSelected) return aSelected - bSelected;
          const nameA = resolveFrom(a as unknown as SocialContact, 'name')?.value || '';
          const nameB = resolveFrom(b as unknown as SocialContact, 'name')?.value || '';
          return nameA.localeCompare(nameB);
        });
      setContacts(others);
      // Pre-select Sarah Mitchell and Michael Chen
      setSelected(new Set(['contact:1', 'contact:2']));
    });
  }, []);

  const selectedContacts = contacts.filter(c => selected.has(c['@id'] || ''));

  const getName = (c: Contact) => resolveFrom(c as unknown as SocialContact, 'name')?.value || 'Unknown';
  const getInitials = (c: Contact) => {
    const name = getName(c);
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };

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

  const toggleContact = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ px: 2, pt: 1.5, pb: 1, display: 'flex', alignItems: 'center', gap: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <ArrowBack sx={{ fontSize: 18, color: 'text.secondary' }} />
        <Typography variant="body1" sx={{ fontWeight: 700 }}>New Introduction</Typography>
      </Box>

      {/* Search */}
      <Box sx={{ px: 2, pt: 1, pb: 0.5 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search..."
          slotProps={{
            input: {
              startAdornment: <Search sx={{ fontSize: 18, color: 'text.secondary', mr: 0.5 }} />,
              sx: { fontSize: '0.8rem' },
            },
          }}
        />
      </Box>

      {/* Contacts list — shrinks when keyboard is open */}
      <Box sx={{ flex: `0 1 ${showKeyboard ? 180 : 220}px`, overflow: 'auto', borderBottom: '1px solid', borderColor: 'divider', transition: 'flex-basis 0.2s' }}>
        {contacts.map((contact) => {
          const name = getName(contact);
          const initials = getInitials(contact);
          const contactId = contact['@id'] || '';
          const isSelected = selected.has(contactId);
          return (
            <Box
              key={contactId}
              onClick={() => toggleContact(contactId)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1,
                cursor: 'pointer',
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: isSelected ? 'action.selected' : 'transparent',
                '&:hover': { bgcolor: isSelected ? 'action.selected' : 'action.hover' },
              }}
            >
              <Checkbox
                size="small"
                checked={isSelected}
                sx={{ p: 0, '& .MuiSvgIcon-root': { fontSize: 20 } }}
              />
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.300', color: 'text.secondary', fontSize: '0.7rem' }}>
                {initials}
              </Avatar>
              <Typography variant="body2" noWrap sx={{ fontWeight: 600, fontSize: '0.85rem', flex: 1 }}>
                {name}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Selected + message */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2, pt: 1 }}>
        {selectedContacts.length > 0 && (
          <>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
              You're introducing ({selectedContacts.length})
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
              {selectedContacts.map((c) => (
                <Card key={c['@id']} sx={{ py: 0.5, px: 1 }}>
                  <Typography variant="body2" noWrap sx={{ fontWeight: 600, fontSize: '0.65rem' }}>
                    {getName(c).split(' ')[0]}
                  </Typography>
                </Card>
              ))}
            </Box>
          </>
        )}

        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
          Intro text:
        </Typography>
        <Card
          onClick={() => setShowKeyboard(true)}
          sx={{ p: 1.5, cursor: 'text', border: showKeyboard ? '2px solid' : '1px solid', borderColor: showKeyboard ? 'primary.main' : 'divider' }}
        >
          <Typography variant="body2" sx={{ fontSize: '0.8rem', lineHeight: 1.5 }}>
            {renderMessage(introMessage)}
          </Typography>
        </Card>
      </Box>

      {/* Footer — hidden when keyboard is up */}
      {!showKeyboard && (
        <Box sx={{ px: 2, py: 1.5, flexShrink: 0, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            variant="contained"
            fullWidth
            size="small"
            disabled={selectedContacts.length < 2}
            startIcon={<Send sx={{ fontSize: 14 }} />}
            sx={{ textTransform: 'none', fontWeight: 600, bgcolor: '#0066CC', '&:hover': { bgcolor: '#0055AA' } }}
          >
            Send Introduction
          </Button>
        </Box>
      )}

      {/* Mock mobile keyboard */}
      {showKeyboard && (
        <Box
          sx={{
            flexShrink: 0,
            bgcolor: '#D1D3D9',
            pt: 0.75,
            pb: 1,
            px: 0.5,
          }}
        >
          {KEYBOARD_ROWS.map((row, ri) => (
            <Box key={ri} sx={{ display: 'flex', justifyContent: 'center', gap: '3px', mb: '3px' }}>
              {row.map((key) => (
                <Box
                  key={key}
                  sx={{
                    width: 28,
                    height: 30,
                    bgcolor: 'white',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    boxShadow: '0 1px 0 rgba(0,0,0,0.3)',
                  }}
                >
                  {key}
                </Box>
              ))}
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '3px', mt: '3px' }}>
            <Box sx={{ width: 50, height: 30, bgcolor: '#ADB0B8', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 600, boxShadow: '0 1px 0 rgba(0,0,0,0.3)' }}>123</Box>
            <Box sx={{ flex: 1, height: 30, bgcolor: 'white', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: 'text.secondary', boxShadow: '0 1px 0 rgba(0,0,0,0.3)' }}>space</Box>
            <Box onClick={() => setShowKeyboard(false)} sx={{ width: 70, height: 30, bgcolor: '#0066CC', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 600, color: 'white', cursor: 'pointer', boxShadow: '0 1px 0 rgba(0,0,0,0.3)', '&:hover': { bgcolor: '#0055AA' } }}>done</Box>
          </Box>
        </Box>
      )}

      {!showKeyboard && <DemoNav active="home" />}
    </Box>
  );
};
