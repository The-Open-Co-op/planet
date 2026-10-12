import { Box, Typography } from '@mui/material';
import {
  MenuBook,
  LocalHospital,
  WorkspacePremium,
  Psychology,
  ChevronRight,
  AutoAwesome,
  Share,
  Visibility,
  Description,
  PersonAddAlt,
} from '@mui/icons-material';
import type { ReactNode } from 'react';
import { VaultScreen, VaultCard, GroupLabel, PersonChip, FV_BLUE } from '../familyVaultKit';
import { FAMILY, RECORDS, ASSISTANT } from '../familyVaultData';
import { useFamilyVault } from '../familyVaultContext';
import { useVaultNav } from '../vaultNav';

const CATEGORY_ICON = {
  Learning: <MenuBook sx={{ fontSize: 18 }} />,
  Health: <LocalHospital sx={{ fontSize: 18 }} />,
  Certificates: <WorkspacePremium sx={{ fontSize: 18 }} />,
};

const ACTIVITY = [
  { text: 'Ms. Okafor viewed Alice’s learning plan', when: 'Yesterday', kind: 'view' as const },
  {
    text: 'Denver Pediatrics issued Ethan’s immunization record',
    when: '3 days ago',
    kind: 'record' as const,
  },
  { text: 'Rosa was added to the trusted circle', when: 'Last week', kind: 'person' as const },
];

const ACTIVITY_ICON = {
  view: <Visibility sx={{ fontSize: 13 }} />,
  record: <Description sx={{ fontSize: 13 }} />,
  person: <PersonAddAlt sx={{ fontSize: 13 }} />,
};

/** Tappable tile in the vault grid. */
const Tile = ({
  icon,
  value,
  label,
  onClick,
}: {
  icon: ReactNode;
  value: string | number;
  label: string;
  onClick?: () => void;
}) => (
  <Box
    onClick={onClick}
    sx={{
      p: 1.5,
      borderRadius: 1.5,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      cursor: onClick ? 'pointer' : 'default',
      ...(onClick && { '&:hover': { borderColor: FV_BLUE } }),
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: FV_BLUE }}>
      {icon}
      <Typography variant="body2" sx={{ fontWeight: 800 }}>
        {value}
      </Typography>
    </Box>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
  </Box>
);

/** Section heading with an action on the right. */
const SectionHead = ({ label, action, onAction }: { label: string; action: string; onAction: () => void }) => (
  <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
    <GroupLabel>{label}</GroupLabel>
    <Typography
      variant="caption"
      onClick={onAction}
      sx={{ color: FV_BLUE, fontWeight: 700, cursor: 'pointer' }}
    >
      {action}
    </Typography>
  </Box>
);

/** Step 1 — the family's own view of their vault, and the way in to everything else. */
export const HomeScreen = () => {
  const { acceptedRecordIds, memory, approval, clinicChoice, appGranted } = useFamilyVault();
  const { setView } = useVaultNav();

  const household = FAMILY.filter((p) => p.circle === 'household');
  const trusted = FAMILY.filter((p) => p.circle === 'trusted');
  const inVault = RECORDS.filter((r) => !r.incoming || acceptedRecordIds.includes(r.id));
  const waiting = RECORDS.filter((r) => r.incoming && !acceptedRecordIds.includes(r.id));

  const counts = (['Learning', 'Health', 'Certificates'] as const).map((c) => ({
    category: c,
    n: inVault.filter((r) => r.category === c).length,
  }));

  // One standing grant (the tutor), plus anything shared earlier in the demo.
  const sharedCount =
    1 + (approval === 'complete' ? 1 : 0) + (clinicChoice ? 1 : 0) + (appGranted ? 1 : 0);

  return (
    <VaultScreen
      title="Rivera Family Vault"
      tab="home"
      badges={waiting.length ? { alerts: waiting.length } : undefined}
    >
      <Box
        onClick={() => setView('assistant')}
        sx={{
          p: 1.5,
          borderRadius: 1.5,
          border: '1.5px solid',
          borderColor: FV_BLUE,
          bgcolor: `${FV_BLUE}0D`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <AutoAwesome sx={{ fontSize: 18, color: FV_BLUE, flexShrink: 0 }} />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            Ask the family assistant
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }} noWrap>
            “{ASSISTANT.question}”
          </Typography>
        </Box>
        <ChevronRight sx={{ fontSize: 18, color: FV_BLUE, flexShrink: 0 }} />
      </Box>

      <GroupLabel>OUR FAMILY</GroupLabel>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {household.map((p) => (
          <VaultCard key={p.id}>
            <PersonChip person={p} />
          </VaultCard>
        ))}
      </Box>

      <SectionHead label="TRUSTED CIRCLE" action="Edit" onAction={() => setView('circle')} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {trusted.map((p) => (
          <VaultCard key={p.id}>
            <PersonChip person={p} />
          </VaultCard>
        ))}
      </Box>

      <GroupLabel>IN THE VAULT</GroupLabel>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
        {counts.map((c) => (
          <Tile key={c.category} icon={CATEGORY_ICON[c.category]} value={c.n} label={c.category} />
        ))}
        <Tile
          icon={<Psychology sx={{ fontSize: 18 }} />}
          value={memory.length}
          label="Family Memory"
          onClick={() => setView('memory')}
        />
        <Tile
          icon={<Share sx={{ fontSize: 18 }} />}
          value={sharedCount}
          label="Shared"
          onClick={() => setView('log')}
        />
      </Box>

      <GroupLabel>RECENT</GroupLabel>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {ACTIVITY.map((a, i) => (
          <Box key={a.text} sx={{ display: 'flex', gap: 1.25 }}>
            {/* Timeline rail: marker, then a line down to the next entry. */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 22 }}>
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  bgcolor: `${FV_BLUE}14`,
                  color: FV_BLUE,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {ACTIVITY_ICON[a.kind]}
              </Box>
              {i < ACTIVITY.length - 1 && <Box sx={{ width: '1px', flex: 1, bgcolor: 'divider', my: 0.5 }} />}
            </Box>
            <Box sx={{ pb: i < ACTIVITY.length - 1 ? 1.75 : 0, minWidth: 0 }}>
              <Typography variant="caption" sx={{ display: 'block', color: 'text.primary', lineHeight: 1.4 }}>
                {a.text}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {a.when}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </VaultScreen>
  );
};
