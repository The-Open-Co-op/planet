import { Box, Button, Typography } from '@mui/material';
import { NotificationItem } from '@/components/notifications/NotificationItem/NotificationItem';
import type { Notification } from '@/types/notification';
import { LINKS } from '@/components/trust-demo/trustDemoData';
import {
  VaultScreen,
  VaultCard,
  GroupLabel,
  CheckLine,
  FieldRows,
  Pill,
  TermsLink,
  FV_BLUE,
} from '../familyVaultKit';
import { RECORDS, FAMILY } from '../familyVaultData';
import { useEffect, useState } from 'react';
import { notificationService } from '@/services/notificationService';
import { useFamilyVault } from '../familyVaultContext';
import { useVaultNav } from '../vaultNav';

/**
 * Step 2 — signed records arrive in Alerts, the same place every other
 * credential lands in the app. Accepting one opens the check panel.
 */

const incoming = RECORDS.filter((r) => r.incoming);

const toNotification = (id: string, title: string, issuer: string): Notification => ({
  id,
  type: 'record',
  title: 'New record',
  message: `${title} — issued to Alice`,
  fromUserName: issuer,
  targetUserId: 'maria',
  isRead: false,
  isActionable: true,
  status: 'pending',
  metadata: {},
  createdAt: new Date('2026-02-02T09:00:00Z'),
  updatedAt: new Date('2026-02-02T09:00:00Z'),
});

export const RecordsScreen = () => {
  const { acceptedRecordIds, acceptRecord, checkingRecordId, setCheckingRecordId } = useFamilyVault();
  const { setView } = useVaultNav();
  // The rest of the family's alerts — vouches and connections from the shared
  // demo data — so Alerts looks like the one list it is, not a records inbox.
  const [others, setOthers] = useState<Notification[]>([]);
  useEffect(() => {
    notificationService.getNotifications('current-user').then((data) =>
      setOthers([...data].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 4))
    );
  }, []);

  const checking = RECORDS.find((r) => r.id === checkingRecordId);
  const waitingCount = incoming.filter((r) => !acceptedRecordIds.includes(r.id)).length;

  if (checking) {
    return (
      <VaultScreen
        title="Check this record"
        tab="alerts"
        onBack={() => setCheckingRecordId(null)}
      >
        <VaultCard>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {checking.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
            {checking.summary}
          </Typography>
        </VaultCard>

        <GroupLabel>WHERE IT CAME FROM</GroupLabel>
        <VaultCard>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            <CheckLine>
              Issued to <b>{FAMILY.find((p) => p.id === checking.about)?.name}</b>
            </CheckLine>
            <CheckLine>
              Issued by <b>{checking.issuer}</b>
            </CheckLine>
            <CheckLine>Signed, and unaltered since it was issued</CheckLine>
            <CheckLine>Not withdrawn by the issuer</CheckLine>
            <CheckLine>Issued {checking.issuedOn}</CheckLine>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            {checking.check.chain}
          </Typography>
        </VaultCard>

        {checking.termsOfUse && (
          <>
            <GroupLabel>WHAT YOU MAY DO WITH IT</GroupLabel>
            <VaultCard>
              <Typography variant="caption" sx={{ color: 'text.primary', display: 'block', mb: 0.75 }}>
                {checking.termsOfUse}
              </Typography>
              <TermsLink label="Issuer’s terms of use" href={LINKS.w3cVc} />
            </VaultCard>
          </>
        )}

        {checking.fields && (
          <>
            <GroupLabel>WHAT IT HOLDS</GroupLabel>
            <VaultCard>
              <FieldRows rows={checking.fields} />
            </VaultCard>
          </>
        )}

        {acceptedRecordIds.includes(checking.id) ? (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setCheckingRecordId(null)}
            sx={{ textTransform: 'none', fontWeight: 700 }}
          >
            Back to alerts
          </Button>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setCheckingRecordId(null)}
              sx={{ textTransform: 'none', fontWeight: 700, color: 'text.secondary', borderColor: 'divider' }}
            >
              Decline
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => acceptRecord(checking.id)}
              sx={{ textTransform: 'none', fontWeight: 700, bgcolor: FV_BLUE, '&:hover': { bgcolor: '#0055AA' } }}
            >
              Accept into vault
            </Button>
          </Box>
        )}
      </VaultScreen>
    );
  }

  return (
    <VaultScreen
      title="Alerts"
      tab="alerts"
      onBack={() => setView('home')}
      badges={waitingCount ? { alerts: waitingCount } : undefined}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {incoming.map((r) => {
          const accepted = acceptedRecordIds.includes(r.id);
          return accepted ? (
            <VaultCard key={r.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 0 }} noWrap>
                  {r.title}
                </Typography>
                <Pill label="IN THE VAULT" color="#2E7D32" />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                From {r.issuer}
              </Typography>
              <Button
                size="small"
                onClick={() => setCheckingRecordId(r.id)}
                sx={{ textTransform: 'none', fontWeight: 700, px: 0, mt: 0.5 }}
              >
                Check this record
              </Button>
            </VaultCard>
          ) : (
            <NotificationItem
              key={r.id}
              notification={toNotification(r.id, r.title, r.issuer)}
              onClick={() => setCheckingRecordId(r.id)}
              onAccept={() => acceptRecord(r.id)}
              onReject={() => undefined}
            />
          );
        })}

        {others.map((n) => (
          <NotificationItem key={n.id} notification={n} onClick={() => undefined} />
        ))}
      </Box>


    </VaultScreen>
  );
};
