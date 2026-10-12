import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { PersonAdd, CheckCircle } from '@mui/icons-material';
import { ContactPicker } from '../ContactPicker';
import { useContacts, contactName } from '../contacts';
import { VaultScreen, VaultCard, GroupLabel, PersonChip, Pill, FV_BLUE } from '../familyVaultKit';
import { FAMILY, CIRCLE_ROLES } from '../familyVaultData';
import { useVaultNav } from '../vaultNav';

/**
 * Step 8 — the trusted circle. A role is a grant like any other: it says what
 * the person can see, for how long, and it comes off in a tap.
 *
 * The picker is the same contact list pattern the Introducer demo uses, so
 * there is one way to choose a person across the demos.
 */

const trusted = FAMILY.filter((p) => p.circle === 'trusted');

export const CircleScreen = () => {
  const { setView } = useVaultNav();
  const [removed, setRemoved] = useState<string[]>([]);
  const [inviting, setInviting] = useState(false);
  const contacts = useContacts();
  const [pickedId, setPickedId] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const people = trusted.filter((p) => !removed.includes(p.id));
  const picked = contacts.find((c) => (c['@id'] || '') === pickedId);
  const role = CIRCLE_ROLES.find((r) => r.id === roleId);

  const closeInvite = () => {
    setInviting(false);
    setPickedId(null);
    setRoleId(null);
    setSent(false);
  };

  if (inviting) {
    return (
      <VaultScreen
        title="Add to the circle"
        subtitle={sent ? 'Done' : 'Choose a person, then what they can see'}
        tab="contacts"
        onBack={closeInvite}
      >
        {sent ? (
          <>
            <VaultCard accent="#2E7D32">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <CheckCircle sx={{ fontSize: 18, color: 'success.main' }} />
                <Typography variant="body2" sx={{ fontWeight: 800, color: 'success.dark' }}>
                  Invitation sent to {picked ? contactName(picked) : 'them'}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                They join as a verified person with one role — {role?.label.toLowerCase()} — and nothing more.
              </Typography>
            </VaultCard>
            <Button
              variant="outlined"
              fullWidth
              onClick={closeInvite}
              sx={{ textTransform: 'none', fontWeight: 700 }}
            >
              Back to the circle
            </Button>
          </>
        ) : (
          <>
            <GroupLabel>WHO</GroupLabel>
            <ContactPicker
              contacts={contacts}
              selectedIds={pickedId ? [pickedId] : []}
              onToggle={(id) => setPickedId(id === pickedId ? null : id)}
            />

            <GroupLabel>PERMISSIONS</GroupLabel>
            <Box sx={{ display: 'flex', gap: 0.75, opacity: pickedId ? 1 : 0.55 }}>
              {CIRCLE_ROLES.map((r) => {
                const on = roleId === r.id;
                return (
                  <Box
                    key={r.id}
                    onClick={() => setRoleId(on ? null : r.id)}
                    sx={{
                      flex: 1,
                      px: 1,
                      py: 1,
                      borderRadius: 1.5,
                      border: '1.5px solid',
                      borderColor: on ? FV_BLUE : 'divider',
                      bgcolor: on ? `${FV_BLUE}0D` : 'background.paper',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        lineHeight: 1.2,
                        display: 'block',
                        color: on ? FV_BLUE : 'text.primary',
                      }}
                    >
                      {r.label}
                    </Typography>
                    <Typography
                      sx={{ fontSize: '0.6rem', lineHeight: 1.25, mt: 0.25, color: 'text.secondary', display: 'block' }}
                    >
                      {r.short}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            {role && (
              <Typography variant="caption" color="text.secondary">
                {role.detail}
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              disabled={!pickedId || !roleId}
              onClick={() => setSent(true)}
              sx={{ textTransform: 'none', fontWeight: 700, bgcolor: FV_BLUE, '&:hover': { bgcolor: '#0055AA' } }}
            >
              Send invitation
            </Button>
          </>
        )}
      </VaultScreen>
    );
  }

  return (
    <VaultScreen
      title="Trusted circle"
      subtitle={`${people.length} people`}
      tab="contacts"
      onBack={() => setView('home')}
    >
      {people.map((p) => (
        <VaultCard key={p.id}>
          <PersonChip person={p} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mt: 0.75 }}>
            <Pill label="VERIFIED PERSON" color={FV_BLUE} />
            <Button
              size="small"
              variant="outlined"
              onClick={() => setRemoved((prev) => [...prev, p.id])}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                py: 0.15,
                fontSize: '0.7rem',
                color: 'text.secondary',
                borderColor: 'divider',
              }}
            >
              Remove
            </Button>
          </Box>
        </VaultCard>
      ))}

      {people.length === 0 && (
        <Typography variant="caption" color="text.secondary">
          Nobody outside the household can see anything.
        </Typography>
      )}

      <Button
        variant="outlined"
        fullWidth
        startIcon={<PersonAdd sx={{ fontSize: 16 }} />}
        onClick={() => setInviting(true)}
        sx={{ textTransform: 'none', fontWeight: 700 }}
      >
        Add someone
      </Button>
    </VaultScreen>
  );
};
