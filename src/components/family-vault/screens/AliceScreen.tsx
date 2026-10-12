import { Box, Typography } from '@mui/material';
import { Lock, Visibility } from '@mui/icons-material';
import { VaultScreen, VaultCard, GroupLabel, Pill, PersonChip, FV_BLUE } from '../familyVaultKit';
import { FAMILY, HANDOVER, SEALED_RECORD, SCHOOL_REQUEST, LEARNING_APP } from '../familyVaultData';
import { useFamilyVault } from '../familyVaultContext';
import { useVaultNav } from '../vaultNav';

/**
 * Step 10 — the same vault from Alice's phone: what is shared about her, what
 * passes to her at 18, and a record sealed from one family member.
 *
 * The sealed record is one neutral card. Families are not always safe, and a
 * design that assumes they are fails the people who most need this.
 */

const alice = FAMILY.find((p) => p.id === 'alice')!;

export const AliceScreen = () => {
  const { approval, appGranted } = useFamilyVault();
  const { setView } = useVaultNav();

  const shares = [
    ...(approval === 'complete'
      ? [{ who: SCHOOL_REQUEST.org, what: 'My math, English and attendance, and how I learn best' }]
      : []),
    ...(appGranted ? [{ who: LEARNING_APP.to, what: 'My math progress and preferences — not my name' }] : []),
    { who: 'Ms. Okafor', what: 'My learning plan, until 30 June' },
  ];

  return (
    <VaultScreen
      title="Alice’s vault"
      subtitle="Everything that’s shared about me"
      tab="home"
      tint="#F2F7F5"
      onBack={() => setView('home')}
    >
      <VaultCard>
        <PersonChip person={alice} />
      </VaultCard>

      <GroupLabel>WHAT’S SHARED ABOUT ME</GroupLabel>
      {shares.map((s) => (
        <VaultCard key={s.who}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 0 }} noWrap>
              {s.who}
            </Typography>
            <Pill label="I APPROVED" color={FV_BLUE} />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
            {s.what}
          </Typography>
        </VaultCard>
      ))}

      <GroupLabel>AS I GROW UP</GroupLabel>
      <VaultCard>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
          {HANDOVER.map((h, i) => (
            <Box key={h.age} sx={{ display: 'flex', gap: 1.25 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '3px' }}>
                <Box
                  sx={{
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    bgcolor: i === 0 ? FV_BLUE : 'grey.400',
                    flexShrink: 0,
                  }}
                />
                {i < HANDOVER.length - 1 && <Box sx={{ width: '1px', flex: 1, bgcolor: 'divider', mt: 0.5 }} />}
              </Box>
              <Box sx={{ pb: 0.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, display: 'block' }}>
                  {h.age}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {h.detail}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </VaultCard>

      <GroupLabel>SEALED BY ME</GroupLabel>
      <VaultCard>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
          <Lock sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {SEALED_RECORD.title}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          {SEALED_RECORD.issuer}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.75 }}>
          <Visibility sx={{ fontSize: 13, color: 'text.disabled' }} />
          <Typography variant="caption" sx={{ color: 'text.primary' }}>
            Visible to {SEALED_RECORD.visibleTo.join(' and ')}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
          Sealed from {SEALED_RECORD.sealedFrom}. {SEALED_RECORD.note}
        </Typography>
      </VaultCard>
    </VaultScreen>
  );
};
