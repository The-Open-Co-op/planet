import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Schedule, Visibility, Block } from '@mui/icons-material';
import { VaultScreen, VaultCard, GroupLabel, Pill, TermsLink, FV_BLUE } from '../familyVaultKit';
import { ACCESS_LOG, SCHOOL_REQUEST, CLINIC_REQUEST } from '../familyVaultData';
import type { AccessEntry } from '../familyVaultData';
import { useFamilyVault } from '../familyVaultContext';
import { useVaultNav } from '../vaultNav';

/** Step 7 — every access, what it covered, and when it ends. */

const STATE_LABEL: Record<AccessEntry['state'], { label: string; color: string }> = {
  active: { label: 'ACTIVE', color: '#0066CC' },
  expired: { label: 'ENDED ON ITS OWN', color: '#6B7280' },
  once: { label: 'READ ONCE', color: '#6B7280' },
};

export const AccessLogScreen = () => {
  const { approval, clinicChoice, duration, revokedIds, revokeAccess } = useFamilyVault();
  const { setView } = useVaultNav();
  const [who, setWho] = useState<'Everyone' | 'Maria' | 'Alice' | 'Ethan'>('Everyone');

  // Grants made earlier in the demo appear here alongside the standing ones.
  const fromThisSession: AccessEntry[] = [
    ...(approval === 'complete'
      ? [
          {
            id: 'acc-school',
            about: 'alice' as const,
            who: SCHOOL_REQUEST.org,
            what: "Placed Alice using her transcript and learner profile",
            when: 'Today',
            state: 'active' as const,
            until: `Ends ${duration.toLowerCase()}`,
          },
        ]
      : []),
    ...(clinicChoice
      ? [
          {
            id: 'acc-clinic',
            about: 'ethan' as const,
            who: CLINIC_REQUEST.org,
            what:
              clinicChoice === 'answer'
                ? 'Checked that Ethan meets school entry requirements'
                : "Read Ethan's full immunization record",
            when: 'Today',
            state: 'active' as const,
            until: `Ends in ${CLINIC_REQUEST.duration}`,
          },
        ]
      : []),
  ];

  const all = [...fromThisSession, ...ACCESS_LOG];
  const entries = who === 'Everyone' ? all : all.filter((e) => e.about === who.toLowerCase());

  // Split so the annotation can point at a section that is always there,
  // whichever grants the presenter made on the way here.
  const isLive = (e: AccessEntry) => e.state === 'active' && !revokedIds.includes(e.id);
  const GROUPS = [
    { label: 'ACTIVE', rows: entries.filter(isLive) },
    { label: 'ENDED', rows: entries.filter((e) => !isLive(e)) },
  ];

  return (
    <VaultScreen
      title="Shared"
      subtitle={`${entries.length} in the last year`}
      tab="vault"
      onBack={() => setView('home')}
      chips={
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
          {(['Everyone', 'Maria', 'Alice', 'Ethan'] as const).map((w) => {
            const on = who === w;
            return (
              <Box
                key={w}
                onClick={() => setWho(w)}
                sx={{
                  px: 1,
                  py: 0.4,
                  borderRadius: 10,
                  border: '1.5px solid',
                  borderColor: on ? FV_BLUE : 'divider',
                  bgcolor: on ? `${FV_BLUE}12` : 'transparent',
                  cursor: 'pointer',
                  '&:hover': { borderColor: FV_BLUE },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: on ? 700 : 500,
                    color: on ? FV_BLUE : 'text.primary',
                  }}
                >
                  {w}
                </Typography>
              </Box>
            );
          })}
        </Box>
      }
    >
      {GROUPS.map(({ label, rows }) =>
        rows.length === 0 ? null : (
          <Box key={label} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <GroupLabel>{label}</GroupLabel>
            {rows.map((e) => {
              const revoked = revokedIds.includes(e.id);
              const meta = revoked ? { label: 'ENDED BY YOU', color: '#B91C1C' } : STATE_LABEL[e.state];
              return (
                <VaultCard key={e.id}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                      {e.who}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {e.what}
                    </Typography>
                  </Box>
                  <Pill label={meta.label} color={meta.color} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.75, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Visibility sx={{ fontSize: 13, color: 'text.disabled' }} />
                    <Typography variant="caption" color="text.secondary">
                      {e.when}
                    </Typography>
                  </Box>
                  {e.until && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Schedule sx={{ fontSize: 13, color: 'text.disabled' }} />
                      <Typography variant="caption" color="text.secondary">
                        {e.until}
                      </Typography>
                    </Box>
                  )}
                  <TermsLink />
                </Box>

                {e.state === 'active' && !revoked && (
                  <Button
                    size="small"
                    startIcon={<Block sx={{ fontSize: 14 }} />}
                    onClick={() => revokeAccess(e.id)}
                    sx={{ textTransform: 'none', fontWeight: 700, px: 0, mt: 0.5, color: FV_BLUE }}
                  >
                    End this now
                  </Button>
                )}
                </VaultCard>
              );
            })}
          </Box>
        )
      )}

      <Typography variant="caption" color="text.secondary">
        Nothing here was granted forever. Each one ends on its own, or when you end it.
      </Typography>
    </VaultScreen>
  );
};
