import { Box, Button, Typography } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, PhoneIphone, Schedule } from '@mui/icons-material';
import { MyTermsChip } from '@/components/trust-demo/MyTermsChip';
import { VaultScreen, VaultCard, GroupLabel, Pill, CheckLine, FV_BLUE } from '../familyVaultKit';
import { SCHOOL_REQUEST } from '../familyVaultData';
import { useFamilyVault } from '../familyVaultContext';
import { useVaultNav } from '../vaultNav';

/**
 * Step 4 — the new school asks. The family decides item by item, for how long,
 * sees exactly what the school will get, and Alice approves alongside a parent.
 */

const GROUPS = Array.from(new Set(SCHOOL_REQUEST.items.map((i) => i.group)));

export const SchoolRequestScreen = () => {
  const {
    requestOpened,
    openRequest,
    selectedItemIds,
    toggleItem,
    duration,
    setDuration,
    approval,
    advanceApproval,
  } = useFamilyVault();
  const { setView } = useVaultNav();

  const chosen = SCHOOL_REQUEST.items.filter((i) => selectedItemIds.includes(i.id));
  const withheld = SCHOOL_REQUEST.items.filter((i) => !selectedItemIds.includes(i.id));

  if (!requestOpened) {
    return (
      <VaultScreen title="Alerts" tab="alerts" onBack={() => setView('home')}>
        <Box
          onClick={openRequest}
          sx={{
            p: 1.5,
            borderRadius: 1.5,
            border: '1.5px solid',
            borderColor: FV_BLUE,
            bgcolor: `${FV_BLUE}0D`,
            cursor: 'pointer',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 800, color: FV_BLUE }}>
              {SCHOOL_REQUEST.org}
            </Typography>
            <Pill label="NEEDS YOU" color={FV_BLUE} />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.35 }}>
            Asks to see some of Alice’s records
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
            Tap to see what they want, and why
          </Typography>
        </Box>


      </VaultScreen>
    );
  }

  if (approval === 'complete') {
    return (
      <VaultScreen
        title="Data request"
        subtitle={`Shared with ${SCHOOL_REQUEST.org}`}
        tab="alerts"
        onBack={() => setView('home')}
      >
        <VaultCard accent="#2E7D32">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.5 }}>
            <CheckCircle sx={{ fontSize: 18, color: 'success.main' }} />
            <Typography variant="body2" sx={{ fontWeight: 800, color: 'success.dark' }}>
              Approved by Maria and Alice
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            {chosen.length} items shared with {SCHOOL_REQUEST.org}, ending {duration.toLowerCase()}.
          </Typography>
        </VaultCard>

        <GroupLabel>WHAT THE SCHOOL CAN SEE</GroupLabel>
        <VaultCard>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {chosen.map((i) => (
              <CheckLine key={i.id}>{i.label}</CheckLine>
            ))}
          </Box>
        </VaultCard>

        {withheld.length > 0 && (
          <>
            <GroupLabel>WHAT IT CANNOT</GroupLabel>
            <VaultCard>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {withheld.map((i) => (
                  <Box key={i.id} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    <RadioButtonUnchecked sx={{ fontSize: 14, color: 'text.disabled' }} />
                    <Typography variant="caption" color="text.secondary">
                      {i.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </VaultCard>
          </>
        )}

        <Typography variant="caption" color="text.secondary">
          It ends on its own. You can end it sooner from the access log.
        </Typography>
      </VaultScreen>
    );
  }

  return (
    <VaultScreen
      title="Data request"
      subtitle={`${SCHOOL_REQUEST.org} · about Alice`}
      tab="alerts"
      onBack={() => setView('home')}
    >
      <VaultCard>
        <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'block' }}>
          WHY THEY WANT IT
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.primary' }}>
          {SCHOOL_REQUEST.purpose}
        </Typography>
      </VaultCard>

      {GROUPS.map((group) => (
        <Box key={group} sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <GroupLabel>{group.toUpperCase()}</GroupLabel>
          {SCHOOL_REQUEST.items
            .filter((i) => i.group === group)
            .map((item) => {
              const on = selectedItemIds.includes(item.id);
              return (
                <Box
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
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
                  <Typography variant="caption" sx={{ fontWeight: 600, color: on ? 'text.primary' : 'text.secondary' }}>
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      ))}

      <GroupLabel>FOR HOW LONG</GroupLabel>
      <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
        {SCHOOL_REQUEST.durations.map((d) => (
          <Box
            key={d}
            onClick={() => setDuration(d)}
            sx={{
              px: 1.25,
              py: 0.75,
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: duration === d ? FV_BLUE : 'divider',
              bgcolor: duration === d ? `${FV_BLUE}0D` : 'background.paper',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Schedule sx={{ fontSize: 14, color: duration === d ? FV_BLUE : 'text.disabled' }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>
              {d}
            </Typography>
          </Box>
        ))}
      </Box>

      <GroupLabel>THEY WILL SEE</GroupLabel>
      <VaultCard>
        <Typography variant="caption" sx={{ color: 'text.primary' }}>
          {chosen.length ? chosen.map((i) => i.label).join(' · ') : 'Nothing selected'}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
          Ending {duration.toLowerCase()}. Nothing else about Alice, and nothing about Ethan.
        </Typography>
      </VaultCard>

      <GroupLabel>ON WHAT TERMS</GroupLabel>
      <MyTermsChip compact />

      {approval === 'pending' ? (
        <Button
          variant="contained"
          fullWidth
          startIcon={<PhoneIphone sx={{ fontSize: 16 }} />}
          onClick={advanceApproval}
          disabled={!chosen.length}
          sx={{ textTransform: 'none', fontWeight: 700, bgcolor: FV_BLUE, '&:hover': { bgcolor: '#0055AA' } }}
        >
          Approve and share
        </Button>
      ) : (
        <VaultCard accent={FV_BLUE}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 0.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 800 }}>
              Waiting for Alice
            </Typography>
            <Pill label="SHE'S 16" color={FV_BLUE} />
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
            Maria has approved. Records about Alice need her approval too.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={advanceApproval}
            sx={{ textTransform: 'none', fontWeight: 700, bgcolor: FV_BLUE, '&:hover': { bgcolor: '#0055AA' } }}
          >
            Alice approves on her phone
          </Button>
        </VaultCard>
      )}
    </VaultScreen>
  );
};
