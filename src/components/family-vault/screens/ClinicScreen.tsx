import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Close } from '@mui/icons-material';
import { MyTermsChip } from '@/components/trust-demo/MyTermsChip';
import { VaultScreen, VaultCard, GroupLabel, CheckLine, Pill, FV_BLUE } from '../familyVaultKit';
import { CLINIC_REQUEST } from '../familyVaultData';
import { useFamilyVault } from '../familyVaultContext';
import { useVaultNav } from '../vaultNav';

/**
 * Step 5 — the clinic needs an answer, not a file. Sharing the answer is the
 * default; the full record is there to be chosen against.
 */

export const ClinicScreen = () => {
  const { clinicChoice, setClinicChoice } = useFamilyVault();
  const { setView } = useVaultNav();
  const [picked, setPicked] = useState<'answer' | 'full'>('answer');

  const chosen = CLINIC_REQUEST.options.find((o) => o.id === clinicChoice);

  if (chosen) {
    return (
      <VaultScreen
        title="Data request"
        subtitle={`Shared with ${CLINIC_REQUEST.org}`}
        tab="alerts"
        onBack={() => setClinicChoice(null)}
      >
        <VaultCard accent="#2E7D32">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
            <CheckCircle sx={{ fontSize: 18, color: 'success.main' }} />
            <Typography variant="body2" sx={{ fontWeight: 800, color: 'success.dark' }}>
              {chosen.detail}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            Shared for {CLINIC_REQUEST.duration}, then it ends on its own.
          </Typography>
        </VaultCard>

        <GroupLabel>THE CLINIC CAN SEE</GroupLabel>
        <VaultCard>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {chosen.reveals.map((r) => (
              <CheckLine key={r}>{r}</CheckLine>
            ))}
          </Box>
        </VaultCard>

        {chosen.hides.length > 0 && (
          <>
            <GroupLabel>IT CANNOT</GroupLabel>
            <VaultCard>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {chosen.hides.map((h) => (
                  <Box key={h} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <Close sx={{ fontSize: 14, color: 'error.main' }} />
                    <Typography variant="caption" color="text.secondary">
                      {h}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </VaultCard>
          </>
        )}

        <Typography variant="caption" color="text.secondary">
          Ethan can enroll, and no clinic record changed hands.
        </Typography>
      </VaultScreen>
    );
  }

  return (
    <VaultScreen
      title="Data request"
      subtitle={`${CLINIC_REQUEST.org} · about Ethan`}
      tab="alerts"
      onBack={() => setView('home')}
    >
      <VaultCard>
        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block' }}>
          WHY THEY WANT IT
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.primary' }}>
          {CLINIC_REQUEST.purpose}
        </Typography>
      </VaultCard>

      <GroupLabel>HOW MUCH TO SHARE</GroupLabel>
      {CLINIC_REQUEST.options.map((o) => (
        <Box
          key={o.id}
          onClick={() => setPicked(o.id as 'answer' | 'full')}
          sx={{
            p: 1.5,
            borderRadius: 1.5,
            border: '1.5px solid',
            borderColor: picked === o.id ? FV_BLUE : 'divider',
            bgcolor: picked === o.id ? `${FV_BLUE}0D` : 'background.paper',
            cursor: 'pointer',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
            {picked === o.id ? (
              <CheckCircle sx={{ fontSize: 18, color: FV_BLUE }} />
            ) : (
              <RadioButtonUnchecked sx={{ fontSize: 18, color: 'text.disabled' }} />
            )}
            <Typography variant="body2" sx={{ fontWeight: 700, flex: 1 }}>
              {o.label}
            </Typography>
            {o.recommended && <Pill label="ENOUGH" color={FV_BLUE} />}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', pl: 3.5 }}>
            {o.detail}
          </Typography>
        </Box>
      ))}

      <GroupLabel>ON WHAT TERMS</GroupLabel>
      <MyTermsChip compact />

      <Button
        variant="contained"
        fullWidth
        onClick={() => setClinicChoice(picked)}
        sx={{ textTransform: 'none', fontWeight: 700, bgcolor: FV_BLUE, '&:hover': { bgcolor: '#0055AA' } }}
      >
        Share with the clinic
      </Button>

    </VaultScreen>
  );
};
