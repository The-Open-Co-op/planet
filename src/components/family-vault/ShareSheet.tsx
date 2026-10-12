import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Schedule, Send } from '@mui/icons-material';
import { MyTermsChip } from '@/components/trust-demo/MyTermsChip';
import { ContactPicker } from './ContactPicker';
import { useContacts, contactName } from './contacts';
import { GroupLabel, Pill, FV_BLUE } from './familyVaultKit';
import { SHARE_DURATIONS } from './familyVaultData';

/**
 * Every outgoing share in Family Vault answers the same four questions —
 * who, what, how long, and on what terms — so a record, a derived answer and
 * an AI-written summary all go out the same way. The terms half is MyTerms
 * SD-BASE (IEEE 7012-2025): both sides keep a machine-readable agreement.
 */

export interface ShareTerms {
  recipients: string[];
  duration: string;
  onward: boolean;
}

export const ShareSheet = ({
  what,
  onShare,
}: {
  /** One line naming what is being shared. */
  what: string;
  onShare: (terms: ShareTerms) => void;
}) => {
  const contacts = useContacts();
  const [recipientIds, setRecipientIds] = useState<string[]>([]);
  const [duration, setDuration] = useState('30 days');
  const [onward, setOnward] = useState(false);

  const recipients = contacts
    .filter((c) => recipientIds.includes(c['@id'] || ''))
    .map((c) => contactName(c));

  return (
    <>
      <GroupLabel>SHARE WITH</GroupLabel>
      {contacts.length === 0 ? (
        <Typography variant="caption" color="text.secondary">
          Loading contacts…
        </Typography>
      ) : (
        <ContactPicker
          contacts={contacts}
          selectedIds={recipientIds}
          maxHeight={160}
          onToggle={(id) =>
            setRecipientIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
          }
        />
      )}

      <GroupLabel>FOR HOW LONG</GroupLabel>
      <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
        {SHARE_DURATIONS.map((d) => {
          const on = duration === d;
          return (
            <Box
              key={d}
              onClick={() => setDuration(d)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.5,
                borderRadius: 10,
                border: '1.5px solid',
                borderColor: on ? FV_BLUE : 'divider',
                bgcolor: on ? `${FV_BLUE}12` : 'transparent',
                cursor: 'pointer',
              }}
            >
              <Schedule sx={{ fontSize: 13, color: on ? FV_BLUE : 'text.disabled' }} />
              <Typography sx={{ fontSize: '0.7rem', fontWeight: on ? 700 : 500 }}>{d}</Typography>
            </Box>
          );
        })}
      </Box>

      <GroupLabel>ON WHAT TERMS</GroupLabel>
      <MyTermsChip />
      <Box
        onClick={() => setOnward((v) => !v)}
        sx={{
          p: 1.25,
          borderRadius: 1.5,
          border: '1px solid',
          borderColor: 'divider',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          They may pass it on
        </Typography>
        <Pill label={onward ? 'ALLOWED' : 'NOT ALLOWED'} color={onward ? '#B45309' : '#2E7D32'} />
      </Box>

      <Typography variant="caption" color="text.secondary">
        {recipients.length ? recipients.join(', ') : 'Nobody yet'} · {what} · {duration.toLowerCase()}.
        Both sides keep a copy of these terms.
      </Typography>

      <Button
        variant="contained"
        fullWidth
        disabled={!recipientIds.length}
        startIcon={<Send sx={{ fontSize: 14 }} />}
        onClick={() => onShare({ recipients, duration, onward })}
        sx={{ textTransform: 'none', fontWeight: 700, bgcolor: FV_BLUE, '&:hover': { bgcolor: '#0055AA' } }}
      >
        Share
      </Button>
    </>
  );
};
