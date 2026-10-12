import { Box, Button, Typography } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, TrendingUp } from '@mui/icons-material';
import { MyTermsChip } from '@/components/trust-demo/MyTermsChip';
import { VaultScreen, VaultCard, GroupLabel, CheckLine, Pill, FV_BLUE } from '../familyVaultKit';
import { LEARNING_APP } from '../familyVaultData';
import { useFamilyVault } from '../familyVaultContext';
import { useVaultNav } from '../vaultNav';

/**
 * Step 6 — Alice switches from Math Kingdom to Fantasy Academy, the report's
 * own education story: a scoped import, personalised from day one, and
 * progress flowing back to the profile without either platform owning it.
 */

export const LearningAppScreen = () => {
  const { appItemIds, toggleAppItem, appGranted, grantApp } = useFamilyVault();
  const { setView } = useVaultNav();

  const chosen = LEARNING_APP.items.filter((i) => appItemIds.includes(i.id));

  if (appGranted) {
    return (
      <VaultScreen title={LEARNING_APP.to} subtitle="Day one" tab="vault" onBack={() => setView('home')}>
        <VaultCard accent="#2E7D32">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <CheckCircle sx={{ fontSize: 18, color: 'success.main' }} />
            <Typography variant="body2" sx={{ fontWeight: 800, color: 'success.dark' }}>
              Picked up where she left off
            </Typography>
          </Box>
        </VaultCard>

        <GroupLabel>WHAT IT DID WITH IT</GroupLabel>
        <VaultCard>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {LEARNING_APP.dayOne.map((d) => (
              <CheckLine key={d}>{d}</CheckLine>
            ))}
          </Box>
        </VaultCard>

        <GroupLabel>AFTER THREE SESSIONS</GroupLabel>
        <VaultCard accent={FV_BLUE}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
            <TrendingUp sx={{ fontSize: 18, color: FV_BLUE }} />
            <Typography variant="caption" sx={{ fontWeight: 800, color: FV_BLUE }}>
              Added to her own profile
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.primary', display: 'block' }}>
            {LEARNING_APP.flowsBack}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            Her progress stays with her. If she leaves {LEARNING_APP.to} tomorrow, it comes too.
          </Typography>
        </VaultCard>
      </VaultScreen>
    );
  }

  return (
    <VaultScreen
      title="Data request"
      subtitle={`${LEARNING_APP.to} · about Alice`}
      tab="alerts"
      onBack={() => setView('home')}
    >
      <VaultCard>
        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block' }}>
          WHY THEY WANT IT
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.primary' }}>
          {LEARNING_APP.purpose}
        </Typography>
      </VaultCard>

      <GroupLabel>WHAT TO SHARE</GroupLabel>
      {LEARNING_APP.items.map((item) => {
        const on = appItemIds.includes(item.id);
        return (
          <Box
            key={item.id}
            onClick={() => toggleAppItem(item.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1.25,
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: on ? FV_BLUE : 'divider',
              bgcolor: on ? `${FV_BLUE}0D` : 'background.paper',
              cursor: 'pointer',
            }}
          >
            {on ? (
              <CheckCircle sx={{ fontSize: 18, color: FV_BLUE }} />
            ) : (
              <RadioButtonUnchecked sx={{ fontSize: 18, color: 'text.disabled' }} />
            )}
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: on ? 'text.primary' : 'text.secondary' }}
            >
              {item.label}
            </Typography>
          </Box>
        );
      })}

      <VaultCard>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Pill label="ANONYMOUS" color={FV_BLUE} />
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            No name, no email
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {LEARNING_APP.to} gets {chosen.length} things about a learner it never has to identify.
        </Typography>
      </VaultCard>

      <GroupLabel>ON WHAT TERMS</GroupLabel>
      <MyTermsChip compact />

      <Button
        variant="contained"
        fullWidth
        onClick={grantApp}
        disabled={!chosen.length}
        sx={{ textTransform: 'none', fontWeight: 700, bgcolor: FV_BLUE, '&:hover': { bgcolor: '#0055AA' } }}
      >
        Share and continue
      </Button>
    </VaultScreen>
  );
};
